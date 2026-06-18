# Getting started — building Xcelerator from a Chromebook

A plain, step-by-step setup guide for building Xcelerator using only a browser (no local install). Written for the Chromebook + browser workflow. Follow it in order. Don't worry if some terms are unfamiliar — each step says what to do, and Claude Code itself can walk you through the fiddly parts when you ask.

> Confidence note: Claude Code on the web is a fast-moving research-preview feature. The overall path here (GitHub → Claude Code on the web → Vercel preview → Supabase) is sound, but confirm exact screens and options against the live products as you go, since wording and steps may have changed.

---

## The big picture (read this first)

Four things work together. Understanding the roles makes everything else make sense:

1. **GitHub** — where your project lives online. Your files and all the code sit here. This is "home base."
2. **Claude Code on the web** (claude.ai/code) — the builder. It runs in Anthropic's cloud (not on your Chromebook), reads your repo, writes the code, and sends changes back to GitHub. Requires a Pro, Max, or Team plan.
3. **Vercel** — the previewer. It takes the code from GitHub and turns it into a live, clickable website you can open in a browser tab. This is how you actually *see and use* Xcelerator.
4. **Supabase** — the database (already set up and cleansed). The app pulls questions and saves progress here.

The loop, once running: you give Claude Code a task → it writes code into GitHub → Vercel rebuilds the live site → you open the URL and see the change. Seeing the *code* and seeing the *running app* are two different things (see Step 6).

---

## Step 1 — Put the project on GitHub

1. In your GitHub browser, create a new repository. Name it something like `xcelerator`. Make it private.
2. Add the handoff files in this structure:
   - `CLAUDE.md` at the top level (root) of the repo.
   - A folder named `docs/` containing: `product-brief.md`, `design-system.md`, `screen-inventory.md`, `data-model.md`, and all your screenshot images.
3. You can upload files directly through the GitHub website ("Add file" → "Upload files") — no local tools needed. Create the `docs/` folder by typing `docs/` before the filename when uploading, or by uploading into a folder.

That's the whole project for now: instructions and design, no code yet. Claude Code writes the code in the next steps.

---

## Step 2 — Connect Claude Code on the web

1. Go to claude.ai/code and sign in with the same account as your Claude plan.
2. Connect your GitHub account and authorise access to the `xcelerator` repository.
3. Claude Code can now read everything in the repo, including CLAUDE.md and the docs, automatically at the start of every session.

---

## Step 3 — First task: scaffold the project

Give Claude Code this as its first task (paste it in):

> Read CLAUDE.md and everything in docs/. This is a Next.js + Supabase + Tailwind web app. Scaffold the Next.js project with TypeScript and Tailwind. Encode the design tokens from docs/design-system.md into the Tailwind config (colours, spacing, radius, typography). Set up the Supabase client in src/lib/supabase/. Do not build any screens yet — just the project skeleton, the design tokens, and the data layer wiring. Commit in small, clearly-described steps.

Let it work, and approve steps as it asks. When it finishes, your GitHub repo will contain a real (empty-shelled) Next.js app.

---

## Step 4 — Connect Supabase

The database already exists and is cleansed (project "Xcelerator SaaS"). The app needs two values to talk to it: the project URL and the public (anon) key, from your Supabase project's API settings.

- These go in as **environment variables** (a secure way to store keys — never paste them directly into code or commit them).
- Ask Claude Code: "I need to connect Supabase. Tell me exactly which environment variables you need and where I set them for this setup, then wait." Follow what it says. On the web/cloud setup, keys are set in the environment/settings area rather than a local file.
- There is also an official Supabase connector for Claude Code that lets it read your schema directly — ask Claude Code whether to use it and how.

Never commit keys to GitHub. If asked to choose, the anon/public key is the one the app uses; keep any service/secret key private.

---

## Step 5 — Build, in the right order

Per CLAUDE.md's build sequencing, instruct Claude Code in this order. Do them as separate tasks, not one giant request:

1. "Build the shared UI components from docs/design-system.md — the named components (pattern stepper, metric card, pattern hero card, mark badge, topic priority bar, etc.). Use the design tokens. No hardcoded colours."
2. "Build the Dashboard screen from docs/screen-inventory.md, wired to the data layer. Match the screenshot in docs/."
3. Then each screen in turn: Learn, Worked examples, Exam questions, Pattern secured, Mark pathway, Mocks, Progress, Profile.

Refer it to the matching screenshot each time. Remember: the nine templates render all topics and patterns from data — no per-topic screens.

---

## Step 6 — See the running app (Vercel)

Seeing the code in GitHub is not the same as seeing the working app. To view and click the real Xcelerator:

1. Create a free Vercel account in your browser. Connect it to your GitHub account.
2. Import the `xcelerator` repository. Vercel detects Next.js automatically.
3. Add the same Supabase environment variables in Vercel's project settings (so the live site can reach the database).
4. Vercel gives you a live URL. Open it in a browser tab — that's Xcelerator, running.
5. From now on, every time Claude Code pushes code to GitHub, Vercel rebuilds automatically and the URL updates. Refresh to see the latest.

This is your "view the app" answer: the live Vercel URL, in a normal browser tab, on your Chromebook.

---

## Step 7 — Working rhythm (keeps things safe and on-track)

- **Small tasks, small commits.** One screen or one component per task. Easier to review, easier to undo.
- **Let it commit often** with clear messages — the commit history is your reliable record of where things are, better than any written summary.
- **Auto memory** is built in: Claude Code remembers learnings across sessions itself. If you correct the same thing twice, say "remember that" so it sticks. You do not need to build a separate lessons file to start.
- **Where you left off:** a new session reads CLAUDE.md, the docs, and recent commits — so it picks up context automatically. You don't need a manual handover doc.
- **Confirm before big changes.** CLAUDE.md already tells it to ask before new dependencies, new routes, or schema changes. Hold it to that.

---

## What only you can do (not Claude Code)

- Populate the **answer and structured mark data** for the 646 questions (from your offline spreadsheet / team authoring). The app builds and runs without it — questions fall back to image self-assessment — but this content is what makes the marking fully live. This is the real critical path to the finished product.
- Author the **pattern-level Learn content** (explanation, exam-wording callout, common mistake) per pattern.
- Assemble the **mocks** by selecting real + verified-written questions.

---

## If you get stuck

The single most useful habit: ask Claude Code to explain and guide you. For example — "I'm on a Chromebook using the web version. Walk me through connecting Supabase step by step, and wait for me after each step." It is good at being the guide through its own setup. The first session is the fiddliest; it gets much smoother after.
