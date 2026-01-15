---
name: SA Compliance
description: Implement RICA verification and POPIA compliance for South African ISP operations
---

# SA Compliance Skill

Guidelines for implementing South African regulatory compliance.

## RICA (Regulation of Interception of Communications Act)

### Requirements

Every subscriber must be RICA verified before service activation:

- Valid SA ID document or passport
- Proof of address (not older than 3 months)
- Verified within 36 months (re-verification required after)

### Smile ID Integration

```python
from smileid import WebApi

api = WebApi(
    partner_id="your_partner_id",
    api_key="your_api_key",
    environment="production"
)

# Verify SA ID
result = api.enhanced_verify_id(
    partner_params={
        "user_id": customer_id,
        "job_id": verification_id,
        "job_type": 5
    },
    id_info={
        "country": "ZA",
        "id_type": "NATIONAL_ID",
        "id_number": id_number
    }
)
```

### RICA Status Flow

```
pending → submitted → verified → (after 36 months) → expired
                    ↘ rejected
```

### Database Schema

```sql
CREATE TABLE rica_verifications (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    id_type VARCHAR(50),  -- national_id, passport
    id_number VARCHAR(50),
    verification_provider VARCHAR(50),  -- smile_id
    provider_reference VARCHAR(100),
    status VARCHAR(50),
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## POPIA (Protection of Personal Information Act)

### Data Protection Requirements

1. **Consent** - Explicit consent for data collection
2. **Purpose** - Only collect data for specified purpose
3. **Security** - Encrypt personal data
4. **Access** - Customers can request their data
5. **Deletion** - Right to be forgotten

### Consent Tracking

```sql
CREATE TABLE consent_records (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    consent_type VARCHAR(50),  -- marketing, data_processing
    granted BOOLEAN,
    granted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    ip_address INET
);
```

## Checklist

- [ ] Smile ID integration configured
- [ ] RICA status tracked per customer
- [ ] ID documents securely stored
- [ ] Consent records maintained
- [ ] Data encryption enabled
- [ ] Audit logs implemented
