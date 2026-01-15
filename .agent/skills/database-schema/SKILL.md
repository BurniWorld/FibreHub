---
name: Database Schema
description: Design and manage PostgreSQL database schemas with PostGIS for the CoreConnect platform
---

# Database Schema Skill

Guidance for designing PostgreSQL schemas for CoreConnect.

## Connection Details

```
Host: postgres (Docker) / localhost (local)
Port: 5432
Database: fibrehub
Username: fibrehub
Password: fibrehub
```

## Schema Principles

### Multi-Tenant Architecture

All tables include `tenant_id`:

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenants(id),
    -- other columns...
);
CREATE INDEX idx_customers_tenant ON customers(tenant_id);
```

### Audit Fields

```sql
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW(),
created_by VARCHAR(100),
deleted_at TIMESTAMPTZ  -- Soft delete
```

## Core Tables

- **tenants** - ISP organizations
- **users** - Staff accounts
- **customers** - Subscribers
- **subscriptions** - Active services
- **plans** - Pricing packages
- **invoices** - Billing records
- **tickets** - Support tickets

## PostGIS for Coverage

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE coverage_zones (
    id SERIAL PRIMARY KEY,
    fno VARCHAR(50) NOT NULL,
    boundary GEOGRAPHY(POLYGON, 4326),
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_coverage_boundary ON coverage_zones USING GIST(boundary);
```

## Checklist

- [ ] Table includes `tenant_id` column
- [ ] Audit columns added
- [ ] Indexes created
- [ ] Foreign keys defined
- [ ] PostGIS for geographic data
