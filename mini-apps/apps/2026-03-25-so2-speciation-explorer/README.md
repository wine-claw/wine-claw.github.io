# Wine SO₂ Speciation Explorer

**Purpose:** Educational first-pass calculator for exploring how free SO₂ distributes between
molecular SO₂, bisulfite (HSO₃⁻), and sulfite (SO₃²⁻) at wine pH, and how much free SO₂ is needed
to hit a target molecular level.

**⚠ Disclaimer:** This tool is for **educational and exploratory purposes only**.
It does not replace laboratory analysis, regulatory compliance testing, or professional
oenological advice. Do not use it for compliance or food-safety decisions without independent
verification.

---

## Chemistry

### Acid–Base Equilibria

Sulfur dioxide dissolves in water and establishes two acid–base equilibria:

```
SO₂·H₂O   ⇌   HSO₃⁻   +   H⁺        pKa₁ = 1.81   (25 °C)
HSO₃⁻     ⇌   SO₃²⁻   +   H⁺        pKa₂ = 7.20   (25 °C)
```

Below pH ~4, the dominant species are molecular SO₂ (SO₂·H₂O) and bisulfite (HSO₃⁻).
Sulfite (SO₃²⁻) is negligible at wine pH (always < 0.01 %).

### Species Fractions

Using Henderson–Hasselbalch with [H⁺] = 10^(−pH):

```
denom = [H⁺]² + [H⁺]·10^(−pKa₁) + 10^(−pKa₁−pKa₂)

α_molecular  = [H⁺]²           / denom
α_bisulfite  = [H⁺]·10^(−pKa₁) / denom
α_sulfite    = 10^(−pKa₁−pKa₂)/ denom
```

### Key Relationships

| Quantity | Formula |
|---|---|
| Molecular SO₂ (mg/L) | α_molecular × free SO₂ |
| Required free SO₂ for target | target_molecular / α_molecular (at given pH) |
| Molecular fraction at pH 3.0 | ≈ 6.1 % |
| Molecular fraction at pH 3.5 | ≈ 1.9 % |
| Molecular fraction at pH 3.9 | ≈ 0.4 % |

### pKa Values

- **pKa₁ = 1.81** for the HSO₃⁻ / SO₂·H₂O equilibrium (refs: Iland et al., Zoecklein et al.)
- **pKa₂ = 7.20** for the SO₃²⁻ / HSO₃⁻ equilibrium

Values are for 25 °C in dilute aqueous solution, assuming unit activity coefficients.

### Temperature Effect

pKa shifts approximately −0.009 / °C above 25 °C. At higher temperatures the molecular
fraction increases slightly. This effect is not modelled here — at wine temperatures (15–20 °C)
the shift is modest (~0.05 pKa units) and within the tool's inherent uncertainty.

---

## Usage

Open `index.html` directly in any modern browser — no server or build step required.

### Inputs

| Input | Range | Default |
|---|---|---|
| pH | 2.5 – 4.5 | 3.40 |
| Free SO₂ (mg/L) | 0 – 300 | 40 |
| Molecular SO₂ target (mg/L) | custom | 0.8 |

### Presets

| Style | pH | Free SO₂ | Target |
|---|---|---|---|
| Red | 3.40 | 40 mg/L | 0.8 mg/L |
| White | 3.20 | 50 mg/L | 0.8 mg/L |
| Sparkling | 3.00 | 50 mg/L | 0.5 mg/L |

---

## Output Explained

- **Molecular SO₂ (mg/L)** — the antimicrobial fraction. Target range ~0.5–1.0 mg/L for most wines.
- **% Molecular / % Bisulfite / % Sulfite** — fraction of total free SO₂ in each form.
- **Required free SO₂ for target** — how much free SO₂ you'd need at the current pH to achieve
  your target molecular level.
- **Interpretation band** — practical context (below target / workable / comfortable).

---

## Key Limitations & Caveats

1. **Equilibrium assumption only.** No kinetic or bound-SO₂ effects modelled.
2. **Activity coefficients assumed = 1.** Valid at low ionic strength; high-SO₂ or
   high-alcohol wines may deviate.
3. **Temperature not modelled.** pKa shifts ~−0.009 / °C above 25 °C.
4. **Bound SO₂ is not included.** In bottled wine, bound SO₂ (acetaldehyde, pyruvate, etc.)
   can be 2–10× the free SO₂ value.
5. **Molecular target references (0.5–1.0 mg/L)** are indicative guidelines from the
   oenological literature. Actual requirements depend on wine composition, microbial load,
   temperature, and style.
6. **This tool is not compliance advice.** Regulatory limits for total SO₂ vary by country
   and wine type. Consult your local authority and a qualified oenologist.

---

## Files

```
index.html   — main page (pure HTML, no build step)
styles.css    — styles (CSS custom properties, mobile-responsive)
app.js        — all calculations, chart, and interactivity
README.md     — this file
```

---

## References

- Iland, P. et al. *Chemical Analysis of Grapes and Wine: Progress in Wine Chemistry.* Patrick Iland Wine Promotions, 2000.
- Zoecklein, B. et al. *Production Wine Analysis.* Chapman & Hall, 1990.
- Ribéreau-Gayon, P. et al. *Handbook of Enology, Vol. 1: The Microbiology of Wine and Vinifications.* 2nd ed., Wiley, 2006.
- US FDA / TTB regulatory guidance on sulfites in wine.
