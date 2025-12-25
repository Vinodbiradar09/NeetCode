import { prisma } from "../../primary/dist/prismadb.js";
import amqp from "amqplib";
import { Redis } from "ioredis";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

export const redis = new Redis({
  port : 6378,
  host: "127.0.0.1",
  username: "default",
  password: "my-top-secret",
});

const imageMap: any = {
  JavaScript: "node:20",
  Rust: "judge-rust",
  GoLang: "judge-go",
};

const runDocker = async (lang: string, code: string) => {
  const tempDir = "/tmp/" + Date.now();
  await fs.mkdir(tempDir);

  let fileName = "";
  let runCmd = "";

  if (lang === "JavaScript") {
    fileName = "main.js";
    runCmd = "node main.js";
  } else if (lang === "Rust") {
    fileName = "main.rs";
    runCmd = "rustc main.rs && ./main";
  } else if (lang === "GoLang") {
    fileName = "main.go";
    runCmd = "go run main.go";
  }

  const filePath = path.join(tempDir, fileName);
  await fs.writeFile(filePath, code);

  const imageName = imageMap[lang];

  return new Promise((resolve) => {
    const docker = spawn("docker", [
      "run",
      "--rm",
      "-v",
      `${tempDir}:/app`,
      "-w",
      "/app",
      imageName,
      "sh",
      "-c",
      runCmd,
    ]);

    let output = "";
    let error = "";

    docker.stdout.on("data", (d) => (output += d.toString()));
    docker.stderr.on("data", (d) => (error += d.toString()));

    const timeout = setTimeout(() => {
      error = "Time Limit Exceeded";
      docker.kill("SIGKILL");
    }, 5000);

    docker.on("close", async (code) => {
      clearTimeout(timeout);
      await fs.rm(tempDir, { recursive: true, force: true });
      if (code !== 0 && error.trim() === "") {
        error = "Runtime Error";
      }

      resolve({
        output: output.trim(),
        error: error.trim(),
      });
    });
  });
};

async function pickJob() {
  const conn = await amqp.connect("amqp://localhost:5672");
  const channel = await conn.createChannel();
  await channel.assertQueue("submissions", { durable: true });

  channel.prefetch(1);
  console.log("Worker ready");

  channel.consume("submissions", async (msg) => {
    if (!msg) return;

    const { userId, problemId, lang, code } = JSON.parse(
      msg.content.toString()
    );
    console.log("Picked job");

    try {
      const res: any = await runDocker(lang, code);
      console.log("res", res);
      let status: any = "Success";
      if (res.error.includes("Time Limit Exceeded")) {
        status = "Tle";
      } else if (res.error.length > 0) {
        status = "Error";
      }

      await prisma.codeDetails.create({
        data: {
          problemId,
          userId,
          code,
          lang,
          status,
          output: res.output,
          error: res.error,
        },
      });

      await redis.publish(
        "submission-results",
        JSON.stringify({ problemId, userId, status , output : res.output , error : res.error})
      );

      channel.ack(msg);
    } catch (err) {
      channel.nack(msg, false, true);
    }
  });
}

pickJob();
