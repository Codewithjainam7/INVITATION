# 🎬 BOLLYWOOD MOVIE PREMIERE — Birthday Party Invitation Web App

> Build a production-grade, single-page scroll experience for Clark Jain's birthday party with a dark, cinematic Bollywood Movie Premiere aesthetic. Every pixel must be intentional. No broken layouts. No jank. 60fps always.

---

## PROJECT BRIEF

| Field | Detail |
|-------|--------|
| Birthday Person | **Clark Jain** |
| Date | 23 March 2025 |
| Time | _TBD_ (use placeholder: "Showtime Begins Soon") |
| Venue | Inorbit Mall, Malad, Mumbai |
| Friends | Jagrat, Mohit, Karan, Sai, Khushi |
| Password | `clark jain` (case-insensitive, trim whitespace, accept with/without space) |
| Architecture | Single page, full scroll experience |
| Theme | Bollywood / Movie Premiere — dark, cinematic, premium |
| Priority | Mobile-first (90% users on phone) |

---

## TECH STACK

```
Next.js 14 (App Router)
React 18 (Suspense + concurrent)
TypeScript (strict mode)
Tailwind CSS
Framer Motion (all UI animations)
GSAP + SplitText (cinematic hero text)
Groq SDK (AI dialogue generator, streaming)
Zustand (global state)
Lenis (smooth scroll)
Howler.js (sound effects)
next/font (zero FOUT)
next/image (optimized images)
Canvas API (film grain overlay)
```

---

## 1. DESIGN SYSTEM

### 1.1 Color Palette

```css
--bg-primary:     #0A0A0A       /* Deep cinema black */
--bg-secondary:   #141414       /* Dark charcoal */
--bg-card:        rgba(255, 215, 0, 0.04) /* Gold glassmorphism */
--cinema-gold:    #FFD700       /* Primary accent — Bollywood gold */
--cinema-red:     #DC143C       /* Classic red carpet */
--cinema-maroon:  #8B0000       /* Deep maroon accent */
--spotlight:      #FFF8DC       /* Warm spotlight cream */
--text-primary:   #FFFFFF
--text-secondary: rgba(255, 255, 255, 0.65)
--text-muted:     rgba(255, 255, 255, 0.3)
--text-gold:      #FFD700
--border-gold:    rgba(255, 215, 0, 0.25)
--error:          #FF4444
--success:        #00FF41
```

### 1.2 Typography

```
Display Font: "Cinzel Decorative" (via next/font/google)
  → Hero:     clamp(2.5rem, 10vw, 6rem), weight 700
  → Title:    clamp(1.5rem, 5vw, 3rem), weight 700
  → Subtitle: clamp(1rem, 3vw, 1.5rem), weight 400

Body Font: "Cormorant Garamond" (via next/font/google)
  → Large:   1.125rem / 1.8 line-height, weight 500
  → Regular: 1rem / 1.7 line-height, weight 400
  → Small:   0.875rem

Mono Font: "DM Mono" (via next/font/google)
  → Dialogues, credits: 0.9rem, weight 400

RULE: NEVER use px for font sizes in components.
Always use clamp() for fluid scaling.
All inputs: minimum font-size 16px (prevents iOS zoom).
```

### 1.3 Spacing (8px base grid)

```
xs: 8px   sm: 16px   md: 24px
lg: 32px  xl: 48px   2xl: 64px   3xl: 96px
```

### 1.4 Border Radius

```
Button:     8px
Card:       16px
Input:      8px
Pill/badge: 999px
```

### 1.5 Glassmorphism (Bollywood Edition)

```css
.glass-cinema {
  background: rgba(255, 215, 0, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 215, 0, 0.12);
  border-radius: 16px;
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### 1.6 Shadows & Glows

```css
/* Card */       box-shadow: 0 0 40px rgba(255, 215, 0, 0.1);
/* Button */     box-shadow: 0 0 20px rgba(255, 215, 0, 0.35);
/* Active glow */box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
/* Error */      box-shadow: 0 0 20px rgba(255, 68, 68, 0.35);
/* Red carpet */ box-shadow: 0 0 40px rgba(220, 20, 60, 0.2);
/* Text glow */  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2);
```

### 1.7 Buttons

#### Primary (Gold Cinema)
```css
.btn-cinema {
  background: linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #DAA520 100%);
  color: #0A0A0A;
  padding: 14px 28px;
  border-radius: 8px;
  font-family: "Cormorant Garamond", serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.35);
  transition: transform 0.15s ease-out, box-shadow 0.2s;
  touch-action: manipulation;
  min-height: 48px;
}
/* Hover:  */ transform: scale(1.03); box-shadow: 0 0 30px rgba(255,215,0,0.5);
/* Active: */ transform: scale(0.97);
/* Disabled: */ opacity: 0.4; box-shadow: none; cursor: not-allowed;
/* Focus:  */ outline: 2px solid #FFD700; outline-offset: 3px;
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: rgba(255, 255, 255, 0.7);
  /* Hover: */ border-color: rgba(255, 215, 0, 0.5); color: #FFD700;
  /* Active: */ transform: scale(0.97);
}
```

#### Icon Button
```css
.btn-icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(255, 215, 0, 0.08);
  /* Hover: */ box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
}
```

### 1.8 Input Fields

```css
.input-cinema {
  height: 52px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.5);
  border: 1.5px solid rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  font-family: "DM Mono", monospace;
  font-size: 1rem; /* MUST be >= 16px — no iOS zoom */
  color: #FFD700;
  letter-spacing: 1px;
}
::placeholder { color: rgba(255, 255, 255, 0.25); }
/* Focus: */   border-color: #FFD700; box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);
/* Error: */   border-color: #FF4444; box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.15);
/* Success: */ border-color: #00FF41; box-shadow: 0 0 0 3px rgba(0, 255, 65, 0.15);
```

---

## 2. PAGE SECTIONS (Top to Bottom — Full Scroll)

The entire app is ONE scrollable page with sections. The **Password Gate** is a full-screen overlay that blocks the page until the correct password is entered.

---

### SECTION A — PASSWORD GATE (Full Screen Overlay)

**Concept:** Red carpet VIP velvet rope entrance. A full-viewport overlay that blocks ALL content until the correct password is entered.

**Layout:**
```
┌──────────────────────────────────┐
│          [100dvh overlay]        │
│                                  │
│        🎬 [star emoji]           │
│                                  │
│   "WELCOME TO THE PREMIERE"      │
│   (Cinzel Decorative, gold)      │
│                                  │
│   "VIP Access Required"          │
│   (Cormorant, muted, small)     │
│                                  │
│   ┌────────────────────────┐     │
│   │  Password input        │     │
│   └────────────────────────┘     │
│                                  │
│   [  ENTER THE PREMIERE →  ]     │
│                                  │
│   (error message area)           │
└──────────────────────────────────┘
```

**Card:** `glass-cinema`, max-width: 400px, width: calc(100% - 40px), padding: 32px 24px

**Star emoji** above card: 🌟 (2.5rem), animated rotate + glow

**Input:** `input-cinema`, full width, textAlign center, placeholder "Enter VIP Code..."

**Button:** `btn-cinema`, full width, margin-top 16px

**Password logic:**
- Accepts: "clark jain", "clarkjain", "Clark Jain" etc.
- Logic: `pw.trim().toLowerCase().replace(/\s+/g, " ") === "clark jain"`

**WRONG password:**
1. Input border → red, error state
2. GSAP shake: `x: [-10, 10, -8, 8, -5, 5, 0], duration: 0.5`
3. Error text fades in below button:
   `"Wrong code! Yeh premiere sirf asli heroes ke liye hai 🎬"`
   (DM Mono, 0.78rem, #FF4444, fades out after 3s)
4. Input clears, auto-focus returns

**CORRECT password:**
1. Canvas confetti burst (gold + red particles, 80 particles, 2s)
2. Input border → green glow
3. Button text changes: "🎬 ACCESS GRANTED"
4. Overlay fades out with Framer Motion:
   `opacity: 1→0, y: 0→-30, duration: 0.8, ease: easeInOut`
5. Lenis scroll unlocks

**Keyboard handling (CRITICAL):**
- Use `visualViewport` API to detect keyboard on mobile
- When keyboard opens: card slides up so input stays visible
- `padding-bottom: max(20px, env(safe-area-inset-bottom))`
- Smooth transition on card repositioning (300ms)

**z-index:** 1000 (above everything)

---

### SECTION B — HERO (Full Viewport, Cinematic Opening)

**Concept:** Dramatic movie opening with spotlight flare, like a Bollywood movie title card. Plays when user scrolls into view.

**Layout:**
```
┌────────────────────────────────┐
│  100dvh, flex center           │
│                                │
│  "Clark Jain"                  │
│  "PRESENTS"                    │
│                                │
│  ─── ✦ ───                     │
│                                │
│  "THE BIRTHDAY PREMIERE"       │
│  (massive, gold, GSAP split)   │
│                                │
│  "🎬 23 March 2025"            │
│  "Inorbit Mall, Mumbai"        │
│                                │
│  ↓ scroll indicator ↓          │
└────────────────────────────────┘
```

**Animations (trigger: `whileInView` or on password unlock):**
1. **T=0ms:** Black screen
2. **T=300ms:** "Clark Jain" fades in from top (Cinzel, clamp(1rem, 3vw, 1.5rem), gold, letter-spacing: 0.3em, uppercase)
3. **T=800ms:** "PRESENTS" types in letter by letter (DM Mono, muted, 0.85rem, letter-spacing: 0.5em)
4. **T=1200ms:** Decorative divider line slides in from center outward (gold, 1px, 120px width)
5. **T=1500ms:** "THE BIRTHDAY PREMIERE" — GSAP SplitText:
   - Each letter drops from above with `y: -100, opacity: 0 → y: 0, opacity: 1`
   - Stagger: 0.04s per letter
   - Font: Cinzel Decorative, `clamp(2.5rem, 10vw, 5rem)`, gold, `text-glow-gold`
   - Each letter has slight rotation on land: `rotation: random(-3, 3) → 0`
6. **T=2500ms:** Date + venue fade in (Cormorant, muted)
7. **T=3000ms:** Scroll indicator pulses (chevron down, opacity 0.3→0.7→0.3, infinite)

**Background:**
- Subtle radial gradient: center = rgba(255,215,0,0.03), edges = #0A0A0A
- Animated spotlight cone (CSS conic-gradient or pseudo-element):
  - Slight sway animation: rotate -5deg → 5deg, 8s, infinite
  - Very subtle, opacity 0.05 max (don't overpower text)

---

### SECTION C — PARTY DETAILS (Movie Poster Style)

**Concept:** Styled exactly like a classic Bollywood movie poster — with all the dramatic taglines and production details.

**Layout:**
```
┌──────────────────────────────┐
│   "A CLARK JAIN PRODUCTION"  │  ← small, gold, uppercase, letterspaced
│                              │
│   ┌──────────────────┐       │
│   │  POSTER CARD      │      │  ← glass-cinema
│   │                  │       │
│   │  🎬              │       │
│   │  "THE GRAND      │       │
│   │   BIRTHDAY       │       │
│   │   CELEBRATION"   │       │
│   │                  │       │
│   │  ⭐ 23 March 2025│       │
│   │  🕐 Showtime TBD │       │
│   │  📍 Inorbit Mall │       │
│   │     Malad, Mumbai│       │
│   │                  │       │
│   │  "Certificate:   │       │
│   │   U/A (Unlimited │       │
│   │   Awesome)"      │       │
│   └──────────────────┘       │
│                              │
│   "Produced by Clark Jain    │
│    Studios ✦ In Association  │
│    with Inorbit Mall"        │
└──────────────────────────────┘
```

**Poster card:**
- `glass-cinema` with a subtle gold inner border effect (double border trick or `::after` pseudo-element)
- Gradient border: `linear-gradient(135deg, rgba(255,215,0,0.3), transparent, rgba(255,215,0,0.3))`
- max-width: 400px, padding: 32px
- Framer Motion `whileInView`: scale 0.9 → 1, opacity 0 → 1, duration 0.6

**Detail chips** (date, time, venue):
- Each in its own mini glass chip
- gold emoji + white text
- flex-wrap, gap: 10px
- min-width: fit-content (NEVER crop)

**Fun Easter eggs:**
- "Certificate: U/A (Unlimited Awesome)" at bottom of poster in tiny text
- "Produced by Clark Jain Studios ✦" below poster

---

### SECTION D — THE CAST (Film Credits Style)

**Concept:** Classic Bollywood film credits — role above, name below, with dramatic reveal.

**Layout:**
```
┌────────────────────────────────┐
│  "STARRING" (gold, letterspaced)│
│                                │
│  ┌────────┐ ┌────────┐        │
│  │ 🦸 Lead │ │ 😈 Vill │       │  ← horizontal scroll snap
│  │ Hero    │ │ lain   │        │     on mobile (78vw each)
│  │ JAGRAT  │ │ MOHIT  │        │
│  │ "bhai   │ │ "scene │        │
│  │  sabka  │ │  chura │        │
│  │  hero"  │ │  leta" │        │
│  └────────┘ └────────┘        │
│                                │
│        · · · · ·               │  ← dot indicators
└────────────────────────────────┘
```

**5 Cast Members:**

| Name | Role | Emoji | Tagline | Color |
|------|------|-------|---------|-------|
| Jagrat | Lead Hero | 🦸 | "Entry mein hi taaliyan bajti hain" | #FFD700 (gold) |
| Mohit | The Villain | 😈 | "Sabki plans barbaad karta hai... with love" | #DC143C (red) |
| Karan | Item Number Performer | 💃 | "Dance floor ka asli owner" | #FF69B4 (pink) |
| Sai | Comic Relief | 🤡 | "Timing itni perfect ki director bhi hase" | #00FF41 (green) |
| Khushi | Leading Lady | 👑 | "Bina iske picture hit nahi hoti" | #DA70D6 (orchid) |

**Card interaction:**
- Mobile: horizontal scroll-snap (78vw per card, `scroll-snap-type: x mandatory`)
- Each card: `glass-cinema`, stagger entry 100ms
- Tap/hover: card scales 1.02, border glows with character's color, sound effect (short "ting" via Howler.js)
- Name: Cinzel Decorative, 1.3rem, character color
- Role: DM Mono, 0.75rem, gold pill badge above name
- Tagline: Cormorant, 0.9rem, muted
- Top: large emoji (3rem), slight bounce animation

**Dot indicators:** below scroll area, active = gold, inactive = white 20%

---

### SECTION E — COUNTDOWN TIMER

**Concept:** Dramatic premiere countdown — "The curtain rises in..."

**Layout:**
```
┌────────────────────────────────┐
│ "PREMIERE IN" (gold, small)    │
│                                │
│  ┌──┐  ┌──┐  ┌──┐  ┌──┐      │
│  │DD│  │HH│  │MM│  │SS│      │  ← 4 glass-cinema boxes
│  │25│  │07│  │42│  │18│      │
│  └──┘  └──┘  └──┘  └──┘      │
│  Days  Hrs   Mins  Secs       │
│                                │
│  "Don't be fashionably late.  │
│   Be Bollywood late. 😎"      │
└────────────────────────────────┘
```

**Target date:** 23 March 2025, 18:00 IST (or a suitable default)

**Each digit box:**
- glass-cinema mini card, 64px × 72px (min), flex center
- Number: Cinzel Decorative, clamp(1.5rem, 5vw, 2.5rem), gold
- Label below: DM Mono, 0.65rem, muted

**Animation:**
- Framer Motion `AnimatePresence` on each digit:
  - Old digit: `y: 0 → -20, opacity: 1 → 0` (exit)
  - New digit: `y: 20 → 0, opacity: 0 → 1` (enter)
  - Spring: `stiffness: 300, damping: 20`
- Seconds box: subtle pulse every tick (scale 1 → 1.03 → 1, 200ms)
- `whileInView` trigger — only animate when visible (perf)

**If date has passed:** Show "🎬 THE PREMIERE HAS BEGUN!" instead of timer

---

### SECTION F — AI DIALOGUE GENERATOR (Groq API)

**Concept:** "Get Your Filmy Dialogue" — users enter their name, AI generates a Bollywood-style dramatic dialogue for them.

**Layout:**
```
┌────────────────────────────────┐
│ "GET YOUR FILMY DIALOGUE 🎤"  │
│                                │
│ ┌──────────────────────────┐   │
│ │ glass-cinema card         │   │
│ │                          │   │
│ │ "Enter your name, star"  │   │
│ │ [_input field___] [🎬]   │   │
│ │                          │   │
│ │ ┌──────────────────┐     │   │
│ │ │ AI dialogue text  │     │   │
│ │ │ appears here with │     │   │
│ │ │ typewriter effect  │    │   │
│ │ └──────────────────┘     │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

**API Route:** `/app/api/dialogue/route.ts`

```typescript
// POST body: { name: string }
// Groq model: "llama-3.3-70b-versatile"
// Streaming response

const prompt = `Generate a dramatic Bollywood movie style dialogue for ${name} who is attending Clark Jain's birthday premiere at Inorbit Mall on 23 March. Make it filmy, funny, over the top. 3-4 lines max. Hinglish. End with a classic Bollywood one-liner.`;
```

**Input row:**
- Row layout: `[INPUT flex-1] [SUBMIT 52x52 icon button]`
- gap: 12px
- Submit icon: 🎬 (or 🎤), gold gradient background
- Input: `input-cinema`, placeholder: "Apna naam daalo, star..."

**States:**

1. **IDLE:** Empty output area, just the input row

2. **LOADING (streaming):**
   - Skeleton: 3 pulsing gold lines (height: 14px, `opacity: [0.2, 0.4, 0.2]`, widths: 80%, 100%, 60%)
   - Label: "Director sahab soch rahe hain... 🎬" (DM Mono, 0.78rem, muted)
   - After stream starts: skeleton hides, text appears with typewriter cursor

3. **STREAMING:**
   - Text appears character by character (from ReadableStream)
   - Blinking gold cursor at end: `width: 8px, height: 16px, background: #FFD700`
   - Font: DM Mono, 0.9rem, rgba(255,255,255,0.85), line-height 1.8
   - Container: dark inset, `background: rgba(0,0,0,0.3)`, padding: 16px, border-radius: 12px

4. **COMPLETED:**
   - Cursor disappears
   - "🎬" stamp appears with spring animation (scale 0→1)
   - "Try another name →" ghost button appears below

5. **ERROR:**
   - Fallback text auto-displays:
     `"Dialogue ki reel phat gayi! 🎬 Koi nahi, tu star hai — bas aa ja party mein. Clark is waiting!"`
   - "Try Again" ghost button

**Streaming hook (`useGroqStream.ts`):**
```typescript
// Calls POST /api/dialogue
// Reads ReadableStream
// Appends chunks to state
// Provides: { text, isStreaming, generate, error }
```

---

### SECTION G — FOOTER

**Layout:**
```
┌──────────────────────────────┐
│                              │
│  "See You on the Red Carpet" │  ← Cinzel, gold, text-glow
│          🎬                  │
│                              │
│  ── film strip divider ──    │  ← CSS repeating squares
│                              │
│  "A Clark Jain Production"   │  ← DM Mono, 0.7rem, muted
│  "© 2025 All Rights Reserved │
│   to Having the Best Time"   │
│                              │
│  padding-bottom: safe-area   │
└──────────────────────────────┘
```

**Film strip divider:** CSS `repeating-linear-gradient` to create small squares that look like a 35mm film strip (gold on dark). Height: 24px. Subtle horizontal scroll animation (infinite, 30s, linear).

---

## 3. MICRO-INTERACTIONS

### 3.1 Spotlight Cursor (Desktop Only)

```
- Canvas overlay, z-index: 9999, pointer-events: none
- Radial gradient follows mouse:
  center: rgba(255, 215, 0, 0.06)
  edge: transparent
  radius: 200px
- Smooth follow (lerp 0.15)
- Hidden on touch devices:
  @media (hover: none), (pointer: coarse) → return null
- Original cursor: custom gold dot (4px) + trail
```

### 3.2 Film Grain Overlay

```css
.film-grain::after {
  content: '';
  position: fixed; inset: 0;
  z-index: 9998; pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,..."); /* noise */
  /* OR use CSS: */
  background: repeating-conic-gradient(
    transparent 0%, rgba(255,255,255,0.03) 0.0005%
  );
  animation: grainShift 0.5s steps(1) infinite;
}
@keyframes grainShift {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2%, 2%); }
  50% { transform: translate(2%, -1%); }
  75% { transform: translate(-1%, -2%); }
}
/* Disable for prefers-reduced-motion */
```

### 3.3 Sound Effects (Howler.js)

```
All sounds are user-triggered or after first interaction only.
Never autoplay audio.

Sounds (use Web Audio API synthesis, no external files):
- "ting"     : Short sparkle (on cast card tap)
- "whoosh"   : Swoosh (on section transitions)
- "applause" : Short clap (on correct password)
- "bass"     : Deep bass hit (on hero reveal)
- "click"    : Subtle click (on button press)
- "error"    : Low buzz (on wrong password)

Sound toggle: fixed bottom-left, 44x44px,
  glass-cinema circle, 🔊/🔇 icon
```

### 3.4 Scroll-Triggered Animations

```
Every section uses Framer Motion whileInView:
- viewport: { once: true, amount: 0.3 }
- Default entry: opacity 0→1, y 30→0, duration 0.6
- Cards: stagger 0.08s per item
- Heading text: GSAP SplitText where specified
- Countdown: only processes when in view
```

### 3.5 Confetti (Correct Password)

```
Gold + red particles (canvas-based)
80 particles on mobile, 150 on desktop
Duration: 2.5s
Gravity + random spread
Colors: #FFD700, #DAA520, #DC143C, #FFF8DC
```

---

## 4. ANIMATION STANDARDS

### Timing Scale

```
Micro (feedback):     150–200ms   ease-out
Standard (elements):  300–400ms   ease-in-out
Dramatic (sections):  600–800ms   ease-in-out
Cinematic (hero):     1000–1500ms custom cubic-bezier
```

### Framer Motion Spring Configs

```javascript
const springs = {
  bouncy:  { type: "spring", stiffness: 400, damping: 17 },
  smooth:  { type: "spring", stiffness: 200, damping: 25 },
  gentle:  { type: "spring", stiffness: 100, damping: 20 },
  snappy:  { type: "spring", stiffness: 500, damping: 30 },
};
```

### Stagger

```
Default stagger: 0.08s per item
Max stagger: 0.12s (never exceed)
Use Framer Motion staggerChildren in parent variants
```

### GSAP Patterns

```
Hero text: GSAP SplitText → stagger 0.04s, y: -100→0, ease: "back.out(1.7)"
Shake:     x: [-10, 10, -8, 8, -5, 5, 0], duration: 0.5
```

### ONLY Animate (GPU safe):

```
✅ transform (translate, scale, rotate)
✅ opacity
❌ NEVER: width, height, top, left, margin, padding, border-width
```

---

## 5. MOBILE UI/UX RULES (CRITICAL)

```
✅ Use 100dvh NOT 100vh (iOS Safari fix)
✅ env(safe-area-inset-bottom) on ALL bottom elements
✅ Font size ≥ 16px on inputs (prevents iOS zoom)
✅ Touch targets ≥ 44x44px ALWAYS
✅ -webkit-tap-highlight-color: transparent on all elements
✅ touch-action: manipulation on all buttons
✅ No horizontal overflow — EVER (overflow-x: hidden on body)
✅ Single column layout, max-width 480px, centered
✅ Padding: 20px horizontal minimum
✅ overscroll-behavior: contain on scroll containers
✅ position: fixed elements: transform: translateZ(0)

✅ Keyboard handling:
   Use visualViewport API to detect keyboard open
   Adjust password card position so input stays visible
   Smooth transition (300ms)

✅ prefers-reduced-motion:
   Disable film grain
   Disable spotlight cursor
   Disable confetti particles
   Max animation duration: 300ms
   Keep functional transitions only
```

---

## 6. PERFORMANCE RULES

```
- React.lazy + Suspense for below-fold sections
- Dynamic import for GSAP (only hero section needs it)
- Dynamic import for Howler.js (only when sound toggled on)
- Particles: max 80 mobile, 150 desktop
- will-change: transform on animated elements (remove after animation)
- Only transform + opacity animations
- next/image with proper sizes prop (if any images used)
- next/font for all fonts (zero FOUT)
- Lenis smooth scroll: only initialize after password unlocked
- Countdown: clearInterval when not in viewport
- Canvas grain: very low resolution (180x180), scaled up via CSS
- Sound manager: lazy singleton, all sounds synthesized (no network)
```

---

## 7. STATE MANAGEMENT (Zustand)

```typescript
interface CinemaStore {
  isUnlocked: boolean;        // password correct
  unlock: () => void;

  soundEnabled: boolean;
  toggleSound: () => void;
}

// Persist: sessionStorage
// (isUnlocked survives refresh for same session)
```

---

## 8. LOADING + ERROR STATES

### Loading States
```
- Password submit → button shows spinner + "Verifying..."
  (only 300ms artificial delay for dramatic feel)
- Groq API → skeleton immediately, typewriter on stream
- Sections on scroll → whileInView trigger (no flash)
```

### Error States
```
Global error boundary:
  "🎬 Reel phat gayi!
   Kuch toh gadbad hai...
   [TRY AGAIN]"
  (glass-cinema card, centered)

Groq API error / rate limit:
  "Director sahab lunch pe gaye hain 🎬
   Fallback dialogue: 'Tu star hai, bas aa ja!'"
  Retry button appears

Network issues:
  Toast notification (top center, auto-dismiss 4s)
  "Intermission chal raha hai... 🍿"
```

---

## 9. FOLDER STRUCTURE

```
/app
  layout.tsx         ← Root layout, fonts, metadata
  page.tsx           ← Main orchestrator, password overlay + sections
  globals.css        ← Full design system CSS
  /api
    /dialogue
      route.ts       ← Groq streaming API endpoint

/components
  /sections
    PasswordGate.tsx  ← Full-screen overlay with VIP entry
    HeroSection.tsx   ← Cinematic opening, GSAP SplitText
    PartyDetails.tsx  ← Movie poster card
    TheCast.tsx       ← Horizontal scroll credit cards
    Countdown.tsx     ← Live countdown timer
    DialogueGen.tsx   ← AI dialogue input + streaming output
    Footer.tsx        ← Closing + film strip
  /ui
    SpotlightCursor.tsx ← Gold cursor (desktop only)
    FilmGrain.tsx       ← Noise overlay
    ConfettiCanvas.tsx  ← Gold confetti on unlock
    SoundToggle.tsx     ← Fixed sound button

/hooks
  useGroqStream.ts   ← Streaming fetch + typewriter
  useSoundManager.ts ← Howler.js synth sounds
  useCountdown.ts    ← Countdown logic
  useLenis.ts        ← Smooth scroll init

/store
  useCinemaStore.ts  ← Zustand (isUnlocked, sound)

/lib
  groqClient.ts      ← Groq SDK init
  castData.ts        ← Friends + roles + taglines
```

---

## 10. FINAL QA CHECKLIST

```
□ No horizontal scroll on any viewport width
□ All text readable (WCAG AA contrast > 4.5:1)
□ All touch targets ≥ 44x44px
□ Input font-size ≥ 16px (no iOS zoom)
□ Password input never hidden behind keyboard
□ Password works: "clark jain", "Clark Jain", "CLARK JAIN", "clarkjain"
□ Confetti fires on correct password
□ Error shake + message on wrong password
□ GSAP hero text animation plays smoothly
□ All sections animate on scroll (whileInView)
□ Countdown calculates correctly
□ Countdown shows "PREMIERE HAS BEGUN" if past date
□ Groq streaming works with typewriter effect
□ Groq error shows fallback message
□ Sound toggle works (all sounds respect it)
□ No autoplay audio before user interaction
□ Film grain visible but not distracting (opacity ≤ 0.04)
□ Custom cursor hidden on mobile/touch
□ prefers-reduced-motion disables non-essential animations
□ Safe area insets applied (iPhone notch)
□ 60fps on mid-range Android (Moto G Power)
□ Works on iOS Safari 16+
□ Works on Chrome Android
□ Works on desktop Chrome/Firefox
□ SessionStorage persists unlock state
□ No console errors
□ Lenis smooth scroll active after unlock
□ Footer film strip animation smooth
□ Cast cards scroll snap correctly on mobile
□ Responsive at all breakpoints (320px → 1440px)
```

---

## IMPLEMENTATION ORDER

1. **Foundation:** `layout.tsx` + `globals.css` + fonts
2. **Store:** `useCinemaStore.ts`
3. **Data:** `castData.ts` + `groqClient.ts`
4. **Password Gate:** Full overlay with confetti
5. **Hero Section:** GSAP SplitText + spotlight
6. **Party Details:** Movie poster card
7. **The Cast:** Horizontal scroll cards
8. **Countdown:** Live timer with digit animations
9. **Dialogue Generator:** Groq streaming + UI
10. **Footer:** Film strip + closing
11. **Global UI:** Cursor, film grain, sound toggle
12. **Hooks:** Sound, stream, countdown, Lenis
13. **Polish:** Responsive, reduced motion, error boundaries
14. **QA:** Full checklist pass

---

> **This prompt should produce a complete, premium, no-jank Bollywood Movie Premiere birthday invitation that makes everyone go "PAISA VASOOL! 🎬🍿"**
