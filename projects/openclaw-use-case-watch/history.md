# OpenClaw Use-Case Watch — History

## 2026-06-28 01:00 ACDT

**Six genuinely new brief-ready OpenClaw use cases added since June 26.**

Searches across web, X, GitHub, DEV.to, Medium, Substack, Hugging Face, company blogs and PR wires found multiple first-person operational stories and one enterprise press release not previously queued.

- **Added:** [I Built a 10-Agent AI Company That Runs My Food Truck](https://dev.to/bkashji/open-claw-that-runs-food-truck--1fa3) — dev.to (June 27, 2026). A solo founder runs Urban Steam & Spices, a real food truck in Fremont, CA, plus Sanvith-OS: 19 OpenClaw agents and 52 cron jobs covering CEO/CTO/CFO/CMO/CRO/engineer/EA/intel roles, posting output to Discord. Agents pull Square P&L, generate TikTok content, monitor competitors and local events, and consolidate memory nightly. ⭐ Strongest signal — concrete solo-business operational stack.
- **Added:** [How Eximus Started Adopting OpenClaw](https://www.eximus-software.com/en/resources/how-eximus-started-adopting-openclaw) — eximus-software.com (June 27, 2026). Enterprise software firm describes provisioning an isolated Azure VM behind a reverse proxy/VPN, wiring OpenClaw into Microsoft Teams via Azure AD and a bridge, and using the agent to help debug its own proxy and integration issues. ⭐ Strong signal — enterprise adoption with security-first deployment.
- **Added:** [How do you give an AI agent a password without losing your mind (or your secrets)?](https://derivai.substack.com/p/how-do-you-give-an-ai-agent-a-password) — derivai.substack.com (June 27, 2026). A global fintech running OpenClaw agents across Security, Finance, Compliance, HR, Engineering and Anti-Fraud details its secrets architecture: credentials in 1Password, biometric TouchID approval for every retrieval, and tmux sessions that keep secrets only in memory during a workflow. ⭐ Strong signal — production secret management at scale.
- **Added:** [We got local models to triage the OpenClaw repo for FREE](https://huggingface.co/blog/local-models-pr-triage) — huggingface.co (June 27, 2026). Hugging Face engineers use an NVIDIA DGX Spark / GB10 with local Gemma and Qwen models plus a restricted `reposhell` to classify incoming OpenClaw issues and PRs in real time and route maintainer-relevant items to Discord without burning hosted API quota. ⭐ Strong signal — open-source maintenance automation on local hardware.
- **Added:** [OpenClaw in Production: When the Most Advanced Memory System Meets the Quietest Failure](https://zhuoqidev.com/en/posts/openclaw-pitfalls/) — zhuoqidev.com (June 27, 2026). A three-week production run surfaces concrete pitfalls: auto-compaction silently swallowed a generated reply when context exceeded the model limit; startup failures from gateway token, keyRef and provider-prefix mismatches; and the fact that runtime logs live in journald rather than files. ⭐ Strong signal — detailed operational failure analysis.
- **Added:** [YY Group launches OpenClaw agentic AI across hotel clients and internal operations](https://digiconasia.net/pr-newswire/yy-group-nasdaq-yygh-launches-openclaw-agentic-ai-across-hotel-clients-and-internal-operations) — digiconasia.net / PRNewswire (June 26, 2026). YY Group (NASDAQ: YYGH) announced initial production rollout across three Southeast Asian hotel clients via its YY Circle platform and WhatsApp/Telegram, with chat-based shift creation and automated worker outreach live. ⭐ Strong signal — public-market company production deployment.

### Skipped (already queued or lower signal)
- Mansi More’s autonomous content engine Pinch (already exists in brief-picks.json).
- Nefe Tech hosted OpenClaw launch (service announcement, lower operational signal than direct use cases).
- OpenClaw security-advisory and skill-marketplace-malware coverage (newsworthy but not a concrete use case).
- Curated 7-companies listicle, OpenClaw 2026.6.10/6.11 release notes, and multiple HN discussion threads (already covered or lower signal).

### Stats
- brief-picks.json: 90 entries (6 new, 84 carried forward / pruned by cap)
- Next brief lead: food-truck multi-agent company (Sanvith-OS)


## 2026-06-26 01:00 ACDT

**Three genuinely new brief-ready OpenClaw use cases added since June 25.**

Searches again hit rate limits, so scanning relied on targeted site searches, direct page fetches, and de-duplication against the existing queue. Most results were already queued; the three additions are first-person operational stories.

- **Added:** [How I Rebuilt My AI Agent Team After the Lobster Lobotomy](https://www.littlemight.com/openclaw-paperclip-setup/) — littlemight.com (June 24, 2026). Cathryn Lavery runs OpenClaw as Little Might's operating layer; after Anthropic access was cut off overnight, she routed OpenClaw agents through Paperclip adapters to keep Opus/Sonnet, preserved memory with QMD + g-brain, and kept iMessage, Slack, GitHub, Sentry, Shopify, Klaviyo, Codex, Tailscale, and 1Password wired together. ⭐ Strongest signal — real post-incident production recovery.
- **Added:** [OpenClaw as a personal AI content manager (full breakdown)](https://www.indiehackers.com/post/setting-up-openclaw-as-a-personal-ai-content-manager-full-breakdown-19276e58d9) — Indie Hackers (June 24, 2026). Founder documents a Telegram content agent with three config files, Docker, Kimi K2.5, and ClawHub skills for posting/humanizing/de-ai-ifying/copywriting across 13+ platforms. ⭐ Strong signal — reproducible operational walkthrough.
- **Added:** [I replaced an $800/month web scraping API with 200 lines of Python (OpenClaw crawler)](https://blog.stackademic.com/i-replaced-an-800-month-web-scraping-api-with-200-lines-of-python-and-named-it-openclaw-8f34fa6b7fd6) — Medium / Stackademic (June 16, 2026). Fintech team replaced a $6,200/year crawling API quote with an open-source Python crawler processing 800,000 pages/month for ~$90. ⭐ Strong signal — concrete cost-replacement story.

### Skipped (already queued or lower signal)
- AucoBot open-source UI (already exists in brief-picks.json under github.com/aucobot/aucobot).
- Mario Hayashi personal-assistant setup story (first-use walkthrough, not sustained deployment).
- Curated 50+ skills list, OpenClaw Studio control-tower wiring guide, Gmail outreach failure story, Hi Agent product launch, and enterprise MCP connector architecture essay (lower signal or conceptual).

### Stats
- brief-picks.json: 93 entries (3 new, 90 carried forward)
- Next brief lead: Little Might / Lobster Lobotomy recovery
- No user-facing message sent (notable but not urgent).

---

## 2026-06-25 01:00 ACDT

**Four genuinely new brief-ready OpenClaw use cases added since June 23.**

Scanning relied on direct page fetches, targeted web searches (still partially rate-limited), and the existing candidate backlog. Indie Hackers and company blogs produced the strongest first-person stories this run.

- **Added:** [ClawList — AI butler built an OpenClaw tools directory autonomously](https://clawlist.dev) — Indie Hackers / clawlist.dev (June 24, 2026). David Szabo-Stuban’s OpenClaw agent Alfred identified 155+ verified indie tools across 30 categories using an X-first discovery strategy, filtered 45 false positives, and launched a live directory with nightly Temporal updates. ⭐ Strongest signal — agent-built product.
- **Added:** [Storyie runs seven cron jobs as a resident OpenClaw dev workflow](https://storyie.com/blog/openclaw-ai-agent-dev-workflow) — Storyie blog (June 2026). Repository-resident Claude-backed agent runs auto-implementation, planning, PR review fixing, article generation, stats tracking, Reddit scouting, and git sync. ⭐ Strong signal — concrete resident-agent workflow.
- **Added:** [OpenClaw runs a solo founder’s business admin from WhatsApp with 79 tools](https://www.indiehackers.com/post/i-gave-openclaw-79-business-tools-it-runs-my-admin-now-35eb420bb5) — Indie Hackers (June 24, 2026). Contracts, invoices, payments, time tracking, reminders, and browser automation via WhatsApp after two years and four rebuilds. ⭐ Strong signal — solo-founder operating system.
- **Added:** [Clawr.ing gives OpenClaw agents real outbound phone calls](https://www.indiehackers.com/post/i-built-a-phone-calling-skill-for-openclaw-923a9e3ba0) — Indie Hackers (June 24, 2026). Phone-calling skill with hold music and voice answers for morning briefings and alerts. ⭐ Strong signal — new interrupt channel.

### Removed for curation

- **Meet EnterpriseClaw: Claw-Style Agents for Business** (substack, June 14). Vendor product launch by Automation Anywhere; not a deployed end-user use case. Removed to keep the queue capped and high-signal.

### Notable but not queued

- **ClawPane** — cost router born from a $250 token day (Indie Hackers, June 2026). Honest cost war story, but product-focused rather than deployed use case.
- **StartClaw** — managed OpenClaw hosting (Indie Hackers, June 2026). Hosting-service pitch, lower signal than operational examples.
- **DEV.to VPS drafts** (iamstevedavis, June 2026). Concrete walkthrough, more tutorial than sustained deployment.
- **TheToolNerd Mission Control** (Substack, June 2026). 7-agent blog ops, honest about reliability limits; surfaced previously.
- **lo-victoria second brain Part 4** (June 2026). Tutorial/series on RAG and Buffer scheduling.
- **50+ skills for founders** and **personal AI content manager breakdown** (Indie Hackers, June 2026). Curations and setup guides; similar to already-queued entries.
- **DukanBot** (April 2026) and **supply-chain simulation** (May 2026). Stale relative to current window.

### Search notes

- Direct fetches confirmed content and dates for clawlist.dev, the Indie Hackers posts, and storyie.com.
- Web search produced additional Medium/Substack/X leads; most were instructional, stale, or OpenClaw-adjacent rather than concrete use cases.
- GitHub, HN Algolia, and DEV.to APIs returned no fresh high-signal OpenClaw-specific items in the window.

Queue: **90 items** (4 new + 1 removed + 85 carried forward).

---

## 2026-06-24 01:00 ACDT

**One genuinely new brief-ready item added since June 22; a quiet night for dramatic real-world deployments.**

Web search was rate-limited (Ollama 429 weekly limit). Scanning relied on HN Algolia API (`search_by_date` for "openclaw" since June 22 15:30 UTC), DEV.to API (`tag=openclaw`, latest), X/Twitter via x_search, and direct page fetches. HN produced three new "openclaw" stories; one was brief-ready, one was security research, and one was a competing product. DEV.to had no new articles since June 21. X/Twitter surfaced several leads but none met the concreteness bar.

- **Added:** [Agent minimalism: what shipping OpenClaw in production taught us](https://autoclaw.sh/blog/agent-minimalism/) — Hacker News / autoclaw.sh (June 22, 16:33 UTC). AutoClaw, an OpenClaw deployment consultancy, measured a 650× token overhead (~20,000 tokens for a trivial "hello" vs 30 tokens via plain API) from OpenClaw's injected context. They walked away from OpenClaw for two production cases — an SRE agent on Cloudflare Workers and data-discovery chatbots — replacing them with deterministic pipelines plus one tight LLM call. Includes a decision rule for when to reach for an agent framework vs plain code, and an open-source deployment playbook. ⭐ Strong signal — concrete measured data, honest critique from a deployment practitioner.

### Notable but not queued

- **ClawHub scope squatting — 23 plugins under official scopes** (Manifold Security, June 22, 19:16 UTC). Security research identifying 23 code-executing ClawHub plugins published by unaffiliated accounts under `@openclaw/` and `@clawhub/` scopes. ClawHub added a dispute process after private report on June 17. Important supply-chain security context, but not a deployed use case.
- **Cerver — "infra for AI sessions"** (HN Show HN, June 23). Session infrastructure API inspired by OpenClaw; competing/alternative product, not an OpenClaw use case.
- **MaltBot on Mac Mini** (X / @NikChainAi, June 23). Third-person viral tweet claiming $3–5K/month from OpenClaw. No first-person writeup, repo, or concrete details. Too low-signal.
- **tiny.place — agent marketplace on Solana** (X / @polydao, June 23). Multi-agent marketplace with 150+ agents. Mentions OpenClaw as one of many supported frameworks. Not OpenClaw-specific.
- **WorkClaw — "OpenClaw for teams"** (X / @willruben, June 19). Product launch announcement, early access. No deployment metrics yet.
- **Fleet management of OpenClaw gateways via Headscale** (X / @LightDriver21, June 21). One tweet, no detailed writeup.

### Search notes

- HN Algolia `search_by_date` for "openclaw" since 2026-06-22 15:30 UTC: 3 stories (Cerver, ClawHub scope squatting, AutoClaw agent minimalism).
- DEV.to API `tag=openclaw`, `per_page=30&latest=true`: no new articles since June 21.
- X/Twitter via x_search returned several leads; none met concreteness bar for queuing.
- Direct fetches confirmed autoclaw.sh, manifold.security, cerver.ai, and X post content.

Queue: **87 items** (1 new + 86 carried forward).

---

## 2026-06-23 01:00 ACDT

**Two genuinely new OpenClaw-specific items added since June 21; no new high-signal real-world deployment found.**

Web search was rate-limited (Ollama 429), so scanning relied on HN Algolia API (`search_by_date` for "openclaw" since June 21 15:30 UTC), DEV.to API (`tag=openclaw`), and GitHub fetches. HN produced only two new "openclaw" stories in the window; one was a substance-free Show HN with no URL or code, the other an agent-native planning MCP server that is not OpenClaw-specific. The two usable finds came from DEV.to.

- **Added:** [AucoBot — no-code web UI wrapper for self-hosted OpenClaw agents](https://github.com/aucobot/aucobot) — DEV Community / mankhb2k (June 21, 2026). Open-source, self-hosted platform that wraps a point-and-click web UI around the OpenClaw gateway. `docker compose up -d` spins up dashboard, API, Postgres, and OpenClaw; chat in browser, toggle provider keys, edit agent personality, and link Telegram/Discord/Google Drive/Calendar without editing `openclaw.json`. ⭐ Stronger signal — concrete open-source repo directly attacking the documented CLI onboarding friction.

- **Added:** [Native Apple Mail plugin lets OpenClaw read local macOS Mail directly](https://clawhub.ai/plugins/@jehadurre/openclaw-apple-mail) — DEV Community / jehadurre / ClawHub (June 22, 2026). Published plugin reads from the local Apple Mail database on a Mac, avoiding the iCloud-to-Gmail forwarding workaround. Requires macOS Automation + full-disk access for the Mail directory. Moderate signal — narrow but real published plugin for a common macOS OpenClaw friction.

### Notable but not queued

- **OpenPlan – "Waze for AI Agents" (HN, June 22)** — MCP server for planning/checkpointing/reviewing software projects. Agent-native, not OpenClaw-specific.
- **Spookling – "iPhone AI Agent for WhatsApp and Calendar" (HN Show HN, June 22)** — One-sentence idea post with no URL, repo, or deployment details. Too low-signal.
- **chiefmojo79 safety-pack posts (June 20–21)** — Short pitch for a $49 defensive-patterns pack, not a documented use case.
- **Setup/checklist/tutorial posts** — ma_xiao basic config, andremmfaria prompt-injection markdown, mrclaw207 production checklist, Victoria Lo second-brain part 4, extinctsion personal AI engineer writing-challenge entry — instructional or narrative.
- **OpenClaw v2026.6.9 stable and v2026.6.10-beta.1** — release notes, not use cases.

### Search notes

- HN Algolia `search_by_date` for "openclaw" since 2026-06-21 15:30 UTC: 2 stories.
- DEV.to API `tag=openclaw`, `top=7`: ~20 posts; most were tutorials, checklists, or thin product pitches.
- X/Twitter via x_search returned 429 capacity error; no usable X finds this run.
- GitHub fetches confirmed `github.com/aucobot/aucobot` and ClawHub plugin pages.

Queue: **86 items** (2 new + 84 carried forward).

---

## 2026-06-22 01:00 ACDT

**Four genuinely new high-signal OpenClaw ecosystem entries added since June 20.**

- **Added:** [credence-pi — Bayesian model routing, waste blocking, and injection detection for OpenClaw](https://gfrm.in/posts/openclaw-cheaper-measure-it-yourself/) — Hacker News / gfrm.in (June 19, 2026). An OpenClaw plugin + local daemon that holds one Bayesian belief about your agent, learned from your own approvals and refusals. Routes each tool call to the cheapest sufficient model (trying cheap first, escalating only when payoff covers it), blocks exact-repeat tool calls (precision 1.0, ~0.7% of all calls), and surfaces prompt-injected actions for confirmation (0.82–0.97 precision). Includes shadow mode for auditing before enforcing. Real benchmarks on 17 Terminal-Bench tasks. ⭐ Strongest signal — novel approach with measured results, honest about limitations.

- **Added:** [OpenEmployee — deny-by-default governance for OpenClaw agents](https://github.com/sammysltd/OpenEmployee) — Hacker News / GitHub / sammysltd (June 18, 2026). An OpenClaw plugin wrapping agents in MakerChecker governance: granted skills only, recipient/value allowlists, per-call and windowed budgets, human approval gates, DLP payload guard, and tamper-evident signed audit logs. Three concrete demos: finance PA blocking a $1,500 IRS bill over budget, SDR blocking a poisoned lead redirect, and DLP catching an API key in an email body. ⭐ Strong signal — concrete governance with real attack-blocking demos.

- **Added:** [AgentLine — hosted phone number API for OpenClaw agents](https://agentline.cloud) — Hacker News (June 20, 2026). Gives OpenClaw agents a real phone number for outbound calls, SMS, and inbound voice conversations via a single skill file. Handles raw audio streams, real-time transcription, and JSON webhook delivery. Supports US + Canada. Moderate signal — commercial product launch, not a deployed use case with metrics.

- **Added:** [Outpost — capability-based credential proxy for AI agents](https://github.com/sausin/outpost) — Hacker News / GitHub / sausin (June 16, 2026). A reverse proxy giving agents capabilities instead of credentials: agents never see raw API keys. Enforces rate limits, path allow/deny lists, sensitive-write gates, source-IP allowlists. Deployable to Cloudflare Workers or Docker. Moderate signal — security infrastructure tool.

### Notable but not queued

- mrclaw207 OpenRouter fallback chain post (June 19) — related to already-queued Dream Protocol / self-repair entries.
- mrclaw207 self-improvement loop post (June 17) — related to Dream Protocol.
- mrclaw207 12 MCP servers guide (June 15) — instructional.
- rosgluk architecture + memory guides (June 16) — architecture, not use cases.
- Hermes "Migrate from OpenClaw" guide (June 18, 120 points on HN) — competitor migration, not a use case.
- Draft context-sync tool (June 18) — general agent tooling, not OpenClaw-specific.
- X posts on cloud admin and crypto miner monitoring (June 19) — brief tweets, not detailed walkthroughs.
- OpenClaw v2026.6.9 release (June 19) — release notes, not a use case.
- ClawStation managed hosting ad — service pitch, not a deployment.

### Search notes

- Web search was rate-limited (Ollama 429 weekly limit). Scanning done via direct fetches: HN Algolia API (search_by_date for "openclaw" since June 18), DEV.to API (tag=openclaw, top=7), X/Twitter via x_search, and GitHub page fetches.
- Four new entries found despite search limitation. HN Show HN posts were the richest source this run.

Queue: **84 items** (4 new + 80 carried forward).

---

## 2026-06-21 01:00 ACDT

**Three genuinely new high-signal use cases added since June 19.**

- **Added:** [OpenClaw Dream Protocol nightly memory consolidation](https://dev.to/mrclaw207/i-trained-my-openclaw-to-dream-heres-what-it-learned-overnight-2ed8) — DEV Community / mrclaw207 (June 19, 2026). Every night at 07:05 UTC an isolated OpenClaw session runs a REM-style memory cycle over ~700 recall entries, scoring recurrence, query uniqueness, and truth, and promotes only entries passing strict gates to long-term MEMORY.md; a typical run rejects ~737 entries and promotes 1. ⭐ Strong signal — reproducible pattern, extreme signal-to-noise discipline, and a clear mechanism for turning session logs into durable agent memory.

- **Added:** [OpenClaw self-repairing cron health monitor](https://dev.to/mrclaw207/my-openclaw-cron-broke-and-fixed-itself-before-i-noticed-3ibl) — DEV Community / mrclaw207 (June 18, 2026). An OpenClaw cron job monitors 18 other cron jobs; after an OpenClaw module rename broke the self-repair import path and the isolated runner began returning exit code 1, the agent fixed itself and sent a Telegram report before the owner noticed. ⭐ Strong signal — real unsupervised failure + recovery, with the fix documented (dynamic import check + thin `exit 0` launcher).

- **Added:** [Always-on OpenClaw with on-demand GPU inference via JarvisLabs wake proxy](https://huggingface.co/blog/chansung/openclaw-on-demand) — Hugging Face Blog / Park Chansung (June 18, 2026). Separates OpenClaw Gateway on a small CPU VM from vLLM on a GPU instance; a FastAPI wake proxy starts the GPU only for chat completions, pauses it after 15 minutes idle, and can also use JarvisLabs serverless deployments, keeping the assistant surface reachable while making GPU spend follow actual inference. ⭐ Strong signal — concrete architecture, open-source repo, and measured economics for self-hosted open-weight models.

### Notable but not queued

- Related mrclaw207 posts on nightly self-improvement loops, OpenRouter fallback chains, and production checklists — already captured by the two new mrclaw207 entries above.
- OpenClaw OpenShift deployment guide (stephan.michard.io) and AWS Cloud9 task manager (DEV.to) — useful but lower signal than the top three.
- Self-hosting cost-trap post and full-disk debugging post — operational tips, not use cases.
- Release notes, CVE, and managed-hosting listings — not deployed use cases.

Queue: **80 items** after removing the superseded older mrclaw247 setup post and adding the 3 new entries.

---

## 2026-06-15 01:13 ACDT

**Five genuinely new high-signal use cases added since June 14.**

- **Added:** [AI broke the top of our hiring funnel, so I automated the screening with OpenClaw](https://www.indiehackers.com/post/ai-broke-the-top-of-our-hiring-funnel-so-i-automated-the-screening-with-openclaw-ef64706f38) — Indie Hackers / Marko Anastasov, SuperPlane (June 14, 2026). SuperPlane's founder wired OpenClaw to a custom CLI over the Ashby ATS API. The agent screens product-engineer applicants, flags AI-generated resumes and fake LinkedIn profiles, and delivers a daily brief of immediate rejects and candidates worth a closer look, moving or rejecting candidates in Ashby with human confirmation. ⭐ Strong signal — concrete operational response to a real problem (AI spam in hiring funnels), named integrations, and honest about preserving the human parts of the process. Added as `recent`.

- **Added:** [I shipped "OpenClaw mobile" — full agent control from your phone, no more 11pm laptop runs](https://www.indiehackers.com/post/i-shipped-openclaw-mobile-full-agent-control-from-your-phone-no-more-11pm-laptop-runs-ad705e129b) — Indie Hackers / Aerostack (June 14, 2026). Aerostack is an iOS app + open-source MIT daemon that turns your phone into a live control plane for OpenClaw agents running on your laptop, home server, or VPS. It streams thinking, supports tool approvals, MCP/skills management, cron scheduling, usage analytics, push alerts, and multi-machine pairing. Designed local-first: the phone is a relay, prompts/transcripts are never written to the hosted DB. ⭐ Strong signal — shipped iOS app with open-source gateway, solves a clear daily friction, and honest about unshipped gaps (per-tool latency, CSV export). Added as `recent`.

- **Added:** [OpenClaw Steward Publishes Five-Minute Agent Loop for Automated Open-Source Repo Maintenance](https://newclawtimes.com/articles/openclaw-maintainer-orchestrator-steinberger-ai-agent-oss-triage/) — New Claw Times / Peter Steinberger (June 14, 2026). Steinberger, an OpenClaw steward, open-sourced `maintainer-orchestrator` and `github-project-triage` skills. The setup runs a five-minute loop across repositories where he is the majority commit author, classifies items as autonomous vs owner-required, delegates bounded work to parallel Codex threads, and surfaces mergeable PRs for human review. ⭐ Strong signal — public skill definitions, explicit trust boundaries, and a documented maintainer workflow from a prolific OSS maintainer. Added as `recent`.

- **Added:** [No Public IP. No Exceptions. How I Deployed OpenClaw on Azure the Right Way](https://medium.com/@vrajakishore/no-public-ip-no-exceptions-how-i-deployed-openclaw-on-azure-the-right-way-bb3b5cf6ef6f) — Medium / Vrajakishore M (June 14, 2026). `vraja-claw` deploys OpenClaw to an Azure Ubuntu VM with no public IP, no DNS, and no open app ports. Access is through Azure Bastion Standard scoped to the client's IP CIDR, plus a local `tunnel.sh` port forward. Offered as a private alternative to Microsoft's public-FQDN `openclaw-dev` Container Apps template. ⭐ Strong signal — reproducible Bicep/IaC, explicit security tradeoffs, and a real deployment pattern. Added as `recent`.

- **Added:** [I built a one-click installer for OpenClaw AI agent](https://dev.to/needsbuilder/i-built-a-one-click-installer-for-openclaw-ai-agent-9e7) — DEV Community / needsbuilder (June 14, 2026). EasyClaw is an Electron/React desktop app that automates the full OpenClaw setup (Node, WSL on Windows, dependencies, AI-provider config, Telegram bot pairing) into three clicks, with state persistence across Windows reboots and i18n for Korean, English, Japanese, and Chinese. ⭐ Strong signal — directly attacks the documented onboarding friction, open-source and MIT licensed. Added as `recent`.

### Notable but not queued

- **Microsoft Scout / OpenClaw on Windows at Build 2026:** High-signal enterprise deployment, but already broadly covered and not a fresh community showcase; kept out of the top queue in favor of newer community examples.
- **Existing queued items (PostClaw, SoloBid, Alfred, Pinch, etc.):** Remain brief-ready below the new entries.

Queue: **72 items** (25 `recent` + 47 `queued`).

---

## 2026-06-14 01:00 ACDT

**One genuinely new high-signal use case added since June 12.**

- **Added:** [I turned OpenClaw into a $39/mo social media manager in 2 days](https://www.indiehackers.com/post/i-turned-openclaw-into-a-39-mo-social-media-manager-in-2-days-first-product-i-actually-use-myself-4d48e24993) — Indie Hackers / Adrien (June 12, 2026). PostClaw is a private Telegram-bot social-media manager built on OpenClaw in 2 days by a solo founder who built it because he was genuinely annoyed by managing 5+ apps daily. The bot writes platform-specific content (LinkedIn professional, X punchy, Reddit conversational) and publishes to 13 platforms: X, LinkedIn, Threads, Reddit, Instagram, TikTok, YouTube, Pinterest, Bluesky, Facebook, Mastodon, Telegram, Discord. It runs as a private bot instance (no shared infrastructure), priced at $39/mo, and launched with 9 users on day one. The founder notes it's the first product he built that he actually uses himself. ⭐ Strong signal — concrete productized OpenClaw deployment, real launch metrics, and honest founder motivation. Added as `recent`.

### Notable but not queued

- **OpenClaw v2026.6.6 (June 12, 2026):** Security-hardening release with fail-closed exec approvals, tighter transcript/sandbox/channel boundaries. Not a use case.
- **Imperva / Varonis security research (DEV.to etairos summary, June 11, 2026):** Demonstrates OpenClaw agents executing hidden commands in contacts/vCards and leaking credentials via phishing emails. Important security context, not a deployed use case.
- **Storyie "How we run AI agents as permanent residents of our dev workflow with OpenClaw" —** 7 cron jobs for auto-implementation, PR review fixing, article generation, Reddit monitoring, git sync. Publication date still unconfirmed; likely predates current queue. Held for confirmation.
- **Sanchita Sunil — "I Gave OpenClaw a Voice and It Ordered Me Dinner" (June 3, 2026):** Voice agent architecture with Murf + Deepgram + Swiggy skill. Already older than current `recent` window; queued if not already present.
- **Maitrish — portfolio agent on Google Cloud VM:** Dated June 8 in search snippets; already within queue/recent range. Verify whether already captured.
- **Runware "We Hosted OpenClaw So You Don't Have To" (June 11, 2026):** Hosting service announcement, not a deployed end-user use case.
- **Henry Dan — "How to Set Up a Local AI Agent on Your Own Server":** SEO-monitoring setup via Telegram; publication date unconfirmed, possibly instructional.
- **CatchClaw agent marketplace, Hex "AI employee 24/7", KevinTen 47-day production journey, onirestart week-long build, trycatchclaw vibe-coded marketplace:** All DEV.to OpenClaw Writing Challenge submissions; mostly narrative/tutorial without concrete deployed metrics. Not queued.

Queue: **67 items** (20 `recent` + 47 `queued`).

---

## 2026-06-13 01:00 ACDT

**No genuinely new high-signal use cases added since June 12.**

- **Checked:** DEV.to, Medium, Substack, Hacker News, X/Twitter, Reddit, GitHub releases, SEN-X / OpenClaw Chronicles, community blogs.
- **Surfaced but not added:**
  - Storyie "How we run AI agents as permanent residents of our dev workflow with OpenClaw" — 7 cron jobs for auto-implementation, PR review fixing, article generation, Reddit monitoring, git sync. Interesting but publication date unconfirmed; may predate current queue. Held for confirmation.
  - MFS Corp "How I Automated My Entire Business with OpenClaw Multi-Agent Architecture" — 6-agent business on Proxmox + Docker, dated March 1, 2026. Stale.
  - Runware "We Hosted OpenClaw So You Don't Have To" — service/vendor announcement, not a deployed use case.
  - OpenClaw v2026.6.6-beta.2 (June 12) — release notes, security hardening. Not a use case.
  - Veris agent-simulation testing (June 8) — testing tooling coverage, not a deployed use case.
- **No new entries added.** Queue remains at **66 items** (19 `recent` + 47 `queued`).

---

## 2026-06-12 01:00 ACDT

**Two genuinely new high-signal use cases added since June 11.**

- **Added:** [How I Built an AI Employee to Run My SaaS Revenue (OpenClaw + Creem)](https://dev.to/vayo/how-i-built-an-ai-employee-to-run-my-saas-revenue-openclaw-creem-5d7d) — DEV.to / vayo (June 10–11, 2026). Alfred is an autonomous AI employee powered by OpenClaw that lives in Discord and watches a Creem SaaS store around the clock. Three core functions: (1) daily 8AM revenue digest — clean store health summary; (2) churn detection — autonomously creates win-back discount codes and drafts re-engagement emails; (3) failed-payment catching — instantly generates billing portal links and sends them for human investigation. Architecture: OpenClaw + LLM via OpenRouter (free advanced models for cost-zero operation, Claude/Gemini fallback for heavy tasks), a ClawHub-published Creem skill with official CLI and REST API access, an Express security relay that validates creem-signature HMACs and deduplicates webhook retries, and a heartbeat state tracker for anomaly detection. Open-sourced at github.com/vayospot/creem-agent with full template files (SOUL.md, IDENTITY.md, USER.md, HEARTBEAT.md, openclaw.json). Honest about OpenClaw's 100k–200k token-per-message context bloat (includes conversation history, skill files, memory, tool schemas) and rate-limit lessons (Gemini rate-limited in three prompts, Claude expensive, landed on OpenRouter free tier). ⭐ Strong signal — real deployed agent with concrete operational tasks, zero-cost model strategy, and open-sourced skill. Added as `recent`.

- **Added:** [I Let OpenClaw Build a Web App From Scratch - It Even Created the PayPal Plan](https://dev.to/juveni_jah_6ed48b472d2647/i-let-openclaw-build-a-web-app-from-scratch-it-even-created-the-paypal-plan-373n) — DEV.to / juveni_jah (June 10–11, 2026). SoloBid (voicereceipt.cc) is a voice-to-invoice SaaS for contractors built almost entirely by an OpenClaw agent with minimal human intervention. The builder set rules: provide the problem and high-level direction only, let OpenClaw handle all implementation decisions, intervene only for authentication/authorization, no hand-holding on tech choices, let it deploy to production. The agent chose the entire stack (React + Vite frontend, Cloudflare Workers + D1 + R2 backend, Google Speech-to-Text, pdf-lib for PDF generation, initially OpenAI GPT then switched itself to Gemini 2.5 Flash). It added features without being asked: smart dictionary learning user terminology, Google OAuth, business profile management, invoice history, PWA support, tax rate presets with location tracking. Week 3: the agent created a PayPal subscription plan via API ($15/month), set up webhook verification, configured all secrets, and deployed everything — the builder never touched the PayPal dashboard. It also handled SEO (meta tags, Open Graph, sitemap, robots.txt, Google Analytics, Ahrefs), debugged itself (fixed atob() Unicode JWT bug with TextDecoder), and optimized without prompting (lowered audio thresholds, removed language restrictions, added defensive parsing). Early week-1 results: 47 signups, 12 paid subscriptions ($180 MRR), 156 invoices generated, 0 critical bugs, 5.2s average processing time. ⭐ Strong signal — concrete product built by an agent with real week-1 revenue, real architectural autonomy, and honest accounting of the builder's actual role (idea + auth + approval + feedback only). Added as `recent`.

### Notable but not queued

- **xand3rrx / creem-openclaw-agent (June 10–11):** Open-source Creem webhook monitor project. Lighter than vayo's Alfred post — no sustained production metrics, honest failure modes, or operational cost accounting. Not queued.
- **BlueBirdBack / creem-worker:** Autonomous Creem store monitor on GitHub (1 star). Project, not a deployed system story with real outcomes. Not queued.
- **Tahir — Telegram bot + persistent memory tutorials (June 10–11):** Instructional content, not concrete production deployments. Not queued.
- **CodeWithYog — "4 days with OpenClaw" (June):** First impressions. Already deferred.
- **Eivind Kjosbakken — "How to Run OpenClaw with Open-Source Models" (June 10):** Instructional guide about running OpenClaw via Ollama after Anthropic banned Claude Code subscriptions for OpenClaw. Not a use case.
- **SEN-X / OpenClaw Chronicles (June 10–11):** v2026.6.5 stable release, JPMorgan long-running agent bet, NYT lobster-agent cover — news coverage, not deployed use cases.
- **GitHub release v2026.6.6-beta.1 (June 11):** Release notes.

Queue: **66 items** (19 `recent` + 47 `queued`).

---

## 2026-06-11 01:00 ACDT

**One genuinely new high-signal use case added since June 9.**

- **Added:** [Building an Autonomous AI Content Engine with OpenClaw](https://medium.com/@mansi.more943/building-an-autonomous-ai-content-engine-with-openclaw-36965971ee1f) — Medium / Mansi More (June 1, 2026). Pinch is an always-on content agent built on OpenClaw that monitors release feeds, identifies updates worth writing about, and drafts platform-specific content (X threads, LinkedIn posts, YouTube descriptions) in the author's voice via a SOUL.md personality contract. All drafts are delivered via Telegram for one-word human approval (approve, tweak, or skip) before any manual publishing. The builder conducted explicit prompt-injection adversarial testing before going live, feeding fake release notes with hidden injection payloads to verify the agent correctly flagged and stopped on manipulated input. Security architecture: fetched content goes into structured fields, flagged inputs stop execution, scanning layer has zero publishing permissions. Open-sourced on GitHub. ⭐ Strong signal — real deployment with adversarial safety testing, honest about permanent human approval as a design choice, not a temporary guardrail. Added as `recent`.

### Notable but not queued

- **huy_nguynhongnht_106 — "Running OpenClaw Was Easy. Keeping It Running Wasn't." (June 9):** DEV.to post promoting TryOpenClaw, a managed cloud platform for OpenClaw agents. Vendor/platform pitch, not a concrete deployed use case. Not queued.
- **yooiken / Towards AI — "Build a Zero-Cost Web Automation Pipeline" (June 9):** Tutorial using OpenRouter's free owl-alpha model, MediaUse site plugins, and OpenClaw to build a daily research-to-draft pipeline. Instructional, not a sustained production deployment with metrics. Not queued.
- **Vrajakishore M — Azure deployment guide (June 9):** Already deferred in prior run. Instructional architecture, not a production use case.
- **EveAIHK — Zero-employee HK business (June):** Already deferred in prior run. Early stage, no revenue.

Queue: **64 items** (17 `recent` + 47 `queued`).

---

## 2026-06-15 01:13 ACDT

**Five genuinely new high-signal use cases added since June 14.**

- **Added:** [We hit $2K MRR letting people deploy AI agents without touching a terminal](https://www.indiehackers.com/post/we-hit-2k-mrr-letting-people-deploy-ai-agents-without-touching-a-terminal-45cfa83e06) — Indie Hackers / Rapid Claw (June 14–15, 2026). Managed OpenClaw hosting platform that deploys agents in under 60 seconds. ~$2K MRR, 68 paying customers, 4% monthly churn, zero paid ads. Biggest use case is small agency owners automating client email, scheduling, and GitHub issues, not developers. HubSpot and Shopify integrations live. ⭐ Strong signal — real revenue, real customer count, honest operational numbers, and a concrete non-technical user base. Added as `recent`.

- **Added:** [I gave my OpenClaw its own SaaS studio. Here's what it's validating.](https://www.indiehackers.com/post/i-gave-my-openclaw-its-own-saas-studio-heres-what-it-s-validating-3d4e30ea67) — Indie Hackers / Lobster Labs (June 14–15, 2026). A founder gave OpenClaw access to the LaunchScore API and instructed it to research indie-hacker pain points, pick four ideas, create landing pages, and publish them. The agent created a studio called Lobster Labs and shipped four live pages: a SaaS churn predictor, ShipPage (GitHub repo to marketing page), LaunchKit (launch distribution), and CommitContent (git commits to build-in-public content). The experiment will track real visitor interest, signups, and conversion to score demand before product code is written. ⭐ Strong signal — concrete agent-led validation workflow with real URLs and a public metrics commitment. Added as `recent`.

- **Added:** [LVP taps OpenClaw, Claude in hybrid cloud AI play](https://www.itnews.com.au/news/lvp-taps-openclaw-claude-in-hybrid-cloud-ai-play-626309) — iTnews / LVP Head of Data & AI Ivan Wong (June 15, 2026). Australian sustainability-focused investment fund LVP ($1.6B AUM) rebuilt its AI workflow around an on-prem OpenClaw sandbox before moving to cloud. Agents automate research, surface past-deal context, and produce first-draft investment memos, financial models, presentation decks, and legal contracts. The orchestration layer is built in-house with a self-hosted MCP server, using Claude via API while keeping the stack model-agnostic. ⭐ Strong signal — enterprise financial deployment with hybrid-cloud governance, real operational tasks, and named decision-maker. Added as `recent`.

- **Added:** [Kaspersky Found 512 Bugs in OpenClaw. So I Built a Monitor to Catch AI Agents Misbehaving.](https://dev.to/id_1/kaspersky-found-512-bugs-in-openclaw-so-i-built-a-monitor-to-catch-ai-agents-misbehaving-30a9) — DEV.to / antropos17 (June 14–15, 2026). After Kaspersky found 512 vulnerabilities in OpenClaw, a Toronto CS student built Aegis, a user-space agent-activity monitor. It polls process trees, watches the filesystem via chokidar, and logs network activity, scoring live behavior against 68 detection rules. Includes a trust score per agent, hot-reloading rules, and 707 tests. MIT-licensed; explicitly a visibility camera, not a preventive lock. ⭐ Strong signal — concrete security tooling with real motivation, open-source repo, tests, and honest scope limits. Added as `recent`.

- **Added:** [Clawcall — inbound phone calls for your self-hosted agent](https://github.com/CODEANDTRUST/clawcall) — GitHub / CODEANDTRUST (June 14–15, 2026). Clawcall is a lightweight bridge that gives a self-hosted OpenClaw agent a real inbound phone number, routing voice calls into the agent instead of requiring Telegram, Discord, or WhatsApp. Pairs with OpenClaw's newer realtime voice instructions and call-steering hooks. ⭐ Strong signal — fills a real channel gap with an open-source bridge and a clear self-hosting use case. Added as `recent`.

### Notable but not queued

- **Indie Hackers — "I gave OpenClaw 79 business tools. It runs my admin now." (June 14–15, 2026):** Vague founder reflection; no URLs, stack details, or metrics. Not queued.
- **Indie Hackers — Hi Agent by Hirey (June 14–15, 2026):** Early people-intelligence add-on for OpenClaw; no production deployment evidence yet. Not queued.
- **Indie Hackers — "Setting up OpenClaw as a personal AI content manager" (June 14–15, 2026):** Detailed setup guide, but mostly a productized stack behind PostClaw. Not queued.
- **DEV.to — "The Production-Ready AI Agent Checklist" (June 15, 2026):** Useful meta checklist, not a concrete use case. Not queued.
- **Medium — "I Built a Memory System for Claude Code, Hermes, and OpenClaw" (June 8, 2026):** Horizontal memory tool, no deployed OpenClaw example. Not queued.
- **DEV.to — "Self-hosting OpenClaw: a money trap and two silent failures" (June 14–15, 2026):** Strong operational war story (OpenRouter routing traps, signal-cli ARM64 crash, auto-update breaking cron store), but not a new use case. Not queued.
- **prodSens — "How We Built Three MCP Servers to Make OpenClaw Actually Useful in Slack" (March 2026):** Productized SlackClaw service pitch; light on standalone production metrics. Not queued.
- **Storyie dev-workflow post (uncertain date):** Seven cron jobs for auto-implementation, PR review fixing, article generation, Reddit monitoring, git sync. Already surfaced in prior runs and held pending date confirmation. Still not confirmed as new; not added tonight.

Queue: **77 items** (30 `recent` + 47 `queued`).

---

## 2026-06-16 15:30 UTC / 2026-06-17 01:00 ACDT

**No genuinely new high-signal use cases added since June 15.**

- **Checked:** Indie Hackers, DEV Community, Medium, Reddit, Hacker News, GitHub releases, SEN-X / OpenClaw Chronicles, ClawHosters, Odaily/BestHub-style ecosystem revenue aggregators.
- **Surfaced but not added:**
  - OpenClaw v2026.6.8 pre-release — release notes (Telegram/WhatsApp delivery, GLM-5.2/Claude Haiku 4.5, gateway/agent recovery fixes). Not a use case.
  - Varonis/Bleeping Computer phishing research — already covered in the June 14–15 window; important security context but not a new deployed example.
  - Microsoft Scout / Build 2026 enterprise coverage — already broadly surfaced earlier in June; kept out of the top queue in favor of newer community examples.
  - Ecosystem revenue aggregator pages (TrustMRR/Odaily/BestHub/Clawsmith/ClawHosters) — listing content without per-project operational detail.
  - Various Indie Hackers and DEV.to setup/tutorial posts — instructional or light on production metrics.
- **No new entries added.** Queue remains at **77 items** (30 `recent` + 47 `queued`).

---

## 2026-06-17 15:39 UTC / 2026-06-18 01:09 ACDT

**No genuinely new high-signal use cases added since June 15.**

- **Checked:** Indie Hackers, DEV Community, Medium, Substack, Reddit, Hacker News, Product Hunt, LinkedIn, GitHub, and OpenClaw ecosystem news.
- **Surfaced but not added:**
  - **Storyie dev-workflow post** (https://storyie.com/blog/openclaw-ai-agent-dev-workflow) — Strong operational detail (seven cron jobs for auto-implementation, PR review fixes, article generation, Reddit monitoring, git sync), but publication date still unconfirmed and not verified as new since June 15. Held for confirmation.
  - **Hi Agent / Hirey early-access posts** — People-intelligence add-on for OpenClaw agents; no production deployment evidence yet.
  - **Ronik Dedhia Medium scraper post** — Likely a custom Python scraper named "OpenClaw," not the OpenClaw AI agent framework; excluded as name-collision noise.
  - **ECOSIRE AI customer-support case study** — Page returned no usable content; unverified.
  - **Tencent Cloud Clawdbot case study** — Vendor-hosted deployment tutorial, not an independent real-world use case.
  - OpenClaw v2026.6.8 release notes — release-channel/provider/recovery fixes, not a use case.
  - Varonis/Bleeping Computer phishing research — already covered in the June 14–15 window.
  - Microsoft Scout / Build 2026 enterprise coverage — already broadly surfaced earlier in June.
  - Ecosystem revenue aggregator pages — listing content without per-project operational detail.
  - Tutorial/setup posts on DEV.to and Indie Hackers — instructional or productized-service pitches without fresh production metrics.
- **No new entries added.** Queue remains at **77 items** (30 `recent` + 47 `queued`).

---

[Full history continues in prior versions of this file.]

---

## 2026-06-18 15:30 UTC / 2026-06-19 01:00 ACDT

**One genuinely new, high-signal OpenClaw use case added.**

- **Added:** [OpenClaw agent turned a neighborhood traffic complaint into a real government fix](https://x.com/mprado/status/2067012842688025078) — X / @mprado (June 16, 2026). A user asked an OpenClaw agent to fix a local traffic jam near their house; the agent worked almost autonomously, needing help only to send the final message to traffic authorities. About a month later, the government visited the site and addressed the problem. ⭐ Strong signal — rare software-to-real-world outcome with a clear autonomous workflow and an externally verifiable result. Added as `recent` and placed first in `brief-picks.json`.

### Notable but not queued

- **Indie Hackers — "I Tried to Automate Gmail Outreach with OpenClaw" (surfaced this week, exact date unverified):** Honest operational reflection on local-first Gmail outreach automation. In-progress, no concrete outcome or metrics yet. Not promoted.
- **Indie Hackers — "We automated our business vetting with OpenClaw" (Kelviq):** Already in queue.
- **DEV.to — "How to Give Your Self-Hosted AI Agent Inbound Phone Calls (OpenClaw + Twilio)":** Walkthrough of the already-queued Clawcall project.
- **Indie Hackers — "I run an OpenClaw hosting company. A/B'd vs Hermes as a coding harness — Hermes won":** Comparison/vendor pitch focused on Hermes; not a strong OpenClaw use case.
- **Storyie dev-workflow post:** Publication date still unconfirmed; held pending verification.
- **Hi Agent / Hirey early-access posts:** Launch-phase add-on, no production deployment metrics yet.
- **OpenClaw v2026.6.8 release notes:** Channel/provider/recovery fixes; not a use case.
- **Varonis / Bleeping Computer phishing research:** Already covered in the June 14–15 window.
- **Microsoft Scout / Build 2026:** Already broadly covered earlier in June.
- **Ecosystem revenue aggregators and listing pages:** Without per-project operational detail.
- **Tutorial/setup guides:** Instructional or productized-service pitches without fresh production metrics.

Queue: **78 items** (31 `recent` + 47 `queued`).
