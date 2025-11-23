"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export interface ProblemInt {
  id?: string;
  title?: string;
  description?: string;
  examples?: string;
}

export default function AllProblems() {
  const [problems, setProblems] = useState<ProblemInt[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sendReq = async () => {
      try {
        const res = await axios.get("http://localhost:3005/api/problems/", {
          withCredentials: true,
        });
        if (res.data) {
          setProblems(res.data.problems);
        }
      } catch (e) {
        console.log("error fetching problems", e);
      } finally {
        setLoading(false);
      }
    };
    sendReq();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl relative">
        <Link
          href="/problem"
          className="absolute right-0 top-0 px-4 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-sm font-medium cursor-pointer"
        >
          Create Problem
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">Problem Sets</h1>
          <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
            Browse the list of problems. Click any title to open it in the editor and start solving.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {loading && (
            <div className="text-center text-neutral-400">Loading problems...</div>
          )}

          {!loading && problems.length === 0 && (
            <div className="text-center text-neutral-400">
              No problems found.{" "}
              <Link
                href="/problem"
                className="text-cyan-400 hover:underline"
              >
                Create your first problem
              </Link>
            </div>
          )}

          {!loading &&
            problems.map((prob, index) => (
              <Link
                key={prob.id}
                href={`/submission/${prob.id}`}
                className="w-full px-4 py-3 rounded-md border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition text-center"
              >
                <h3 className="text-lg font-semibold text-white">
                  {index + 1}. {prob.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
