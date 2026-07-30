import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { generatePrompt } from "@/lib/prompt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY environment variable is not configured." },
        { status: 500 }
      );
    }

    const { name, mbti, answers } = await req.json();

    if (!name || !mbti) {
      return NextResponse.json(
        { error: "Missing required fields: name, mbti" },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    const promptText = generatePrompt(name, mbti, answers || []);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You generate raw, clean JSON matching the requested schema without markdown quotes.",
        },
        {
          role: "user",
          content: promptText,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      stream: true,
      response_format: { type: "json_object" },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate MBTI roast." },
      { status: 500 }
    );
  }
}
