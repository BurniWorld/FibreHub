"use client"

import { useState, Suspense, lazy, useCallback, useMemo } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { AITaskChat } from "@/components/chat/ai-task-chat"
import { Loader2 } from "lucide-react"

// Dynamic imports for code splitting - each module loads only when accessed
const DashboardOverview = lazy(() => import("@/components/modules/dashboard-overview").then(m => ({ default: m.DashboardOverview })))
const SalesModule = lazy(() => import("@/components/modules/sales-module").then(m => ({ default: m.SalesModule })))
const CrmModule = lazy(() => import("@/components/modules/crm-module").then(m => ({ default: m.CrmModule })))
const ServiceModule = lazy(() => import("@/components/modules/service-module").then(m => ({ default: m.ServiceModule })))
const RetentionModule = lazy(() => import("@/components/modules/retention-module").then(m => ({ default: m.RetentionModule })))
const NetworkModule = lazy(() => import("@/components/modules/network-module").then(m => ({ default: m.NetworkModule })))
const CallCenterModule = lazy(() => import("@/components/modules/call-center-module").then(m => ({ default: m.CallCenterModule })))
const MarketingModule = lazy(() => import("@/components/modules/marketing-module").then(m => ({ default: m.MarketingModule })))
const ComplianceModule = lazy(() => import("@/components/modules/compliance-module").then(m => ({ default: m.ComplianceModule })))
const TalentModule = lazy(() => import("@/components/modules/talent-module").then(m => ({ default: m.TalentModule })))
const CommunicationModule = lazy(() => import("@/components/modules/communication-module").then(m => ({ default: m.CommunicationModule })))
const BillingModule = lazy(() => import("@/components/modules/billing-module").then(m => ({ default: m.BillingModule })))
const ProductsModule = lazy(() => import("@/components/modules/products-module").then(m => ({ default: m.ProductsModule })))
const PortalModule = lazy(() => import("@/components/modules/portal-module").then(m => ({ default: m.PortalModule })))

// Loading skeleton component for better UX during lazy loading
function ModuleLoadingFallback() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading module...</p>
      </div>
    </div>
  )
}

const sectionTitles: Record<string, string> = {
  overview: "Dashboard Overview",
  communication: "Team Communication",
  sales: "Sales Management",
  crm: "Customer Relationship Management",
  service: "Service & Support",
  retention: "Retention & Churn Analytics",
  network: "Network Operations",
  "call-center": "Call Center Operations",
  marketing: "Marketing Hub",
  compliance: "Compliance & Security",
  talent: "Talent Management",
  billing: "Billing & Collection",
  products: "Product Management",
  portal: "Portal Management",
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [chatOpen, setChatOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
    setSidebarOpen(false) // Close mobile sidebar on navigation
  }, [])

  const handleOpenChat = useCallback(() => setChatOpen(true), [])
  const handleCloseChat = useCallback(() => setChatOpen(false), [])
  const handleToggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])
  const handleCloseSidebar = useCallback(() => setSidebarOpen(false), [])

  // Memoized module renderer to prevent unnecessary re-renders
  const moduleContent = useMemo(() => {
    switch (activeSection) {
      case "communication":
        return <CommunicationModule />
      case "sales":
        return <SalesModule />
      case "crm":
        return <CrmModule />
      case "service":
        return <ServiceModule />
      case "retention":
        return <RetentionModule />
      case "network":
        return <NetworkModule />
      case "call-center":
        return <CallCenterModule />
      case "marketing":
        return <MarketingModule />
      case "compliance":
        return <ComplianceModule />
      case "talent":
        return <TalentModule />
      case "billing":
        return <BillingModule />
      case "products":
        return <ProductsModule />
      case "portal":
        return <PortalModule />
      default:
        return <DashboardOverview />
    }
  }, [activeSection])

  const headerTitle = useMemo(() => sectionTitles[activeSection] || "Dashboard", [activeSection])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Hidden on mobile by default, shown as drawer when open */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isMobileOpen={sidebarOpen}
        onMobileClose={handleCloseSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={headerTitle}
          onNewTask={handleOpenChat}
          onMenuToggle={handleToggleSidebar}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 scroll-smooth">
          <Suspense fallback={<ModuleLoadingFallback />}>
            {moduleContent}
          </Suspense>
        </main>
      </div>

      {/* Chat Sidebar */}
      {chatOpen && <AITaskChat isOpen={chatOpen} onClose={handleCloseChat} />}
    </div>
  )
}
