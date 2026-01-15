---
description: Create a new microservice for the CoreConnect platform
---

# Create New Microservice

This workflow guides creation of a new FastAPI microservice.

## Prerequisites

- Docker installed
- Python 3.10+ available
- Review the microservice-development skill first

## Steps

1. Read the microservice development skill
   ```
   View file: .agent/skills/microservice-development/SKILL.md
   ```

2. Create the service directory structure
   ```bash
   mkdir -p services/<service_name>
   ```

3. Create app.py with FastAPI application
   - Include health check endpoint
   - Enable CORS middleware
   - Add service-specific endpoints

4. Create models.py with Pydantic models
   - Define request/response schemas
   - Include validation

5. Create requirements.txt
   ```
   fastapi>=0.104.0
   uvicorn[standard]>=0.24.0
   pydantic>=2.5.0
   ```

6. Create Dockerfile
   - Use python:3.11-slim base
   - Install dependencies
   - Expose appropriate port

7. Update docker-compose.yaml
   - Add service definition
   - Configure environment variables
   - Set up network and dependencies

// turbo
8. Build and test the service
   ```bash
   docker-compose up -d --build <service_name>
   ```

// turbo
9. Verify health endpoint
   ```bash
   curl http://localhost:<PORT>/health
   ```

## Port Allocation

Use next available port in range 8001-8020.
