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
