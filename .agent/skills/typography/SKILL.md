---
name: AI-Enhanced Typography
description: Kinetic typography, variable fonts, and dynamic text animations for 2026 web design
---

# AI-Enhanced Typography Skill

Modern typography that moves, responds, and captivates. This skill covers kinetic text effects, variable fonts, and AI-powered dynamic typography.

## Core Principle

> "Kinetic and variable fonts turn static text into a dynamic, attention-grabbing storytelling element."

Typography is no longer just content—it's an experience.

---

## 1. Variable Fonts Setup

### Installation

Add variable fonts to your Next.js app:

```tsx
// app/layout.tsx
import { Inter, Outfit } from 'next/font/google';

// Variable font with weight axis
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### CSS Configuration

```css
/* globals.css */
:root {
  --font-sans: 'Outfit', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Variable font weight transitions */
.font-variable {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 0.3s ease;
}

.font-variable:hover {
  font-variation-settings: 'wght' 700;
}
```

---

## 2. Gradient Text

### Static Gradient

```tsx
<h1 className="
  text-5xl font-bold
  bg-gradient-to-r from-primary via-accent to-primary
  bg-clip-text text-transparent
">
  Gradient Headline
</h1>
```

### Animated Gradient

```tsx
// Component
<h1 className="
  text-5xl font-bold
  bg-gradient-to-r from-primary via-accent to-primary
  bg-[length:200%_100%]
  bg-clip-text text-transparent
  animate-gradient-x
">
  Flowing Gradient
</h1>

// CSS
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 3s ease-in-out infinite;
}
```

---

## 3. Staggered Text Reveal

### Word-by-Word Reveal

```tsx
interface StaggerTextProps {
  text: string;
  className?: string;
  delayPerWord?: number;
}

export function StaggerText({ 
  text, 
  className = "",
  delayPerWord = 100 
}: StaggerTextProps) {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDelay: `${i * delayPerWord}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

// Usage
<StaggerText 
  text="Transform Your ISP Operations"
  className="text-5xl font-bold"
/>
```

### Character-by-Character Reveal

```tsx
export function CharacterReveal({ text, className = "" }) {
  const characters = text.split('');
  
  return (
    <span className={className} aria-label={text}>
      {characters.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-in fade-in"
          style={{ 
            animationDelay: `${i * 30}ms`,
            animationDuration: '150ms'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
```

---

## 4. Typewriter Effect

### Simple Typewriter

```tsx
"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export function Typewriter({ text, speed = 50, className = "" }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  
  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Usage
<Typewriter 
  text="Hello, I'm your AI assistant."
  speed={40}
  className="text-lg"
/>
```

### Typewriter with Cursor Blink

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}
```

---

## 5. Text Scale Animation

### Pulse on Highlight

```tsx
// Number that pulses when it changes
export function AnimatedNumber({ value, className = "" }) {
  const [animate, setAnimate] = useState(false);
  const prevValue = useRef(value);
  
  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      prevValue.current = value;
      return () => clearTimeout(timeout);
    }
  }, [value]);
  
  return (
    <span className={cn(
      className,
      "transition-transform duration-300",
      animate && "scale-110"
    )}>
      {value.toLocaleString()}
    </span>
  );
}
```

### Hover Scale

```tsx
<h2 className="
  text-3xl font-bold
  transition-transform duration-200
  hover:scale-105
  origin-left
">
  Hover to Emphasize
</h2>
```

---

## 6. Split Text for 3D Effects

### 3D Text Rotation

```tsx
export function Text3D({ text, className = "" }) {
  return (
    <span 
      className={cn("inline-block perspective-1000", className)}
      style={{ perspective: '1000px' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-300 hover:[transform:rotateY(20deg)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
```

---

## 7. AI Chat Typography

### Response Bubble

```tsx
export function AIResponse({ text, isTyping = false }) {
  return (
    <div className="
      relative
      bg-card/30 backdrop-blur-md
      rounded-2xl rounded-tl-sm
      border border-border/30
      p-4
      max-w-[80%]
      animate-in slide-in-from-left-2 duration-300
    ">
      {isTyping ? (
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '300ms' }} />
        </div>
      ) : (
        <Typewriter text={text} speed={20} />
      )}
    </div>
  );
}
```

---

## 8. Accessibility Considerations

### Reduced Motion Support

```tsx
// Check user preference
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In component
<StaggerText 
  text="Animated Headline"
  delayPerWord={prefersReducedMotion ? 0 : 100}
/>
```

### CSS Fallback

```css
@media (prefers-reduced-motion: reduce) {
  .animate-gradient-x,
  .animate-in {
    animation: none !important;
  }
  
  .cursor-blink {
    animation: none;
    opacity: 1;
  }
}
```

### Screen Reader Considerations

```tsx
// For animated text, provide full text to screen readers
<span aria-label={fullText}>
  <span aria-hidden="true">
    {/* Animated content */}
  </span>
</span>
```

---

## Quick Reference

| Effect | Use Case | Performance |
|--------|----------|-------------|
| **Gradient Text** | Headlines, CTAs | Excellent |
| **Stagger Reveal** | Hero headlines, lists | Good |
| **Typewriter** | AI responses, commands | Good |
| **Character Reveal** | Special moments | Use sparingly |
| **3D Text** | Hover effects | Moderate |
| **Animated Numbers** | Stats, counters | Excellent |

---

## Implementation Checklist

- [ ] Variable fonts loaded with `next/font`
- [ ] Gradient text on hero headlines
- [ ] Stagger reveal on page load
- [ ] Typewriter for AI/chat responses
- [ ] Reduced motion respected
- [ ] Screen reader accessible
- [ ] No janky animations (use transform only)
