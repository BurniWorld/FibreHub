---
name: Design System
description: CoreConnect design system with colors, typography, spacing, and visual patterns
---

# Design System Skill

CoreConnect's visual design system for consistent, premium UI experiences.

## Brand Identity

### Color Palette

| Name | Variable | Value | Usage |
|------|----------|-------|-------|
| **Primary** | `--primary` | `#e31b23` | CTAs, active states, brand accents |
| **Primary Dark** | `--primary-dark` | `#c41820` | Hover states |
| **Secondary** | `--secondary` | `#1a1a1a` | Backgrounds, text |
| **Accent** | `--accent` | `#22d3ee` | Highlights, notifications |
| **Success** | `--success` | `#22c55e` | Positive states |
| **Warning** | `--warning` | `#f59e0b` | Alerts |
| **Destructive** | `--destructive` | `#ef4444` | Errors, deletions |

### Dark Theme (Default)

```css
:root {
  --background: 222 47% 11%;        /* #0f172a */
  --foreground: 0 0% 100%;          /* White text */
  --card: 222 47% 14%;              /* #1e293b */
  --card-foreground: 0 0% 100%;
  --popover: 222 47% 14%;
  --popover-foreground: 0 0% 100%;
  --primary: 0 84% 50%;             /* #e31b23 */
  --primary-foreground: 0 0% 100%;
  --muted: 222 47% 20%;
  --muted-foreground: 0 0% 65%;
  --border: 222 47% 20%;
  --input: 222 47% 20%;
  --ring: 0 84% 50%;
}
```

### Hero Gradient

```css
.hero-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
}
```

## Typography

### Font Stack

```css
--font-sans: 'Outfit', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| **Display** | 48px / 3rem | 700 | Hero headlines |
| **H1** | 36px / 2.25rem | 600 | Page titles |
| **H2** | 24px / 1.5rem | 600 | Section headers |
| **H3** | 20px / 1.25rem | 600 | Card titles |
| **Body** | 16px / 1rem | 400 | Paragraphs |
| **Small** | 14px / 0.875rem | 400 | Labels, captions |
| **XS** | 12px / 0.75rem | 500 | Badges, tags |

### Implementation

```tsx
<h1 className="text-4xl font-bold tracking-tight">
  Dashboard
</h1>
<h2 className="text-2xl font-semibold">
  Section Title
</h2>
<p className="text-base text-muted-foreground">
  Body text content
</p>
```

## Spacing System

Use Tailwind's spacing scale consistently:

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Icon gaps |
| `3` | 12px | Button padding |
| `4` | 16px | Card padding |
| `6` | 24px | Section gaps |
| `8` | 32px | Large gaps |

## Glassmorphism

The signature CoreConnect style:

```tsx
<div className="
  bg-card/50 
  backdrop-blur-xl 
  border border-border/50 
  rounded-xl 
  shadow-lg
">
  {/* Content */}
</div>
```

### Card Variants

```tsx
// Standard Card
<Card className="border border-border/50 bg-card/50 backdrop-blur-xl">

// Elevated Card (hover effect)
<Card className="
  border border-border/50 
  bg-card/50 
  backdrop-blur-xl 
  hover:border-primary/50 
  transition-colors
">

// Featured Card (glow effect)
<Card className="
  border-2 border-primary/50 
  bg-card/50 
  backdrop-blur-xl 
  shadow-[0_0_30px_rgba(227,27,35,0.2)]
">
```

## Border Radius

```css
--radius-sm: 0.375rem;  /* 6px - buttons, inputs */
--radius-md: 0.5rem;    /* 8px - cards */
--radius-lg: 0.75rem;   /* 12px - modals */
--radius-xl: 1rem;      /* 16px - large containers */
```

## Shadows

```css
/* Subtle shadow */
.shadow-subtle {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Card shadow */
.shadow-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

/* Elevated shadow */
.shadow-elevated {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Glow effect (primary) */
.shadow-glow {
  box-shadow: 0 0 30px rgba(227, 27, 35, 0.3);
}
```

## Animation Tokens

```css
/* Transition durations */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Easing functions */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### Micro-animations

```tsx
// Hover scale
className="transition-transform hover:scale-105"

// Fade in
className="animate-in fade-in duration-300"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-300"
```

## Icon Guidelines

- Use **Lucide React** icons
- Size: 16px for inline, 20px for buttons, 24px for cards
- Stroke width: 2 (default)

```tsx
import { Users, DollarSign, Activity } from "lucide-react";

<Users className="h-5 w-5 text-primary" />
```

## Checklist

- [ ] Using CSS variables for colors
- [ ] Outfit font loaded from Google Fonts
- [ ] Glassmorphism applied to cards
- [ ] Consistent spacing (4px grid)
- [ ] Micro-animations on interactive elements
- [ ] Dark theme as default
