import React, { useState, useEffect } from "react";
import { Question } from "@/lib/archetypes";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSelectOption: (option: { value: string; trait: string; label: string }) => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
}: QuestionCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Reset local selection state when question changes
  useEffect(() => {
    setSelectedIdx(null);
  }, [question.id]);

  const handleSelect = (idx: number, option: any) => {
    setSelectedIdx(idx);
    onSelectOption(option);
  };

  return (
    <div className="w-full bracket-frame rounded-2xl p-4 sm:p-8 shadow-xl space-y-4 sm:space-y-6">
      {/* Circuit Trace Node Progress Indicator */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--border)] -z-10 -translate-y-1/2"></div>
        
        {/* Active connection line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[var(--cyan)] -z-10 -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ width: `${(currentIndex / (totalQuestions - 1)) * 100}%` }}
        ></div>

        {Array.from({ length: totalQuestions }).map((_, i) => {
          const isCompleted = i < currentIndex;
          const isCurrent = i === currentIndex;
          
          return (
            <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 relative bg-[var(--card)] px-1">
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                  ${
                    isCompleted
                      ? "bg-[var(--cyan)] border-[var(--cyan)]"
                      : isCurrent
                      ? "bg-[var(--cyan)] border-[var(--cyan)] ring-4 ring-[var(--accent)]/40 scale-110"
                      : "bg-[var(--surface)] border-[var(--border)]"
                  }
                `}
              >
                {(isCompleted || isCurrent) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--inverted)]" />
                )}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-pixel uppercase absolute -bottom-4 sm:-bottom-5 whitespace-nowrap transition-colors duration-300 ${isCurrent ? 'text-[var(--cyan)]' : 'text-[var(--accent-light)]'}`}>
                Node {i + 1}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 sm:pt-6">
        <h3 className="text-lg sm:text-2xl font-bold text-[var(--text)] leading-tight mb-4 sm:mb-6 font-inter">
          {question.text}
        </h3>

        <div className="space-y-2.5 sm:space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx, option)}
                disabled={selectedIdx !== null}
                className={`w-full min-h-[48px] text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-300 font-semibold text-xs sm:text-base cursor-pointer flex items-center justify-between gap-2
                  ${
                    isSelected
                      ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--inverted)] shadow-md"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--card)] disabled:opacity-50 disabled:cursor-not-allowed"
                  }
                `}
              >
                <span className="leading-snug">{option.label}</span>
                {isSelected && (
                  <svg className="w-5 h-5 shrink-0 text-[var(--inverted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
