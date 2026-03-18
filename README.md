# emm-nextjs

A Next.js app that serves as a personal AI assistant backend, primarily driven by a Telegram bot.

## Overview

A Telegram bot that connects to an AI agent (via [Upstash Box](https://upstash.com/)), allowing you to chat with the bot for general tasks and set up time-based reminders/heartbeat jobs.

Use `/heartbeat` command to schedule a task. The AI agent will only send you a message if something needs your attention, otherwise it stays silent.

### Key Components

| File | Role |
|---|---|
| `lib/agent.ts` | Core logic: `handleMessage` (respond to user) and `handleHeartbeat` (scheduled check) |
| `lib/bot-grammy.ts` | Telegram bot using grammY — receives messages and forwards them to the `/api/message` endpoint |
| `lib/box.ts` | Upstash Box client — provides the AI agent + file storage |
| `app/api/webhooks/telegram/route.ts` | Telegram webhook endpoint (POST) |
| `app/api/message/route.ts` | Internal API that runs the agent against a user's message |
| `app/api/heartbeat/route.ts` | Cron endpoint — triggered regularly |

### How It Works

1. Telegram sends a message → webhook → `bot-grammy.ts` → calls `/api/message`
2. `/api/message` → `handleMessage()` → runs the AI agent → sends reply back via Telegram
3. `/heartbeat` command saves your chat ID + a scheduled task to `HEARTBEAT.md` (in the agent's file workspace)
4. A Vercel cron runs `/api/heartbeat` regularly — the agent reads `HEARTBEAT.md` and sends a message only if something needs attention

> The cron schedule can be updated in `vercel.json`.

> **Dev vs Prod**: In development, the bot uses long-polling (`bot.start()`); in production, it uses the Telegram webhook.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `UPSTASH_BOX_API_KEY` | API key from your Upstash Box dashboard |
| `UPSTASH_BOX_ID` | Box ID from your Upstash Box dashboard |

---

## Local Development

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

