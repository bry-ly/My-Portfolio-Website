# My Portfolio Website

A modern, responsive developer portfolio built with **Next.js 15 (App Router)**. The site is designed to showcase featured projects pulled from **live GitHub data**, highlight recent GitHub activity, and provide a **rate-limited contact form** that sends email notifications.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development Commands](#development-commands)
- [Environment Variables](#environment-variables)
- [Features Deep Dive](#features-deep-dive)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Project Overview

This repository contains a personal portfolio website built as a single-page experience with section-based navigation. Content such as featured projects and contribution graphs are powered by GitHub APIs, while the contact form is backed by a Next.js API route that sends emails via Resend.

## Tech Stack

Core

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**

Styling & UI

- **Tailwind CSS 4**
- **shadcn/ui** component patterns
- **Radix UI** primitives
- **Geist** font
- **Sonner** (toast notifications)
- **lucide-react** (icons)
- **next-themes** (theme management)

Forms & Validation

- **react-hook-form** (form state management)
- **zod** (schema validation)

Animation & Visualization

- **motion** (animations)
- Contribution graph UI (components under `components/github-contribution` and `components/kibo-ui`)

Email

- **Resend SDK** (`resend`)
- **react-email** templates (`@react-email/components`)

Integrations

- **GitHub REST API** (repos + public events)
- Third-party GitHub contributions endpoint (see `lib/github.ts`)

## Key Features

- **Dynamic portfolio landing page with GitHub-powered content**
- **Featured/recent projects** pulled from live GitHub repository metadata
- **Live activity feed** that polls the latest GitHub push event
- **Uptime indicator** widget
- **Infinite tech slider** (animated marquee)
- **Sticky section navigation** with active-section highlighting and theme toggling
- **Rate-limited contact form** with auto-response + owner notification emails
- **Responsive design** (mobile-first)

## Project Structure

High-level layout (some folders omitted for brevity):

```txt
.
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Server page: fetches GitHub data and renders HomePage
│   └── api/
│       ├── send/route.ts       # POST /api/send (contact form -> Resend)
│       └── activity/route.ts   # GET /api/activity (live GitHub activity)
├── components/
│   ├── home-page.tsx           # Main client UI composition
│   ├── comp/                   # Feature modules (live activity, uptime, icons, theme provider)
│   ├── email-template/         # React Email templates
│   ├── github-contribution/    # Contribution graph (server wrapper)
│   ├── kibo-ui/                # Contribution-graph UI primitives
│   └── ui/                     # shadcn/ui components
├── hooks/                      # Custom hooks (e.g. responsive helpers)
├── lib/
│   ├── github.ts               # GitHub repos + contributions data fetching
│   ├── live-activity.ts        # GitHub public events fetcher
│   ├── rate-limit.ts           # In-memory rate limiter + response headers
│   └── utils.ts                # Utility helpers (cn, etc.)
├── public/                     # Static assets
└── styles/                     # Additional global styles
```

## Installation & Setup

### Prerequisites

- **Node.js 20+** recommended (minimum: Node 18.18+ for Next.js 15)
- npm, pnpm, or yarn (examples below use npm)

### Install

```bash
git clone <your-fork-or-repo-url>
cd My-Portfolio-Website
npm install
```

### Configure environment

Copy the example env file and fill in values:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) for details.

### Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Development Commands

```bash
npm run dev     # Start dev server (turbopack)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run Next.js ESLint
```

## Environment Variables

Create a `.env.local` file in the project root.

### Required (for full functionality)

```bash
# Resend (required to send emails via the contact form)
RESEND_API_KEY=your_resend_api_key

# Where notifications should be delivered (owner email)
EMAIL_RECIPIENT=you@example.com
```

### Recommended

```bash
# GitHub token increases rate limits for GitHub API requests used by the activity endpoint
# Create one at https://github.com/settings/tokens (no scopes required for public data)
GITHUB_TOKEN=ghp_...
```

### Optional

```bash
# Overrides the GitHub username used by the live activity endpoint
# Note: repository/contribution fetching uses config/site.ts by default.
GITHUB_USERNAME=bry-ly

# Customize contact sender identity
EMAIL_SENDER_NAME="Your Name"
EMAIL_SENDER_ADDRESS="onboarding@resend.dev"
```

### Rate limiting

Rate limiting is currently configured in code:

- `app/api/send/route.ts`: **5 requests/hour** per IP
- `app/api/activity/route.ts`: **30 requests/minute** per IP

If you need different limits, update the `rateLimit()` config in those route handlers.

## Features Deep Dive

### 1) GitHub integration (projects + contributions)

- `app/page.tsx` fetches data server-side and passes it into the main UI.
- `lib/github.ts` fetches repositories from the GitHub REST API and filters/sorts them.
- GitHub contributions are fetched via a dedicated contributions endpoint and cached with `unstable_cache`.

Key entry points:

- `lib/github.ts`: `getRecentProjects()`, `getFeaturedProjects()`, `getGitHubContributions()`

### 2) Live activity polling + uptime indicator

- The UI polls `GET /api/activity` once per minute.
- The API route uses `lib/live-activity.ts` to query GitHub public events and extract the latest `PushEvent`.
- `components/comp/uptime-timer.tsx` displays time since a fixed launch date.

Example (client-side fetch):

```ts
const res = await fetch("/api/activity", { cache: "no-store" });
const body = await res.json();
console.log(body.data.github);
```

### 3) Contact form flow (Resend)

- The contact form POSTs JSON to `POST /api/send`.
- The API route:
  1. Applies IP-based rate limiting (`lib/rate-limit.ts`)
  2. Sends an auto-response email to the sender
  3. Sends a notification email to the site owner (`EMAIL_RECIPIENT`)

Example payload:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "Hello! I’d like to work together."
}
```

### 4) Rate limiting

This project uses a lightweight **in-memory** rate limiter in `lib/rate-limit.ts`.

Notes:

- Limits reset when the server process restarts.
- On serverless platforms, each instance may have its own in-memory store.
- For strict/global limits, replace the store with a shared backend (e.g. Redis).

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import into Vercel.
3. Add environment variables (at minimum: `RESEND_API_KEY`, `EMAIL_RECIPIENT`, and optionally `GITHUB_TOKEN`).
4. Deploy.

### Self-hosted (Node.js)

```bash
npm install
npm run build
npm run start
```

Ensure all required environment variables are set in your hosting environment.

## Contributing

Contributions are welcome.

- Fork the repository
- Create a feature branch: `git checkout -b feat/my-change`
- Make your changes with a clear, focused scope
- Open a pull request with a description of what changed and why

If you’re changing UI behavior, include before/after screenshots or a short screen recording when possible.
