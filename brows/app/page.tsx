"use client";
import Link from "next/link";

export default function LandingPage() {
  const sampleProblemSlug = [
    "3ddc985d-c9a0-4cb4-8700-f01f704101be",
    "92f9c547-7d88-478b-ae87-0935e04856c5",
    "ae813aa1-7b61-4189-94e9-07c1702de740",
  ];
  const hardSlug = ["f5209f9f-6a4b-435a-a4e6-fff26b1dd439"];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
            <span className="font-bold text-black">NC</span>
          </div>
          <div>
            <div className="text-lg font-semibold">NeetCode</div>
            <div className="text-xs text-neutral-400 -mt-0.5">
              Practice · Compete · Learn
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/signup"
            className="text-neutral-300 hover:text-white px-3 py-1 rounded"
          >
            Sign up
          </Link>
          <Link
            href="/login"
            className="text-neutral-300 hover:text-white px-3 py-1 rounded"
          >
            Sign in
          </Link>
          <Link
            href="/problem"
            className="text-neutral-300 hover:text-white px-3 py-1 rounded"
          >
            Create Problems
          </Link>
          <Link
            href="/problems"
            className="text-neutral-300 hover:text-white px-3 py-1 rounded"
          >
            Open Problems
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Focus on problems
            </h1>
            <p className="mt-4 text-neutral-400 max-w-xl">
              NeetCode is designed for long coding sessions. Practice
              high-quality problems, compete with peers, and learn efficiently
              with our curated platform.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-400 text-black font-medium"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-400 text-black font-medium"
              >
                Login account
              </Link>
              <Link
                href="/problem"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-800 text-neutral-300"
              >
                Create problem
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-800 text-neutral-300"
              >
                Open problems
              </Link>
            </div>

            <div className="mt-6">
              <div className="text-xs text-neutral-400 mb-2">Quick links</div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/submission/${sampleProblemSlug[2]}`}
                  className="text-sm text-neutral-300 px-3 py-2 bg-neutral-900 rounded-md border border-neutral-800"
                >
                  Example problem
                </Link>
                <span className="text-sm text-neutral-400 px-3 py-2 bg-neutral-900 rounded-md border border-neutral-800 cursor-not-allowed">
                  Contests (soon)
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-black p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-neutral-400">
                    Hard Of The Day
                  </div>
                  <h3 className="mt-1 font-semibold text-lg">
                    Median of Two Sorted Arrays
                  </h3>
                </div>
                <div className="text-xs text-neutral-500">Hard</div>
              </div>

              <pre className="mt-2 rounded-md bg-neutral-900 p-3 text-xs overflow-auto border border-neutral-800 max-h-60">
                {`while (left <= right) {
  const i = Math.floor((left + right) / 2);
  const j = Math.floor((m + n + 1) / 2) - i;

  const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
  const minRight1 = i === m ? Infinity : nums1[i];
  const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
  const minRight2 = j === n ? Infinity : nums2[j];

  if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
    if ((m + n) % 2 === 0) {
      return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
    } else {
      return Math.max(maxLeft1, maxLeft2);
    }
  } else if (maxLeft1 > minRight2) {
    right = i - 1;
  } else {
    left = i + 1;
  }
}

throw new Error("Input arrays are not sorted");`}
              </pre>

              <div className="flex gap-3 items-center">
                <Link
                  href={`/submission/${hardSlug[0]}`}
                  className="px-3 py-1 rounded-md bg-cyan-400 text-black text-sm"
                >
                  Solve
                </Link>
                <button
                  className="px-3 py-1 rounded-md border border-neutral-800 text-sm text-neutral-300"
                  disabled
                >
                  Discuss
                </button>
                <div className="ml-auto text-xs text-neutral-400 px-2 py-1 bg-neutral-900 rounded">
                  #array
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Why NeetCode?</h2>
          <p className="text-neutral-400 mb-6">
            NeetCode provides a focused and efficient platform to practice coding problems, create your own problems, and improve your skills in multiple languages.
          </p>

          <div className="flex justify-center mt-8">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800 w-64 text-center flex flex-col items-center gap-3">
                <h3 className="font-semibold text-lg">Create Your Own Problems</h3>
                <p className="text-neutral-400 text-sm">
                  Design custom problems and challenge yourself or the community to solve them.
                </p>
              </div>

              <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800 w-64 text-center flex flex-col items-center gap-3">
                <h3 className="font-semibold text-lg">Practice in Multiple Languages</h3>
                <p className="text-neutral-400 text-sm">
                  Solve problems using JavaScript, Rust, or Go to expand your programming skills.
                </p>
              </div>

              <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800 w-64 text-center flex flex-col items-center gap-3">
                <h3 className="font-semibold text-lg">Level Up Your Skills</h3>
                <p className="text-neutral-400 text-sm">
                  Structured problem sets and challenges help you improve efficiently and track progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold">Recent problems</h2>
          <p className="text-neutral-400 mt-2">
            Open problems you can solve right now.
          </p>

          <div className="mt-4 space-y-3">
            <Link
              className="block bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:bg-neutral-800"
              href={`/submission/${sampleProblemSlug[2]}`}
            >
              Add Two Numbers
            </Link>

            <Link
              className="block bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:bg-neutral-800"
              href={`/submission/${sampleProblemSlug[0]}`}
            >
              Longest Palindromic Substring
            </Link>
            <Link
              className="block bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:bg-neutral-800"
              href={`/submission/${sampleProblemSlug[1]}`}
            >
              Longest Substring Without Repeating Characters
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
