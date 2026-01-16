"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
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
    BookOpen,
    Building2,
    GraduationCap,
    Handshake,
    FileText,
    Rocket,
    Play,
    TrendingUp,
    Clock,
    Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ============================================================================
// KINETIC TYPOGRAPHY COMPONENTS
// ============================================================================

function StaggerText({ text, className = "", delayPerWord = 100 }: {
    text: string;
    className?: string;
    delayPerWord?: number
}) {
    const words = text.split(' ')
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                    style={{ animationDelay: `${i * delayPerWord}ms`, animationDuration: '500ms' }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </span>
    )
}

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn(
            "bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x",
            className
        )}>
            {children}
        </span>
    )
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }: {
    value: number;
    suffix?: string;
    duration?: number
}) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let start = 0
        const increment = value / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [isVisible, value, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

// ============================================================================
// DATA
// ============================================================================

const modules = [
    { id: "communication", icon: MessageSquare, name: "Communication Hub", description: "Team collaboration, internal messaging, and unified communications.", category: "Core", color: "from-blue-600 via-indigo-500 to-violet-500", slug: "communication" },
    { id: "sales", icon: DollarSign, name: "Sales Hub", description: "Deal pipeline, revenue tracking, quote generation.", category: "Revenue", color: "from-emerald-500 via-teal-400 to-cyan-500", slug: "sales" },
    { id: "crm", icon: Users, name: "CRM Hub", description: "Customer relationship management and journey analytics.", category: "Customer", color: "from-indigo-600 via-violet-500 to-purple-500", slug: "crm" },
    { id: "service", icon: Headset, name: "Service Hub", description: "Ticket management, SLA tracking, knowledge base.", category: "Customer", color: "from-orange-500 via-amber-400 to-yellow-500", slug: "support" },
    { id: "retention", icon: HeartHandshake, name: "Retention Hub", description: "AI-powered churn prediction and CLV analysis.", category: "Analytics", color: "from-rose-500 via-pink-500 to-fuchsia-500", slug: "retention" },
    { id: "network", icon: Wifi, name: "Network Ops Hub", description: "Real-time monitoring, outage alerts, capacity planning.", category: "Operations", color: "from-cyan-500 via-blue-500 to-indigo-500", slug: "network" },
    { id: "call-center", icon: Phone, name: "Call Center Hub", description: "Inbound/outbound call management and agent performance.", category: "Customer", color: "from-blue-600 via-indigo-600 to-violet-600", slug: "call-center" },
    { id: "marketing", icon: Megaphone, name: "Marketing Hub", description: "Campaign management, email marketing, analytics.", category: "Revenue", color: "from-fuchsia-600 via-purple-600 to-indigo-600", slug: "marketing" },
    { id: "compliance", icon: ShieldCheck, name: "Compliance Hub", description: "RICA verification, POPIA compliance, audit trails.", category: "Operations", color: "from-slate-400 via-slate-500 to-slate-600", slug: "compliance" },
    { id: "talent", icon: UserCog, name: "Talent Hub", description: "HR management, recruitment, performance reviews.", category: "Operations", color: "from-yellow-500 via-amber-500 to-orange-500", slug: "talent" },
    { id: "billing", icon: Receipt, name: "Billing Hub", description: "Invoice management, payment processing, collections.", category: "Revenue", color: "from-teal-500 via-emerald-500 to-green-500", slug: "billing" },
    { id: "products", icon: Package, name: "Product Hub", description: "Product catalog, pricing management, bundling.", category: "Operations", color: "from-violet-600 via-purple-600 to-fuchsia-600", slug: "products" },
    { id: "portal", icon: Globe, name: "Portal Hub", description: "Customer self-service portal and white-label configurations.", category: "Core", color: "from-sky-400 via-blue-500 to-indigo-600", slug: "portal" },
]

// Solutions by category
const solutionsByCategory: Record<string, { title: string; description: string; slug: string; icon: any; color: string }[]> = {
    Core: [
        { title: "Unified Communications", description: "Bring all team communications into one platform", slug: "communication", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
        { title: "Self-Service Portal", description: "White-label customer portal with your branding", slug: "portal", icon: Globe, color: "from-sky-500 to-blue-500" },
    ],
    Revenue: [
        { title: "Accelerate Sales", description: "Close deals faster with AI-powered insights", slug: "sales", icon: DollarSign, color: "from-green-500 to-emerald-500" },
        { title: "Marketing Automation", description: "Generate and nurture leads at scale", slug: "marketing", icon: Megaphone, color: "from-fuchsia-500 to-pink-500" },
        { title: "Automated Billing", description: "Streamline invoicing and collections", slug: "billing", icon: Receipt, color: "from-teal-500 to-green-500" },
    ],
    Customer: [
        { title: "360° Customer View", description: "Complete visibility into customer relationships", slug: "crm", icon: Users, color: "from-violet-500 to-purple-500" },
        { title: "Omnichannel Support", description: "Deliver exceptional service across all channels", slug: "support", icon: Headset, color: "from-orange-500 to-amber-500" },
        { title: "Call Center Excellence", description: "Empower agents with intelligent tools", slug: "call-center", icon: Phone, color: "from-indigo-500 to-violet-500" },
    ],
    Operations: [
        { title: "Network Monitoring", description: "Real-time visibility into infrastructure health", slug: "network", icon: Wifi, color: "from-cyan-500 to-blue-500" },
        { title: "SA Compliance", description: "RICA and POPIA compliance built-in", slug: "compliance", icon: ShieldCheck, color: "from-slate-500 to-zinc-500" },
        { title: "Team Management", description: "HR, recruitment, and performance tracking", slug: "talent", icon: UserCog, color: "from-amber-500 to-yellow-500" },
    ],
    Analytics: [
        { title: "Churn Prevention", description: "87% accurate AI prediction to stop churn", slug: "retention", icon: HeartHandshake, color: "from-rose-500 to-pink-500" },
    ]
}

// Resources
const resourceItems = {
    featured: [
        { icon: Sparkles, title: "Why OmniDome", description: "See what makes us different", href: "/resources/why-omnidome" },
        { icon: BookOpen, title: "Blog", description: "Latest insights and updates", href: "#" },
        { icon: FileText, title: "Documentation", description: "Technical guides and API docs", href: "#" },
    ],
    services: [
        { icon: Rocket, title: "Onboarding", description: "Get up and running quickly", href: "/resources/services", price: "From R15,000" },
        { icon: GraduationCap, title: "Customer Training", description: "Master every module", href: "/resources/services", price: "From R8,000" },
        { icon: Zap, title: "Migration", description: "Seamless data transfer", href: "/resources/services", price: "From R12,000" },
    ],
    partners: [
        { icon: Handshake, title: "Reseller Program", description: "Earn up to 35% commission", href: "/resources/partners", price: "R5,000/year" },
        { icon: Building2, title: "Solutions Partner", description: "Implementation & consulting", href: "/resources/partners", price: "R15,000/year" },
        { icon: Zap, title: "Integration Partner", description: "Build apps and integrations", href: "/resources/partners", price: "R8,000/year" },
    ]
}

const testimonials = [
    { name: "Thabo Molefe", role: "CEO, FibreLink SA", quote: "OmniDome reduced our churn by 40% in just 3 months. The AI predictions are incredibly accurate.", avatar: "TM", rating: 5 },
    { name: "Sarah van der Berg", role: "Operations Director, Metro Fibre", quote: "Finally, one platform for everything. Our team efficiency has doubled since switching to OmniDome.", avatar: "SV", rating: 5 },
    { name: "James Nkosi", role: "CTO, SwiftNet", quote: "The network monitoring and FNO integration saved us thousands in downtime costs.", avatar: "JN", rating: 5 },
]

const trustedBy = [
    "Vumatel", "Openserve", "Frogfoot", "Octotel", "Metro Fibre", "Link Africa"
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [productMenuOpen, setProductMenuOpen] = useState(false)
    const [solutionMenuOpen, setSolutionMenuOpen] = useState(false)
    const [resourceMenuOpen, setResourceMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Skip Link for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-4 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg"
            >
                Skip to main content
            </a>

            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] grid-pattern" />

                {/* Organic Blob Shapes */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-indigo-600/10 blur-[100px] animate-blob" />
                <div className="absolute bottom-[-30%] left-[-15%] w-[700px] h-[700px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-cyan-600/10 blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-purple-600/5 blur-[100px] animate-blob animation-delay-4000" />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl" role="navigation" aria-label="Main navigation">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-12">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group" aria-label="OmniDome Home">
                                <div className="relative">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all duration-500">
                                        <Wifi className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                                </div>
                                <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
                                    OmniDome
                                </span>
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden lg:flex items-center gap-2">
                                <div
                                    className="relative"
                                    onMouseEnter={() => setProductMenuOpen(true)}
                                    onMouseLeave={() => setProductMenuOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-all px-4 py-6"
                                        aria-expanded={productMenuOpen}
                                        aria-haspopup="true"
                                    >
                                        Products <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", productMenuOpen && "rotate-180")} />
                                    </button>

                                    {/* Mega Menu */}
                                    <div className={cn(
                                        "fixed left-0 right-0 bg-slate-950/98 backdrop-blur-3xl border-b border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out",
                                        "top-20",
                                        productMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                                    )}>
                                        <div className="max-w-7xl mx-auto px-8 py-10">
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                {modules.map((mod, idx) => (
                                                    <Link
                                                        key={mod.id}
                                                        href={`/products/${mod.slug}`}
                                                        className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                                        style={{ animationDelay: `${idx * 30}ms` }}
                                                    >
                                                        <div className={cn(
                                                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300",
                                                            mod.color
                                                        )}>
                                                            <mod.icon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                                                                {mod.name}
                                                            </div>
                                                            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed group-hover:text-slate-400 transition-colors">
                                                                {mod.description}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="text-sm text-slate-500">
                                                    <span className="font-bold text-white">13 integrated modules</span> designed for ISP operations
                                                </div>
                                                <Link href="/pricing">
                                                    <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-500 font-bold shadow-[0_0_25px_rgba(79,70,229,0.3)] text-white hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] transition-all">
                                                        View Pricing <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Solutions Mega Menu */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setSolutionMenuOpen(true)}
                                    onMouseLeave={() => setSolutionMenuOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-all px-4 py-6"
                                        aria-expanded={solutionMenuOpen}
                                        aria-haspopup="true"
                                    >
                                        Solutions <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", solutionMenuOpen && "rotate-180")} />
                                    </button>

                                    <div className={cn(
                                        "fixed left-0 right-0 bg-slate-950/98 backdrop-blur-3xl border-b border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out",
                                        "top-20",
                                        solutionMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                                    )}>
                                        <div className="max-w-7xl mx-auto px-8 py-10">
                                            <div className="grid grid-cols-5 gap-8">
                                                {Object.entries(solutionsByCategory).map(([category, solutions]) => (
                                                    <div key={category}>
                                                        <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[2px] mb-6">
                                                            {category}
                                                        </h3>
                                                        <div className="space-y-5">
                                                            {solutions.map(sol => (
                                                                <Link
                                                                    key={sol.slug}
                                                                    href={`/solutions/${sol.slug}`}
                                                                    className="flex items-start gap-4 group"
                                                                >
                                                                    <div className={cn(
                                                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner group-hover:scale-105 transition-all duration-300",
                                                                        sol.color
                                                                    )}>
                                                                        <sol.icon className="h-4.5 w-4.5 text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                                                                            {sol.title}
                                                                        </div>
                                                                        <p className="text-[11px] text-slate-500 mt-1 leading-snug group-hover:text-slate-400 transition-colors">
                                                                            {sol.description}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/5">
                                                <Link href="/resources/why-omnidome" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                                    Learn why ISPs choose OmniDome <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/pricing" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-6">
                                    Pricing
                                </Link>

                                {/* Resources Mega Menu */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setResourceMenuOpen(true)}
                                    onMouseLeave={() => setResourceMenuOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-all px-4 py-6"
                                        aria-expanded={resourceMenuOpen}
                                        aria-haspopup="true"
                                    >
                                        Resources <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", resourceMenuOpen && "rotate-180")} />
                                    </button>

                                    <div className={cn(
                                        "fixed left-0 right-0 bg-slate-950/98 backdrop-blur-3xl border-b border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out",
                                        "top-20",
                                        resourceMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                                    )}>
                                        <div className="max-w-7xl mx-auto px-8 py-10">
                                            <div className="grid grid-cols-3 gap-12">
                                                {/* Featured Links */}
                                                <div>
                                                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-[2px] mb-4">
                                                        Featured
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {resourceItems.featured.map(item => (
                                                            <Link
                                                                key={item.title}
                                                                href={item.href}
                                                                className="flex items-start gap-3 group"
                                                            >
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                                                    <item.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-sm group-hover:text-indigo-400 transition-colors">
                                                                        {item.title}
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Services */}
                                                <div>
                                                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-[2px] mb-4">
                                                        Services
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {resourceItems.services.map(item => (
                                                            <Link
                                                                key={item.title}
                                                                href={item.href}
                                                                className="flex items-start gap-3 group"
                                                            >
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                                                    <item.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-sm group-hover:text-indigo-400 transition-colors">
                                                                        {item.title}
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">
                                                                        {item.description}
                                                                    </p>
                                                                    <span className="text-xs font-bold text-indigo-400 mt-1 inline-block">
                                                                        {item.price}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Partners */}
                                                <div>
                                                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-[2px] mb-4">
                                                        Partner Programme
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {resourceItems.partners.map(item => (
                                                            <Link
                                                                key={item.title}
                                                                href={item.href}
                                                                className="flex items-start gap-3 group"
                                                            >
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                                                    <item.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-sm group-hover:text-indigo-400 transition-colors">
                                                                        {item.title}
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">
                                                                        {item.description}
                                                                    </p>
                                                                    <span className="text-xs font-bold text-indigo-400 mt-1 inline-block">
                                                                        {item.price}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="hidden sm:block text-sm font-bold text-slate-300 hover:text-white transition-colors">
                                Log in
                            </Link>
                            <Link href="/dashboard">
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold px-6 shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Get Started
                                </Button>
                            </Link>
                            <button
                                className="lg:hidden p-2 text-slate-300 transition-colors hover:text-white"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-white/5 bg-slate-950/98 backdrop-blur-xl p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        <Link href="/pricing" className="block font-semibold py-3 hover:text-indigo-400 transition-colors">Pricing</Link>
                        <Link href="/resources/why-omnidome" className="block font-semibold py-3 hover:text-indigo-400 transition-colors">Why OmniDome</Link>
                        <Link href="/resources/services" className="block font-semibold py-3 hover:text-indigo-400 transition-colors">Services</Link>
                        <Link href="/resources/partners" className="block font-semibold py-3 hover:text-indigo-400 transition-colors">Partner Programme</Link>
                        <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                            <Link href="/dashboard" className="block text-center py-3 font-semibold hover:text-indigo-400 transition-colors">Sign In</Link>
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 font-bold shadow-[0_0_25px_rgba(79,70,229,0.3)]">Get Started Free</Button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main id="main-content" tabIndex={-1}>
                {/* ========== HERO SECTION ========== */}
                <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        {/* Announcement Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black tracking-widest uppercase mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Brain className="h-4 w-4 animate-pulse" />
                            <span>Agentic AI Operating System for ISPs</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
                        </div>

                        {/* Hero Headline with Kinetic Typography */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.95]">
                            {mounted ? (
                                <>
                                    <StaggerText text="Unify Your Entire" className="block" delayPerWord={80} />
                                    <span className="block mt-2">
                                        <GradientText>ISP Operations</GradientText>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="block">Unify Your Entire</span>
                                    <span className="block mt-2 text-indigo-400">ISP Operations</span>
                                </>
                            )}
                        </h1>

                        {/* Subheadline */}
                        <p className="mx-auto max-w-2xl text-lg lg:text-xl text-slate-400 mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                            The first <span className="text-white font-semibold">Agentic AI-powered</span> platform that unifies sales, fiber networks, billing, and support. Built specifically for the <span className="text-white font-semibold">South African ISP market</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="h-16 px-10 text-lg font-black bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-[0_0_50px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all duration-300 group hover:scale-105 active:scale-95"
                                >
                                    <span className="flex items-center gap-3">
                                        Start Free Trial
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-10 text-lg font-bold border-slate-700/50 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-300 group hover:border-indigo-500/50"
                            >
                                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats with Animated Counters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            {[
                                { value: 13, suffix: "", label: "Native Modules", icon: Package },
                                { value: 87, suffix: "%", label: "Churn Prediction", icon: Brain },
                                { value: 2.4, suffix: "x", label: "Sales Velocity", icon: TrendingUp },
                                { value: 100, suffix: "%", label: "SA Compliant", icon: Shield },
                            ].map((stat, idx) => (
                                <div
                                    key={stat.label}
                                    className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-500"
                                    style={{ animationDelay: `${600 + idx * 100}ms` }}
                                >
                                    <stat.icon className="h-5 w-5 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                                    <div className="text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                        {mounted ? <AnimatedCounter value={stat.value} suffix={stat.suffix} /> : `${stat.value}${stat.suffix}`}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-[3px] font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== TRUSTED BY ========== */}
                <section className="py-16 border-y border-white/5 bg-white/[0.01]" aria-labelledby="trusted-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p id="trusted-heading" className="text-center text-sm text-slate-500 uppercase tracking-widest font-bold mb-8">
                            Ready to Connect with 72 FNO API or no API
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                            {trustedBy.map((company) => (
                                <div
                                    key={company}
                                    className="text-xl font-bold text-slate-600 hover:text-slate-400 transition-colors cursor-default"
                                >
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== PROBLEM / SOLUTION ========== */}
                <section className="py-24 lg:py-32" aria-labelledby="problem-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Problem Side */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-6">
                                    <X className="h-3.5 w-3.5" /> The Problem
                                </div>
                                <h2 id="problem-heading" className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                                    Managing an ISP Shouldn't Feel Like Juggling Fire
                                </h2>
                                <ul className="space-y-4 text-slate-400">
                                    {[
                                        "5+ disconnected systems that don't talk to each other",
                                        "Data silos making customer insights impossible",
                                        "Manual processes eating up precious time",
                                        "Churn happening before you can react",
                                        "Compliance headaches with RICA and POPIA"
                                    ].map((problem, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <X className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                                            <span>{problem}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Solution Side */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-[3rem] blur-3xl" />
                                <div className="relative p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                                        <Check className="h-3.5 w-3.5" /> The Solution
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                                        One Unified Platform. Complete Control.
                                    </h3>
                                    <ul className="space-y-4 text-slate-300">
                                        {[
                                            "13 integrated modules working in harmony",
                                            "360° customer view with AI-powered insights",
                                            "Automated workflows that save hours daily",
                                            "87% accurate churn prediction to act early",
                                            "Built-in RICA & POPIA compliance"
                                        ].map((solution, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                </div>
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== FEATURES / WHY SECTION ========== */}
                <section className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" aria-labelledby="features-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="features-heading" className="text-3xl lg:text-5xl font-black text-white mb-4">
                                Why Choose <GradientText>OmniDome</GradientText>?
                            </h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Purpose-built for ISPs with everything you need to scale operations and delight customers
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Brain, title: "AI-Powered Insights", description: "Predictive churn analytics, automated recommendations, and intelligent task creation.", color: "from-indigo-500 to-violet-500", glow: "group-hover:shadow-indigo-500/20" },
                                { icon: Zap, title: "Real-Time Operations", description: "Monitor network health, customer activity, and business metrics with live dashboards.", color: "from-cyan-500 to-blue-500", glow: "group-hover:shadow-cyan-500/20" },
                                { icon: BarChart3, title: "Unified Analytics", description: "Cross-module reporting, executive dashboards, and data-driven decision tools.", color: "from-violet-500 to-purple-500", glow: "group-hover:shadow-violet-500/20" },
                                { icon: HeartHandshake, title: "Retention Focus", description: "Proactive churn prevention with AI risk scoring and automated retention campaigns.", color: "from-rose-500 to-pink-500", glow: "group-hover:shadow-rose-500/20" },
                                { icon: Shield, title: "SA Compliance Ready", description: "Built-in RICA verification, POPIA compliance, and South African regulatory requirements.", color: "from-amber-500 to-orange-500", glow: "group-hover:shadow-amber-500/20" },
                                { icon: Globe, title: "White-Label Portal", description: "Customizable customer portal with your branding for self-service and account management.", color: "from-teal-500 to-emerald-500", glow: "group-hover:shadow-teal-500/20" },
                            ].map((feature, idx) => (
                                <div
                                    key={feature.title}
                                    className={cn(
                                        "group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5",
                                        "hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl",
                                        "transition-all duration-500",
                                        feature.glow
                                    )}
                                >
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                                        "group-hover:scale-110 group-hover:rotate-3 transition-all duration-500",
                                        feature.color
                                    )}>
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== MODULES PREVIEW ========== */}
                <section className="py-24 lg:py-32" aria-labelledby="modules-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="modules-heading" className="text-3xl lg:text-5xl font-black text-white mb-4">
                                Platform <GradientText>Modules</GradientText>
                            </h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                13 integrated modules designed to cover every aspect of ISP operations
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {modules.slice(0, 8).map((module, idx) => (
                                <Link
                                    key={module.id}
                                    href={`/products/${module.slug}`}
                                    className={cn(
                                        "group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5",
                                        "hover:bg-white/[0.05] hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5",
                                        "transition-all duration-300 hover:-translate-y-1",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                                        "group-hover:scale-110 transition-transform duration-300",
                                        module.color
                                    )}>
                                        <module.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                        {module.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                        {module.description}
                                    </p>
                                    <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/pricing">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 border-slate-700/50 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300"
                                >
                                    View All Modules & Pricing
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ========== TESTIMONIALS ========== */}
                <section className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent" aria-labelledby="testimonials-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="testimonials-heading" className="text-3xl lg:text-5xl font-black text-white mb-4">
                                Loved by <GradientText>ISP Leaders</GradientText>
                            </h2>
                            <p className="text-lg text-slate-400">
                                See what our customers have to say
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, idx) => (
                                <div
                                    key={testimonial.name}
                                    className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    <blockquote className="text-lg text-slate-300 mb-8 leading-relaxed">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{testimonial.name}</div>
                                            <div className="text-sm text-slate-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== FINAL CTA ========== */}
                <section className="py-32 relative overflow-hidden" aria-labelledby="cta-heading">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-950 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 id="cta-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
                            Ready to Transform Your<br />
                            <GradientText>ISP Operations?</GradientText>
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                            Join leading South African ISPs using OmniDome to streamline operations and grow revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="h-16 px-10 text-lg font-black bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-[0_0_50px_rgba(79,70,229,0.4)] hover:shadow-[0_0_70px_rgba(79,70,229,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Start Your Free Trial
                                    <ArrowRight className="ml-3 h-6 w-6" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-10 text-lg font-bold border-slate-700/50 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-300"
                            >
                                Schedule a Demo
                            </Button>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ========== FOOTER ========== */}
            <footer className="border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8" role="contentinfo">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                    <Wifi className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-black text-white">OmniDome</span>
                            </Link>
                            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                                The complete ISP operating system for South African service providers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><Link href="/products/sales" className="hover:text-white transition-colors">Sales Hub</Link></li>
                                <li><Link href="/products/crm" className="hover:text-white transition-colors">CRM Hub</Link></li>
                                <li><Link href="/products/network" className="hover:text-white transition-colors">Network Ops</Link></li>
                                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Resources</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><Link href="/resources/why-omnidome" className="hover:text-white transition-colors">Why OmniDome</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Company</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            © 2026 OmniDome. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    animation: gradient-x 4s ease-in-out infinite;
                }
                
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -30px) scale(1.05); }
                    50% { transform: translate(-20px, 20px) scale(0.95); }
                    75% { transform: translate(30px, 10px) scale(1.02); }
                }
                .animate-blob {
                    animation: blob 20s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-gradient-x,
                    .animate-blob,
                    .animate-pulse,
                    .animate-ping,
                    .animate-bounce {
                        animation: none !important;
                    }
                    .animate-in {
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    )
}
