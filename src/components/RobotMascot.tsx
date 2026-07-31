import React from "react";
import Image from "next/image";

interface RobotMascotProps {
  status: "idle" | "asking_name" | "question" | "analyzing" | "result";
  userName?: string;
  questionNumber?: number;
  aiReaction?: string;
  isReactionLoading?: boolean;
}

export function RobotMascot({
  status,
  userName,
  questionNumber,
  aiReaction,
  isReactionLoading,
}: RobotMascotProps) {
  const getDefaultMessage = () => {
    switch (status) {
      case "asking_name":
        return "Welcome to ChipTech!  Enter your name to diagnose your personality type.";
      case "question":
        return `Question ${questionNumber} of 5 for you, ${userName || "friend"}. Be 100% real!`;
      case "analyzing":
        return "Connecting circuits... calculating your sass profile and energy levels...";
      case "result":
        return `Diagnostic complete for ${userName || "you"}! Check your reading on the right ✨`;
      default:
        return "Ready to discover your personality profile?";
    }
  };

  const currentSpeech = isReactionLoading
    ? "Processing your choice..."
    : aiReaction || getDefaultMessage();

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2 sm:space-y-3">
      {/* Floating Robot Mascot (Dominant visual scaling, minimal whitespace) */}
      <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[420px] max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center shrink-0">
        <Image
          src="/mascot.png"
          alt="ROBO-CHIPTECH MASCOT"
          width={800}
          height={800}
          className={`w-full h-full object-contain mascot-idle transition-transform duration-300 ${
            status === "analyzing" ? "animate-bounce" : "hover:scale-105"
          }`}
          priority
        />
      </div>

      {/* Reactive Speech Bubble (Sits directly beneath the mascot with minimal spacing) */}
      <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 sm:p-4 text-center relative bracket-frame">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
          <span className="text-[10px] sm:text-xs font-pixel text-[var(--accent)] tracking-wider uppercase">
            ROASTBOT • {status.toUpperCase()}
          </span>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text)] font-medium leading-snug transition-all duration-300">
          {currentSpeech}
        </p>
      </div>
    </div>
  );
}
