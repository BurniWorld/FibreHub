---
description: Add a new module to the CoreConnect dashboard
---

# Add Dashboard Module

This workflow guides creation of a new dashboard module.

## Prerequisites

- Review the dashboard-module and component-development skills

## Steps

1. Read the dashboard module skill
   ```
   View file: .agent/skills/dashboard-module/SKILL.md
   ```

2. Create the module component
   ```
   apps/web/components/dashboard/<module>-module.tsx
   ```

3. Follow the module template:
   - Use ModuleLayout wrapper
   - Include hero chart (Recharts)
   - Add StatCards for KPIs
   - Use hydration-safe formatting

4. Add icon import from lucide-react
   ```tsx
   import { IconName } from "lucide-react";
   ```

5. Update sidebar navigation
   ```
   apps/web/components/dashboard/sidebar.tsx
   ```
   Add menu item with icon and label

6. Update page component if needed
   ```
   apps/web/app/dashboard/page.tsx
   ```

// turbo
7. Verify the module renders correctly
   ```bash
   cd apps/web && npm run dev
   ```

## Design Guidelines

- Use glassmorphism: `bg-card/50 backdrop-blur-xl`
- Primary color: `hsl(var(--primary))`
- Always check `mounted` state for formatting
