---
name: FNO Integration
description: Guidelines for integrating with South African Fibre Network Operators (Vumatel, Openserve, Frogfoot, etc.)
---

# FNO Integration Skill

This skill provides guidance for integrating with South African Fibre Network Operators (FNOs) in the CoreConnect platform.

## Project Context

CoreConnect's FNO Master Portal unifies interactions with multiple FNOs, reducing manual portal work and enabling automated provisioning.

## Supported FNOs

| FNO | Integration Type | Priority | API Available |
|-----|------------------|----------|---------------|
| **Vumatel** | API + Portal Automation | P0 | Yes (Partner) |
| **Openserve** | API + Portal Automation | P0 | Limited |
| **Frogfoot** | API + Portal Automation | P1 | Yes |
| **Octotel** | Portal Automation | P2 | Limited |
| **Evotel** | Portal Automation | P2 | No |
| **MetroFibre** | Portal Automation | P3 | No |

## Integration Types

### 1. API Integration (Preferred)

Direct API integration when FNO provides partner access.

```python
"""
FNO API Client Base Class
"""

import httpx
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from pydantic import BaseModel


class FNOClientBase(ABC):
    """Base class for FNO API clients."""
    
    def __init__(self, base_url: str, api_key: str, timeout: int = 30):
        self.base_url = base_url
        self.client = httpx.AsyncClient(
            base_url=base_url,
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=timeout
        )
    
    @abstractmethod
    async def check_coverage(self, address: str) -> Dict[str, Any]:
        """Check if address has fibre coverage."""
        pass
    
    @abstractmethod
    async def create_order(self, order_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new fibre activation order."""
        pass
    
    @abstractmethod
    async def get_order_status(self, order_id: str) -> Dict[str, Any]:
        """Get status of an existing order."""
        pass
    
    @abstractmethod
    async def submit_fault(self, fault_data: Dict[str, Any]) -> Dict[str, Any]:
        """Submit a fault/support ticket."""
        pass


class VumatelClient(FNOClientBase):
    """Vumatel API Client."""
    
    async def check_coverage(self, address: str) -> Dict[str, Any]:
        response = await self.client.get(
            "/coverage/check",
            params={"address": address}
        )
        return response.json()
    
    async def create_order(self, order_data: Dict[str, Any]) -> Dict[str, Any]:
        response = await self.client.post("/orders", json=order_data)
        return response.json()
    
    async def get_order_status(self, order_id: str) -> Dict[str, Any]:
        response = await self.client.get(f"/orders/{order_id}")
        return response.json()
    
    async def submit_fault(self, fault_data: Dict[str, Any]) -> Dict[str, Any]:
        response = await self.client.post("/faults", json=fault_data)
        return response.json()
```

### 2. Portal Automation (Playwright)

For FNOs without APIs, use browser automation:

```python
"""
FNO Portal Automation using Playwright
"""

from playwright.async_api import async_playwright, Page
from typing import Dict, Any
import asyncio


class FNOPortalAutomation:
    """Base class for FNO portal automation."""
    
    def __init__(self, username: str, password: str, headless: bool = True):
        self.username = username
        self.password = password
        self.headless = headless
        self.browser = None
        self.page = None
    
    async def start(self):
        """Initialize browser session."""
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=self.headless)
        self.page = await self.browser.new_page()
    
    async def close(self):
        """Close browser session."""
        if self.browser:
            await self.browser.close()
    
    async def login(self, portal_url: str, login_selector: Dict[str, str]):
        """Login to FNO portal."""
        await self.page.goto(portal_url)
        await self.page.fill(login_selector["username"], self.username)
        await self.page.fill(login_selector["password"], self.password)
        await self.page.click(login_selector["submit"])
        await self.page.wait_for_load_state("networkidle")


class OpenservePortalAutomation(FNOPortalAutomation):
    """Openserve Portal Automation."""
    
    PORTAL_URL = "https://partner.openserve.co.za"
    LOGIN_SELECTORS = {
        "username": "#username",
        "password": "#password",
        "submit": "button[type='submit']"
    }
    
    async def check_coverage(self, address: str) -> Dict[str, Any]:
        """Check coverage on Openserve portal."""
        await self.page.goto(f"{self.PORTAL_URL}/coverage")
        await self.page.fill("#address-search", address)
        await self.page.click("#search-button")
        await self.page.wait_for_selector(".coverage-results")
        
        # Extract results
        results = await self.page.evaluate("""
            () => {
                const results = document.querySelector('.coverage-results');
                return {
                    available: results.classList.contains('available'),
                    packages: Array.from(results.querySelectorAll('.package')).map(p => ({
                        name: p.querySelector('.name').textContent,
                        speed: p.querySelector('.speed').textContent
                    }))
                };
            }
        """)
        return results
```

### 3. Email Parsing (Fallback)

For status updates received via email:

```python
"""
FNO Email Parser for status updates
"""

import imaplib
import email
from email.header import decode_header
from typing import List, Dict, Any
import re


class FNOEmailParser:
    """Parse FNO status emails for order updates."""
    
    EMAIL_PATTERNS = {
        "vumatel": {
            "order_complete": r"Order (\w+) has been completed",
            "installation_scheduled": r"Installation scheduled for (\d{4}-\d{2}-\d{2})",
            "fault_resolved": r"Fault (\w+) has been resolved"
        },
        "openserve": {
            "order_complete": r"Activation Complete - Ref: (\w+)",
            "installation_scheduled": r"Technician visit: (\d{2}/\d{2}/\d{4})"
        }
    }
    
    def __init__(self, imap_server: str, username: str, password: str):
        self.mail = imaplib.IMAP4_SSL(imap_server)
        self.mail.login(username, password)
    
    def parse_fno_emails(self, fno: str, since_date: str) -> List[Dict[str, Any]]:
        """Parse emails from specific FNO."""
        self.mail.select("inbox")
        
        # Search for FNO emails
        _, messages = self.mail.search(
            None,
            f'(FROM "@{fno}.co.za" SINCE {since_date})'
        )
        
        results = []
        patterns = self.EMAIL_PATTERNS.get(fno, {})
        
        for msg_id in messages[0].split():
            _, msg_data = self.mail.fetch(msg_id, "(RFC822)")
            msg = email.message_from_bytes(msg_data[0][1])
            
            body = self._get_email_body(msg)
            
            for event_type, pattern in patterns.items():
                match = re.search(pattern, body)
                if match:
                    results.append({
                        "type": event_type,
                        "reference": match.group(1),
                        "date": msg["Date"],
                        "subject": msg["Subject"]
                    })
        
        return results
```

## Data Models

### Coverage Check

```python
from pydantic import BaseModel
from typing import Optional, List


class CoverageResult(BaseModel):
    """FNO Coverage check result."""
    fno: str
    address: str
    latitude: Optional[float]
    longitude: Optional[float]
    is_covered: bool
    packages: List["PackageOption"]
    estimated_install_time: Optional[str]
    
    class Config:
        schema_extra = {
            "example": {
                "fno": "vumatel",
                "address": "123 Main Street, Sandton",
                "is_covered": True,
                "packages": [
                    {"name": "50/50 Mbps", "monthly_cost": 799},
                    {"name": "100/100 Mbps", "monthly_cost": 999}
                ]
            }
        }


class PackageOption(BaseModel):
    """Available package from FNO."""
    name: str
    download_mbps: int
    upload_mbps: int
    monthly_cost: float  # ZAR
    setup_fee: Optional[float]
    contract_months: Optional[int]
```

### Order Management

```python
from enum import Enum


class OrderStatus(str, Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    ACCEPTED = "accepted"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    FAILED = "failed"


class FNOOrder(BaseModel):
    """FNO Activation Order."""
    id: str
    fno: str
    fno_reference: Optional[str]
    customer_id: str
    address: str
    package: str
    status: OrderStatus
    rica_verified: bool
    scheduled_date: Optional[str]
    completed_date: Optional[str]
    notes: Optional[str]
```

## Unified FNO Service

```python
"""
Unified FNO Service - Single interface for all FNOs
"""

from typing import Dict, Any, List
from enum import Enum


class FNO(str, Enum):
    VUMATEL = "vumatel"
    OPENSERVE = "openserve"
    FROGFOOT = "frogfoot"
    OCTOTEL = "octotel"
    EVOTEL = "evotel"


class FNOMasterPortal:
    """Unified interface for all FNO operations."""
    
    def __init__(self, config: Dict[str, Any]):
        self.clients = {}
        self._initialize_clients(config)
    
    def _initialize_clients(self, config: Dict[str, Any]):
        """Initialize FNO clients based on configuration."""
        if config.get("vumatel"):
            self.clients[FNO.VUMATEL] = VumatelClient(
                base_url=config["vumatel"]["base_url"],
                api_key=config["vumatel"]["api_key"]
            )
        # Initialize other FNO clients...
    
    async def check_all_coverage(self, address: str) -> List[CoverageResult]:
        """Check coverage across all FNOs."""
        results = []
        
        for fno, client in self.clients.items():
            try:
                result = await client.check_coverage(address)
                results.append(CoverageResult(
                    fno=fno.value,
                    address=address,
                    **result
                ))
            except Exception as e:
                # Log error but continue with other FNOs
                print(f"Error checking {fno}: {e}")
        
        return results
    
    async def create_order(self, fno: FNO, order_data: Dict[str, Any]) -> FNOOrder:
        """Create order with specific FNO."""
        client = self.clients.get(fno)
        if not client:
            raise ValueError(f"FNO {fno} not configured")
        
        result = await client.create_order(order_data)
        return FNOOrder(**result)
```

## Error Handling

```python
class FNOError(Exception):
    """Base exception for FNO operations."""
    pass


class FNOCoverageError(FNOError):
    """Coverage check failed."""
    pass


class FNOOrderError(FNOError):
    """Order creation/update failed."""
    pass


class FNOAuthError(FNOError):
    """Authentication with FNO failed."""
    pass


class FNOTimeoutError(FNOError):
    """FNO request timed out."""
    pass
```

## Testing FNO Integrations

```python
import pytest
from unittest.mock import AsyncMock, patch


@pytest.mark.asyncio
async def test_vumatel_coverage_check():
    """Test Vumatel coverage check."""
    client = VumatelClient(
        base_url="https://api.vumatel.co.za",
        api_key="test-key"
    )
    
    with patch.object(client.client, 'get', new_callable=AsyncMock) as mock_get:
        mock_get.return_value.json.return_value = {
            "is_covered": True,
            "packages": [{"name": "50/50 Mbps"}]
        }
        
        result = await client.check_coverage("123 Main St")
        
        assert result["is_covered"] is True
        assert len(result["packages"]) > 0
```

## Security Considerations

1. **Credential Storage**: Store FNO credentials in environment variables or secrets manager
2. **Rate Limiting**: Respect FNO API rate limits
3. **Audit Logging**: Log all FNO interactions for troubleshooting
4. **Session Management**: Handle portal session timeouts gracefully
5. **Encryption**: Use HTTPS for all FNO communications

## Checklist

- [ ] FNO API/Portal credentials configured
- [ ] Coverage check implemented
- [ ] Order creation implemented
- [ ] Status polling configured
- [ ] Error handling in place
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Tests written
- [ ] Documentation updated
