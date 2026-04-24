# Tank Chill Calculator

An interactive, mobile-first winery tank cooling load estimator and insulation comparison tool — built as a single self-contained HTML file with no external dependencies.

---

## What It Does

- **Fermentation Heat Calculator** — estimates peak heat output during active fermentation from Brix and volume
- **Heat Gain Comparison** — compares bare stainless steel tank vs polyurethane insulated tank heat ingress
- **Cooling Demand Summary** — combines fermentation + ambient heat loads into total cooling requirement (kW and refrigeration tons)
- **Pull-Down Time Estimator** — calculates time to cool wine from current to target temperature given chiller capacity
- **Insulation Payback** — estimates seasonal energy savings and payback period for insulation installation
- **Animated Tank Diagram** — SVG visualization showing heat flow arrows, insulation layer, and wine temperature color

---

## Key Formulas

### Tank Geometry (H:D = 2.5:1)
```
V = π(D/2)²H, with H = 2.5D
→ D = (V / 1.9635)^(1/3)
→ H = 2.5D
→ Surface Area A = πDH + 2π(D/2)²
```

### Fermentation Heat
```
Sugar (g/L) = Brix × 10
Total sugar (kg) = sugar(g/L) × volume(kL) × 1000 / 1000
Total heat (MJ) = total sugar (kg) × 1000 × 0.56 kJ/g / 1000
Peak day heat rate (kW) = total heat (kWh) / peak day × 0.40 / peak day hours
```

### Heat Gain
```
Bare tank:  Q = U_bare × A × ΔT   (U_bare ≈ 8 W/m²·K)
Insulated:  Q = U_ins × A × ΔT
  U_ins by thickness:
    25mm → 0.35 W/m²·K
    50mm → 0.25 W/m²·K
    75mm → 0.18 W/m²·K
   100mm → 0.14 W/m²·K
```

### Pull-Down Time
```
ΔT = current temp − target temp (°C)
Wine mass (kg) = volume(kL) × 990 kg/m³ × 1000
Energy (MJ) = mass × 4.2 kJ/kg·K × ΔT / 1000
Pull-down time (h) = energy (kWh) / chiller capacity (kW)
```

### Insulation Payback
```
Heat saved/vintage (kWh) = saved per hour × 24 h × 60 days
Cost saved/vintage = heat saved × electricity rate ($/kWh)
Payback (years) = insulation cost / cost saved per vintage × (60/365)
```

---

## Constants Used
| Parameter | Value |
|-----------|-------|
| Fermentation heat | 0.56 kJ/g sugar |
| Wine specific heat | 4.2 kJ/kg·K |
| Wine density | 990 kg/m³ |
| Bare SS tank U-value | 8 W/m²·K |
| Electricity cost (default) | $0.30/kWh |
| Vintage duration | 60 days |
| Refrigeration ton | 3.516 kW |

---

## Usage

Open `index.html` in any modern browser. Works offline. Inputs persist via localStorage.

**⚠️ Disclaimer:** This tool is experimental and not professionally validated. Do not rely on it for real engineering decisions.