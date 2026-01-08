document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mockup parallax effect
    const mockup = document.querySelector('.app-mockup');
    if (mockup) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            mockup.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Feature Detail Logic
    const modal = document.getElementById('feature-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const featureDetails = {
        billing: {
            title: 'Automated Billing Hub',
            desc: 'A complete financial ecosystem designed specifically for the unique demands of South African ISPs.',
            details: [
                { icon: 'fas fa-credit-card', title: 'Paystack Integration', text: 'Seamless debit order and credit card processing with South Africa\'s leading gateway.' },
                { icon: 'fas fa-file-invoice', title: 'Tax Invoices', text: 'Automated generation of SARS-compliant tax invoices delivered directly to clients.' },
                { icon: 'fas fa-user-shield', title: 'Self-Service Portal', text: 'Allow customers to pay bills, download statements, and update payment info 24/7.' },
                { icon: 'fas fa-ban', title: 'Auto-Suspension', text: 'Logic-based service suspension and reconnection based on real-time payment status.' }
            ]
        },
        rica: {
            title: 'RICA Compliance Portal',
            desc: 'Automate identity verification with biometrics, ensuring full regulatory compliance without the manual work.',
            details: [
                { icon: 'fas fa-camera', title: 'AI Face Matching', text: 'SmartSelfie™ technology ensures the person creating the account matches their official ID.' },
                { icon: 'fas fa-fingerprint', title: 'Document Validation', text: 'Instant verification of SA ID books, smart cards, and passports via Smile ID.' },
                { icon: 'fas fa-history', title: 'Compliance Logs', text: 'Automatic storage of RICA documents and verification history for audit trails.' },
                { icon: 'fas fa-check-circle', title: 'Instant Activation', text: 'Lines are only released for provisioning once RICA status is 100% verified.' }
            ]
        },
        network: {
            title: 'Multi-FNO Network Hub',
            desc: 'One dashboard to rule them all. Manage provisioning across every major fiber provider in SA.',
            details: [
                { icon: 'fas fa-exchange-alt', title: 'Unified Provisioning', text: 'A single API interface connecting Vumatel, Openserve, Frogfoot, and more.' },
                { icon: 'fas fa-tachometer-alt', title: 'Real-time Speed Toggles', text: 'Upgrade or downgrade customer speeds instantly via the FNO portals directly.' },
                { icon: 'fas fa-stethoscope', title: 'Diagnostics', text: 'Run line tests and check ONT status without needing to log into individual portals.' },
                { icon: 'fas fa-satellite-dish', title: 'Hybrid Automation', text: 'A unique mix of direct APIs and browser-level automation for full coverage.' }
            ]
        },
        iot: {
            title: 'IoT & CPE Management',
            desc: 'The brain of your network. Monitor and manage every device connected to your infrastructure.',
            details: [
                { icon: 'fas fa-microchip', title: 'Device Telemetry', text: 'Track signal strength, uptime, and performance metrics from customer routers.' },
                { icon: 'fas fa-cloud-download-alt', title: 'Firmware Over-the-Air', text: 'Push security updates and performance patches to all devices simultaneously.' },
                { icon: 'fas fa-bell', title: 'Intelligent Alerting', text: 'Receive instant notifications when network nodes or individual CPEs go offline.' },
                { icon: 'fas fa-chart-area', title: 'Trend Analysis', text: 'Visualize network load and identify hardware bottlenecks before critical failures.' }
            ]
        },
        crm: {
            title: 'Smart ISP CRM',
            desc: 'Turn customer data into customer satisfaction with a dashboard built for scale.',
            details: [
                { icon: 'fas fa-address-book', title: '360° Subscriber View', text: 'See billing, network status, RICA documents, and ticket history on one page.' },
                { icon: 'fas fa-ticket-alt', title: 'Integrated Ticketing', text: 'Support system built into the subscriber profile for maximum context.' },
                { icon: 'fas fa-sms', title: 'Multi-Channel Comms', text: 'Communicate via SMS, Email, and WhatsApp directly from the dashboard.' },
                { icon: 'fas fa-brain', title: 'Churn Prediction', text: 'AI insights to flag customers at risk of cancellation based on support trends.' }
            ]
        },
        sales: {
            title: 'Sales & Coverage Engine',
            desc: 'Enable your sales team to move at the speed of light with integrated qualification tools.',
            details: [
                { icon: 'fas fa-columns', title: 'Visual Pipeline', text: 'Manage deals from initial lead to active installation with a sleek Kanban view.' },
                { icon: 'fas fa-map-marked-alt', title: 'Coverage Qualification', text: 'Integrated maps for all FNOs. Qualify a lead by address in under 3 seconds.' },
                { icon: 'fas fa-file-contract', title: 'Digital Signatures', text: 'Send digital contracts and capture signatures as soon as the lead qualifies.' },
                { icon: 'fas fa-funnel-dollar', title: 'Conversion Tracking', text: 'Detailed analytics on which FNOs and marketing channels are driving ROI.' }
            ]
        }
    };

    document.querySelectorAll('.btn-text').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-feature');
            const data = featureDetails[key];
            if (!data) return;

            modalBody.innerHTML = `
                <h2 class="gradient-text">${data.title}</h2>
                <p class="detail-desc">${data.desc}</p>
                <div class="feature-detail-grid">
                    ${data.details.map(d => `
                        <div class="detail-item">
                            <i class="${d.icon}"></i>
                            <div>
                                <h4>${d.title}</h4>
                                <p>${d.text}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 50px;">
                    <button class="btn btn-primary">Watch Demo</button>
                    <button class="btn btn-outline" style="margin-left: 16px;">Contact Sales</button>
                </div>
            `;

            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});
