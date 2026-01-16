---
name: Performance Standards
description: Web performance budgets, optimization techniques, and Core Web Vitals targets
---

# Performance Standards Skill

Performance is a feature, not an afterthought. This skill defines performance budgets, optimization techniques, and measurement strategies.

## The Business Case

| Metric | Impact |
|--------|--------|
| **0.1s faster** | 8.4% higher conversion |
| **3+ seconds** | 53% mobile abandonment |
| **Poor CLS** | 24% higher bounce rate |
| **Good LCP** | 70% more engagement |

---

## 1. Performance Budgets

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.0s | 2.0-4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1-0.25 | > 0.25 |

### Bundle Size Budgets

| Asset | Target | Max |
|-------|--------|-----|
| **First Load JS** | < 150KB | 250KB |
| **Per-Route JS** | < 50KB | 100KB |
| **CSS** | < 50KB | 100KB |
| **Images (above fold)** | < 200KB | 400KB |
| **Total Page Weight** | < 1MB | 2MB |

### Time Budgets

| Metric | Target |
|--------|--------|
| **Time to First Byte (TTFB)** | < 600ms |
| **First Contentful Paint (FCP)** | < 1.0s |
| **Time to Interactive (TTI)** | < 2.5s |
| **Speed Index** | < 3.0s |

---

## 2. Next.js Optimization

### Image Optimization

```tsx
import Image from 'next/image';

// Always use Next.js Image component
<Image
  src="/dashboard-preview.png"
  alt="Dashboard preview"
  width={1200}
  height={675}
  priority                    // For above-fold images
  placeholder="blur"          // Blur while loading
  blurDataURL="data:image/..."  // 10x10 base64 blur
  sizes="(max-width: 768px) 100vw, 50vw"  // Responsive
/>

// For background images, use CSS with next/image
<div className="relative h-96">
  <Image
    src="/hero-bg.jpg"
    alt=""
    fill
    className="object-cover"
    priority
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(
  () => import('@/components/charts/analytics-chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false  // Disable SSR for client-only components
  }
);

// Lazy load based on viewport
const BelowFoldSection = dynamic(
  () => import('@/components/below-fold-section'),
  { loading: () => <SectionSkeleton /> }
);
```

### Route Prefetching

```tsx
import Link from 'next/link';

// Next.js automatically prefetches <Link> in viewport
<Link href="/dashboard" prefetch={true}>
  Go to Dashboard
</Link>

// Programmatic prefetch
import { useRouter } from 'next/navigation';

const router = useRouter();

// Prefetch on hover
<button 
  onMouseEnter={() => router.prefetch('/dashboard')}
  onClick={() => router.push('/dashboard')}
>
  Dashboard
</button>
```

---

## 3. JavaScript Optimization

### Tree Shaking Imports

```tsx
// ❌ Bad - imports entire library
import * as Icons from 'lucide-react';

// ✅ Good - tree-shakeable
import { Users, Home, Settings } from 'lucide-react';
```

### Debounce Heavy Operations

```tsx
import { useMemo, useCallback } from 'react';

// Debounce search input
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    searchAPI(term);
  }, 300),
  []
);

// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => /* complex calc */, 0);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Avoid Render Blocking

```tsx
// Load non-critical scripts after page load
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"  // or "afterInteractive"
/>
```

---

## 4. CSS Optimization

### Critical CSS

Next.js with Tailwind handles this automatically, but ensure:

```tsx
// In layout.tsx - fonts with display: swap
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',  // Prevents FOIT
});
```

### Avoid Layout Thrashing

```tsx
// ❌ Bad - causes reflow
element.style.width = '100px';
const height = element.offsetHeight;  // Forces reflow
element.style.height = height + 'px';

// ✅ Good - batch reads and writes
const height = element.offsetHeight;  // Read
element.style.width = '100px';        // Write
element.style.height = height + 'px'; // Write
```

### GPU-Accelerated Animations

```tsx
// ✅ Good - GPU accelerated (transform, opacity)
className="transition-transform hover:translate-x-2"
className="transition-opacity hover:opacity-80"

// ❌ Bad - triggers layout (width, height, margin, padding)
className="transition-all hover:w-full"
className="transition-all hover:ml-4"
```

---

## 5. Loading States

### Skeleton Components

```tsx
// Skeleton loader component
export function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-muted rounded-md",
        className
      )} 
    />
  );
}

// Usage
<Skeleton className="h-8 w-48" />           // Text line
<Skeleton className="h-32 w-full" />        // Card
<Skeleton className="h-10 w-10 rounded-full" /> // Avatar
```

### Full Page Skeleton

```tsx
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      
      {/* Main Chart */}
      <Skeleton className="h-80" />
      
      {/* Table */}
      <div className="space-y-2">
        <Skeleton className="h-12" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    </div>
  );
}
```

### Suspense Boundaries

```tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      {/* Critical - load immediately */}
      <DashboardHeader />
      
      {/* Stats - with skeleton */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>
      
      {/* Chart - with skeleton */}
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      
      {/* Table - with skeleton */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

---

## 6. Asset Optimization

### Font Loading

```tsx
// In layout.tsx
import { Outfit, JetBrains_Mono } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Icon Optimization

```tsx
// Use SVG icons, not icon fonts
import { Home, Users, Settings } from 'lucide-react';

// For custom icons, inline SVG
const CustomIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <path d="..." fill="currentColor" />
  </svg>
);
```

### Preload Critical Assets

```tsx
// In layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Preload critical fonts/images
  other: {
    'link': [
      { rel: 'preload', href: '/logo.svg', as: 'image' },
    ],
  },
};
```

---

## 7. Measurement & Monitoring

### Next.js Analytics

```tsx
// Already installed: @vercel/analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Performance API

```tsx
// Measure component render time
useEffect(() => {
  const start = performance.now();
  
  return () => {
    const duration = performance.now() - start;
    if (duration > 100) {
      console.warn(`Slow render: ${duration}ms`);
    }
  };
}, []);
```

### Web Vitals Reporting

```tsx
// app/layout.tsx
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric); // or send to analytics
    
    // Example: Send to custom endpoint
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  }
}
```

---

## 8. Build-Time Checks

### Bundle Analyzer

```bash
# Install
npm install @next/bundle-analyzer

# Add to next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  // your config
});

# Run
ANALYZE=true npm run build
```

### Build Output Review

```bash
# Check build output
npm run build

# Look for:
# - First Load JS < 150KB
# - Individual routes < 50KB
# - No unexpectedly large chunks
```

---

## Performance Checklist

Before deploying, verify:

- [ ] LCP < 2.0s on slow 3G
- [ ] FCP < 1.0s
- [ ] CLS < 0.1
- [ ] No layout shifts on load
- [ ] All images use `next/image`
- [ ] Heavy components lazy loaded
- [ ] Skeleton loaders for async content
- [ ] Fonts use `display: swap`
- [ ] Bundle size within budget
- [ ] No unused dependencies
