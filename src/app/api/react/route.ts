import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const FILLERS = [
  "Hmm... noted.",
  "Bold choice, let's see how this goes.",
  "Fascinating... adding that to your roast file.",
  "Interesting decision.",
  "I'm judging quietly.",
  "Oh boy... we'll come back to that.",
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      const fallback = FILLERS[Math.floor(Math.random() * FILLERS.length)];
      return NextResponse.json({ reaction: fallback });
    }

    const { name, question, selectedOption } = await req.json();
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are RoastBot 🤖, a witty, sassy mascot for ChipTech. Generate a single, short, witty per-answer reaction (MAX 8 WORDS) reacting to the user's choice. Be dry, sarcastic, or amused. Do NOT use quotes or punctuation like quotes.",
        },
        {
          role: "user",
          content: `User Name: ${name}\nQuestion: ${question}\nChosen Answer: ${selectedOption}\nGive a super short 1-sentence reaction (under 8 words).`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 25,
      temperature: 0.8,
    });

    const reaction =
      completion.choices[0]?.message?.content?.trim() ||
      FILLERS[Math.floor(Math.random() * FILLERS.length)];

    return NextResponse.json({ reaction });
  } catch (error) {
    console.error("React API error:", error);
    const fallback = FILLERS[Math.floor(Math.random() * FILLERS.length)];
    return NextResponse.json({ reaction: fallback });
  }
}
