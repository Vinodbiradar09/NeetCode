import { prisma } from "../prismadb.js";
import { getChannel } from "../queues/rabbit.js";

interface SubmissionPayload {
  userId: string;
  problemId: string;
  lang: string;
  code: string;
}

export const submissionService = {
  async submitCode(payload: SubmissionPayload) {
    const { userId, problemId, lang, code } = payload;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const problem = await prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) throw new Error("Problem not found");

    if (!["JavaScript", "Rust", "GoLang"].includes(lang)) {
      throw new Error("Language not supported");
    }

    if(!code){
        throw new Error("code is required");
    }
    const channel = getChannel();
    channel.sendToQueue(
      "submissions",
      Buffer.from(JSON.stringify(payload)),
      { persistent: true }
    );
    return { message: "Queued submission" };
  },
};
