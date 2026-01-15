---
name: Docker Operations
description: Manage Docker containers, builds, and deployments for the CoreConnect platform
---

# Docker Operations Skill

This skill provides guidance for managing Docker containers and deployments in the CoreConnect/FibreHub platform.

## Project Context

CoreConnect uses Docker Compose for local development and orchestration. The main configuration file is at `/docker-compose.yaml`.

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                        │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │ Web App    │  │ Portal     │  │ PostgreSQL │               │
│  │ (Next.js)  │  │ (Static)   │  │ (Database) │               │
│  │ :3000      │  │ :8080      │  │ :5432      │               │
│  └────────────┘  └────────────┘  └────────────┘               │
│                                                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐│
│  │ CRM        │  │ Sales      │  │ Billing    │  │ Network  ││
│  │ :8001      │  │ :8002      │  │ :8003      │  │ :8005    ││
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘│
│                                                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐│
│  │ RICA       │  │ IoT        │  │ Call Center│  │Retention ││
│  │ :8004      │  │ :8006      │  │ :8011      │  │ :8012    ││
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘│
│                                                                │
│              fibrehub-network (bridge network)                 │
└───────────────────────────────────────────────────────────────┘
```

## Common Commands

### Starting the Stack

```bash
# Start all services
docker-compose up -d

# Start with rebuild
docker-compose up -d --build

# Start specific services
docker-compose up -d postgres crm billing

# Follow logs
docker-compose logs -f
```

### Stopping the Stack

```bash
# Stop all services (keep containers)
docker-compose stop

# Stop and remove containers
docker-compose down

# Full cleanup (including volumes)
docker-compose down -v --rmi local
```

### Building Images

```bash
# Build all images
docker-compose build

# Build without cache
docker-compose build --no-cache

# Build specific service
docker-compose build crm

# Parallel build
docker-compose build --parallel
```

### Service Management

```bash
# Restart a service
docker-compose restart crm

# Scale a service (if applicable)
docker-compose up -d --scale crm=3

# View running services
docker-compose ps

# Execute command in container
docker-compose exec crm bash
```

### Logs and Debugging

```bash
# View logs for all services
docker-compose logs

# Follow logs for specific service
docker-compose logs -f crm

# Last 100 lines
docker-compose logs --tail=100 crm

# View container stats
docker stats
```

## Database Operations

### PostgreSQL Container

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U fibrehub -d fibrehub

# Backup database
docker-compose exec postgres pg_dump -U fibrehub fibrehub > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T postgres psql -U fibrehub -d fibrehub

# View database size
docker-compose exec postgres psql -U fibrehub -c "SELECT pg_size_pretty(pg_database_size('fibrehub'));"
```

### Common SQL Operations

```sql
-- List all tables
\dt

-- View table structure
\d table_name

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Check PostGIS version
SELECT PostGIS_version();
```

## Docker Compose Configuration

### Service Template

```yaml
  service_name:
    build:
      context: ./services/service_name
      dockerfile: Dockerfile
    container_name: fibrehub-service-name
    ports:
      - "PORT:PORT"
    environment:
      - DATABASE_URL=postgresql://fibrehub:fibrehub@postgres:5432/fibrehub
      - SERVICE_NAME=service_name
      - LOG_LEVEL=info
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - fibrehub-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:PORT/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
```

### Health Checks

```yaml
postgres:
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U fibrehub"]
    interval: 10s
    timeout: 5s
    retries: 5
```

### Volume Configuration

```yaml
volumes:
  postgres_data:
    driver: local
  
  # Named volume usage
  postgres:
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Network Configuration

```yaml
networks:
  fibrehub-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## Environment Variables

### Common Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://fibrehub:fibrehub@postgres:5432/fibrehub` |
| `SERVICE_NAME` | Name of the current service | Service-specific |
| `LOG_LEVEL` | Logging level | `info` |
| `CORS_ORIGINS` | Allowed CORS origins | `*` |

### Production Considerations

```yaml
environment:
  - DATABASE_URL=${DATABASE_URL}
  - SECRET_KEY=${SECRET_KEY}
  - CORS_ORIGINS=https://app.coreconnect.co.za
  - LOG_LEVEL=warning
```

## Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Find process using port
netstat -ano | findstr :8001

# Kill process (Windows)
taskkill /PID <pid> /F
```

**2. Container won't start**
```bash
# Check logs
docker-compose logs service_name

# Check container status
docker inspect fibrehub-service-name
```

**3. Database connection issues**
```bash
# Verify postgres is running
docker-compose ps postgres

# Check network connectivity
docker-compose exec crm ping postgres
```

**4. Build failures**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache service_name
```

### Cleanup Commands

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full system cleanup
docker system prune -a --volumes
```

## Development Workflow

### 1. Local Development

```bash
# Start infrastructure only
docker-compose up -d postgres

# Run services locally
cd services/crm && uvicorn app:app --reload --port 8001
```

### 2. Full Stack Development

```bash
# Start all services
docker-compose up -d

# Watch logs
docker-compose logs -f web crm billing
```

### 3. Testing Changes

```bash
# Rebuild and restart specific service
docker-compose up -d --build crm

# Run tests in container
docker-compose exec crm pytest
```

## Checklist

- [ ] `docker-compose.yaml` updated with new service
- [ ] Health check endpoint configured
- [ ] Environment variables documented
- [ ] Depends_on configured correctly
- [ ] Network membership verified
- [ ] Logs accessible and informative
- [ ] Resource limits set (for production)
