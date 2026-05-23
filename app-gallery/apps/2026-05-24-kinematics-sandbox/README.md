# Kinematics Sandbox

## Concept
**Kinematics Sandbox** — Interactive robot arm playground with forward and inverse kinematics. Drag the end-effector target and watch a 2-link (or multi-link) arm solve inverse kinematics in real time. Switch to forward kinematics mode to control joint angles directly. Visualise the workspace envelope, manipulability ellipsoid, and Jacobian data.

## Why this idea
- **Domain rotation**: Robotics / mechatronics — completely absent from the entire 2am run history (no robot arm, IK, or kinematics app has been built before)
- **Archetype rotation**: Interactive manipulator sandbox — different from the recent cluster of parameter-sliders (PID Playground), trigger-and-observe (Seismic Explorer), and build-tweak-watch (Cloud Factory)
- **Interestingness**: Drag the hand, watch the arm follow. Very tactile and immediately satisfying. The manipulability ellipsoid shrinks at singularities — an "aha moment" toy
- **Educational**: Real engineering — Jacobian, IK/FK, workspace geometry, singularity analysis
- **Personal fit**: Simon's engineering background makes this a natural interest area

## What was built
Single-file HTML/CSS/JS app (~34 KB):
- **IK mode**: Click/drag on canvas to set target position, arm follows analytically (2-link) or via CCD (3+ link)
- **FK mode**: Direct joint angle sliders
- **2–6 link arms** with adjustable link lengths
- **Workspace envelope** (annulus for 2-link, circle for multi-link)
- **Manipulability ellipsoid** (2-link only) showing Jacobian-based dexterity
- **Jacobian matrix display** with determinant, manipulability measure, and condition number
- **Trail** showing end-effector path history
- **Joint angle arcs** overlay
- **Elbow up/down configuration** toggle (2-link)
- **Singularity warning** when near singular configurations
- **Grid overlay** with axis lines
- **Mobile-responsive** layout (sidebar below canvas on narrow screens)
- Touch support for mobile

## Key features
- Analytical 2-link IK solver with elbow up/down configurations
- CCD (Cyclic Coordinate Descent) IK for 3–6 link arms
- Real-time Jacobian and manipulability analysis
- End-effector trail visualization
- Dark theme with mechanical aesthetic

## Files
- `index.html` — complete self-contained app (~34 KB)

## Verification status
- ✅ File exists, 33.5 KB
- ✅ Disclaimer present
- ✅ Robots meta tag present
- ✅ JS syntax valid (node --check)
- ✅ All HTML IDs match JS getElementById references
- ✅ IK solver tested: 2-link analytical, CCD multi-link, edge cases (origin, out-of-reach)
- ✅ Brackets balanced (154 open, 154 close)
- ⚠️ Browser visual verification not completed (localhost policy blocked) — daytime click-through recommended

## Delegation
- **Main agent**: 100% — concept selection, domain research, design, full HTML/CSS/JS implementation, verification, packaging
- **worker1**: 0% (not attempted per SPEC)
- **worker2**: 0%