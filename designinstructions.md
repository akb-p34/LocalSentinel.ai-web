Here’s a crisp, one-page design briefing you can hand to design + dev so everyone ships the same look, tone, and UI.

# LocalSentinel.ai — One-Pager Design Language & Copy Guide

## Audience & Positioning

* **Who:** Privacy-focused devs; enterprise/government teams working **air-gapped** or **local-only**.
* **Promise:** “One-click, offline code audit where you already work (VS Code).”
* **Vibe:** **Calm, high-end, technically serious.** Simple like YC, but with clear signals of depth and rigor.

## Brand Pillars (show, don’t shout)

1. **Local-first by design** — no telemetry, no uploads.
2. **Industrial-grade clarity** — findings are ranked, explainable, and copy-ready.
3. **Developer ergonomics** — zero config, minimal UI, frictionless jump-to-code.
4. **Trust through transparency** — models, rules, and prompts are visible and editable.

## Tone & Voice (copywriting)

* **Short, declarative, and specific.** Avoid hype; prefer verifiable claims.
* Prefer: “Runs fully offline.” over “Protects your privacy.”
* Prefer: “Found a hard-coded token in `server/config.py`.” over “Security issue detected.”
* **You-first language:** “Scan your repo” (not “Our system scans”).
* **No jargon walls.** If a term is necessary, add a one-line gloss in plain English.

### Sample headlines & CTAs

* **Headline:** *Audit locally. Ship with confidence.*
* **Subhead:** *Static rules first; a local model explains, ranks, and proposes fixes—without leaving your laptop.*
* **Primary CTA:** *Scan repo*
* **Secondary:** *View report* • *Copy all fixes* • *Re-scan*

## Visual Identity

### Color (dark-first with light theme parity)

* **Neutrals (base UI)**

  * Coal `#0D1117` (bg-default, dark) / Paper `#F8FAFC` (bg-default, light)
  * Graphite `#161B22` (panels) / Cloud `#E5E7EB` (panels)
  * Slate `#334155` (borders) / Mist `#9CA3AF` (meta text)
* **Accent**

  * Signal Blue `#2F6BFF` (links, focus, primary buttons)
* **Severity**

  * 🟥 Sentinel Red `#E5484D` (Critical)
  * 🟨 Amber `#FFB224` (Warning)
  * 🟩 Emerald `#30A46C` (Info/OK)
* **Badges (tints on dark)**

  * Local-only: outline Slate + label in Mist
  * Air-gapped OK: outline Signal Blue + label in Blue

> **Accessibility rule:** Maintain **≥4.5:1** contrast for text. Use white text on severity chips in dark mode; use darkest neutral on severity chips in light mode.

### Typography

* **UI & headings:** Inter or IBM Plex Sans (bundle for air-gapped).
  Weights: 600 (H1/H2), 500 (buttons), 400 (body).
* **Code & inline snippets:** JetBrains Mono (bundle).
* **Scale (px, line-height)**

  * H1 24/30 • H2 20/28 • H3 16/24 • Body 14/20 • Mono 13/20 • Caption 12/16

### Layout & Spacing

* **Grid:** 12-column, 8px gutter (VS Code webview); single-column on narrow.
* **Spacing scale:** 4, 8, 12, 16, 24, 32, 48.
* **Radii:** 8px cards, 6px inputs/buttons.
* **Borders:** 1px Slate on dark (or Cloud on light); shadows extremely subtle or none.

### Iconography & Illustration

* **Style:** 2px stroke, rounded joins, monochrome; limited to \~12 essential icons (scan, file, line, info, warning, critical, copy, link, external, settings, check, refresh).
* **Set:** Bundle a lightweight open-source outline set (e.g., Lucide/Heroicons), no network calls.
* **Illustration:** If used at all, opt for geometric, low-detail line work; avoid mascots.

### Motion

* **Purposeful & minimal.** 150–200ms ease-out for affordances (button press, tab change, copy confirmation).
* **Respect reduced-motion.** Provide non-animated alternatives.

### Accessibility & States

* **Focus ring:** 2px Signal Blue with 2px offset; always visible for keyboard nav.
* **States:** hover (2% tint), active (pressed), focus (ring), disabled (50% opacity + no shadow).
* **Screen readers:** semantic headings, ARIA labels for “copy fix”, “jump to file\:line”, etc.

## VS Code Report Pattern (the demo surface)

* **Header bar:** Project name • Overall score (0–100) • “LOCAL-ONLY” badge • Scan time.
* **Intro card (“New to this repo?”):** 3–5 sentence plain-English overview.
* **Findings groups:**

  * 🟥 **Critical** (backdoors, secrets, auth bypass)
  * 🟨 **Warning** (unsafe defaults, weak crypto, outdated deps)
  * 🟩 **Info** (hygiene)
* **Finding row layout:** `File:line` • one-sentence **why it matters** • small code snippet • **Proposed solution(s)** as **separate, copy-ready prompts** • actions: *Open file* • *Copy fix*.
* **Footer / Next steps:** *Apply fixes → Re-scan → Export (later)*

## Microcopy Examples (plug-and-play)

* **Empty state:** *Ready when you are. Click “Scan repo” to generate a local audit—no network required.*
* **Scanning:** *Scanning with static rules… Running local model for triage…*
* **Critical found:** *Found a hard-coded token in `server/config.py`. Tokens grant full API access if leaked.*
* **Fix prompt label:** *Copy fix for hard-coded secrets*
* **Success toast:** *Fix copied to clipboard.*
* **Error (offline):** *Model not loaded. Open Settings → Models to select a local model file.*

## “Proof of Advanced” (subtle credibility cues)

* **Transparent model chip:** *Model: Code Llama 7B (q4, local)*
* **Rules chip:** *Semgrep + Bandit + 8 custom regex checks*
* **Explainability toggle:** *Show triage rationale* (reveals brief reasoning text)
* **Local badge hover:** *Runs fully offline. No telemetry. No uploads.*

## Don’t / Do

* **Don’t** flood with gradients, glassmorphism, or marketing fluff.
* **Do** emphasize whitespace, crisp hierarchy, and one obvious next action per view.

## Asset Kit to Bundle (air-gapped-safe)

* Fonts: Inter (UI), JetBrains Mono (code) — OTF/TTF files in repo.
* Icons: Static SVG subset (outlined, 2px).
* CSS tokens (example):

  * `--bg:#0D1117; --panel:#161B22; --border:#334155; --text:#E5E7EB;`
  * `--accent:#2F6BFF; --red:#E5484D; --amber:#FFB224; --green:#30A46C;`
  * `--radius-card:8px; --radius-ctrl:6px; --space-1:4px; --space-2:8px; …`

---

If you want, I can drop this into a printable one-pager (with tokens + sample components) or a VS Code webview style sheet you can paste directly—your call.
