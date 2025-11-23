"use client";
import { Languages } from "@/app/submission/[slug]/page";
import { ProblemInt } from "@/app/problems/page";

export default function ProblemPanel({
  problem,
  result,
}: {
  problem: ProblemInt;
  lang: Languages;
  setLang: (l: Languages) => void;
  submit: () => void;
  result: string;
}) {
  return (
    <div className="w-[40%] min-w-[420px] max-w-[520px] border-r border-neutral-800 flex flex-col overflow-y-auto">
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">{problem.title}</h1>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-neutral-300 whitespace-pre-wrap">
            {problem.description}
          </p>
        </div>

        {problem.examples && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <h2 className="font-semibold mb-2">Examples</h2>
            <pre className="text-neutral-300 whitespace-pre-wrap">
              {problem.examples}
            </pre>
          </div>
        )}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <h2 className="font-bold mb-2">Result</h2>
          <pre className="whitespace-pre-wrap text-green-400">
            {result}
          </pre>
        </div>
      </div>
    </div>
  );
}
