"use client";

import Editor from "@monaco-editor/react";
import { Languages } from "@/app/submission/[slug]/page";

export default function CodeEditor({
  code,
  onChange,
  lang,
}: {
  code: string;
  onChange: (v: string) => void;
  lang: Languages;
}) {
  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        theme="vs-dark"
        language={
          lang === Languages.GoLang
            ? "go"
            : lang === Languages.Rust
            ? "rust"
            : "javascript"
        }
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "on",
          padding : {
            top : 26,
            bottom : 16,
          },
        }}
      />
    </div>
  );
}
