# RoastBot 🤖 — Snarky MBTI Personality Roaster

A stateless, full-stack web app where a snarky-but-sweet AI robot chats users through 5 quick questions, figures out their MBTI type, and delivers a witty roast + a genuinely kind description — using fun, tech-themed type names (e.g. "Debugger," "Hacker," "Vibe Coder").

Pixel-art / neobrutalist UI. A robot widget/mascot reacts to the conversation stage.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | **Next.js (React) + Tailwind CSS** | One deployable app, fast to build, easy to style neobrutalist/pixel components |
| Backend | **Next.js API Routes (Node)** | Acts as a thin, stateless proxy to the Claude API — keeps the API key server-side |
| AI | **Claude API** (`@anthropic-ai/sdk`) | Drives the conversation, classifies MBTI, writes the roast + description |
| State | **In-memory (React state) only** | No DB — the whole session lives in the browser tab; nothing persists after refresh |
| Deployment | Vercel (or any Node host) | Zero-config fit for Next.js |

No database, no auth, no user accounts — this is intentionally disposable/stateless per your call.

---

## 2. High-Level Architecture

```
┌─────────────────────────────┐
│        BROWSER (Client)      │
│                               │
│  React state = conversation   │
│  history: [{role, content}]   │
│                               │
│  ┌─────────────────────────┐ │
│  │ ChatWindow               │ │
│  │ RobotWidget (mascot)     │ │
│  │ QuestionCard / Input     │ │
│  │ ResultCard (roast+desc)  │ │
│  └─────────────────────────┘ │
└───────────────┬───────────────┘
                │ POST /api/chat
                │ { messages: [...] }
                ▼
┌─────────────────────────────┐
│   NEXT.JS API ROUTE (Server) │
│   /api/chat                  │
│                               │
│  1. Attach system prompt     │
│     (persona + MBTI logic +  │
│      tech-name map)          │
│  2. Call Claude API with     │
│     full message history     │
│  3. Return Claude's reply    │
│     (+ structured result     │
│      JSON when the flow ends)│
└───────────────┬───────────────┘
                │
                ▼
        ┌───────────────┐
        │  Claude API    │
        └───────────────┘
```

**Key idea:** the backend is a dumb, stateless relay. The *entire* conversation history is sent from the client on every turn (like any stateless chat API pattern) — the server never stores anything. This keeps the app simple, matches the "no DB" decision, and means refreshing the page = starting over, by design.

---

## 3. Conversation Flow (State Machine)

Managed client-side as a simple `stage` enum, driving which UI shows and what's sent to Claude:

```
GREETING → ASK_NAME → Q1 → Q2 → Q3 → Q4 → Q5 → ANALYZING → REVEAL → FOLLOW_UP (optional)
```

- **GREETING** — robot intro, warm + funny, explains what's about to happen
- **ASK_NAME** — collects name, stored in local React state
- **Q1–Q5** — one MCQ per turn, each mapped to an MBTI axis (E/I, S/N, T/F, J/P — one question does double duty or a 5th is a tiebreaker/clarifier)
- **ANALYZING** — brief "robot thinking" animation while the classification call resolves
- **REVEAL** — roast (2–3 sentences) + sweet paragraph + tech-themed type name, pulled from Claude's structured JSON response
- **FOLLOW_UP** — optional freeform chat about their type

The system prompt (server-side, not exposed to client) contains:
1. The full snarky-but-kind persona + tone guardrails
2. The 5 fixed questions and their MBTI-axis mapping
3. The static **16-type → tech-name map** (see below) so naming is consistent, not re-invented per request
4. Instructions to output a final structured JSON block once all 5 answers are collected, e.g.:
```json
{
  "mbti": "INFP",
  "techName": "The Vibe Coder",
  "roast": "...",
  "description": "..."
}
```
Frontend parses this JSON to render the `ResultCard`; everything before that is just displayed as chat bubbles.

---

## 4. Project Structure

```
roastbot/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── .env.local.example          # ANTHROPIC_API_KEY=
│
├── public/
│   └── robot/                  # pixel-art robot sprite frames
│       ├── idle.png
│       ├── thinking.png
│       ├── roast.png
│       └── sweet.png
│
├── src/
│   ├── pages/                  # (or app/ if using App Router)
│   │   ├── index.tsx           # main chat page
│   │   └── api/
│   │       └── chat.ts         # stateless API route → calls Claude
│   │
│   ├── components/
│   │   ├── ChatWindow.tsx      # message list + scroll
│   │   ├── ChatBubble.tsx      # single message, neobrutalist card style
│   │   ├── RobotWidget.tsx     # animated mascot, reacts to `stage`
│   │   ├── OptionButtons.tsx   # MCQ answer buttons (pixel-style)
│   │   ├── ResultCard.tsx      # final roast + description + type badge
│   │   └── TypingIndicator.tsx
│   │
│   ├── lib/
│   │   ├── anthropic.ts        # Claude client wrapper
│   │   ├── systemPrompt.ts     # persona + questions + tone rules
│   │   └── typeMap.ts          # static 16-MBTI → tech-name + tagline map
│   │
│   ├── hooks/
│   │   └── useConversation.ts  # manages stage, messages[], sends to /api/chat
│   │
│   ├── styles/
│   │   └── globals.css         # neobrutalist/pixel design tokens
│   │
│   └── types/
│       └── index.ts            # Message, Stage, ResultPayload types
│
└── tests/
    └── typeMap.test.ts         # sanity check all 16 types are mapped
```

---


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

