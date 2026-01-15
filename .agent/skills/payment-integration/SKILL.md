---
name: Payment Integration
description: Integrate South African payment gateways (Paystack) for subscription billing
---

# Payment Integration Skill

Guidelines for integrating Paystack and managing ZAR billing.

## Paystack Integration

### Setup

```python
import paystack

paystack.secret_key = "sk_live_xxx"
```

### Create Customer

```python
from paystack.customers import Customer

customer = Customer.create(
    email="customer@example.com",
    first_name="John",
    last_name="Doe",
    phone="+27821234567"
)
customer_code = customer["customer_code"]
```

### Initialize Transaction

```python
from paystack.transactions import Transaction

transaction = Transaction.initialize(
    email="customer@example.com",
    amount=79900,  # R799.00 in kobo
    currency="ZAR",
    reference=f"INV-{invoice_id}",
    callback_url="https://app.example.com/payment/callback"
)
authorization_url = transaction["authorization_url"]
```

### Subscription (Recurring)

```python
from paystack.subscriptions import Subscription

subscription = Subscription.create(
    customer=customer_code,
    plan="PLN_monthly_100mbps",
    authorization=authorization_code  # From previous successful payment
)
```

### Webhook Handler

```python
from fastapi import Request, HTTPException
import hashlib
import hmac

@app.post("/webhooks/paystack")
async def paystack_webhook(request: Request):
    signature = request.headers.get("x-paystack-signature")
    body = await request.body()
    
    # Verify signature
    expected = hmac.new(
        PAYSTACK_SECRET.encode(),
        body,
        hashlib.sha512
    ).hexdigest()
    
    if signature != expected:
        raise HTTPException(status_code=400)
    
    event = await request.json()
    
    if event["event"] == "charge.success":
        # Mark invoice as paid
        pass
    elif event["event"] == "subscription.disable":
        # Handle cancelled subscription
        pass
```

## VAT Calculation

```python
VAT_RATE = 0.15  # 15% South African VAT

def calculate_invoice_amounts(subtotal: float):
    vat = subtotal * VAT_RATE
    total = subtotal + vat
    return {
        "subtotal": round(subtotal, 2),
        "vat": round(vat, 2),
        "total": round(total, 2)
    }
```

## Checklist

- [ ] Paystack API keys configured
- [ ] Customer creation flow
- [ ] Transaction initialization
- [ ] Webhook handler implemented
- [ ] VAT calculation correct (15%)
- [ ] Invoice generation working
