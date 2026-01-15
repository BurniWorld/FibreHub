---
name: Data Visualization
description: Chart patterns and dashboard visualizations using Recharts for CoreConnect
---

# Data Visualization Skill

Patterns for creating charts and data visualizations in CoreConnect dashboards.

## Technology

- **Recharts** - React charting library
- **Responsive containers** for all screen sizes
- **Consistent theming** with CSS variables

## Chart Wrapper Pattern

```tsx
"use client";

import { ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ChartCard({ title, description, children }) {
  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Area Chart (Revenue/Subscribers)

```tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", revenue: 45000, subscribers: 120 },
  { month: "Feb", revenue: 52000, subscribers: 145 },
  { month: "Mar", revenue: 61000, subscribers: 168 },
];

<AreaChart data={data}>
  <defs>
    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
    </linearGradient>
  </defs>
  <CartesianGrid 
    strokeDasharray="3 3" 
    stroke="hsl(var(--border))" 
    vertical={false} 
  />
  <XAxis 
    dataKey="month" 
    axisLine={false} 
    tickLine={false}
    tick={{ fill: 'hsl(var(--muted-foreground))' }}
  />
  <YAxis 
    axisLine={false} 
    tickLine={false}
    tick={{ fill: 'hsl(var(--muted-foreground))' }}
    tickFormatter={(value) => `R${value / 1000}k`}
  />
  <Tooltip content={<CustomTooltip />} />
  <Area
    type="monotone"
    dataKey="revenue"
    stroke="hsl(var(--primary))"
    fillOpacity={1}
    fill="url(#colorRevenue)"
    strokeWidth={2}
  />
</AreaChart>
```

## Bar Chart (Comparison)

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { plan: "50 Mbps", active: 45, churned: 5 },
  { plan: "100 Mbps", active: 80, churned: 8 },
  { plan: "200 Mbps", active: 35, churned: 2 },
];

<BarChart data={data}>
  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
  <XAxis dataKey="plan" axisLine={false} tickLine={false} />
  <YAxis axisLine={false} tickLine={false} />
  <Tooltip content={<CustomTooltip />} />
  <Legend />
  <Bar 
    dataKey="active" 
    fill="hsl(var(--primary))" 
    radius={[4, 4, 0, 0]}
    name="Active"
  />
  <Bar 
    dataKey="churned" 
    fill="hsl(var(--muted))" 
    radius={[4, 4, 0, 0]}
    name="Churned"
  />
</BarChart>
```

## Pie/Donut Chart (Distribution)

```tsx
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Vumatel", value: 45, color: "#e31b23" },
  { name: "Openserve", value: 30, color: "#22d3ee" },
  { name: "Frogfoot", value: 15, color: "#22c55e" },
  { name: "Other", value: 10, color: "#6b7280" },
];

<PieChart>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={100}
    paddingAngle={2}
    dataKey="value"
  >
    {data.map((entry, index) => (
      <Cell key={index} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip content={<CustomTooltip />} />
  <Legend />
</PieChart>
```

## Line Chart (Trends)

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

<LineChart data={data}>
  <XAxis dataKey="date" axisLine={false} tickLine={false} />
  <YAxis axisLine={false} tickLine={false} />
  <Tooltip content={<CustomTooltip />} />
  <Line
    type="monotone"
    dataKey="latency"
    stroke="hsl(var(--primary))"
    strokeWidth={2}
    dot={false}
    activeDot={{ r: 4 }}
  />
  <Line
    type="monotone"
    dataKey="threshold"
    stroke="hsl(var(--destructive))"
    strokeDasharray="5 5"
    strokeWidth={1}
    dot={false}
  />
</LineChart>
```

## Custom Tooltip

```tsx
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};
```

## KPI Sparkline

```tsx
import { SparkLineChart } from "@/components/ui/sparkline";

<div className="flex items-center gap-4">
  <div>
    <p className="text-2xl font-bold">R 125,000</p>
    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
  </div>
  <div className="w-24 h-12">
    <SparkLineChart 
      data={[45, 52, 61, 58, 72, 80, 95]} 
      color="hsl(var(--primary))"
    />
  </div>
</div>
```

## ISP-Specific Charts

### Subscriber Growth

```tsx
const subscriberData = [
  { month: "Jul", newSubs: 25, churned: 5, net: 20 },
  { month: "Aug", newSubs: 32, churned: 4, net: 28 },
  // ...
];
```

### Network Health

```tsx
const networkData = [
  { time: "00:00", uptime: 99.9, latency: 12 },
  { time: "04:00", uptime: 99.8, latency: 15 },
  // ...
];
```

### Revenue by FNO

```tsx
const revenueByFNO = [
  { fno: "Vumatel", revenue: 85000 },
  { fno: "Openserve", revenue: 42000 },
  // ...
];
```

## Chart Colors

```tsx
const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  muted: "hsl(var(--muted))",
};
```

## Checklist

- [ ] Using ResponsiveContainer
- [ ] Custom tooltip styled for dark theme
- [ ] Axis lines hidden for clean look
- [ ] Grid uses border color
- [ ] Proper number formatting (currency, %)
- [ ] Legend when multiple series
