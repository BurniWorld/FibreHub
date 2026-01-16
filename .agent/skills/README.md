# CoreConnect Agent Skills

This directory contains specialized skills that extend the AI agent's capabilities for CoreConnect/FibreHub development.

## Backend & Infrastructure Skills

| Skill | Description |
|-------|-------------|
| **[microservice-development](./microservice-development/SKILL.md)** | Create and configure new FastAPI microservices |
| **[docker-operations](./docker-operations/SKILL.md)** | Manage Docker containers and deployments |
| **[database-schema](./database-schema/SKILL.md)** | Design PostgreSQL/PostGIS database schemas |
| **[api-testing](./api-testing/SKILL.md)** | Test FastAPI endpoints with pytest |
| **[fno-integration](./fno-integration/SKILL.md)** | Integrate with SA Fibre Network Operators |
| **[sa-compliance](./sa-compliance/SKILL.md)** | Implement RICA and POPIA compliance |
| **[payment-integration](./payment-integration/SKILL.md)** | Integrate Paystack for ZAR billing |

## 2026 Web Design Standards (NEW)

These skills define modern, cutting-edge design principles based on 2026 web design trends.

| Skill | Description |
|-------|-------------|
| **[web-design-2026](./web-design-2026/SKILL.md)** | Core 2026 design principles: organic layouts, kinetic typography, immersion |
| **[growth-ux](./growth-ux/SKILL.md)** | Growth-led UX framework: conversion optimization, speed UX, trust signals |
| **[typography](./typography/SKILL.md)** | AI-enhanced typography: variable fonts, typewriter effects, animated text |
| **[performance](./performance/SKILL.md)** | Performance budgets, Core Web Vitals, optimization techniques |
| **[accessibility](./accessibility/SKILL.md)** | WCAG 2.1 AA compliance, inclusive design, testing methodology |

### Key Metrics to Remember

- **94%** of first impressions are design-based
- **0.05 seconds** to form an opinion
- **0.1s faster** = 8.4% higher conversion
- **53%** abandon at 3+ seconds load time
- **94.8%** of homepages have accessibility failures

## UI/UX Skills

| Skill | Description |
|-------|-------------|
| **[design-system](./design-system/SKILL.md)** | Colors, typography, spacing, glassmorphism patterns |
| **[component-development](./component-development/SKILL.md)** | Build React/Next.js components with design system |
| **[dashboard-module](./dashboard-module/SKILL.md)** | Create new dashboard modules with charts |
| **[form-design](./form-design/SKILL.md)** | Form patterns and inputs for ISP workflows |
| **[data-visualization](./data-visualization/SKILL.md)** | Charts and dashboard visualizations with Recharts |
| **[navigation-patterns](./navigation-patterns/SKILL.md)** | Sidebar, tabs, breadcrumbs navigation |
| **[customer-portal-ui](./customer-portal-ui/SKILL.md)** | White-label customer self-service portal design |

## Usage

When working on a task, the agent will automatically read the relevant skill file to understand patterns, conventions, and best practices.

## Adding New Skills

1. Create a new directory in `.agent/skills/`
2. Add a `SKILL.md` file with YAML frontmatter:
   ```yaml
   ---
   name: Skill Name
   description: Brief description
   ---
   ```
3. Include detailed instructions and code examples
