---
name: Microservice Development
description: Create and configure new FastAPI microservices for the CoreConnect/FibreHub platform
---

# Microservice Development Skill

This skill guides the creation of new FastAPI microservices that integrate seamlessly with the CoreConnect platform architecture.

## Project Context

CoreConnect is a microservice-based ISP operations platform with services located in `/services/`. Each service runs as an independent FastAPI application with its own Docker container.

## Service Port Allocation

| Port Range | Purpose |
|------------|---------|
| 8001-8010 | Core Services (CRM, Sales, Billing, etc.) |
| 8011-8020 | Extended Services (Call Center, Retention, etc.) |
| 8021-8030 | Future Services |

### Current Port Assignments

```
8001 - CRM Service
8002 - Sales Service
8003 - Billing Service
8004 - RICA/Compliance Service
8005 - Network Service
8006 - IoT Service
8011 - Call Center Service
8012 - Retention Service
```

## Steps to Create a New Microservice

### Step 1: Create Service Directory Structure

```bash
mkdir -p services/<service_name>
```

### Step 2: Create FastAPI Application (`app.py`)

Create the main FastAPI application file:

```python
"""
<Service Name> Service for CoreConnect Platform.

This service handles <description of service responsibilities>.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import os

app = FastAPI(
    title="<Service Name> Service",
    description="<Service description for API documentation>",
    version="0.1.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────
# Pydantic Models
# ─────────────────────────────────────────────────────────────

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
    version: str


# ─────────────────────────────────────────────────────────────
# API Endpoints
# ─────────────────────────────────────────────────────────────

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for container orchestration."""
    return HealthResponse(
        status="healthy",
        service="<service_name>",
        timestamp=datetime.now().isoformat(),
        version="0.1.0"
    )


@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": "<Service Name> Service",
        "version": "0.1.0",
        "documentation": "/docs"
    }


# Add service-specific endpoints below
# ─────────────────────────────────────────────────────────────
```

### Step 3: Create Pydantic Models (`models.py`)

```python
"""
Data models for <Service Name> Service.

These models define the structure of data used throughout the service.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class BaseDBModel(BaseModel):
    """Base model with common database fields."""
    id: Optional[int] = None
    tenant_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    created_by: Optional[str] = None


# Add service-specific models below
```

### Step 4: Create Requirements File (`requirements.txt`)

```text
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
pydantic>=2.5.0
python-multipart>=0.0.6
httpx>=0.25.0
asyncpg>=0.29.0
sqlalchemy>=2.0.0
python-dotenv>=1.0.0
```

### Step 5: Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose service port
EXPOSE <PORT>

# Run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "<PORT>"]
```

### Step 6: Update docker-compose.yaml

Add the new service to `/docker-compose.yaml`:

```yaml
  <service_name>:
    build:
      context: ./services/<service_name>
      dockerfile: Dockerfile
    ports:
      - "<PORT>:<PORT>"
    environment:
      - DATABASE_URL=postgresql://fibrehub:fibrehub@postgres:5432/fibrehub
      - SERVICE_NAME=<service_name>
    depends_on:
      - postgres
    networks:
      - fibrehub-network
    restart: unless-stopped
```

## Service Naming Conventions

- **Directory Name**: lowercase with underscores (e.g., `call_center`)
- **FastAPI Title**: Title case (e.g., "Call Center Service")
- **Container Name**: lowercase with hyphens (e.g., `call-center-service`)

## Database Connection

All services connect to the shared PostgreSQL database. Use this connection pattern:

```python
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://fibrehub:fibrehub@localhost:5432/fibrehub")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Testing

After creating the service:

1. Build and start the container:
   ```bash
   docker-compose up -d --build <service_name>
   ```

2. Verify health endpoint:
   ```bash
   curl http://localhost:<PORT>/health
   ```

3. Access API documentation:
   ```
   http://localhost:<PORT>/docs
   ```

## Integration Checklist

- [ ] Service directory created under `/services/`
- [ ] `app.py` with FastAPI application
- [ ] `models.py` with Pydantic models
- [ ] `requirements.txt` with dependencies
- [ ] `Dockerfile` configured
- [ ] `docker-compose.yaml` updated
- [ ] Health endpoint responding
- [ ] API documentation accessible
- [ ] Connected to shared database (if required)
