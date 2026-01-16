---
name: Growth-Led UX Framework
description: Conversion-focused UX patterns that drive business metrics while delighting users
---

# Growth-Led UX Framework Skill

A systematic approach to UX design that prioritizes business outcomes without sacrificing user experience.

## The Growth-Led Mindset

Every design decision should answer: **"How does this impact conversion, retention, or revenue?"**

But growth without delight is unsustainable. We optimize for **long-term value**, not dark patterns.

---

## 1. Speed as a Feature (Speed UX)

### The Speed-Conversion Correlation

| Load Time | Impact |
|-----------|--------|
| 0-1 second | Ideal - maximum engagement |
| 1-3 seconds | Acceptable - some drop-off |
| 3-5 seconds | 53% mobile abandonment |
| 5+ seconds | Severe conversion loss |
| **0.1s improvement** | **8.4% conversion boost** |

### Speed UX Patterns

#### Skeleton Loading

Never show blank screens. Always show structure.

```tsx
// Skeleton component
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-8 w-48 bg-muted rounded-md" />
      
      {/* Stats grid skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-xl" />
        ))}
      </div>
      
      {/* Chart skeleton */}
      <div className="h-80 bg-muted rounded-xl" />
    </div>
  );
}
```

#### Optimistic Updates

Update UI immediately, sync in background.

```tsx
// Optimistic update pattern
const handleToggle = async (id: string) => {
  // Immediately update UI
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, active: !item.active } : item
  ));
  
  try {
    await api.toggle(id);
  } catch (error) {
    // Revert on failure
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
    toast.error("Failed to save. Please try again.");
  }
};
```

#### Progressive Loading

Load critical content first, enhance progressively.

```tsx
// Priority loading order
<Suspense fallback={<HeroSkeleton />}>
  <Hero />  {/* Load first - above fold */}
</Suspense>

<Suspense fallback={<StatsSkeleton />}>
  <StatsSection />  {/* Load second */}
</Suspense>

<Suspense fallback={<ChartSkeleton />}>
  <AnalyticsCharts />  {/* Load third - complex */}
</Suspense>
```

---

## 2. Conversion-Focused Layouts

### The Visual Hierarchy Formula

```
Attention → Interest → Desire → Action (AIDA)
```

Map this to page sections:

```tsx
<main>
  {/* ATTENTION - 0.05 seconds to hook */}
  <section className="min-h-[60vh]">
    <HeroWithValueProp />
  </section>
  
  {/* INTEREST - Build curiosity */}
  <section>
    <ProblemAgitation />
    <SolutionPreview />
  </section>
  
  {/* DESIRE - Show the transformation */}
  <section>
    <FeatureShowcase />
    <SocialProof />
    <ResultsData />
  </section>
  
  {/* ACTION - Clear CTA */}
  <section>
    <PricingTable />
    <FinalCTA />
  </section>
</main>
```

### CTA Hierarchy

Define clear primary vs secondary actions:

```tsx
// Primary CTA - High contrast, prominent
<Button 
  size="lg"
  className="
    bg-primary hover:bg-primary/90
    text-primary-foreground
    shadow-lg shadow-primary/25
    text-lg px-8
  "
>
  Get Started Free
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>

// Secondary CTA - Supportive
<Button 
  variant="outline" 
  size="lg"
  className="text-lg px-8"
>
  Watch Demo
</Button>

// Tertiary - Text only
<Button variant="link">
  Learn more
</Button>
```

### Strategic Whitespace

Use whitespace to guide attention:

```tsx
// High-value section gets breathing room
<section className="py-24 md:py-32">
  <div className="max-w-4xl mx-auto text-center space-y-8">
    <h2>Your Value Proposition</h2>
    <p>Supporting text</p>
    <PrimaryCTA />
  </div>
</section>
```

---

## 3. Non-Intrusive Cost Capture

### Progressive Disclosure

Don't overwhelm. Reveal complexity gradually.

```tsx
// Collapsed by default, expand on interest
<Collapsible>
  <CollapsibleTrigger className="flex items-center gap-2">
    <span>Advanced Options</span>
    <ChevronDown className="h-4 w-4" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Only shown when user wants it */}
    <AdvancedSettings />
  </CollapsibleContent>
</Collapsible>
```

### Friction-Free Forms

Every field is a potential drop-off. Minimize.

```tsx
// Step 1: Just email (lowest friction)
<form>
  <Input type="email" placeholder="Enter your email" />
  <Button>Get Started</Button>
</form>

// Step 2: Only after commitment
<form>
  <Input placeholder="Full Name" />
  <Input placeholder="Company" />
  <Input placeholder="Phone (optional)" />
  <Button>Complete Setup</Button>
</form>
```

### Real-Time Validation

Don't wait for submit to show errors.

```tsx
<Input
  {...register("email")}
  className={cn(
    errors.email && "border-destructive focus-visible:ring-destructive"
  )}
/>
{errors.email && (
  <p className="text-sm text-destructive mt-1 animate-in fade-in">
    {errors.email.message}
  </p>
)}
```

---

## 4. Entertainment-Grade Polish

### Micro-Interactions That Delight

```tsx
// Button with satisfying feedback
<Button
  onClick={handleClick}
  className="
    transition-all duration-200
    hover:scale-105
    active:scale-95
    hover:shadow-lg hover:shadow-primary/25
  "
>
  <span className="flex items-center gap-2">
    <Sparkles className="h-4 w-4 animate-pulse" />
    Save Changes
  </span>
</Button>

// Success state with celebration
{saved && (
  <div className="
    flex items-center gap-2 text-success
    animate-in zoom-in-95 fade-in duration-300
  ">
    <CheckCircle className="h-5 w-5" />
    <span>Saved successfully!</span>
  </div>
)}
```

### Sound Design (Optional)

```tsx
// Subtle audio feedback for key actions
const playSuccess = () => {
  if (userPrefersSounds) {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.3;
    audio.play();
  }
};
```

### Surprise & Delight Moments

```tsx
// Easter egg on milestone
{subscriberCount === 1000 && (
  <Confetti
    numberOfPieces={200}
    recycle={false}
    colors={['#e31b23', '#22d3ee', '#22c55e']}
  />
)}
```

---

## 5. Trust Signals

### Social Proof Patterns

```tsx
// Customer count with live updates
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Users className="h-4 w-4" />
  <span>
    <CountUp end={2847} duration={2} /> ISPs trust OmniDome
  </span>
</div>

// Logo cloud
<div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
  {trustedCompanies.map((company) => (
    <Image
      key={company.name}
      src={company.logo}
      alt={company.name}
      className="h-8 grayscale hover:grayscale-0 transition-all"
    />
  ))}
</div>

// Testimonial with credibility
<blockquote className="relative">
  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
  <p className="text-lg italic pl-6">
    "OmniDome reduced our churn by 40% in the first quarter."
  </p>
  <footer className="mt-4 flex items-center gap-3">
    <Avatar />
    <div>
      <cite className="not-italic font-semibold">John Smith</cite>
      <p className="text-sm text-muted-foreground">CEO, FibreConnect SA</p>
    </div>
  </footer>
</blockquote>
```

### Security Indicators

```tsx
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <ShieldCheck className="h-4 w-4 text-success" />
  <span>256-bit SSL encrypted</span>
</div>

<div className="flex items-center gap-4">
  <Badge variant="outline">POPIA Compliant</Badge>
  <Badge variant="outline">RICA Verified</Badge>
  <Badge variant="outline">ISO 27001</Badge>
</div>
```

---

## 6. Retention Patterns

### Onboarding Progress

Show users their journey:

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between text-sm">
    <span>Getting Started</span>
    <span className="text-muted-foreground">3 of 5 complete</span>
  </div>
  <Progress value={60} className="h-2" />
  
  <div className="space-y-2">
    {onboardingSteps.map((step, i) => (
      <div 
        key={step.id}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg",
          step.complete ? "bg-success/10" : "bg-muted/50"
        )}
      >
        {step.complete ? (
          <CheckCircle className="h-5 w-5 text-success" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
        <span>{step.title}</span>
      </div>
    ))}
  </div>
</div>
```

### Empty States That Convert

```tsx
<div className="text-center py-16 space-y-6">
  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
    <Users className="h-10 w-10 text-muted-foreground" />
  </div>
  
  <div className="space-y-2">
    <h3 className="text-xl font-semibold">No customers yet</h3>
    <p className="text-muted-foreground max-w-md mx-auto">
      Import your existing customer database or add your first subscriber manually.
    </p>
  </div>
  
  <div className="flex items-center justify-center gap-4">
    <Button>
      <Upload className="mr-2 h-4 w-4" />
      Import CSV
    </Button>
    <Button variant="outline">
      <Plus className="mr-2 h-4 w-4" />
      Add Customer
    </Button>
  </div>
</div>
```

---

## 7. Measurement Framework

### Key Metrics to Track

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Bounce Rate** | < 40% | Analytics |
| **Time to First Action** | < 30s | Event tracking |
| **Form Completion Rate** | > 70% | Funnel analysis |
| **Feature Adoption** | > 60% | Product analytics |
| **NPS Score** | > 50 | Surveys |

### A/B Testing Checklist

Before launching any major UX change:

- [ ] Hypothesis documented
- [ ] Success metric defined
- [ ] Minimum sample size calculated
- [ ] Test duration planned (2+ weeks)
- [ ] Fallback plan ready

---

## Quick Wins Checklist

When reviewing any page for growth optimization:

- [ ] Clear above-fold value proposition
- [ ] Primary CTA visible without scroll
- [ ] Social proof present (numbers, logos, testimonials)
- [ ] Form fields minimized
- [ ] Loading states implemented (no blank screens)
- [ ] Error messages are helpful, not accusatory
- [ ] Success states are celebratory
- [ ] Mobile experience is first-class
- [ ] Page loads in < 2 seconds
