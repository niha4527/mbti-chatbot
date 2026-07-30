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
      setError("Please enter a valid developer name or handle!");
      return;
    }
    onSubmit(nameInput.trim());
  };

  return (
    <div className="w-full max-w-lg mx-auto glass-navy rounded-2xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Initialize Diagnostics
        </h2>
        <p className="text-sm text-indigo-200/80">
          Enter your name or GitHub handle to calibrate your MBTI archetype.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name-input" className="block text-xs font-mono text-indigo-300 uppercase mb-2">
            Developer / User Name
          </label>
          <input
            id="name-input"
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. Alex, Linus, Octocat"
            className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-400/40 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 font-medium transition"
            autoFocus
          />
          {error && <p className="text-xs text-rose-400 mt-2 font-medium">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 border border-indigo-400/50 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Start Assessment</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
