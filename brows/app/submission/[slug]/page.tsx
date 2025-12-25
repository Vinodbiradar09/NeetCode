"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "@/components/Editor";
import ProblemPanel from "@/components/ProblemPanel";
import { ProblemInt } from "@/app/problems/page";
import { connectionWs } from "@/lib/ws";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";

export enum Languages {
  JavaScript = "JavaScript",
  Rust = "Rust",
  GoLang = "GoLang",
}

 export interface User {
  id : string,
  email : string,
  name : string,
  createdAt : string,
 }

export default function SolvePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [problem, setProblem] = useState<ProblemInt | null>(null);
  const [ user , setUser] = useState<User | null>(null);
  const [code, setCode] = useState("console.log('hello')");
  const [lang, setLang] = useState<Languages>(Languages.JavaScript);
  const [result, setResult] = useState("");
  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://localhost:3005/api/problems/${slug}`);
      setProblem(res.data.problem);
    };
    const loadUser = async()=>{
      const res = await axios.get('http://localhost:3005/api/users/me' , {withCredentials : true});
      setUser(res.data.user);
      console.log("the user is " ,user);
    }
    const Prom = async()=>{
      const [p1 , p2] =  await Promise.all([load , loadUser]);
      console.log("p1" , p1);
      console.log("p2" , p2);
    }

    Prom();
  }, [slug , user]);

  useEffect(() => {
    if(!user?.id) return 
    const ws = connectionWs(user?.id);

    ws.onmessage = (e) => {
      try {
        console.log("hiiiiiii" , JSON.parse(e.data));
        const msg = JSON.parse(e.data);
        const { output, error, status } = msg;
        if (msg.type !== "submission-result") return;
        if (status === "Success") {
          setResult(JSON.stringify(output, null, 2));
          console.log("hfhfhf" , JSON.stringify(output));
          console.log("reasss" ,result);
        } else if (status === "Tle"){
          setResult("Time Limit Exceeded");
        } else {
           setResult(JSON.stringify(error, null, 2));
        }
      } catch {
        console.log("Non-JSON message:", e.data);
      }
    };
  }, [user?.id , result]);
  
  useEffect(() => {
  console.log("UI result updated:", result);
}, [result]);


  const submit = async () => {
    const res = await axios.post("http://localhost:3005/api/submissions", {
      userId : user?.id,
      problemId: slug,
      lang,
      code,
    });
    console.log(res.data);
  };

  if (!problem) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="w-full border-b border-neutral-800 py-3 flex justify-center items-center bg-neutral-950">
        <div className="w-10 h-10 rounded-md bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center m-3">
          <span className="font-bold text-black">NC</span>
        </div>
        <div className="text-4xl font-semibold">NeetCode</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ProblemPanel
          problem={problem}
          lang={lang}
          setLang={setLang}
          submit={submit}
          result={result}
        />
        <div className="flex-1 flex flex-col bg-black">
          <div className="flex justify-start items-center p-3 pr-5 border-b border-neutral-800 bg-neutral-950">
            <LanguageSelector value={lang} onChange={setLang} />
            <Button
              onClick={submit}
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black  px-6 h-10 mx-5 cursor-pointer"
            >
              Submit Code
            </Button>

            <Link
              href="/problems"
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-2 rounded-md"
            >
              Open Problems
            </Link>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden border border-neutral-800 m-5 flex flex-col">
              <CodeEditor code={code} onChange={setCode} lang={lang} />
            </div>

            <div className="text-neutral-500 text-sm py-3 flex items-center justify-center">
              © All Rights Reserved to NeetCode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
