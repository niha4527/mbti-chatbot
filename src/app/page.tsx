"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { RobotMascot } from "@/components/RobotMascot";
import { NameStep } from "@/components/NameStep";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultCard, ResultData } from "@/components/ResultCard";
import { QUESTIONS, ARCHETYPES } from "@/lib/archetypes";
import { calculateMBTI } from "@/lib/mbti";

type Stage = "ASK_NAME" | "QUESTION" | "ANALYZING" | "RESULT";

export default function Home() {
  const [stage, setStage] = useState<Stage>("ASK_NAME");
  const [userName, setUserName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [traits, setTraits] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>(
    []
  );

  const [calculatedMbti, setCalculatedMbti] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [rawStreamText, setRawStreamText] = useState("");
  const [result, setResult] = useState<ResultData | null>(null);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setStage("QUESTION");
  };

  const handleSelectOption = async (option: {
    value: string;
    trait: string;
    text: string;
  }) => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    const newTraits = [...traits, option.trait];
    const newAnswers = [
      ...answers,
      { question: currentQ.text, answer: option.text },
    ];

    setTraits(newTraits);
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStage("ANALYZING");
      const mbtiCode = calculateMBTI(newTraits);
      setCalculatedMbti(mbtiCode);
      await fetchRoastResult(userName, mbtiCode, newAnswers);
    }
  };

  const fetchRoastResult = async (
    name: string,
    mbti: string,
    userAnswers: { question: string; answer: string }[]
  ) => {
    setIsStreaming(true);
    setRawStreamText("");
    setResult(null);

    const archetype = ARCHETYPES[mbti] || {
      techName: "The Mastermind",
      tagline: "One step ahead of the rest.",
      characteristics: ["Strategic", "Creative", "Independent", "Direct"],
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mbti,
          answers: userAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server response error: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No response body received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setRawStreamText(accumulated);
      }

      let cleanJson = accumulated.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();
      }

      try {
        const parsed = JSON.parse(cleanJson) as ResultData;
        setResult({
          title: parsed.title || archetype.techName,
          mbti: parsed.mbti || mbti,
          description: parsed.description || accumulated,
          characteristics: parsed.characteristics || archetype.characteristics,
        });
      } catch (parseErr) {
        console.warn("JSON parse fallback:", parseErr);
        setResult({
          title: archetype.techName,
          mbti,
          description: accumulated || `${name}, you are an absolute chaotic enigma! You plan 10 things at once and overthink every detail, but honestly, your witty charm makes everyone love having you around.`,
          characteristics: archetype.characteristics,
        });
      }

      setStage("RESULT");
    } catch (err: any) {
      console.error("Fetch roast error:", err);
      setResult({
        title: archetype.techName,
        mbti,
        description: `${name}, you're an absolute chaotic genius who overthinks everything and refuses to admit when you're wrong! But beneath all that sassy banter, you're genuinely one of the most reliable people in the room.`,
        characteristics: archetype.characteristics,
      });
      setStage("RESULT");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleRestart = () => {
    setStage("ASK_NAME");
    setUserName("");
    setCurrentQuestionIndex(0);
    setTraits([]);
    setAnswers([]);
    setCalculatedMbti("");
    setResult(null);
    setRawStreamText("");
  };

  const getRobotStatus = () => {
    switch (stage) {
      case "ASK_NAME":
        return "asking_name";
      case "QUESTION":
        return "question";
      case "ANALYZING":
        return "analyzing";
      case "RESULT":
        return "result";
      default:
        return "idle";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-start space-y-6">
        <RobotMascot
          status={getRobotStatus()}
          userName={userName}
          questionNumber={currentQuestionIndex + 1}
        />

        {stage === "ASK_NAME" && <NameStep onSubmit={handleNameSubmit} />}

        {stage === "QUESTION" && (
          <QuestionCard
            question={QUESTIONS[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            onSelectOption={handleSelectOption}
          />
        )}

        {(stage === "ANALYZING" || stage === "RESULT") && (
          <ResultCard
            userName={userName}
            mbti={calculatedMbti}
            result={result}
            isStreaming={isStreaming}
            rawStreamText={rawStreamText}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="w-full border-t border-indigo-500/20 py-4 text-center text-xs text-indigo-300/60 font-mono">
        RoastBot 🤖 Powered by Next.js & Groq API • Sassy Assessment Engine
      </footer>
    </div>
  );
}
