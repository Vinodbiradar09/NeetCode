"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Languages } from "@/app/submission/[slug]/page";

export default function LanguageSelector({
  value,
  onChange,
}: {
  value: Languages | null;
  onChange: (v: Languages) => void;
}) {
  return (
    <Select
      onValueChange={(v) => onChange(v as Languages)}
      value={value ?? undefined}
    >
      <SelectTrigger className="w-[200px]border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black cursor-pointer ">
        <SelectValue placeholder="Select Language" className="cursor-pointer" />
      </SelectTrigger>

      <SelectContent  className="bg-neutral-900 text-cyan-400 border-neutral-700 cursor-pointer">
            <SelectItem value={Languages.JavaScript}>
                JavaScript
            </SelectItem>
            <SelectItem value={Languages.GoLang}>GoLang</SelectItem>
            <SelectItem value={Languages.Rust}>Rust</SelectItem>
      </SelectContent>
    </Select>
  );
}
