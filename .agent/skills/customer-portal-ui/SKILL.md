---
name: Customer Portal UI
description: White-label customer self-service portal design patterns
---

# Customer Portal UI Skill

Design patterns for the customer-facing self-service portal.

## Portal Overview

The customer portal is a white-label interface where ISP subscribers can:
- View account details and usage
- Pay invoices
- Open support tickets
- Manage their services

## Technology

- Vanilla HTML/CSS/JavaScript
- Optional: Custom branding per tenant
- Lightweight, fast-loading

## Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Account - {{ISP_NAME}}</title>
  <link rel="stylesheet" href="portal.css">
</head>
<body class="portal-body">
  <header class="portal-header">
    <div class="container">
      <img src="{{ISP_LOGO}}" alt="{{ISP_NAME}}" class="logo">
      <nav class="portal-nav">
        <a href="#dashboard">Dashboard</a>
        <a href="#billing">Billing</a>
        <a href="#support">Support</a>
      </nav>
      <div class="user-menu">
        <span>John Doe</span>
        <button class="btn-logout">Sign Out</button>
      </div>
    </div>
  </header>

  <main class="portal-main">
    <div class="container">
      <!-- Content -->
    </div>
  </main>

  <footer class="portal-footer">
    <p>Powered by CoreConnect</p>
  </footer>
</body>
</html>
```

## CSS Variables (White-Label)

```css
:root {
  /* Customizable per ISP */
  --portal-primary: #e31b23;
  --portal-primary-dark: #c41820;
  
  /* Fixed design tokens */
  --portal-bg: #0f172a;
  --portal-surface: #1e293b;
  --portal-border: #334155;
  --portal-text: #f1f5f9;
  --portal-text-muted: #94a3b8;
  --portal-radius: 8px;
}
```

## Dashboard Card

```html
<div class="portal-card">
  <div class="card-header">
    <h3>Your Plan</h3>
  </div>
  <div class="card-body">
    <div class="plan-info">
      <span class="plan-name">100 Mbps Fibre</span>
      <span class="plan-price">R 799/month</span>
    </div>
    <div class="plan-details">
      <div class="detail-item">
        <span class="label">Status</span>
        <span class="badge badge-success">Active</span>
      </div>
      <div class="detail-item">
        <span class="label">Next Bill</span>
        <span class="value">1 Feb 2026</span>
      </div>
    </div>
  </div>
</div>
```

```css
.portal-card {
  background: var(--portal-surface);
  border: 1px solid var(--portal-border);
  border-radius: var(--portal-radius);
  overflow: hidden;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--portal-border);
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.card-body {
  padding: 20px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}
```

## Usage Display

```html
<div class="usage-meter">
  <div class="usage-header">
    <span class="usage-label">Data Usage</span>
    <span class="usage-value">450 GB / Unlimited</span>
  </div>
  <div class="usage-bar">
    <div class="usage-fill" style="width: 45%"></div>
  </div>
  <p class="usage-period">Last 30 days</p>
</div>
```

```css
.usage-bar {
  height: 8px;
  background: var(--portal-border);
  border-radius: 4px;
  overflow: hidden;
}

.usage-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--portal-primary), var(--portal-primary-dark));
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

## Invoice List

```html
<div class="invoice-list">
  <div class="invoice-item">
    <div class="invoice-info">
      <span class="invoice-number">INV-2026-001</span>
      <span class="invoice-date">1 Jan 2026</span>
    </div>
    <div class="invoice-amount">R 799.00</div>
    <span class="badge badge-success">Paid</span>
    <a href="#" class="btn-icon" title="Download PDF">
      <svg><!-- Download icon --></svg>
    </a>
  </div>
  
  <div class="invoice-item">
    <div class="invoice-info">
      <span class="invoice-number">INV-2026-002</span>
      <span class="invoice-date">1 Feb 2026</span>
    </div>
    <div class="invoice-amount">R 799.00</div>
    <span class="badge badge-warning">Due</span>
    <button class="btn btn-primary btn-sm">Pay Now</button>
  </div>
</div>
```

## Support Ticket Form

```html
<form class="portal-form" id="supportForm">
  <div class="form-group">
    <label for="category">Issue Category</label>
    <select id="category" required>
      <option value="">Select category...</option>
      <option value="connectivity">Connectivity Issues</option>
      <option value="billing">Billing Query</option>
      <option value="speed">Speed Issues</option>
      <option value="other">Other</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" rows="4" required 
              placeholder="Please describe your issue..."></textarea>
  </div>
  
  <button type="submit" class="btn btn-primary">
    Submit Ticket
  </button>
</form>
```

## Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--portal-radius);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--portal-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--portal-primary-dark);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--portal-border);
  color: var(--portal-text);
}

.btn-outline:hover {
  background: var(--portal-surface);
}
```

## Responsive Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .portal-nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .portal-card {
    margin-bottom: 16px;
  }
}
```

## Checklist

- [ ] ISP branding applied (logo, colors)
- [ ] Mobile-responsive layout
- [ ] Account overview visible
- [ ] Billing history accessible
- [ ] Payment button prominent
- [ ] Support ticket submission
- [ ] Fast page load (<2s)
