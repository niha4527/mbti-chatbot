import React from "react";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full glass-navy border-b border-indigo-500/20 py-4 px-6 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-indigo-400/40 bg-slate-900 flex items-center justify-center p-1 shadow-md shadow-indigo-500/10">
          <Image
            src="/mascot.png"
            alt="ChipTech Mascot"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            RoastBot <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">ChipTech</span>
          </h1>
          <p className="text-xs text-indigo-200/70 font-medium">Snarky MBTI Tech Personality Assessor</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-xs font-mono text-indigo-300/80">GROQ LLaMA-3.3</span>
      </div>
    </header>
  );
}
