"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

export default function CreateProblem() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [examples, setExamples] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const sendReq = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3005/api/problems", {
        title,
        description,
        examples,
      },{withCredentials : true});
      if (res.data) {
        setTitle("");
        setDescription("");
        setExamples("");
        console.log("Problem created:", res.data.problem.id);
      }
    } catch (error) {
      console.log("Error creating problem", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-5xl relative">
        <Link
          href="/problems"
          className="absolute right-0 top-0 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-4 py-2 rounded-md text-sm"
        >
          Open Problems
        </Link>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Create a Problem
          </h1>
          <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
            Add a new problem. Make sure the title is
            clear, the description explains constraints and expectations, and
            examples help illustrate the problem.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-xs font-medium text-neutral-300">
              Title
            </label>
            <Input
              placeholder="E.g. Two Sum"
              className="bg-black border border-neutral-800 text-white placeholder:text-neutral-500 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-neutral-300">
              Description
            </label>
            <Textarea
              placeholder="Explain the problem clearly. Include constraints, time and space complexity expectations."
              className="bg-black border border-neutral-800 text-white placeholder:text-neutral-500 rounded-md min-h-[200px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-neutral-300">
              Examples
            </label>
            <Textarea
              placeholder={`Example:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]`}
              className="bg-black border border-neutral-800 text-white placeholder:text-neutral-500 rounded-md min-h-[120px] resize-y"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
            />
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Button
              onClick={sendReq}
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black w-48 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Problem"}
            </Button>
            <Button
              onClick={() => {
                setTitle("");
                setDescription("");
                setExamples("");
              }}
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black w-48 cursor-pointer"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-300 flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white">
            Guidelines for Creating Problems
          </h3>
          <ul className="list-disc list-inside flex flex-col gap-2 text-sm">
            <li>Provide a short, clear, and specific title.</li>
            <li>Explain the problem thoroughly with all constraints.</li>
            <li>Mention input/output format and expected complexity.</li>
            <li>Add at least one example with input and output clearly formatted.</li>
            <li>Use code block formatting for examples for clarity.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
