"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { RobotMascot } from "@/components/RobotMascot";
import { NameStep } from "@/components/NameStep";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultCard, ResultData } from "@/components/ResultCard";
import { getRandomQuestions, ARCHETYPES, Question } from "@/lib/archetypes";
import { calculateMBTI } from "@/lib/mbti";

type Stage = "ASK_NAME" | "QUESTION" | "ANALYZING" | "RESULT";

export default function Home() {
  const [stage, setStage] = useState<Stage>("ASK_NAME");
  const [userName, setUserName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [traits, setTraits] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>(
    []
  );

  const [calculatedMbti, setCalculatedMbti] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [rawStreamText, setRawStreamText] = useState("");
  const [result, setResult] = useState<ResultData | null>(null);

  // Transition & Live AI reaction states
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aiReaction, setAiReaction] = useState<string>("");
  const [isReactionLoading, setIsReactionLoading] = useState(false);

  // Theme State
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Smooth fade transition
  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100); // 100ms fade in start
    }, 400); // 400ms fade out wait
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    if (questions.length === 0) {
      setQuestions(getRandomQuestions());
    }
    triggerTransition(() => {
      setStage("QUESTION");
    });
  };

  const fetchPerAnswerReaction = async (
    qText: string,
    optionText: string,
    name: string
  ) => {
    setIsReactionLoading(true);
    try {
      const res = await fetch("/api/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          question: qText,
          selectedOption: optionText,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reaction) {
          setAiReaction(data.reaction);
        }
      }
    } catch (err) {
      console.warn("Reaction API fetch warning:", err);
    } finally {
      setIsReactionLoading(false);
    }
  };

  const handleSelectOption = (option: {
    value: string;
    trait: string;
    label: string;
  }) => {
    const currentQ = questions[currentQuestionIndex];
    const newTraits = [...traits, option.trait];
    const newAnswers = [
      ...answers,
      { question: currentQ.text, answer: option.label },
    ];

    setTraits(newTraits);
    setAnswers(newAnswers);

    // 1. Fire non-blocking AI reaction fetch immediately
    fetchPerAnswerReaction(currentQ.text, option.label, userName);

    // 2. Pause for a brief beat (600ms) so the user sees the "Processing..." filler state
    // before advancing the card. (Does NOT block on the network, just a UX pacing beat).
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        triggerTransition(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        });
      } else {
        triggerTransition(async () => {
          setStage("ANALYZING");
          const mbtiCode = calculateMBTI(newTraits);
          setCalculatedMbti(mbtiCode);
          await fetchRoastResult(userName, mbtiCode, newAnswers);
        });
      }
    }, 600);
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
    setQuestions(getRandomQuestions());
    setStage("ASK_NAME");
    setUserName("");
    setCurrentQuestionIndex(0);
    setTraits([]);
    setAnswers([]);
    setCalculatedMbti("");
    setResult(null);
    setRawStreamText("");
    setAiReaction("");
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
    <div className="h-screen max-h-screen flex flex-col justify-between overflow-hidden circuit-bg text-[var(--text)] font-sans relative">
      <Header 
        isLightMode={isLightMode} 
        onToggleLightMode={() => setIsLightMode(!isLightMode)} 
      />

      {/* Main 2-Column Grid Layout */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-2 overflow-hidden max-w-7xl mx-auto w-full">
        
        {/* Left Column: Persistent Mascot Companion & Reactive AI Speech Bubble */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <RobotMascot
            status={getRobotStatus()}
            userName={userName}
            questionNumber={currentQuestionIndex + 1}
            aiReaction={aiReaction}
            isReactionLoading={isReactionLoading}
          />
        </div>

        {/* Right Column: Assessment Screen Components */}
        <div
          className={`w-full md:w-2/3 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {stage === "ASK_NAME" && <NameStep onSubmit={handleNameSubmit} />}

          {stage === "QUESTION" && questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onSelectOption={handleSelectOption}
            />
          )}

          {/* Simple Calculating State */}
          {stage === "ANALYZING" && (
            <div className="flex flex-col items-center justify-center space-y-4 text-[var(--accent)]">
              <span className="w-8 h-8 rounded-full bg-[var(--cyan)]"></span>
              <p className="font-pixel text-xl uppercase tracking-wider">
                Calculating...
              </p>
            </div>
          )}

          {stage === "RESULT" && (
            <ResultCard
              userName={userName}
              mbti={calculatedMbti}
              result={result}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      <footer className="w-full border-t border-[var(--border)] py-2.5 text-center text-xs font-pixel text-[var(--accent)] shrink-0">
        CHIPTECH • RV UNIVERSITY • WHERE IDEAS GET WIRED
      </footer>
    </div>
  );
}
