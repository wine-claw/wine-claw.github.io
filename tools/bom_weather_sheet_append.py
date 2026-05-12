#!/usr/bin/env python3
"""
Daily BOM Adelaide weather — append new rows to native Google Sheet.
Fetches fresh data, merges with local history, appends only NEW rows to the Sheet.
Sheet ID: 1dX0t_t-LriQCZ87xZTC8beBqg-Jcen_dtAnyIpAVjbE

Column order in Sheet1 (as rebuilt 2026-05-11):
  A Date, B Time(Local), C Time(UTC), D Temp, E Apparent, F Dew, G Humidity,
  H WindSpeed, I Gust, J Dir, K Pressure, L Rain, M Cloud(oktas),
  N DateTime, O CloudDesc
"""
import csv, json, os, subprocess, sys

SHEET_ID = "1dX0t_t-LriQCZ87xZTC8beBqg-Jcen_dtAnyIpAVjbE"
DATA_DIR = "/Users/wineclaw/.openclaw/workspace/data"
HISTORY_FILE = os.path.join(DATA_DIR, "adelaide_bom_history.csv")
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FETCH_SCRIPT = os.path.join(SCRIPT_DIR, "bom_adelaide_weather.py")


def run_fetch():
    """Fetch and merge new BOM data into local CSV."""
    result = subprocess.run(
        [sys.executable, FETCH_SCRIPT, "--merge"],
        capture_output=True, text=True, timeout=120
    )
    if result.returncode != 0:
        raise RuntimeError(f"Fetch failed: {result.stderr}")
    for line in reversed(result.stdout.strip().split('\n')):
        try:
            data = json.loads(line)
            return data.get("row_count", 0), data.get("new_count", 0)
        except Exception:
            continue
    raise RuntimeError("No JSON output from fetch script")


def get_sheet_row_count():
    """Count how many data rows are in the Sheet (excluding header)."""
    result = subprocess.run(
        ["gog", "sheets", "get", SHEET_ID, "Sheet1!A:A", "--json"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise RuntimeError(f"Sheet read failed: {result.stderr}")
    data = json.loads(result.stdout)
    values = data.get("values", [])
    count = 0
    for row in values:
        if row and row[0]:
            count += 1
    return max(0, count - 1)  # subtract header


def append_to_sheet(rows):
    """Append rows to Sheet1 using gog."""
    if not rows:
        return 0

    # Correct column order: DateTime goes to N, CloudDesc to O
    values = []
    for r in rows:
        dt = f"{r[0]} {r[1]}"
        cloud_desc = r[14] if len(r) > 14 and r[14] else ""
        values.append([
            r[0], r[1], r[2], r[4], r[5], r[6], r[7], r[8], r[9], r[10],
            r[11], r[12], r[13] if r[13] else "", dt, cloud_desc
        ])

    tmp = "/tmp/weather_sheet_append.json"
    with open(tmp, "w") as f:
        json.dump(values, f)

    result = subprocess.run(
        ["gog", "sheets", "append", SHEET_ID, "Sheet1!A:A",
         "--values-json", f"@{tmp}", "--insert", "INSERT_ROWS"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise RuntimeError(f"Sheet append failed: {result.stderr}")
    return len(rows)


def main():
    try:
        print("Fetching BOM data...", file=sys.stderr)
        total_rows, new_fetched = run_fetch()
        print(f"Total history: {total_rows} rows | Newly fetched: {new_fetched}", file=sys.stderr)

        print("Checking Sheet row count...", file=sys.stderr)
        sheet_rows = get_sheet_row_count()
        print(f"Sheet currently has: {sheet_rows} data rows", file=sys.stderr)

        rows_to_append = total_rows - sheet_rows
        if rows_to_append <= 0:
            print("Sheet is already up to date. Nothing to append.")
            return 0

        print(f"Appending {rows_to_append} new rows...", file=sys.stderr)

        with open(HISTORY_FILE, "r", newline="", encoding="utf-8") as f:
            reader = csv.reader(f)
            header = next(reader)
            all_rows = list(reader)

        new_rows = all_rows[sheet_rows:]
        appended = append_to_sheet(new_rows)

        result = {
            "status": "ok",
            "total_csv_rows": total_rows,
            "sheet_rows_before": sheet_rows,
            "appended": appended,
            "sheet_url": f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit"
        }
        print(json.dumps(result))
        return 0

    except Exception as e:
        print(json.dumps({"status": "error", "error": str(e)}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
