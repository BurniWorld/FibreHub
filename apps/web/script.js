// FibreHub UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const tab = item.getAttribute('data-tab');
            console.log(`Switching to hub: ${tab}`);

            // Toggle Views
            const dashboardView = document.getElementById('dashboard-view');
            const salesView = document.getElementById('sales-view');
            const billingView = document.getElementById('billing-view');
            const ricaView = document.getElementById('rica-view');
            const networkView = document.getElementById('network-view');
            const iotView = document.getElementById('iot-view');
            const stockView = document.getElementById('stock-view');
            const supportView = document.getElementById('support-view');

            if (dashboardView) dashboardView.style.display = tab === 'crm' ? 'block' : 'none';
            if (salesView) salesView.style.display = tab === 'sales' ? 'block' : 'none';
            if (billingView) billingView.style.display = tab === 'billing' ? 'block' : 'none';
            if (ricaView) ricaView.style.display = tab === 'rica' ? 'block' : 'none';
            if (networkView) networkView.style.display = tab === 'network' ? 'block' : 'none';
            if (iotView) iotView.style.display = tab === 'iot' ? 'block' : 'none';
            if (stockView) stockView.style.display = tab === 'stock' ? 'block' : 'none';
            if (supportView) supportView.style.display = tab === 'support' ? 'block' : 'none';
        });
    });

    // Billing Sub-Tab Switching
    const billingTabBtns = document.querySelectorAll('.tab-btn[data-billing-tab]');
    billingTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            billingTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subTab = btn.getAttribute('data-billing-tab');
            document.getElementById('billing-invoices-section').style.display = subTab === 'invoices' ? 'block' : 'none';
            document.getElementById('billing-subscriptions-section').style.display = subTab === 'subscriptions' ? 'block' : 'none';
            // refunds coming soon
        });
    });

    // Simple Animation for Stat Cards on Load
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Mock Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('.data-table tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Sales Sub-Tab Switching
    const salesTabBtns = document.querySelectorAll('.tab-btn');
    salesTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            salesTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subTab = btn.getAttribute('data-sales-tab');
            if (subTab === 'pipeline') {
                document.getElementById('sales-pipeline-section').style.display = 'block';
                document.getElementById('sales-coverage-section').style.display = 'none';
            } else {
                document.getElementById('sales-pipeline-section').style.display = 'none';
                document.getElementById('sales-coverage-section').style.display = 'block';
                initMap();
            }
        });
    });

    // Stock Sub-Tab Switching
    const stockTabBtns = document.querySelectorAll('.tab-btn[data-stock-tab]');
    stockTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            stockTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subTab = btn.getAttribute('data-stock-tab');
            document.getElementById('stock-inventory-section').style.display = subTab === 'inventory' ? 'block' : 'none';
            document.getElementById('stock-supply-chain-section').style.display = subTab === 'supply-chain' ? 'block' : 'none';
            document.getElementById('stock-planning-section').style.display = subTab === 'planning' ? 'block' : 'none';
            // returns & reports views coming soon
        });
    });

    // Support Sub-Tab Switching
    const supportTabBtns = document.querySelectorAll('.tab-btn[data-support-tab]');
    supportTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            supportTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subTab = btn.getAttribute('data-support-tab');
            document.getElementById('support-tickets-section').style.display = subTab === 'tickets' ? 'block' : 'none';
            document.getElementById('support-diagnostics-section').style.display = subTab === 'diagnostics' ? 'block' : 'none';
            // KB coming soon
        });
    });

    // Network Sub-Tab Switching
    const networkTabBtns = document.querySelectorAll('.tab-btn[data-network-tab]');
    networkTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            networkTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subTab = btn.getAttribute('data-network-tab');
            document.getElementById('network-provisioning-section').style.display = subTab === 'provisioning' ? 'block' : 'none';
            document.getElementById('network-proactive-section').style.display = subTab === 'proactive' ? 'block' : 'none';
            document.getElementById('network-profiles-section').style.display = subTab === 'profiles' ? 'block' : 'none';
            document.getElementById('network-infra-section').style.display = subTab === 'infra' ? 'block' : 'none';
            document.getElementById('network-automation-section').style.display = subTab === 'automation' ? 'block' : 'none';
        });
    });

    // Map Initialization
    let mapInstance = null;
    function initMap() {
        if (mapInstance) return;

        // Coordinates for Johannesburg roughly
        mapInstance = L.map('coverage-map').setView([-26.2041, 28.0473], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(mapInstance);

        // Add some mock coverage circles
        const coverageZones = [
            { center: [-26.2041, 28.0473], color: '#22d3ee', label: 'Openserve Zone' },
            { center: [-26.2100, 28.0600], color: '#f472b6', label: 'Vumatel Zone' },
            { center: [-26.1950, 28.0350], color: '#a78bfa', label: 'Frogfoot Zone' }
        ];

        coverageZones.forEach(zone => {
            L.circle(zone.center, {
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.2,
                radius: 1000
            }).addTo(mapInstance).bindPopup(zone.label);
        });
    }

    // New Deal Button Logic
    const newDealBtn = document.getElementById('new-deal-btn');
    if (newDealBtn) {
        newDealBtn.addEventListener('click', () => {
            // Switch to Sales Tab
            const salesNavItem = document.querySelector('.nav-item[data-tab="sales"]');
            if (salesNavItem) salesNavItem.click();

            // Switch to Pipeline Sub-tab
            const pipelineTabBtn = document.querySelector('.tab-btn[data-sales-tab="pipeline"]');
            if (pipelineTabBtn) pipelineTabBtn.click();

            console.log("Navigating to New Deal flow...");
        });
    }

    // RICA Journey Logic
    const startRicaBtn = document.getElementById('start-rica-btn');
    if (startRicaBtn) {
        startRicaBtn.addEventListener('click', () => {
            console.log("Initializing Smile ID Journey...");
            alert("Smile ID SmartSelfie™ session starting... (Redirecting to Secure Verification)");

            // Mock result after 2 seconds
            setTimeout(() => {
                alert("RICA Verification Success! Status updated in CRM.");
            }, 2000);
        });
    }
});
