---
name: API Testing
description: Test FastAPI endpoints and validate API contracts for CoreConnect services
---

# API Testing Skill

Guidelines for testing FastAPI microservices in CoreConnect.

## Testing Stack

- **pytest** - Test framework
- **httpx** - Async HTTP client
- **pytest-asyncio** - Async test support

## Test Structure

```
services/<service>/
├── app.py
├── models.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_health.py
│   └── test_<feature>.py
└── requirements-test.txt
```

## Fixtures (conftest.py)

```python
import pytest
from httpx import AsyncClient
from app import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
```

## Test Examples

### Health Check

```python
import pytest

@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### CRUD Operations

```python
@pytest.mark.asyncio
async def test_create_customer(client):
    data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com"
    }
    response = await client.post("/customers", json=data)
    assert response.status_code == 201
    assert response.json()["email"] == "john@example.com"
```

## Running Tests

```bash
# Run all tests
pytest

# With coverage
pytest --cov=app --cov-report=html

# Specific test file
pytest tests/test_health.py -v
```

## Checklist

- [ ] Health endpoint tested
- [ ] CRUD operations tested
- [ ] Error cases covered
- [ ] Auth tested (when implemented)
