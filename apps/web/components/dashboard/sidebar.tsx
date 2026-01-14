"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
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
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
  MessageSquare,
  Receipt,
  Package,
  Globe,
  HeartHandshake,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview" },
  { icon: MessageSquare, label: "Communication", href: "#communication" },
  { icon: DollarSign, label: "Sales", href: "#sales" },
  { icon: Users, label: "CRM", href: "#crm" },
  { icon: Headset, label: "Service", href: "#service" },
  { icon: HeartHandshake, label: "Retention", href: "#retention" },
  { icon: Wifi, label: "Network", href: "#network" },
  { icon: Phone, label: "Call Center", href: "#call-center" },
  { icon: Megaphone, label: "Marketing", href: "#marketing" },
  { icon: ShieldCheck, label: "Compliance", href: "#compliance" },
  { icon: UserCog, label: "Talent", href: "#talent" },
  { icon: Receipt, label: "Billing & Collection", href: "#billing" },
  { icon: Package, label: "Product Management", href: "#products" },
  { icon: Globe, label: "Portal Management", href: "#portal" },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex h-screen flex-shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wifi className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">OmniDome</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="h-9 bg-secondary pl-9 text-sm" />
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onSectionChange(item.href.replace("#", ""))}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeSection === item.href.replace("#", "")
                ? "bg-sidebar-accent text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/diverse-avatars.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">Admin</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
