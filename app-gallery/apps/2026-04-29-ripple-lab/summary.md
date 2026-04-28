# Ripple Lab — Wave Interference Sandbox

## What Was Built

A single-file HTML/CSS/JS interactive wave simulation ("Ripple Lab") that lets users explore 2D wave interference patterns in real time.

### Features

- **5 interaction modes**: Tap (drop pebble), Drag (continuous stir), Source (place persistent oscillating sources), Wall (draw reflective barriers), Erase (remove walls & sources)
- **3 presets**: Freeform (default — single center source), Double Slit (classic QM demo), Circular Pool (reflective circular boundary with center source)
- **Real-time parameter controls**: Speed, Frequency, and Damping sliders
- **Two color modes**: Water (cyan/teal on deep navy) and Sound (orange/red crests, purple troughs)
- **Play/Pause**, Clear Waves, and Clear All buttons
- **Default state is alive** — starts with a pulsing source in the center so the screen isn't blank

### Physics Model

Discrete 2D wave equation on a grid (~200×200, adaptive based on screen size):

```
u_next[x,y] = (2 * u_current[x,y] - u_previous[x,y] + c² * (avg_neighbors - u_current[x,y])) * damping
```

- Absorbing boundary conditions (gradual damping near edges to prevent reflections from the border)
- Walls act as reflective boundaries (wave displacement forced to zero)
- Persistent sources oscillate sinusoidally each frame
- 2 physics steps per animation frame for smoother wave propagation

### Technical Notes

- **Single file**: `index.html` — no external dependencies
- **Canvas-based rendering** using `putImageData` for direct pixel manipulation
- **Mobile-friendly**: touch events, 44px minimum touch targets, bottom control panel, scroll prevention
- **60fps** animation via `requestAnimationFrame`
- FPS counter displayed in top-right
- Experimental AI mini-app warning banner at top

### Caveats

- The simulation uses a simplified wave equation; it's a toy, not a precise physics engine
- Very high wave speeds (>0.4) can cause numerical instability — the slider caps at 0.5
- On very large screens the grid resolution increases, which may affect performance on low-powered devices
- The "Double Slit" preset demonstrates wave diffraction but isn't a rigorous quantum simulation