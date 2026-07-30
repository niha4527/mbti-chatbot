import React from "react";
import { Question } from "@/lib/archetypes";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSelectOption: (option: { value: string; trait: string; text: string }) => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
}: QuestionCardProps) {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto glass-navy rounded-2xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-indigo-300">
          <span>QUESTION {currentIndex + 1} OF {totalQuestions}</span>
          <span>{Math.round(progressPercent)}% COMPLETE</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-indigo-500/20">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-periwinkle-bright transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Text */}
      <div className="py-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {question.text}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() =>
              onSelectOption({
                value: opt.value,
                trait: opt.trait,
                text: opt.label,
              })
            }
            className="w-full text-left p-4 rounded-xl glass-periwinkle hover:bg-indigo-600/30 border border-indigo-400/30 hover:border-indigo-400 text-slate-100 font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-between group cursor-pointer"
          >
            <span className="flex-1 pr-4 text-sm sm:text-base leading-relaxed">
              {opt.label}
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500 text-indigo-300 group-hover:text-white border border-indigo-400/40 flex items-center justify-center font-bold text-xs transition">
              {opt.value}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
