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
  onRestart: () => void;
}

export function ResultCard({
  userName,
  mbti,
  result,
  onRestart,
}: ResultCardProps) {
  if (!result) return null;

  const displayTitle = result.title || "Personality Type";
  const displayCharacteristics = result.characteristics && result.characteristics.length > 0
    ? result.characteristics
    : ["Strategic", "Creative", "Spontaneous", "Loyal"];

  return (
    <div className="w-full bracket-frame rounded-2xl p-4 sm:p-7 shadow-xl space-y-4 sm:space-y-5 relative overflow-x-hidden glitch-reveal">
      {/* Spark Particle Overlay Accent */}
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none text-xs text-[var(--cyan)] opacity-75 animate-pulse">
        <span>✨</span>
        <span>⚡</span>
        <span>✨</span>
      </div>

      {/* Header: Title & MBTI Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--border)] pb-3.5 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] p-1.5 flex items-center justify-center shadow shrink-0">
            <Image
              src="/mascot.png"
              alt="Mascot"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-pixel uppercase text-[var(--accent)] tracking-wider block">
              DIAGNOSIS FOR {userName}
            </span>
            <h2 className="text-lg sm:text-2xl font-pixel font-bold text-[var(--text)] tracking-wide">
              {displayTitle} <span className="text-[var(--cyan)]">[{mbti}]</span>
            </h2>
          </div>
        </div>
        <div className="self-start sm:self-auto px-3.5 py-1 rounded-xl bg-[var(--card)] text-[var(--accent-light)] font-pixel text-sm sm:text-base font-bold border border-[var(--border)] shadow-inner">
          {mbti}
        </div>
      </div>

      {/* Unified Result Display */}
      <div className="space-y-4 sm:space-y-5 animate-fadeIn">
        {/* Short Description */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-md">
          <p className="text-[var(--text)] text-sm sm:text-lg leading-relaxed font-semibold">
            {result.description}
          </p>
        </div>

        {/* Leading Characteristics Line Separated by Bullet Points/Circles */}
        <div className="pt-2 sm:pt-3 border-t border-[var(--border)]">
          <span className="text-[10px] sm:text-xs font-pixel uppercase text-[var(--accent)] tracking-wider block mb-2">
            ● LEADING CHARACTERISTICS ●
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 text-xs sm:text-base font-bold text-[var(--accent-light)]">
            {displayCharacteristics.map((char, idx) => (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2 bg-[var(--card)] px-2.5 sm:px-3 py-1 rounded-lg border border-[var(--border)]">
                <span className="text-[var(--cyan)] text-[10px] sm:text-xs">●</span>
                <span className="text-[var(--text)]">{char}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="pt-3 border-t border-[var(--border)] flex justify-center">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] hover:from-[var(--cyan)] hover:to-[var(--accent)] text-[var(--inverted)] font-pixel text-xs sm:text-sm uppercase font-bold tracking-wider border border-[var(--accent-light)] transition-all transform active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
