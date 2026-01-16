---
name: Accessibility Standards
description: WCAG 2.1 AA compliance, inclusive design patterns, and testing methodology
---

# Accessibility Standards Skill

Accessibility is not optional. With 94.8% of homepages having detectable failures, this is both a legal requirement and a competitive advantage.

## The Case for Accessibility

- **15%** of the global population has a disability
- **94.8%** of homepages have detectable accessibility failures
- **POPIA** requires reasonable accommodation
- **Better SEO** - accessible sites rank higher
- **Better UX** - accessibility improvements help everyone

---

## 1. WCAG 2.1 AA Requirements

### The Four Principles (POUR)

| Principle | Meaning | Examples |
|-----------|---------|----------|
| **Perceivable** | Users can perceive content | Alt text, captions, contrast |
| **Operable** | Users can navigate and interact | Keyboard, focus, timing |
| **Understandable** | Content is clear | Language, consistency, errors |
| **Robust** | Works with assistive tech | Valid HTML, ARIA |

---

## 2. Color & Contrast

### Minimum Contrast Ratios

| Element | Ratio | Tool |
|---------|-------|------|
| Body text | 4.5:1 | WebAIM Contrast Checker |
| Large text (18px+) | 3:1 | |
| UI components | 3:1 | |
| Focus indicators | 3:1 | |

### Implementation

```tsx
// Our design system colors meet contrast requirements
// Primary (#e31b23) on dark background (#0f172a) = 5.2:1 ✅

// For custom colors, verify:
// Text on bg-card: text-foreground (white on dark) ✅
// Text on bg-primary: text-primary-foreground (white) ✅
```

### Color Independence

Never rely on color alone to convey information:

```tsx
// ❌ Bad - color only
<span className="text-red-500">Error</span>
<span className="text-green-500">Success</span>

// ✅ Good - color + icon/text
<span className="text-destructive flex items-center gap-2">
  <XCircle className="h-4 w-4" />
  Error: Invalid email
</span>

<span className="text-success flex items-center gap-2">
  <CheckCircle className="h-4 w-4" />
  Success: Saved
</span>
```

---

## 3. Keyboard Navigation

### Focus Management

Every interactive element must be keyboard accessible:

```tsx
// Focus ring styling
<Button className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary
  focus-visible:ring-offset-2
  focus-visible:ring-offset-background
">
  Click Me
</Button>

// Custom focus styles
<input className="
  focus:border-primary
  focus:ring-2 focus:ring-primary/50
  transition-colors
" />
```

### Focus Order

Ensure logical tab order:

```tsx
// ❌ Bad - breaks natural order
<div className="flex flex-row-reverse">
  <button>Third visually, first in DOM</button>
  <button>Second</button>
  <button>First visually, third in DOM</button>
</div>

// ✅ Good - order matches visual layout
<div className="flex">
  <button>First</button>
  <button>Second</button>
  <button>Third</button>
</div>
```

### Skip Links

```tsx
// Add at the top of layout
<a 
  href="#main-content"
  className="
    sr-only focus:not-sr-only
    focus:absolute focus:top-4 focus:left-4
    focus:z-50 focus:p-4
    focus:bg-background focus:text-foreground
    focus:rounded-md focus:shadow-lg
  "
>
  Skip to main content
</a>

// Main content target
<main id="main-content" tabIndex={-1}>
  {/* Page content */}
</main>
```

### Keyboard Trapping (Modals)

```tsx
// Use Radix UI Dialog - handles focus trapping automatically
import { Dialog, DialogContent } from '@/components/ui/dialog';

<Dialog>
  <DialogContent>
    {/* Focus is trapped within when open */}
    {/* Escape closes, focus returns to trigger */}
  </DialogContent>
</Dialog>
```

---

## 4. Screen Readers

### Semantic HTML

```tsx
// ✅ Use semantic elements
<header>Navigation and branding</header>
<nav aria-label="Main navigation">Links</nav>
<main>Primary content</main>
<aside>Sidebar content</aside>
<footer>Footer content</footer>

// ❌ Avoid div soup
<div class="header">
  <div class="nav">
```

### Headings Hierarchy

```tsx
// ✅ Proper heading order
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

// ❌ Skipping levels
<h1>Title</h1>
  <h4>Subsection</h4>  // Missing h2, h3
```

### ARIA Labels

```tsx
// Icon-only buttons need labels
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Form inputs need labels
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />

// Or use aria-label for hidden labels
<Input 
  type="search" 
  placeholder="Search..."
  aria-label="Search customers"
/>
```

### Live Regions

Announce dynamic content changes:

```tsx
// Toast notifications
<div 
  role="alert" 
  aria-live="polite"
  className="toast"
>
  Changes saved successfully
</div>

// Loading states
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Content loaded'}
</div>

// Error messages
<div role="alert" aria-live="assertive">
  {error && `Error: ${error.message}`}
</div>
```

---

## 5. Images & Media

### Alt Text

```tsx
// Informative images - describe content
<Image 
  src="/dashboard-preview.png"
  alt="Dashboard showing revenue chart and customer metrics"
/>

// Decorative images - empty alt
<Image 
  src="/decorative-pattern.svg"
  alt=""
  aria-hidden="true"
/>

// Functional images - describe function
<Image 
  src="/download-icon.svg"
  alt="Download report"
/>
```

### Complex Images

```tsx
// Charts and graphs need text alternatives
<figure>
  <Image 
    src="/revenue-chart.png"
    alt="Monthly revenue chart"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Revenue grew from R50,000 in January to R120,000 in December,
    with the highest growth in Q4.
  </figcaption>
</figure>
```

### Video & Audio

```tsx
// Videos need captions
<video controls>
  <source src="/demo.mp4" type="video/mp4" />
  <track 
    kind="captions" 
    src="/demo-captions.vtt" 
    srcLang="en" 
    label="English"
    default
  />
</video>
```

---

## 6. Motion & Animation

### Reduced Motion

Always respect user preferences:

```css
/* In globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### React Implementation

```tsx
// Hook for reduced motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

// Usage
function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.3 
      }}
    />
  );
}
```

### Auto-Playing Content

```tsx
// Never auto-play with sound
// Provide pause controls for all moving content

<video 
  autoPlay 
  muted  // Required for autoplay
  loop
  playsInline
>
  <source src="/hero-bg.mp4" />
</video>

// Carousel with pause control
<Carousel>
  <CarouselContent autoPlay interval={5000} pauseOnHover />
  <CarouselPause aria-label="Pause carousel" />
</Carousel>
```

---

## 7. Forms

### Labels & Instructions

```tsx
// Every input needs a label
<div className="space-y-2">
  <Label htmlFor="email">
    Email Address
    <span className="text-destructive ml-1">*</span>
  </Label>
  <Input 
    id="email" 
    type="email"
    aria-required="true"
    aria-describedby="email-hint email-error"
  />
  <p id="email-hint" className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
  {errors.email && (
    <p id="email-error" className="text-sm text-destructive" role="alert">
      {errors.email.message}
    </p>
  )}
</div>
```

### Error Handling

```tsx
// Inline errors with form controls
<form onSubmit={handleSubmit} aria-describedby="form-error">
  {formError && (
    <div 
      id="form-error" 
      role="alert"
      className="p-4 bg-destructive/10 border border-destructive rounded-lg"
    >
      <p className="text-destructive">{formError}</p>
    </div>
  )}
  
  {/* Form fields */}
</form>
```

### Required Fields

```tsx
// Indicate required fields consistently
<div className="mb-4 text-sm text-muted-foreground">
  <span className="text-destructive">*</span> indicates required field
</div>

<Label>
  Name <span className="text-destructive">*</span>
</Label>
<Input aria-required="true" />
```

---

## 8. Testing

### Automated Testing

```bash
# Install axe-core
npm install @axe-core/cli --save-dev

# Run accessibility audit
npx axe http://localhost:3000

# Or use in tests
npm install @axe-core/react --save-dev
```

```tsx
// In React component tests
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

1. **Keyboard Only**
   - [ ] Can reach all interactive elements with Tab
   - [ ] Can activate all controls with Enter/Space
   - [ ] Focus order is logical
   - [ ] Focus indicator is visible

2. **Screen Reader**
   - [ ] All content is announced
   - [ ] Headings provide structure
   - [ ] Images have appropriate alt text
   - [ ] Form controls are labeled
   - [ ] Dynamic changes are announced

3. **Visual**
   - [ ] Color contrast meets requirements
   - [ ] Text is resizable to 200%
   - [ ] Content reflows at 320px width
   - [ ] No horizontal scrolling

4. **Motion**
   - [ ] Animations can be paused
   - [ ] Reduced motion preference respected
   - [ ] No flashing content (>3 flashes/second)

---

## Quick Reference

### Common ARIA Patterns

```tsx
// Button
<button aria-pressed="true">Toggle</button>

// Expandable section
<button aria-expanded="false" aria-controls="section-1">
  Show More
</button>
<div id="section-1" aria-hidden="true">Content</div>

// Tab panel
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div role="tabpanel" id="panel-1">Content 1</div>

// Alert
<div role="alert" aria-live="assertive">Important message</div>

// Status
<div role="status" aria-live="polite">Loading complete</div>
```

---

## Accessibility Checklist

Before deploying, verify:

- [ ] Color contrast 4.5:1 for text
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Skip link present
- [ ] Heading hierarchy correct
- [ ] Reduced motion respected
- [ ] Error messages accessible
- [ ] Automated tests pass (axe-core)
