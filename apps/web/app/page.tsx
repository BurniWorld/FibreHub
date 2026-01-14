"use client"

import { useState } from "react"
import Link from "next/link"
import {
    LayoutDashboard,
    DollarSign,
    Users,
    Headset,
    Wifi,
    Phone,
    Megaphone,
    ShieldCheck,
    UserCog,
    MessageSquare,
    Receipt,
    Package,
    Globe,
    HeartHandshake,
    Check,
    ArrowRight,
    Sparkles,
    Menu,
    X,
    ChevronDown,
    Star,
    Zap,
    Shield,
    BarChart3,
    Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// All modules from the dashboard
const modules = [
    {
        icon: LayoutDashboard,
        name: "Dashboard Overview",
        description: "Unified command center with AI-powered insights, real-time metrics, and executive summaries.",
        category: "Core",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: MessageSquare,
        name: "Communication Hub",
        description: "Team collaboration, internal messaging, and unified communications platform.",
        category: "Core",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: DollarSign,
        name: "Sales Management",
        description: "Deal pipeline, revenue tracking, quote generation, and commission management.",
        category: "Revenue",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Users,
        name: "CRM",
        description: "Customer relationship management, contact tracking, and customer journey analytics.",
        category: "Customer",
        color: "from-violet-500 to-purple-500",
    },
    {
        icon: Headset,
        name: "Service & Support",
        description: "Ticket management, SLA tracking, knowledge base, and customer satisfaction scoring.",
        category: "Customer",
        color: "from-orange-500 to-amber-500",
    },
    {
        icon: HeartHandshake,
        name: "Retention & Churn Analytics",
        description: "AI-powered churn prediction, risk scoring, retention campaigns, and CLV analysis.",
        category: "Analytics",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: Wifi,
        name: "Network Operations",
        description: "Real-time network monitoring, outage alerts, capacity planning, and infrastructure management.",
        category: "Operations",
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: Phone,
        name: "Call Center",
        description: "Inbound/outbound call management, agent performance, call routing, and quality monitoring.",
        category: "Customer",
        color: "from-indigo-500 to-violet-500",
    },
    {
        icon: Megaphone,
        name: "Marketing Hub",
        description: "Campaign management, email marketing, A/B testing, and conversion analytics.",
        category: "Revenue",
        color: "from-fuchsia-500 to-pink-500",
    },
    {
        icon: ShieldCheck,
        name: "Compliance & Security",
        description: "RICA verification, audit trails, policy management, and regulatory compliance.",
        category: "Operations",
        color: "from-slate-500 to-zinc-500",
    },
    {
        icon: UserCog,
        name: "Talent Management",
        description: "HR management, recruitment, performance reviews, and employee engagement.",
        category: "Operations",
        color: "from-amber-500 to-yellow-500",
    },
    {
        icon: Receipt,
        name: "Billing & Collection",
        description: "Invoice management, payment processing, revenue cycle, and financial reporting.",
        category: "Revenue",
        color: "from-teal-500 to-green-500",
    },
    {
        icon: Package,
        name: "Product Management",
        description: "Product catalog, pricing management, bundling, and inventory tracking.",
        category: "Operations",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: Globe,
        name: "Portal Management",
        description: "Customer self-service portal, API management, and white-label configurations.",
        category: "Core",
        color: "from-sky-500 to-blue-500",
    },
]

// Pricing tiers
const pricingTiers = [
    {
        name: "Starter",
        description: "Perfect for small ISPs getting started",
        price: "R 2,999",
        period: "/month",
        features: [
            "Up to 500 customers",
            "Dashboard Overview",
            "Basic CRM",
            "Service & Support",
            "Billing & Collection",
            "Email support",
        ],
        modules: ["Dashboard Overview", "CRM", "Service & Support", "Billing & Collection"],
        cta: "Start Free Trial",
        popular: false,
    },
    {
        name: "Professional",
        description: "For growing ISPs with advanced needs",
        price: "R 7,999",
        period: "/month",
        features: [
            "Up to 5,000 customers",
            "All Starter features",
            "Sales Management",
            "Network Operations",
            "Call Center",
            "Marketing Hub",
            "Retention Analytics",
            "Priority support",
        ],
        modules: [
            "Dashboard Overview", "Communication Hub", "Sales Management", "CRM",
            "Service & Support", "Retention & Churn Analytics", "Network Operations",
            "Call Center", "Marketing Hub", "Billing & Collection"
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        description: "For large ISPs requiring full capabilities",
        price: "R 24,999",
        period: "/month",
        features: [
            "Unlimited customers",
            "All Professional features",
            "Compliance & Security",
            "Talent Management",
            "Product Management",
            "Portal Management",
            "Custom integrations",
            "Dedicated account manager",
            "24/7 phone support",
            "SLA guarantee",
        ],
        modules: modules.map(m => m.name),
        cta: "Contact Sales",
        popular: false,
    },
]

const categories = ["All", "Core", "Revenue", "Customer", "Operations", "Analytics"]

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState("All")
    const [activePricingTab, setActivePricingTab] = useState<string | null>(null)

    const filteredModules = activeCategory === "All"
        ? modules
        : modules.filter(m => m.category === activeCategory)

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                                <Wifi className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">OmniDome</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Features
                            </a>
                            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Pricing
                            </a>
                            <a href="#modules" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Modules
                            </a>
                            <Link href="/dashboard">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background p-4 space-y-4">
                        <a href="#features" className="block text-sm font-medium">Features</a>
                        <a href="#pricing" className="block text-sm font-medium">Pricing</a>
                        <a href="#modules" className="block text-sm font-medium">Modules</a>
                        <Link href="/dashboard" className="block">
                            <Button className="w-full">Get Started</Button>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm mb-8">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span>AI-Powered ISP Management Platform</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                        The Complete{" "}
                        <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                            ISP Operating System
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10">
                        Unify your sales, support, network operations, and customer management in one powerful platform.
                        Built for South African ISPs with AI-driven insights.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg px-8 hover:opacity-90">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Watch Demo
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-emerald-500">14+</div>
                            <div className="text-sm text-muted-foreground">Integrated Modules</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-emerald-500">99.9%</div>
                            <div className="text-sm text-muted-foreground">Platform Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-emerald-500">50K+</div>
                            <div className="text-sm text-muted-foreground">Customers Managed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-emerald-500">87%</div>
                            <div className="text-sm text-muted-foreground">Churn Prediction Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/Why OmniDome */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose OmniDome?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Purpose-built for ISPs with everything you need to scale your operations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                            <p className="text-muted-foreground">
                                Predictive churn analytics, automated recommendations, and intelligent task creation to stay ahead.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Real-Time Operations</h3>
                            <p className="text-muted-foreground">
                                Monitor network health, customer activity, and business metrics with live dashboards and instant alerts.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-4">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Unified Analytics</h3>
                            <p className="text-muted-foreground">
                                Cross-module reporting, executive dashboards, and data-driven decision making tools.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                                <HeartHandshake className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Retention Focus</h3>
                            <p className="text-muted-foreground">
                                Proactive churn prevention with AI risk scoring and automated retention campaigns.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">SA Compliance Ready</h3>
                            <p className="text-muted-foreground">
                                Built-in RICA verification, POPIA compliance, and South African regulatory requirements.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-4">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">White-Label Portal</h3>
                            <p className="text-muted-foreground">
                                Customizable customer portal with your branding for self-service and account management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Platform Modules</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            14 integrated modules designed to cover every aspect of ISP operations
                        </p>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        activeCategory === cat
                                            ? "bg-emerald-500 text-white"
                                            : "bg-card border border-border hover:border-emerald-500/50"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredModules.map((module) => (
                            <div
                                key={module.name}
                                className="group rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                                    module.color
                                )}>
                                    <module.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                    {module.category}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                                    {module.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {module.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Choose the plan that fits your ISP's size and needs. All plans include a 14-day free trial.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={cn(
                                    "relative rounded-2xl border bg-card p-8 transition-all",
                                    tier.popular
                                        ? "border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105"
                                        : "border-border hover:border-emerald-500/50"
                                )}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                                            <Star className="h-4 w-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        <span className="text-muted-foreground">{tier.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={cn(
                                        "w-full",
                                        tier.popular
                                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
                                            : ""
                                    )}
                                    variant={tier.popular ? "default" : "outline"}
                                >
                                    {tier.cta}
                                </Button>

                                {/* Expand modules */}
                                <button
                                    onClick={() => setActivePricingTab(activePricingTab === tier.name ? null : tier.name)}
                                    className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    View included modules
                                    <ChevronDown className={cn(
                                        "h-4 w-4 transition-transform",
                                        activePricingTab === tier.name && "rotate-180"
                                    )} />
                                </button>

                                {activePricingTab === tier.name && (
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                            Included Modules ({tier.modules.length})
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {tier.modules.map((mod) => (
                                                <span
                                                    key={mod}
                                                    className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md"
                                                >
                                                    {mod}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Transform Your ISP Operations?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join leading South African ISPs using OmniDome to streamline operations and grow revenue.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg px-8 hover:opacity-90">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Schedule a Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                                <Wifi className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold">OmniDome</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                            <a href="#modules" className="hover:text-foreground transition-colors">Modules</a>
                            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                            <a href="#" className="hover:text-foreground transition-colors">Support</a>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            © 2026 OmniDome. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
