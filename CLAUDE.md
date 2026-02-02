# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run preview      # Preview production build
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` for AI-generated game prompts. The key is accessed via `process.env.API_KEY` in the Gemini service.

## Architecture Overview

This is a React + TypeScript team game night application built with Vite. It uses Google's Gemini AI to dynamically generate game prompts.

### Core Data Flow

- `App.tsx` is the entry point and manages global state via `useState`, persisted to `localStorage`
- On mount, the app auto-refreshes all built-in game prompts via Gemini AI
- State flows down through props to pages; updates flow up via `onUpdate` callback to Admin

### Routing Structure (HashRouter)

- `/` - Home page with game selection grid
- `/game/:id` - Individual game play interface
- `/external` - Directory of external game links
- `/admin` - Settings page for managing games

### Type System (`types.ts`)

- `GameType` enum: TRIVIA, WOULD_YOU_RATHER, ICEBREAKER, THIS_OR_THAT, POLL
- `BuiltInGame`: Internal games with prompts array
- `ExternalGame`: Links to third-party games
- `AppData`: Root state shape containing both game types

### Key Files

- `constants.tsx` - Initial game data and prompt content (fallback when AI unavailable)
- `services/geminiService.ts` - Gemini API integration with structured JSON schema output
- `components/Layout.tsx` - Shared navigation header and footer

### Styling

Uses Tailwind CSS classes directly in components. No separate CSS files.
