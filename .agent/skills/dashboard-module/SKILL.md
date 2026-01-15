---
name: Dashboard Module
description: Create new modules for the CoreConnect dashboard with charts and data visualization
---

# Dashboard Module Skill

Guidelines for adding new modules to the CoreConnect dashboard.

## Module Structure

Modules live in `/apps/web/components/dashboard/`:

```
components/dashboard/
├── module-layout.tsx      # Shared layout wrapper
├── stat-card.tsx          # KPI card component
├── products-module.tsx    # Example module
├── billing-module.tsx
└── <new>-module.tsx       # Your new module
```

## Module Template

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { ModuleLayout } from "./module-layout";
import { StatCard } from "./stat-card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NewModule() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ModuleLayout
      title="Module Name"
      subtitle="Brief description"
    >
      {/* Hero Chart */}
      <Card className="mb-6 border border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Chart Title</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                {/* Chart config */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Metric" value={mounted ? "1,234" : "---"} />
      </div>
    </ModuleLayout>
  );
}
```

## Adding to Sidebar

Update `/apps/web/components/dashboard/sidebar.tsx`:

```tsx
const menuItems = [
  // ... existing items
  {
    id: "new-module",
    label: "New Module",
    icon: IconComponent,
  },
];
```

## Hydration Safety

Always use `mounted` state for locale formatting:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

const value = mounted ? formatCurrency(amount) : "R 0.00";
```

## Checklist

- [ ] Module component created
- [ ] ModuleLayout wrapper used
- [ ] Hero chart included
- [ ] StatCards for KPIs
- [ ] Sidebar menu item added
- [ ] Hydration-safe formatting
