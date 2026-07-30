import React from "react";
import Image from "next/image";

export interface ResultData {
  title: string;
  mbti: string;
  description: string;
  characteristics: string[];
}

interface ResultCardProps {
  userName: string;
  mbti: string;
  result: ResultData | null;
  isStreaming: boolean;
  rawStreamText: string;
  onRestart: () => void;
}

export function ResultCard({
  userName,
  mbti,
  result,
  isStreaming,
  rawStreamText,
  onRestart,
}: ResultCardProps) {
  const displayTitle = result?.title || "Personality Type";
  const displayCharacteristics = result?.characteristics && result.characteristics.length > 0
    ? result.characteristics
    : ["Strategic", "Creative", "Spontaneous", "Loyal"];

  return (
    <div className="w-full max-w-2xl mx-auto glass-navy rounded-2xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header: Title & MBTI Badge */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-indigo-400/40 p-1 flex items-center justify-center shadow">
            <Image
              src="/mascot.png"
              alt="Mascot"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-indigo-300 tracking-wider">
              Personality Diagnosis for {userName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {displayTitle} <span className="text-indigo-400 font-mono">[{mbti}]</span>
            </h2>
          </div>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-sm font-bold border border-indigo-400/40 shadow-inner">
          {mbti}
        </div>
      </div>

      {/* Streaming State */}
      {isStreaming && !result && (
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 text-indigo-300 font-mono text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
            <span>Channeling sassy analysis real-time...</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-200/90 border border-indigo-500/20 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {rawStreamText || "Initializing..."}
          </div>
        </div>
      )}

      {/* Unified Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Short Description (Max 5 lines: 2 roasts + 1 sweet statement) */}
          <div className="p-5 rounded-2xl glass-periwinkle border border-indigo-400/30 shadow-md">
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
              {result.description}
            </p>
          </div>

          {/* Leading Characteristics Line Separated by Points/Circles */}
          <div className="pt-2 border-t border-indigo-500/20">
            <span className="text-xs font-mono uppercase text-indigo-300/70 tracking-wider block mb-3">
              Leading Characteristics
            </span>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-semibold text-indigo-200">
              {displayCharacteristics.map((char, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-indigo-400 text-xs">●</span>
                  <span>{char}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Restart Action Button */}
      <div className="pt-4 border-t border-indigo-500/20 flex justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 hover:text-white font-medium border border-indigo-400/30 transition cursor-pointer flex items-center justify-center gap-2 text-sm shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
