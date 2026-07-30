import React from "react";
import Image from "next/image";

interface RobotMascotProps {
  status: "idle" | "asking_name" | "question" | "analyzing" | "result";
  userName?: string;
  questionNumber?: number;
}

export function RobotMascot({ status, userName, questionNumber }: RobotMascotProps) {
  const getSpeechBubble = () => {
    switch (status) {
      case "asking_name":
        return "Hey dev! I'm RoastBot 🤖. What's your name before we initialize your personality stack?";
      case "question":
        return `Alright ${userName || "friend"}, question ${questionNumber} of 5. Be honest—no lying to the compiler!`;
      case "analyzing":
        return "Compiling your answers... analyzing code smells, ego parameters, and coffee intake...";
      case "result":
        return `Behold ${userName || "dev"}! Your diagnostic report is ready. Prepare your feelings! ⚡`;
      default:
        return "Initializing system diagnostics...";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl glass-periwinkle border border-indigo-400/30 my-4 shadow-xl">
      <div className="relative group flex-shrink-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-periwinkle-bright opacity-50 blur-md group-hover:opacity-75 transition duration-500 animate-glow"></div>
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-400/50 p-2 flex items-center justify-center shadow-inner">
          <Image
            src="/mascot.png"
            alt="ROBO-CHIPTECH MASCOT"
            width={100}
            height={100}
            className={`object-contain transition-transform duration-300 ${
              status === "analyzing"
                ? "animate-bounce"
                : "animate-float hover:scale-105"
            }`}
            priority
          />
        </div>
      </div>

      <div className="relative flex-1 bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4 shadow-md">
        {/* Speech Bubble Arrow */}
        <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-indigo-500/30"></div>
        
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          <span className="text-xs font-semibold text-indigo-300 tracking-wider uppercase font-mono">
            RoastBot 🤖 Status: {status.toUpperCase()}
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          {getSpeechBubble()}
        </p>
      </div>
    </div>
  );
}
