---
name: Component Development
description: Create React/Next.js components for the CoreConnect dashboard following design system patterns
---

# Component Development Skill

This skill guides the creation of React components for the CoreConnect/FibreHub Next.js dashboard application.

## Project Context

The dashboard is built with:
- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS 4**
- **Radix UI** primitives
- **Shadcn/ui** components
- **Recharts** for data visualization

Components are located in `/apps/web/components/`.

## Directory Structure

```
apps/web/components/
├── dashboard/           # Dashboard-specific components
│   ├── module-layout.tsx
│   ├── stat-card.tsx
│   └── <module>-module.tsx
├── ui/                  # Base UI components (Shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
└── charts/              # Chart components
    └── ...
```

## Component Patterns

### 1. Dashboard Module Component

For creating new dashboard modules (like Products, Billing, etc.):

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { ModuleLayout } from "./module-layout";
import { StatCard } from "./stat-card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconName } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface ModuleData {
  // Define your data types here
}

// ─────────────────────────────────────────────────────────────
// Chart Data (Replace with API data)
// ─────────────────────────────────────────────────────────────

const chartData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  // ... more data
];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function YourModule() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Prevent hydration mismatch with locale-sensitive formatting
  useEffect(() => {
    setMounted(true);
    // Fetch data here
    setLoading(false);
  }, []);

  // Format currency safely (client-side only)
  const formatCurrency = (value: number) => {
    if (!mounted) return "R 0.00";
    return `R ${value.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
  };

  return (
    <ModuleLayout
      title="Module Name"
      subtitle="Brief description of the module"
    >
      {/* Hero Chart */}
      <Card className="mb-6 border border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Chart Title
          </CardTitle>
          <CardDescription>
            Chart description / time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Metric 1"
          value={mounted ? "1,234" : "---"}
          icon={IconName}
          trend="+12%"
          trendUp={true}
        />
        {/* More StatCards */}
      </div>

      {/* Additional Content */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Add tables, lists, or other content */}
      </div>
    </ModuleLayout>
  );
}
```

### 2. Stat Card Component

```tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) {
  return (
    <Card className={cn(
      "border border-border/50 bg-card/50 backdrop-blur-xl",
      "hover:border-primary/50 transition-colors",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            {trend && (
              <p className={cn(
                "mt-1 text-sm",
                trendUp ? "text-green-500" : "text-red-500"
              )}>
                {trend} from last month
              </p>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. Data Table Component

```tsx
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }[];
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
}: DataTableProps<T>) {
  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

## Design System Variables

Use CSS variables for colors (defined in Tailwind config):

```css
/* Primary brand colors */
--primary: 0 84% 50%;      /* #e31b23 - CoreConnect Red */
--primary-foreground: 0 0% 100%;

/* Background colors */
--background: 222 47% 11%;  /* Dark theme */
--foreground: 0 0% 100%;

/* Card styling */
--card: 222 47% 14%;
--card-foreground: 0 0% 100%;

/* Borders and accents */
--border: 222 47% 20%;
--accent: 188 94% 60%;      /* Cyan accent */
```

## Hydration Safety

Always use the `mounted` state pattern for locale-sensitive operations:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Use mounted check for date/currency formatting
const displayValue = mounted ? formatCurrency(value) : "R 0.00";
```

## Import Conventions

```tsx
// React imports
import React, { useState, useEffect } from "react";

// UI Components (from @/components/ui)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Charts (from recharts)
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Icons (from lucide-react)
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";

// Utilities
import { cn } from "@/lib/utils";
```

## Component Checklist

- [ ] "use client" directive at top of file
- [ ] Mounted state for hydration safety
- [ ] Proper TypeScript interfaces
- [ ] Tailwind classes using design system variables
- [ ] Glassmorphism styling (backdrop-blur, bg-card/50)
- [ ] Responsive grid layouts
- [ ] Loading/skeleton states
- [ ] Accessibility attributes (aria-labels, etc.)
- [ ] Error boundaries where appropriate
