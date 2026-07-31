import React from "react";
import Image from "next/image";

interface HeaderProps {
  isLightMode: boolean;
  onToggleLightMode: () => void;
}

export function Header({ isLightMode, onToggleLightMode }: HeaderProps) {
  return (
    <header className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-2.5 px-6 shrink-0 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--border)] p-1 flex items-center justify-center">
            <Image
              src="/mascot.png"
              alt="ChipTech Mascot"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-lg sm:text-xl text-[var(--text)] tracking-wider uppercase font-bold">
                CHIP TECH
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--border)]">
                RV UNIVERSITY
              </span>
            </div>
            <p className="text-xs text-[var(--accent)] font-mono tracking-wide">
              WHERE IDEAS GET WIRED • Sassy MBTI Reader
            </p>
          </div>
        </div>
        
        {/* Right Light Mode Toggle */}
        <button
          onClick={onToggleLightMode}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] hover:scale-105 transition-transform"
          title="Toggle Theme"
        >
          {isLightMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
