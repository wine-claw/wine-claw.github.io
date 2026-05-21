#!/usr/bin/env python3
"""
Daily 8:00 AM Telegram brief — runner script.
Generates a concise daily brief with version check + 24h activity summary.
"""
import json, subprocess, re, os, sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

WORKSPACE = Path("/Users/wineclaw/.openclaw/workspace")
GALLERY_DIR = WORKSPACE / "app-gallery" / "apps"
RUNS_DIR = WORKSPACE / "projects" / "2am-mini-app-creation" / "runs"
STATE_FILE = WORKSPACE / "projects" / "2am-mini-app-creation" / "state.json"
CRON_JOBS_FILE = Path("/Users/wineclaw/.openclaw/cron/jobs.json")
MEMORY_DIR = WORKSPACE / "memory"

def run_cmd(cmd, timeout=30):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return result.stdout.strip(), result.returncode
    except Exception as e:
        return f"Error: {e}", 1

def get_active_model():
    stdout, rc = run_cmd("cat /Users/wineclaw/.openclaw/openclaw.json 2>/dev/null | python3 -c \"import sys,json; c=json.load(sys.stdin); agents=c.get('agents',{}).get('list',[]); [print(a.get('model',{}).get('primary','unknown')) for a in agents if a.get('id')=='main']\"")
    if rc == 0 and stdout.strip():
        model = stdout.strip().split('\n')[0]
        model = model.replace('ollama/', '').replace('openai/', '')
        return model
    return "unknown"

def get_openclaw_versions():
    """Return (installed_version, latest_version)"""
    # Installed version
    stdout, rc = run_cmd("/Users/wineclaw/.npm-global/bin/openclaw --version 2>/dev/null")
    installed = "unknown"
    if rc == 0 and stdout:
        m = re.search(r'OpenClaw\s+([\d.]+)', stdout)
        installed = m.group(1) if m else "unknown"
    
    # Latest version from GitHub
    latest = "unknown"
    try:
        stdout, rc = run_cmd('curl -sI "https://github.com/openclaw/openclaw/releases/latest" 2>/dev/null | grep -i location')
        if rc == 0 and stdout:
            m = re.search(r'tag/v([\d.]+)', stdout)
            latest = m.group(1) if m else "unknown"
    except:
        pass
    
    return installed, latest

def get_mini_app_info():
    if not STATE_FILE.exists():
        return None
    try:
        with open(STATE_FILE) as f:
            state = json.load(f)
        latest = state.get("latestRun", {})
        if not latest:
            return None
        title = latest.get("title", "Unknown")
        date = latest.get("date", "?")
        gallery_url = "https://wine-claw.github.io/app-gallery/"
        slug = date + "-" + latest.get("path", "/").rstrip("/").split("/")[-1] if latest.get("path") else ""
        app_published = (GALLERY_DIR / slug).exists() if slug else False
        if not app_published and latest.get("path"):
            path_name = Path(latest["path"]).name
            for d in GALLERY_DIR.iterdir():
                if d.is_dir() and path_name in d.name:
                    app_published = True
                    break
        return {
            "title": title,
            "date": date,
            "published": app_published,
            "gallery": gallery_url,
        }
    except:
        return None

CRON_RUNS_DIR = Path("/Users/wineclaw/.openclaw/cron/runs")

def get_last_24h_cron_activity():
    """Check what cron jobs ran in the last 24h via state.json or runs directory mtime."""
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(hours=24)
    activities = []
    id_to_name = {}
    
    # Load job names from jobs.json
    if CRON_JOBS_FILE.exists():
        try:
            with open(CRON_JOBS_FILE) as f:
                data = json.load(f)
            jobs = data.get("jobs", []) if isinstance(data, dict) else []
            for job in jobs:
                if isinstance(job, dict):
                    id_to_name[job.get("id", "")] = job.get("name", "unnamed")
        except:
            pass
    
    # Source 1: state.json timestamps
    if CRON_JOBS_FILE.exists():
        try:
            with open(CRON_JOBS_FILE) as f:
                data = json.load(f)
            jobs = data.get("jobs", []) if isinstance(data, dict) else []
            for job in jobs:
                if not isinstance(job, dict):
                    continue
                state = job.get("state", {})
                if not isinstance(state, dict):
                    continue
                last_run = state.get("lastRunAtMs")
                if not last_run:
                    continue
                run_time = datetime.fromtimestamp(last_run / 1000, tz=timezone.utc)
                if run_time < cutoff:
                    continue
                name = job.get("name", "unnamed")
                status = state.get("lastRunStatus", "?")
                ok = status == "ok"
                if not any(a["name"] == name for a in activities):
                    activities.append({
                        "name": name,
                        "ok": ok,
                        "time": run_time.astimezone().strftime("%H:%M"),
                        "source": "state",
                    })
        except:
            pass
    
    # Source 2: runs directory modification times (fallback / supplement)
    if CRON_RUNS_DIR.exists():
        for fname in os.listdir(CRON_RUNS_DIR):
            if not fname.endswith(".jsonl"):
                continue
            fpath = CRON_RUNS_DIR / fname
            mtime = datetime.fromtimestamp(fpath.stat().st_mtime, tz=timezone.utc)
            if mtime < cutoff:
                continue
            job_id = fname.replace(".jsonl", "")
            name = id_to_name.get(job_id, job_id[:8])
            if not any(a["name"] == name for a in activities):
                activities.append({
                    "name": name,
                    "ok": True,  # assume ok if run log exists
                    "time": mtime.astimezone().strftime("%H:%M"),
                    "source": "runs",
                })
    
    return activities

def get_today_memory_highlights():
    """Read today's memory file for manual session highlights."""
    today = datetime.now().strftime("%Y-%m-%d")
    mem_file = MEMORY_DIR / f"{today}.md"
    if not mem_file.exists():
        return []
    
    try:
        with open(mem_file) as f:
            content = f.read()
    except:
        return []
    
    # Extract bullet points that look like notable work
    highlights = []
    for line in content.split('\n'):
        line = line.strip()
        if not line.startswith('- ') and not line.startswith('* '):
            continue
        # Skip routine cron noise
        skip_keywords = [
            'Mission Control stale check',
            'stale-project cron run',
            'executed tools/mission_control',
            'no newly stale',
            'quiet update',
            'durable state was updated quietly',
        ]
        if any(kw.lower() in line.lower() for kw in skip_keywords):
            continue
        # Skip very short lines
        if len(line) < 30:
            continue
        # Keep it
        clean = line.lstrip('- *').strip()
        if clean and clean not in highlights:
            highlights.append(clean)
    
    return highlights[:5]  # Max 5 highlights

def get_git_commits_last_24h():
    """Get recent git commits in workspace."""
    stdout, rc = run_cmd('cd /Users/wineclaw/.openclaw/workspace && git log --oneline --since="24 hours ago" 2>/dev/null')
    if rc != 0 or not stdout:
        return []
    commits = [line.strip() for line in stdout.split('\n') if line.strip()]
    return commits[:5]

def get_trending_summary():
    """Fetch trending topics from X (AI, Tech, Space, Politics)."""
    try:
        import subprocess, json
        # We'll build a minimal summary by calling x_search via a spawned Python
        # that uses the x_search tool. Since we can't call tools directly from here,
        # we return a placeholder that the brief will note needs to be populated.
        # In practice, the brief generation should be done by the agent itself, not this script.
        return None
    except:
        return None

def generate_brief():
    now = datetime.now()
    day_name = now.strftime("%A")
    date_str = now.strftime("%d %b %Y")
    
    installed, latest = get_openclaw_versions()
    version_status = "✅ up to date" if installed == latest else f"⬆️ update available ({latest})"
    
    lines = [
        f"*{day_name} {date_str}*",
        "",
        f"🤖 Model: {get_active_model()}",
        f"📦 OpenClaw: {installed} → {latest} {version_status}",
        "",
    ]
    
    # ——— 24h ACTIVITY ———
    lines.append("*Last 24 hours:*")
    
    # What actually happened: mini-app, use-case discoveries, etc.
    activity_items = []
    
    # Overnight mini-app
    app = get_mini_app_info()
    if app and app["published"]:
        activity_items.append(f"🎨 Built mini-app: {app['title']}")
    
    # Memory highlights (manual work from today)
    mem_highlights = get_today_memory_highlights()
    for h in mem_highlights[:3]:
        short = h[:85] + "…" if len(h) > 85 else h
        activity_items.append(f"• {short}")
    
    # Git commits
    commits = get_git_commits_last_24h()
    for c in commits[:2]:
        msg = ' '.join(c.split()[1:]) if ' ' in c else c
        short = msg[:75] + "…" if len(msg) > 75 else msg
        activity_items.append(f"📝 {short}")
    
    if activity_items:
        for item in activity_items[:5]:
            lines.append(f"  {item}")
    else:
        lines.append("  (No notable activity recorded)")
    
    lines.append("")
    
    # ——— MINI-APP ———
    app = get_mini_app_info()
    if app:
        status = "✅" if app["published"] else "⚠️ not in gallery"
        lines.append(f"*Latest mini-app:* {app['title']} ({app['date']}) {status}")
        lines.append(f"🔗 {app['gallery']}")
    else:
        lines.append(f"*Latest mini-app:* None found")
        lines.append(f"🔗 https://wine-claw.github.io/app-gallery/")
    
    lines.append("")
    
    # ——— STALE PROJECTS ———
    mc_path = WORKSPACE / "projects" / "mission-control" / "index.json"
    if mc_path.exists():
        try:
            with open(mc_path) as f:
                projects = json.load(f)
            stale = [p for p in projects if "stale" in p.get("status", "").lower() or "blocked" in p.get("status", "").lower()]
            if stale:
                lines.append(f"⚠️ {len(stale)} stale/blocked in Mission Control")
        except:
            pass
    
    return "\n".join(lines)

if __name__ == "__main__":
    print(generate_brief())
