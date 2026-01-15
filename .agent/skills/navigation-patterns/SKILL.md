---
name: Navigation Patterns
description: Sidebar, tabs, breadcrumbs and navigation patterns for CoreConnect
---

# Navigation Patterns Skill

Navigation patterns for the CoreConnect dashboard and portal.

## Sidebar Navigation

### Structure

```tsx
const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    id: "products",
    label: "Products & Pricing",
    icon: Package,
    children: [
      { id: "plans", label: "Plans", href: "/dashboard/products/plans" },
      { id: "addons", label: "Add-ons", href: "/dashboard/products/addons" },
    ],
  },
];
```

### Sidebar Component

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <span className="text-xl font-bold text-primary">CoreConnect</span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            item={item} 
            pathname={pathname}
            expanded={expanded}
            onToggle={toggleExpand}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ item, pathname, expanded, onToggle }) {
  const isActive = pathname === item.href;
  const hasChildren = item.children?.length > 0;
  const isExpanded = expanded.includes(item.id);

  return (
    <div>
      <Link
        href={item.href || "#"}
        onClick={hasChildren ? () => onToggle(item.id) : undefined}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
          "transition-colors hover:bg-muted/50",
          isActive && "bg-primary/10 text-primary"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isExpanded && "rotate-180"
          )} />
        )}
      </Link>

      {hasChildren && isExpanded && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.id}
              href={child.href}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm",
                "transition-colors hover:bg-muted/50",
                pathname === child.href && "text-primary"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Tabs Navigation

### Horizontal Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="overview" className="space-y-4">
  <TabsList className="bg-muted/50">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="services">Services</TabsTrigger>
    <TabsTrigger value="support">Support</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    {/* Content */}
  </TabsContent>
</Tabs>
```

### Icon Tabs

```tsx
<TabsList>
  <TabsTrigger value="list" className="gap-2">
    <List className="h-4 w-4" />
    List
  </TabsTrigger>
  <TabsTrigger value="grid" className="gap-2">
    <Grid className="h-4 w-4" />
    Grid
  </TabsTrigger>
</TabsList>
```

## Breadcrumbs

```tsx
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/dashboard" className="hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Usage
<Breadcrumbs items={[
  { label: "Customers", href: "/dashboard/customers" },
  { label: "John Doe" },
]} />
```

## Page Header

```tsx
export function PageHeader({ title, description, actions }) {
  return (
    <div className="flex items-center justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

// Usage
<PageHeader 
  title="Customers"
  description="Manage your subscriber base"
  actions={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Customer
    </Button>
  }
/>
```

## Mobile Navigation

```tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
```

## Module Switcher

For switching between CoreConnect modules:

```tsx
const modules = [
  { id: "crm", label: "CRM Connect", icon: Users },
  { id: "sales", label: "Sales Connect", icon: BarChart },
  { id: "billing", label: "Billing Connect", icon: DollarSign },
  { id: "network", label: "Network Connect", icon: Wifi },
  { id: "support", label: "Support Connect", icon: HeadphonesIcon },
];

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select module" />
  </SelectTrigger>
  <SelectContent>
    {modules.map((mod) => (
      <SelectItem key={mod.id} value={mod.id}>
        <div className="flex items-center gap-2">
          <mod.icon className="h-4 w-4" />
          {mod.label}
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

## Checklist

- [ ] Active state clearly visible
- [ ] Hover states on all links
- [ ] Keyboard navigation works
- [ ] Mobile-responsive (Sheet/Drawer)
- [ ] Breadcrumbs on nested pages
- [ ] Page headers consistent
