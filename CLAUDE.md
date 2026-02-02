# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run preview      # Preview production build
```

## Architecture Overview

This is a React + TypeScript team game night application built with Vite. It uses Google's Gemini AI to dynamically generate game prompts. Deployed to GitHub Pages.

### API Configuration

The app uses browser-based API configuration (no `.env` files needed):
- On first load, `SetupModal` prompts for Gemini API key and model selection
- Config stored in `localStorage` under key `gemini-api-config`
- Users can skip setup to use offline mode with fallback prompts from `constants.tsx`
- API settings can be updated anytime via Admin > API Settings tab

### Core Data Flow

- `App.tsx` is the entry point and manages global state via `useState`, persisted to `localStorage`
- On first load, shows `SetupModal` if API not yet configured
- On mount (after setup), auto-refreshes all built-in game prompts via Gemini AI if API key is configured
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
- `services/geminiService.ts` - Gemini API integration with structured JSON schema output; reads config from localStorage
- `components/Layout.tsx` - Shared navigation header and footer
- `components/SetupModal.tsx` - First-load API configuration modal; exports `getApiConfig`, `saveApiConfig`, `clearApiConfig`

### Deployment

- Deployed to GitHub Pages via `.github/workflows/deploy.yml`
- Base path configured in `vite.config.ts` as `/team-game-night-hub/`
- Auto-deploys on push to `main` branch
- Live URL: https://bjblayney.github.io/team-game-night-hub/

### Styling

Uses Tailwind CSS classes directly in components. No separate CSS files.

### Free Tier Gemini Models

Recommended models for free tier users:
- `gemini-2.5-flash` - Best balance (default)
- `gemini-2.5-flash-lite` - Fastest, 1000 requests/day
- `gemini-2.5-pro` - Best quality, lower limits
