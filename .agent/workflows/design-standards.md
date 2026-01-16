---
description: Apply 2026 web design standards to a new page or component
---

# Design Standards Workflow

Apply this workflow when creating any new page, component, or major UI update. This ensures compliance with 2026 web design standards.

## Prerequisites

// turbo
1. Read the design skills first:
   - View `.agent/skills/web-design-2026/SKILL.md`
   - View `.agent/skills/growth-ux/SKILL.md`
   - View `.agent/skills/design-system/SKILL.md`

## Phase 1: Planning (Before Code)

2. Define the page/component purpose:
   - What is the primary user goal?
   - What is the primary business goal?
   - What is the single most important action?

3. Sketch the visual hierarchy:
   - Hook (0.05s attention grab)
   - Context (why this matters)
   - Evidence (proof/data)
   - Action (clear CTA)

## Phase 2: Foundation

// turbo
4. Ensure design tokens are loaded in `globals.css`:
   ```css
   :root {
     --primary: 0 84% 50%;
     --background: 222 47% 11%;
     /* etc */
   }
   ```

// turbo
5. Verify Google Fonts are imported:
   ```tsx
   // In layout.tsx
   import { Outfit } from 'next/font/google';
   ```

## Phase 3: Build with Standards

6. Apply organic layout:
   - Use soft curves (`rounded-2xl`, `rounded-3xl`)
   - Break the grid where appropriate
   - Add depth with layered backgrounds

7. Implement kinetic typography:
   - Headlines should have gradient or animation
   - Use staggered reveals for lists
   - Add typewriter effect for AI responses

8. Apply glassmorphism:
   ```tsx
   className="bg-card/50 backdrop-blur-xl border border-border/50"
   ```

9. Add micro-animations to all interactive elements:
   - Buttons: `hover:scale-105 active:scale-95`
   - Cards: `hover:border-primary/50 transition-colors`
   - Links: `hover:text-primary transition-colors`

10. Implement loading states:
    - Create skeleton loaders
    - Use Suspense boundaries
    - Show progress indicators

## Phase 4: Performance Audit

// turbo
11. Check bundle size:
    ```bash
    npm run build
    ```
    Target: < 200KB first load JS

12. Verify images are optimized:
    - Using Next.js `<Image>` component
    - WebP format where possible
    - Proper `width` and `height` attributes

13. Lazy load below-fold content:
    ```tsx
    import dynamic from 'next/dynamic';
    const HeavyComponent = dynamic(() => import('@/components/heavy'));
    ```

## Phase 5: Accessibility Check

14. Run accessibility audit:
    // turbo
    ```bash
    npx axe-core-cli http://localhost:3000
    ```

15. Manual accessibility checklist:
    - [ ] Color contrast 4.5:1 for text
    - [ ] All images have alt text
    - [ ] Focus indicators visible
    - [ ] Keyboard navigation works
    - [ ] Reduced motion respected

## Phase 6: Final Polish

16. Test responsive design:
    - Mobile (375px)
    - Tablet (768px)  
    - Desktop (1280px)
    - Large (1920px)

17. Review micro-interactions:
    - All hover states feel natural
    - Transitions are 200-300ms
    - No janky animations

18. Verify dark mode:
    - All colors use CSS variables
    - No hardcoded colors
    - Contrast maintained

## Completion Checklist

Before marking complete, verify:

- [ ] Organic layout with soft curves
- [ ] Kinetic typography for headlines
- [ ] Glassmorphism applied to cards
- [ ] Micro-animations on interactives
- [ ] Loading skeletons implemented
- [ ] Performance budget met (< 2s LCP)
- [ ] WCAG 2.1 AA accessible
- [ ] Reduced motion supported
- [ ] Mobile-first responsive
- [ ] Dark theme working
