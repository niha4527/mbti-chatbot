import React, { useState } from "react";

interface NameStepProps {
  onSubmit: (name: string) => void;
}

export function NameStep({ onSubmit }: NameStepProps) {
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setError("Please enter your name!");
      return;
    }
    onSubmit(nameInput.trim());
  };

  return (
    <div className="w-full bracket-frame rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-pixel text-[var(--text)] tracking-wide uppercase">
          Enter Your Name
        </h2>
        <p className="text-base text-[var(--accent)] font-medium">
          Start your 5-question ChipTech MBTI assessment to unlock your personality archetype.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name-input" className="block text-xs font-pixel text-[var(--accent-light)] uppercase mb-2 tracking-wider">
            Your Name / Handle
          </label>
          <input
            id="name-input"
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (error) setError("");
            }}
            placeholder=""
            className="w-full px-5 py-3 bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--cyan)] focus:border-[var(--accent)] font-semibold transition shadow-inner"
            autoFocus
            autoComplete="off"
          />
          {error && <p className="text-sm text-rose-500 mt-2 font-semibold">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-[var(--accent)] hover:bg-[var(--cyan)] text-[var(--inverted)] font-pixel text-base uppercase tracking-wider rounded-xl shadow-lg border border-[var(--accent-light)] transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 font-bold"
        >
          <span>Start Assessment</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
