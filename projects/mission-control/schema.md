# Mission Control State Schema

Each long-running or notable project should expose a `state.json` file inside its own project folder.

Recommended shape:

```json
{
  "name": "string",
  "slug": "string",
  "status": "active|blocked|complete",
  "summary": "short one-line summary",
  "path": "/absolute/path/to/project-note",
  "updatedAt": "ISO-8601 with timezone",
  "nextStep": "string",
  "blocker": "string|null",
  "links": [
    { "label": "Drive", "url": "https://..." }
  ],
  "autonomous": {
    "enabled": true,
    "mechanism": "cron|launchagent|manual|null",
    "notes": "string",
    "jobIds": ["optional-cron-id"]
  }
}
```

Rules:
- `path` should point at the main durable project note
- `updatedAt` should reflect the last meaningful status change
- `summary` should be short enough for dashboard and chat summaries
- `blocker` should be null when not blocked
- only create `state.json` for projects worth surfacing in Mission Control
- if a project is intended to appear on the dashboard, include the full shape above rather than a partial subset
- when creating a new tracked project, copy an existing valid `state.json` shape first and then edit values
- after adding a new tracked project, verify the dashboard/API still renders rather than assuming the schema was correct
