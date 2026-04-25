#!/bin/zsh
cd /Users/wineclaw/.openclaw/workspace || exit 1
if [ -f /tmp/wine-claw-mission-control.pid ]; then
  PID=$(cat /tmp/wine-claw-mission-control.pid 2>/dev/null)
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    open http://127.0.0.1:8765/dashboard.html
    exit 0
  fi
fi
python3 /Users/wineclaw/.openclaw/workspace/tools/mission_control_server.py >/tmp/wine-claw-mission-control.log 2>&1 &
echo $! >/tmp/wine-claw-mission-control.pid
sleep 1
open http://127.0.0.1:8765/dashboard.html
