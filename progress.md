# RoastBot - Progress Tracker

## Status Overview

### ✅ Phase 1 — Core Functionality
- [x] Question Engine: Random 5-question pool via `getRandomQuestions()` — fresh set every run
- [x] MBTI Calculation: `calculateMBTI()` logic from 5 trait answers
- [x] AI Integration: Final roast generation via Groq API (`llama-3.3-70b-versatile`) → `/api/chat`
- [x] Live Per-Answer AI Reactions: Fast sarcastic one-liners via `/api/react` (non-blocking)
- [x] 16 MBTI Archetypes with sassy names, taglines, and characteristics in `archetypes.ts`
- [x] Unified result format: 2 roasts + 1 sweet statement + leading characteristics (● bullet circles)

### ✅ Phase 2 — Brand Redesign (ChipTech Identity)
- [x] Palette: Light Blue (`#7eb6e8`) + Deep Navy (`#141c33`) duotone — purple/indigo removed
- [x] Typography: Silkscreen pixel font for headers + Inter for body via `next/font`
- [x] Bracket-corner frame (`bracket-frame`) applied to all cards and speech bubble
- [x] Circuit-trace dot-grid background pattern (`circuit-bg`)
- [x] Circuit Node Progress Indicator: Connected node path (Node 1 → 5) replacing plain progress bar
- [x] Glitch reveal animation on result card (`glitch-reveal`)

### ✅ Phase 3 — Persistent Mascot Companion
- [x] Robot mascot moved to persistent left column — visible on ALL screens (name, question, result)
- [x] Idle bobbing animation (`mascot-idle`) — gentle float loop, no glow
- [x] Speech bubble with bracket-frame styling, reactive to each AI one-liner
- [x] Mascot shows "Processing your choice..." filler while AI reaction fetches
- [x] Mascot status label updates per stage (ASKING_NAME, QUESTION, ANALYZING, RESULT)
- [x] 600ms deliberate beat after answer selection so user sees reaction before advancing

### ✅ Phase 4 — UI Cleanup & Polish
- [x] Removed SVG circuit trace line transition (was visually distracting)
- [x] Removed green streaming tile during AI generation — clean "Calculating..." state instead
- [x] Removed GROQ AI ACTIVE badge from top-right header
- [x] Removed all box-shadow glows for a flatter, cleaner aesthetic
- [x] Smooth fade + slide transition between questions (500ms `transition-all ease-in-out`)
- [x] Mascot floats freely — no square frame or background box around it
- [x] Mascot size increased to `320×320px` (user-editable in `RobotMascot.tsx` ~line 36)
- [x] Name input `autoComplete="off"` — browser no longer suggests previously typed names

### ✅ Phase 5 — Light / Dark Mode Toggle
- [x] CSS variable system: All colors reference `var(--bg)`, `var(--accent)`, `var(--text)`, etc.
- [x] Dark mode (default): Deep navy bg + light blue accent
- [x] Light mode: **Periwinkle blue bg** (`#94c5f0`) + **navy blue accent** (`#141c33`)
- [x] Toggle button added to top-right of Header (☀️ / 🌙 icons)
- [x] Theme applied via `.light-mode` class on `<html>` — instant switch, no flicker
- [x] All components fully themed: Header, NameStep, QuestionCard, ResultCard, RobotMascot, Footer

### ✅ Phase 6 — Final Type Safety
- [x] Fixed TS error: `option.text` → `option.label` to match `archetypes.ts` type definition
- [x] `npx tsc --noEmit` passes with 0 errors ✅

---

## File Reference

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Main layout, state machine, light mode toggle logic |
| `src/app/globals.css` | CSS variables (dark/light), circuit-bg, bracket-frame, animations |
| `src/app/layout.tsx` | Silkscreen + Inter fonts via `next/font` |
| `src/app/api/chat/route.ts` | Final MBTI roast generation (streaming) |
| `src/app/api/react/route.ts` | Per-answer mascot reaction (fast, non-blocking) |
| `src/lib/archetypes.ts` | 16 MBTI archetypes + question pools + `getRandomQuestions()` |
| `src/lib/prompt.ts` | System prompt generator for Groq |
| `src/lib/mbti.ts` | `calculateMBTI()` trait counting logic |
| `src/components/Header.tsx` | Branding + light/dark mode toggle button |
| `src/components/RobotMascot.tsx` | Floating mascot + speech bubble (resize: `w-64 md:w-80` ~line 36) |
| `src/components/NameStep.tsx` | Name entry form (autoComplete off) |
| `src/components/QuestionCard.tsx` | 5-option question + circuit node progress bar |
| `src/components/ResultCard.tsx` | MBTI result with title, description, characteristics |

---

## Current Status
✅ **Fully functional & type-safe.** Dev server running at **http://localhost:3000**.
All ChipTech brand redesign goals implemented and verified.
