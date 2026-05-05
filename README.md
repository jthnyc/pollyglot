# PollyGlot 🦜

A multilingual translation app with audio playback, supporting 18 languages (including fantasy languages) and 6 tones. Built with React, TypeScript, and Express, powered by the OpenAI API.

**Live**: https://pollyglot-6clm.onrender.com/

## Features

- **18 languages**: 14 real-world (French, Spanish, Japanese, German, Italian, Mandarin, Tagalog, Korean, Portuguese, Greek, Hungarian, Russian, Arabic, Hindi) + 4 fantasy (Klingon, Esperanto, Quenya/Elvish, High Valyrian)
- **6 tones**: Formal, Friendly, Slang, Romantic, Humorous, Empathetic
- **Audio playback**: Hear translations in the target language via OpenAI TTS
- **iPhone-style picker**: Scrollable selection with emerald (real) and purple (fantasy) gradient highlights
- **Compact one-screen design**: Fits on a single viewport, no page scrolling

## Tech Stack

**Frontend**: React 19, TypeScript, Webpack, CSS, React Context API
**Backend**: Node.js, Express, OpenAI SDK
**Models**: `gpt-4o-mini` for translation, `tts-1` for audio

## Local Development

```bash
git clone https://github.com/jthnyc/pollyglot.git
cd pollyglot
npm install

# Create .env
echo "OPENAI_API_KEY=sk-your-key" > .env
echo "OPENAI_API_MODEL=gpt-4o-mini" >> .env

npm run dev
```

App runs at http://localhost:3000.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Run production server |

## OpenAI Project Configuration

The app uses three OpenAI models:

- `gpt-4o-mini` — text translation (chat completions)
- `tts-1` — text-to-speech audio generation
- `whisper-1` — voice input transcription (currently unused on frontend)

If you fork this repo, you'll need to ensure your OpenAI **project** (not just org) has access to the audio models. By default, new projects may have audio models disabled. Check at:

`Platform → Settings → Projects → [Your Project] → Limits`

Audio models do **not** require Tier 2 — they only require project-level enablement.

### Recommended: Set a project budget

Public-facing apps can be abused. Set a monthly spend cap at the project level (~$10/month is plenty for a portfolio app) to protect against runaway usage.

## Deployment (Render.com)

- **Build command**: `npm run build`
- **Start command**: `node completions.mjs`
- **Auto-deploy**: On push to `main`

Set these env vars in the Render dashboard:

- `OPENAI_API_KEY`
- `OPENAI_API_MODEL` (e.g., `gpt-4o-mini`)

## Project Structure

```
src/
├── components/Translator/    # Main UI components
│   ├── Translator.tsx
│   ├── TextArea/
│   ├── InputOptions/         # iPhone-style picker
│   └── Button/
├── hooks/                    # useTranslation, useAudioAndTranscript
├── context/                  # App + Translation context
├── constants.ts              # Language/tone/voice mappings
├── types.ts                  # Shared types
└── assets/                   # Flag images + parrot logo
completions.mjs               # Express backend
```

## Adding a Language

1. Add flag image to `src/assets/`
2. Import in `src/assets/index.ts`
3. Add to `languageMap` and `languageToAbbr` in `src/constants.ts`
4. Add to `isFlagAbbreviation` in `src/utils/utils.ts`
5. Add voice mapping in `getVoiceForLanguage` in `completions.mjs`

## Adding a Tone

1. Add to `toneMap` in `src/constants.ts`
2. Add to `ToneAbbreviation` type
3. The backend prompt accepts any tone string, no backend change needed

## Design System

**Real language selection**: emerald → mint gradient (`#50C878 → #98FB98`)
**Fantasy language selection**: purple → pink gradient (`#9B59B6 → #E991CC`)
**Fantasy divider**: ✦ ～･ﾟ✧ Of Myths and Legends ✧ﾟ･～ ✦
