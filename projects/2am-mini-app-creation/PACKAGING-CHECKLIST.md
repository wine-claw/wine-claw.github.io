## Packaging checklist for 2am mini-app runs

A 2am run is NOT complete until ALL of these are done:

### Immediate (after build)
- [ ] App file(s) exist in `runs/YYYY-MM-DD/<slug>/`
- [ ] BUILD-SPEC.md or summary.md exists
- [ ] HTML/JS syntax checks pass
- [ ] `latest-summary.md` updated

### Gallery publishing (MANDATORY — not optional)
- [ ] Copy app folder to `app-gallery/apps/YYYY-MM-DD-<slug>/`
- [ ] Add card to `app-gallery/index.html` (top of grid, mark as Latest)
- [ ] Remove "Latest" badge from previous top card
- [ ] Update `app-gallery/latest/index.html` redirect
- [ ] `git add` ONLY the gallery files (avoid embedded repo issues)
- [ ] `git commit` from `app-gallery/`
- [ ] `git push`
- [ ] Verify push succeeded (check output for errors)

### State update (MANDATORY — not optional)
- [ ] Update `state.json`:
  - [ ] `summary`
  - [ ] `updatedAt`
  - [ ] `primaryLink.label` and `.url`
  - [ ] `latestRun` (full object)
  - [ ] Move old latestRun to `extraRuns`
- [ ] `nextStep` updated to next date

### Verification
- [ ] Confirm gallery URL loads (or mark as "deferred to daytime")
- [ ] Record any packaging failures honestly in run notes

## If any step fails
- Do NOT declare the run complete
- Record the failure in the run notes
- Fix it in the same session if possible
- If fixing requires daytime (e.g. git auth issues), mark run as "partial — packaging pending"

## Common failure modes to watch for
1. **Git push fails** — embedded repos, auth issues, network problems
2. **State update skipped** — run ends after build, packaging forgotten
3. **Gallery copy missed** — app exists locally but never copied to app-gallery/
4. **index.html not updated** — app copied but no card added
5. **Worker timeout** — worker1 dies, main agent takes over but forgets packaging

## Hardening
- The main agent must treat packaging as a separate phase, not an afterthought
- Use a literal checklist like this one — do not rely on memory
- If the run is interrupted (timeout, crash, worker failure), resume from the packaging step
- Morning brief must report packaging status explicitly: "published to gallery" or "packaging failed — needs daytime fix"
