"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function User() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const sendReq = async () => {
    try {
        const csrfRes = await axios.get("http://localhost:3005/auth/csrf", {
            withCredentials : true,
        });
        const csrfToken = csrfRes.data.csrfToken;
      setLoading(true);
      setErrorMsg(null);
      const res = await axios.post("http://localhost:3005/auth/signin", {
        email,
        password,
        csrfToken,
      },{withCredentials : true});
      if (res.data) {
        setUserId(res.data.userId);
        setEmail("");
        setPassword("");
        console.log("userId" , userId);
        router.push("/problems");
      }
    } catch (error) {
      console.log("error in creating the user", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-extrabold">Login to you NeetCode Account</h1>
              <p className="text-xs text-neutral-400 mt-1">Quickly Login and start solving.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
             
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-neutral-400">Email</label>
            <Input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800 text-white placeholder:text-neutral-500 rounded-md"
            />

            <label className="text-xs text-neutral-400 mt-2">Password</label>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 text-white placeholder:text-neutral-500 rounded-md"
            />

            {errorMsg && (
              <div className="text-sm text-red-400 bg-black/30 p-2 rounded mt-1 wrap-break-word">
                {errorMsg}
              </div>
            )}

            <div className="mt-4 flex gap-3 items-center justify-center">
              <Button
                onClick={sendReq}
                className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logining..." : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}