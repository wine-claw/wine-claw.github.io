# OpenClaw Use-Case Watch — Latest Summary

**Run:** Sunday, June 28, 2026, 01:00 ACDT (2026-06-27 15:30 UTC)

**Verdict:** Found six genuinely new, high-signal OpenClaw use cases since the June 26 run.

## New brief-ready examples (freshest first)

1. **I Built a 10-Agent AI Company That Runs My Food Truck**  
   A solo founder in Fremont, CA runs a real Indian street-food truck *and* a 19-agent OpenClaw "company" (Sanvith-OS) with 52 cron jobs. Agents cover CEO, CTO, CFO, CMO, CRO, engineer, EA and intel roles, posting real output to Discord. They pull Square P&L, generate TikTok ideas, monitor competitor pricing and local events, and consolidate memory nightly.  
   <https://dev.to/bkashji/open-claw-that-runs-food-truck--1fa3> · 2026-06-27

2. **How Eximus Started Adopting OpenClaw**  
   Enterprise software firm Eximus explains its first production steps: isolate an Azure VM behind a reverse proxy and VPN, integrate OpenClaw into Microsoft Teams via Azure AD and a bridge, and use the agent to help debug its own proxy/integration issues.  
   <https://www.eximus-software.com/en/resources/how-eximus-started-adopting-openclaw> · 2026-06-27

3. **How do you give an AI agent a password without losing your mind (or your secrets)?**  
   A global fintech running OpenClaw agents across Security, Finance, Compliance, HR, Engineering and Anti-Fraud describes its secrets architecture. Credentials live in 1Password; every retrieval requires a biometric TouchID approval via the desktop app, and a temporary tmux session keeps secrets only in memory during a workflow.  
   <https://derivai.substack.com/p/how-do-you-give-an-ai-agent-a-password> · 2026-06-27

4. **We got local models to triage the OpenClaw repo for FREE**  
   Hugging Face engineers use an NVIDIA DGX Spark / GB10 to run local Gemma and Qwen models plus a restricted `reposhell`, classifying incoming OpenClaw issues and PRs in real time and routing maintainer-relevant items to Discord without burning hosted API quota.  
   <https://huggingface.co/blog/local-models-pr-triage> · 2026-06-27

5. **OpenClaw in Production: When the Most Advanced Memory System Meets the Quietest Failure**  
   A three-week production run surfaces concrete pitfalls: auto-compaction silently swallowed a generated reply when context exceeded the model limit; `OPENCLAW_GATEWAY_TOKEN`, keyRef and provider-prefix mismatches caused startup failures; and runtime logs live in journald, not file logs.  
   <https://zhuoqidev.com/en/posts/openclaw-pitfalls/> · 2026-06-27

6. **YY Group launches OpenClaw agentic AI across hotel clients and internal operations**  
   YY Group (NASDAQ: YYGH) announced an initial production rollout of OpenClaw across three Southeast Asian hotel clients via its YY Circle platform and WhatsApp/Telegram, with chat-based shift creation and automated worker outreach already live.  
   <https://digiconasia.net/pr-newswire/yy-group-nasdaq-yygh-launches-openclaw-agentic-ai-across-hotel-clients-and-internal-operations> · 2026-06-26

## Still-useful queued examples

- **How I Rebuilt My AI Agent Team After the Lobster Lobotomy** — Little Might’s post-Anthropic recovery on a local Mac Mini (2026-06-24).  
- **OpenClaw as a personal AI content manager (full breakdown)** — Telegram content agent with Docker, Kimi K2.5 and ClawHub skills (2026-06-24).  
- **I replaced an $800/month web scraping API with 200 lines of Python** — Fintech cost-replacement crawler processing 800k pages/mo for ~$90 (2026-06-16).  
- **HackMyClaw.com: Over 6K attempts to break AI assistant Fiu** — Public prompt-injection stress-test; no successful secret leakage (2026-06-26).  
- **Developer deploys always-on freelance agent using OpenClaw** — PR triage, client status drafts and follow-ups via Telegram (2026-06-16).  
- **I think I found the first real reason to build ai agent workflows in OpenClaw** — Receipt-to-ledger bookkeeping as a bounded, approval-gated agent workflow (2026-06-06).  

## Notes

- Sources scanned: web search, X search, GitHub, DEV.to, Medium, Substack, Hugging Face blog, company blogs, PRNewswire/digiconasia and Hacker News.
- Several results were already in `brief-picks.json` or `history.md` (e.g., Nefe Tech hosted OpenClaw, Mansi More’s content engine, ClawList, Storyie, Clawr.ing, AucoBot). Those were skipped.
- Lower-signal or generic listicles were also skipped to keep the queue high-signal.

## Stats

- brief-picks.json: **90 entries** (6 new this run, queue capped)
- state.json updated: `lastGenuineNewEntryDate` = 2026-06-27
