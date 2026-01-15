---
description: Start the development environment for CoreConnect
---

# Start Development Environment

This workflow starts all necessary services for local development.

## Steps

1. Navigate to the project directory
   ```
   cd C:\Users\BMajozi\.gemini\antigravity\scratch\fibrehub
   ```

// turbo
2. Start the PostgreSQL database container
   ```bash
   docker-compose up -d postgres
   ```

// turbo
3. Start the Next.js web application in dev mode
   ```bash
   cd apps/web && npm run dev
   ```

4. (Optional) Start specific microservices
   ```bash
   docker-compose up -d crm billing network
   ```

## Verification

- Dashboard available at: http://localhost:3000
- API docs at: http://localhost:8001/docs (CRM)
- PostgreSQL at: localhost:5432
