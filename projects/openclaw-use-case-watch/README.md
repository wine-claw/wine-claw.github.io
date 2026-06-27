# OpenClaw Use Case Watch

## Purpose
Track strong real-world OpenClaw use cases found on the internet, keep a durable summary of the best examples, and keep adding new examples via a nightly 1:00 AM Adelaide-time scan.

## What this project should produce
- A curated summary of notable OpenClaw use cases people are actually running
- A durable log of newly found examples over time
- A short "use case of the brief" item that can be included in each 12-hour brief, prioritising newer findings first

## Initial summary (started 2026-03-24)
Current best buckets from the first scan:

1. **Morning brief / personal ops hub**
   - People are using OpenClaw to generate daily briefings combining weather, calendar, tasks, unread email, health stats, and reminders.
   - Sources: OpenClaw showcase; Forward Future guide.

2. **Remote coding from phone / chat**
   - Strong repeated pattern: building features, fixing deployments, opening PRs, and shipping websites from Telegram/WhatsApp/voice without opening a laptop.
   - Sources: OpenClaw showcase; Forward Future guide.

3. **Multi-agent business team**
   - Several examples describe specialised agents for strategy, dev, marketing, and business, coordinated through one chat surface with shared memory and scheduled work.
   - Sources: OpenClaw showcase; Forward Future guide.

4. **Voice / phone assistant workflows**
   - People are using OpenClaw through phone calls or SMS for hands-free assistance, event confirmation calls, and call-style notifications.
   - Sources: public showcase/case-study style sources only going forward.

5. **Inbox / calendar / CRM automation**
   - Common practical use case: reading email, summarising inboxes, creating todos, syncing contacts, handling scheduling conflicts, and sending concise updates.
   - Sources: OpenClaw showcase; Forward Future guide.

6. **Home / infra automation**
   - Real examples include homelab SSH control, self-healing home server workflows, smart-home integrations, and always-on infrastructure monitoring.
   - Sources: OpenClaw showcase; Forward Future guide.

7. **Content and research pipelines**
   - Users are building content/research loops, briefs, and idea pipelines around OpenClaw.
   - Sources: OpenClaw showcase; Forward Future guide.

## Current best candidate examples to surface in briefs
- Build app features and ship fixes remotely from phone/chat
- Multi-agent specialised team run from one messaging surface
- Morning briefing that merges email/calendar/weather/tasks
- AI voice calls for guest confirmation or notifications
- Self-healing home server / homelab operator

## Source notes
Preferred source types:
- public showcase pages
- blog posts / newsletters / case-study writeups
- forum/social posts describing real usage
- interviews, demos, and production writeups

Do not use GitHub repos/lists as the primary evidence for the "best uses" summary or brief picks. GitHub can still be used as a discovery aid to find better public sources.

Current core sources:
- https://openclaw.ai/showcase
- https://forwardfuture.ai/p/what-people-are-actually-doing-with-openclaw-25-use-cases

## Nightly process
1. Search for newly published or newly surfaced OpenClaw use cases, showcases, demos, blog posts, forum/social posts, and guides.
2. Do **not** treat GitHub repos/lists as the main source for "best uses".
3. Prefer concrete real-world examples over generic SEO fluff.
4. Update `latest-summary.md` with what is new and what should be prioritised next.
5. Append important discoveries to `history.md`.
6. Keep `brief-picks.json` ordered with the freshest/highest-signal examples first.
7. Update `state.json` so Mission Control reflects the current status.

## Brief integration rule
Each 12-hour brief should include one concise OpenClaw use case other people are using, prioritising newer findings first. If nothing genuinely new was found recently, use the best still-unsent/high-signal example from `brief-picks.json` rather than inventing novelty.
