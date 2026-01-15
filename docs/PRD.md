# Product Requirements Document (PRD)

## CoreConnect / FibreHub / Omni Dome
### The Premier ISP Operating System (SA Edition)

---

**Version:** 1.0  
**Date:** January 15, 2026  
**Author:** Antigravity AI for BurniWorld  
**Status:** In Development

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Market](#target-market)
4. [Problem Statement](#problem-statement)
5. [Solution Overview](#solution-overview)
6. [Core Modules & Features](#core-modules--features)
7. [Technical Architecture](#technical-architecture)
8. [User Personas](#user-personas)
9. [User Journeys](#user-journeys)
10. [Integrations](#integrations)
11. [Non-Functional Requirements](#non-functional-requirements)
12. [Success Metrics](#success-metrics)
13. [Roadmap](#roadmap)
14. [Appendix](#appendix)

---

## Executive Summary

**CoreConnect** (internally known as FibreHub/Omni Dome) is a carrier-grade, microservice-based operations platform designed specifically for South African Internet Service Providers (ISPs). It unifies CRM, Sales, Marketing, Billing, Network provisioning, and Fibre Network Operator (FNO) automation into a single, high-performance ecosystem.

The platform addresses the unique challenges faced by South African ISPs, including RICA compliance, multi-FNO management (Vumatel, Openserve, Frogfoot, etc.), ZAR billing with local payment gateways (Paystack), and real-time network monitoring.

---

## Product Vision

> *"To become the operating system that powers every South African ISP, enabling them to deliver world-class connectivity experiences while dramatically reducing operational complexity."*

### Vision Pillars

| Pillar | Description |
|--------|-------------|
| **Unified Operations** | Single platform for all ISP operations—no more juggling multiple tools |
| **SA-First Design** | Built from the ground up for South African regulatory and business requirements |
| **AI-Powered Intelligence** | Proactive insights and automation to reduce manual intervention |
| **Carrier-Grade Reliability** | Enterprise-level stability and performance for mission-critical operations |

---

## Target Market

### Primary Market

| Segment | Description | Size |
|---------|-------------|------|
| **Tier 2/3 ISPs** | Regional and local ISPs serving residential and SMB customers | ~200 companies |
| **Resellers** | Companies reselling connectivity from larger providers | ~500+ companies |
| **New Entrants** | Startups entering the fibre reselling market | Growing |

### Secondary Market

| Segment | Description |
|---------|-------------|
| **Enterprise ISPs** | Larger providers looking for unified tooling |
| **Managed Service Providers** | MSPs with connectivity offerings |

### Geographic Focus

- **Primary:** South Africa
- **Secondary:** SADC region (future expansion)

---

## Problem Statement

### Current Industry Challenges

| Challenge | Impact |
|-----------|--------|
| **Fragmented Tooling** | ISPs use 5-10+ separate systems for CRM, billing, network management, and support |
| **FNO Complexity** | Each FNO has different portals, APIs, and processes requiring manual work |
| **Compliance Burden** | RICA verification is manual and error-prone |
| **Billing Complexity** | South African-specific requirements (VAT, ZAR, local payment gateways) not well-supported |
| **Customer Churn** | Lack of proactive retention tools leads to high churn rates |
| **Support Inefficiency** | No unified view of customer issues across network and billing |

### Quantified Pain Points

- **40+ hours/month** spent on manual FNO portal interactions
- **15% customer churn** due to reactive support models
- **3-5 days** average time to activate new customers
- **R50,000+/month** spent on disconnected SaaS subscriptions

---

## Solution Overview

### CoreConnect Platform

CoreConnect delivers a unified ISP operating system with the following key capabilities:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CORECONNECT PLATFORM                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │   Sales     │  │    CRM      │  │  Marketing  │  │   Billing   ││
│  │   Connect   │  │   Connect   │  │   Connect   │  │   Connect   ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │  Network    │  │  Support    │  │ Call Center │  │   Talent    ││
│  │   Connect   │  │   Connect   │  │   Connect   │  │   Connect   ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │               FNO PROACTIVE INTELLIGENCE LAYER                  ││
│  │        (APIs • Scrapers • Email Parsers • Health Monitor)       ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Differentiators

| Differentiator | Description |
|----------------|-------------|
| **FNO Master Portal** | Single interface to manage all FNO activations and troubleshooting |
| **RICA-Native** | Built-in eKYC with Smile ID integration |
| **Churn Prediction AI** | ML-powered retention with proactive intervention triggers |
| **Real-time Network View** | Live RADIUS and ONT/CPE monitoring |
| **SA Payment Integration** | Native Paystack for local card and EFT payments |

---

## Core Modules & Features

### 1. Sales Connect (`/services/sales`)

**Purpose:** Lead management and sales pipeline automation

| Feature | Description | Priority |
|---------|-------------|----------|
| Lead Capture | Multi-channel lead intake (web forms, WhatsApp, API) | P0 |
| Coverage Check | Real-time FNO coverage qualification with map view | P0 |
| Visual Pipeline | Kanban-style deal tracking with stage automation | P0 |
| Quote Generation | Automated PDF quotes with e-signature | P1 |
| Commission Tracking | Agent commission calculation and reporting | P1 |
| Territory Management | Assign leads based on geographic zones | P2 |

### 2. CRM Connect (`/services/crm`)

**Purpose:** Subscriber 360 view and relationship management

| Feature | Description | Priority |
|---------|-------------|----------|
| Contact Management | Full customer profiles with history | P0 |
| RICA Status | Verification status and document storage | P0 |
| Subscriber 360 | Unified view of services, billing, support | P0 |
| Activity Timeline | All interactions logged chronologically | P1 |
| Communication Hub | Email, SMS, WhatsApp from unified interface | P1 |
| Custom Fields | ISP-specific data capture | P2 |

### 3. Marketing Connect (`/services/marketing`)

**Purpose:** Customer acquisition and engagement automation

| Feature | Description | Priority |
|---------|-------------|----------|
| AI Content Studio | Automated email/social content generation | P1 |
| Campaign Management | Multi-channel campaign orchestration | P1 |
| Landing Page Builder | No-code pages with lead capture | P1 |
| Referral Program | Customer referral tracking and rewards | P2 |
| Analytics Dashboard | Campaign performance and ROI tracking | P2 |

### 4. Billing Connect (`/services/billing`)

**Purpose:** Subscription and revenue management

| Feature | Description | Priority |
|---------|-------------|----------|
| Plan Management | Flexible pricing plans (monthly, annual, prepaid) | P0 |
| Automated Invoicing | ZAR invoices with VAT calculation | P0 |
| Paystack Integration | Card, EFT, and debit order payments | P0 |
| Subscription Lifecycle | Pro-rata, upgrades, downgrades, cancellations | P0 |
| Auto-Suspension | Payment-triggered service control | P0 |
| Dunning Management | Automated payment retry and notifications | P1 |
| Revenue Recognition | Deferred revenue and financial reporting | P2 |
| Refunds & Credits | Customer credit management | P1 |

### 5. Network Connect (`/services/network`)

**Purpose:** Network infrastructure and provisioning management

| Feature | Description | Priority |
|---------|-------------|----------|
| RADIUS Management | User provisioning and AAA integration | P0 |
| ONT/CPE Monitoring | Real-time device health and signal levels | P0 |
| FNO Master Portal | Unified interface for all FNO activations | P0 |
| Coverage Mapping | PostGIS-powered service area visualization | P1 |
| Speed Test Integration | In-app speed testing for diagnostics | P1 |
| Automated Provisioning | One-click service activation | P1 |

### 6. Support Connect (`/services/support`)

**Purpose:** Customer support and ticket management

| Feature | Description | Priority |
|---------|-------------|----------|
| Rapid Ticketing | SLA-driven issue tracking | P0 |
| Remote Diagnostics | One-click ONT health checks | P0 |
| Knowledge Base | Self-service support articles | P1 |
| Escalation Rules | Automatic routing based on issue type | P1 |
| Customer Portal | Self-service support interface | P1 |

### 7. Call Center Connect (`/services/call_center`)

**Purpose:** Voice operations and agent performance

| Feature | Description | Priority |
|---------|-------------|----------|
| Call Logging | Automatic call recording and transcription | P1 |
| Sentiment AI | Real-time call sentiment analysis | P2 |
| Agent Whisperer | AI-driven prompts during live calls | P2 |
| Queue Management | Call routing and wait time optimization | P1 |
| Performance Metrics | Agent KPI tracking and leaderboards | P1 |

### 8. Talent Connect (`/services/hr`)

**Purpose:** Staff management and HR operations

| Feature | Description | Priority |
|---------|-------------|----------|
| Performance Tracking | Individual and team KPIs | P2 |
| Staff Sentiment | AI-driven morale analysis | P3 |
| Scheduling | Shift management for support teams | P2 |
| Training Modules | Onboarding and continuous learning | P3 |

### 9. Retention Connect (`/services/retention`)

**Purpose:** Churn prediction and customer retention

| Feature | Description | Priority |
|---------|-------------|----------|
| Churn Prediction | ML model scoring customer risk | P1 |
| Retention Playbooks | Automated intervention workflows | P1 |
| Win-back Campaigns | Re-engagement for churned customers | P2 |
| Health Score | Customer satisfaction composite score | P1 |

### 10. Compliance Connect (`/services/rica`)

**Purpose:** Regulatory compliance management

| Feature | Description | Priority |
|---------|-------------|----------|
| RICA Verification | eKYC with Smile ID integration | P0 |
| Document Storage | Secure ID document management | P0 |
| Audit Trail | Complete verification history | P0 |
| Expiry Alerts | Proactive re-verification notifications | P1 |

### 11. IoT Connect (`/services/iot`)

**Purpose:** Device management and telemetry

| Feature | Description | Priority |
|---------|-------------|----------|
| Device Registry | All CPE and ONT asset tracking | P1 |
| Telemetry Dashboard | Real-time device metrics | P1 |
| Firmware Management | OTA update orchestration | P2 |
| Alert Rules | Threshold-based notifications | P1 |

### 12. Portal Management

**Purpose:** White-label customer self-service portal

| Feature | Description | Priority |
|---------|-------------|----------|
| Branded Portal | ISP-customized customer interface | P1 |
| Account Management | Customer self-service for profile updates | P1 |
| Usage Dashboard | Consumption and bandwidth visibility | P1 |
| Payment Portal | Online bill pay and history | P1 |
| Support Integration | Ticket creation and tracking | P1 |

---

## Technical Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.10+ (FastAPI) |
| **Database** | PostgreSQL 15 with PostGIS |
| **Frontend - Dashboard** | Next.js 16 + React 19 + Tailwind CSS 4 |
| **Frontend - Portal** | Vanilla HTML/CSS/JS |
| **UI Components** | Radix UI + Shadcn |
| **Charts** | Recharts |
| **Containerization** | Docker + Docker Compose |
| **Authentication** | OAuth2 (planned) |
| **Automation** | Playwright (FNO browser adapters) |

### Microservices Architecture

```
                    ┌──────────────────┐
                    │   NGINX/Web      │ :80
                    │   (Dashboard)    │
                    └────────┬─────────┘
                             │
      ┌──────────────────────┼──────────────────────┐
      │                      │                      │
      ▼                      ▼                      ▼
┌───────────┐         ┌───────────┐         ┌───────────┐
│  CRM      │ :8001   │  Sales    │ :8002   │  Billing  │ :8003
│  Service  │         │  Service  │         │  Service  │
└─────┬─────┘         └─────┬─────┘         └─────┬─────┘
      │                     │                     │
      └─────────────────────┼─────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  PostgreSQL   │ :5432
                    │  (Shared)     │
                    └───────────────┘
```

### Service Ports

| Service | Port |
|---------|------|
| PostgreSQL | 5432 |
| CRM Service | 8001 |
| Sales Service | 8002 |
| Billing Service | 8003 |
| RICA Service | 8004 |
| Network Service | 8005 |
| IoT Service | 8006 |
| Call Center Service | 8011 |
| Retention Service | 8012 |
| Web Dashboard (Nginx) | 80 |
| Customer Portal | 8080 |

### Database Schema

The platform uses a unified PostgreSQL database with multi-tenant support:

- **Tenant isolation** via `tenant_id` across all tables
- **Audit logging** with `created_at`, `updated_at`, `created_by` fields
- **Soft deletes** for data recovery
- **PostGIS** extension for geographic coverage mapping

---

## User Personas

### Persona 1: ISP Operations Manager

| Attribute | Detail |
|-----------|--------|
| **Name** | Sarah Ndlovu |
| **Role** | Operations Manager at a regional ISP |
| **Goals** | Reduce manual work, improve customer satisfaction, grow subscriber base |
| **Pain Points** | Too many systems to manage, no single view of operations |
| **Tech Savviness** | Moderate |

### Persona 2: Sales Agent

| Attribute | Detail |
|-----------|--------|
| **Name** | Thabo Molefe |
| **Role** | Field Sales Representative |
| **Goals** | Close more deals, accurate coverage checks, fast quotes |
| **Pain Points** | Multiple FNO portals, slow quote generation |
| **Tech Savviness** | Low-Moderate |

### Persona 3: Support Agent

| Attribute | Detail |
|-----------|--------|
| **Name** | Fatima Okonkwo |
| **Role** | Customer Support Specialist |
| **Goals** | Resolve tickets quickly, reduce escalations |
| **Pain Points** | No access to network diagnostics, siloed customer info |
| **Tech Savviness** | Moderate |

### Persona 4: ISP Owner/Executive

| Attribute | Detail |
|-----------|--------|
| **Name** | David van Zyl |
| **Role** | CEO of a growing ISP |
| **Goals** | Reduce churn, increase MRR, scale operations efficiently |
| **Pain Points** | No real-time business visibility, high operational costs |
| **Tech Savviness** | Low |

---

## User Journeys

### Journey 1: New Customer Activation

```
1. Lead Captured (Sales Connect)
   ↓
2. Coverage Verified (Network Connect - FNO Check)
   ↓
3. Quote Sent & Accepted (Sales Connect)
   ↓
4. RICA Verification (Compliance Connect - Smile ID)
   ↓
5. Payment Collected (Billing Connect - Paystack)
   ↓
6. FNO Activation Ordered (Network Connect - Master Portal)
   ↓
7. ONT Installed & Provisioned (Network Connect - RADIUS)
   ↓
8. Welcome Email Sent (Marketing Connect)
   ↓
9. Customer Active in CRM (CRM Connect)
```

### Journey 2: Support Ticket Resolution

```
1. Customer Reports Issue (Support Connect / Portal)
   ↓
2. Ticket Auto-Categorized (AI Classification)
   ↓
3. Network Diagnostics Run (Network Connect)
   ↓
4. Agent Receives Context (Subscriber 360)
   ↓
5. FNO Ticket Created if Needed (Master Portal)
   ↓
6. Resolution Applied & Verified
   ↓
7. Customer Notified & Satisfaction Surveyed
```

---

## Integrations

### Payment Gateways

| Integration | Purpose | Status |
|-------------|---------|--------|
| **Paystack** | Card, EFT, Debit Orders | Planned |
| **PayFast** | Alternative payment gateway | Future |

### FNO Providers

| FNO | Integration Type | Status |
|-----|------------------|--------|
| **Vumatel** | API + Portal Automation | Planned |
| **Openserve** | API + Portal Automation | Planned |
| **Frogfoot** | API + Portal Automation | Planned |
| **Octotel** | API + Portal Automation | Future |
| **Evotel** | Portal Automation | Future |

### RICA/KYC

| Integration | Purpose | Status |
|-------------|---------|--------|
| **Smile ID** | eKYC Verification | Planned |
| **IDentity** | Alternative KYC | Future |

### Communication

| Integration | Purpose | Status |
|-------------|---------|--------|
| **SendGrid** | Transactional Email | Planned |
| **WhatsApp Business** | Messaging | Future |
| **Twilio** | SMS | Future |

### Network

| Integration | Purpose | Status |
|-------------|---------|--------|
| **FreeRADIUS** | AAA Services | Planned |
| **SNMP** | Device Monitoring | Future |
| **TR-069** | CPE Management | Future |

---

## Non-Functional Requirements

### Performance

| Requirement | Target |
|-------------|--------|
| API Response Time | < 200ms (p95) |
| Dashboard Load Time | < 3 seconds |
| Concurrent Users | 500+ per tenant |
| Data Processing | 10,000 transactions/hour |

### Availability

| Requirement | Target |
|-------------|--------|
| Uptime | 99.9% |
| RTO (Recovery Time) | < 4 hours |
| RPO (Data Loss) | < 1 hour |

### Security

| Requirement | Description |
|-------------|-------------|
| Authentication | OAuth2 / JWT with MFA |
| Authorization | Role-based access control (RBAC) |
| Data Encryption | TLS 1.3 in transit, AES-256 at rest |
| Audit Logging | All actions logged with user context |
| Compliance | POPIA compliant data handling |

### Scalability

| Requirement | Description |
|-------------|-------------|
| Horizontal Scaling | Stateless services behind load balancer |
| Database | Read replicas for reporting workloads |
| Multi-Tenant | Tenant isolation with shared infrastructure |

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| Customer Activation Time | 3-5 days | < 24 hours | 6 months |
| Support Ticket Resolution | 48 hours | < 4 hours | 6 months |
| Monthly Churn Rate | 15% | < 5% | 12 months |
| Operational Cost per Sub | R200 | R75 | 12 months |
| NPS Score | N/A | > 50 | 12 months |
| FNO Portal Time Saved | 0 | 40 hours/month | 3 months |

### Business Metrics

| Metric | Target |
|--------|--------|
| Active ISP Customers | 50 by end of Year 1 |
| Monthly Recurring Revenue | R500,000 by end of Year 1 |
| Customer Retention | 90% annual retention |

---

## Roadmap

### Phase 1: Foundation (Q1 2026) ✅ In Progress

- [x] Core microservices architecture
- [x] CRM Connect (Basic)
- [x] Billing Connect (Basic)
- [x] Network Connect (Basic)
- [x] Next.js Dashboard UI
- [x] Customer Portal (Basic)
- [ ] PostgreSQL schema implementation
- [ ] Docker deployment

### Phase 2: Core Operations (Q2 2026)

- [ ] Sales Connect (Full)
- [ ] Support Connect (Full)
- [ ] RICA/Smile ID Integration
- [ ] Paystack Integration
- [ ] FNO Master Portal (Vumatel)
- [ ] RADIUS Integration

### Phase 3: Intelligence Layer (Q3 2026)

- [ ] Retention Connect (ML Churn Model)
- [ ] Marketing Connect (AI Content)
- [ ] Call Center Connect (Sentiment AI)
- [ ] Advanced Analytics Dashboard
- [ ] FNO Master Portal (Openserve, Frogfoot)

### Phase 4: Scale & Optimize (Q4 2026)

- [ ] White-label Portal Builder
- [ ] Mobile App (ISP Staff)
- [ ] Advanced Reporting
- [ ] API Marketplace
- [ ] Multi-region deployment

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **FNO** | Fibre Network Operator (e.g., Vumatel, Openserve) |
| **ISP** | Internet Service Provider |
| **RICA** | Regulation of Interception of Communications Act |
| **ONT** | Optical Network Terminal |
| **CPE** | Customer Premises Equipment |
| **AAA** | Authentication, Authorization, Accounting |
| **RADIUS** | Remote Authentication Dial-In User Service |
| **MRR** | Monthly Recurring Revenue |
| **NPS** | Net Promoter Score |
| **POPIA** | Protection of Personal Information Act |

### B. Brand Guidelines

| Element | Value |
|---------|-------|
| Primary Color | `#e31b23` (Red) |
| Secondary Color | `#1a1a1a` (Dark) |
| Accent Color | `#22d3ee` (Cyan) |
| Font Family | Outfit, sans-serif |
| Hero Gradient | `linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)` |

### C. References

- South African RICA Requirements
- POPIA Compliance Guidelines
- Paystack API Documentation
- Smile ID Integration Guide
- FreeRADIUS SQL Documentation

---

*This document is maintained by the CoreConnect product team. Last updated: January 15, 2026.*
