# FibreHub: The Ultimate ISP Operations Platform (SA Edition) 🚀🏜️🇿🇦

FibreHub is a carrier-grade, microservice-based operations platform designed specifically for South African ISPs. It unifies CRM, Sales, Billing, Network provisioning, and FNO automation into a single, high-performance ecosystem.

## 🏗️ Core Modules

### 1. Sales & CRM Hub (`/services/sales`, `/services/crm`)
*   **Lead Management**: Track and convert prospects.
*   **Deal Flow**: Manage the sales pipeline.
*   **Subscriber 360**: Full CRM with RICA verification status.

### 2. Billing & Financials (`/services/billing`)
*   **Automated Invoicing**: Generation of invoices in ZAR.
*   **Paystack Integration**: Built-in logic for SA's leading payment gateway.
*   **Usage-Based Sync**: Live link between RADIUS data and customer billing.

### 3. Network Operations Center - NOC (`/services/network`, `/services/iot`)
*   **RADIUS Hub**: Full FreeRADIUS SQL integration with real-time session monitoring.
*   **Hardware-Radius Link**: Connects physical ONT/Router serials to logical accounts.
*   **FNO Master Portal**: Monitoring streams via API, Scraper, and Email parsing for Vumatel, Openserve, Frogfoot, etc.
*   **Proactive Health**: Inference-based monitoring for fiber signal degradation.

### 4. Support & Ticketing (`/services/support`)
*   **FCR Tracking**: Monitor First Contact Resolution performance.
*   **Auto-Escalation**: Playwright-based automation to log tickets on legacy FNO portals.
*   **Network Broadcasting**: Suburb-targeted outage notifications.

### 5. AI Analytics Engine (`/services/analytics`)
*   **Executive Insights**: High-level summaries of churn, revenue, and technical health.
*   **Smart Upsell**: Predicts customer needs based on usage patterns.

---

## 🛠️ Stack
*   **Backend**: Python 3.10+ (FastAPI)
*   **Database**: PostgreSQL with PostGIS (Coverage mapping)
*   **Frontend**: Vanilla HTML/CSS/JS (Modern Dashboard UI)
*   **Automation**: Playwright (Browser-based FNO adapters)

## 📡 FNO Proactive Intelligence Layer
Unlike traditional systems, FibreHub uses a multi-vector listener to track FNO health:
1. **APIs**: Direct B2B hooks.
2. **Scrapers**: Real-time keyword monitoring of FNO status pages.
3. **Email Parsers**: Automatically ingests and maps NOC notifications to affected customer IDs.

---
Created by Antigravity AI for BurniWorld.
