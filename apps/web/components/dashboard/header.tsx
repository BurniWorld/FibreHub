"use client"

import React, { useState, useEffect, memo, useCallback } from "react"
import { Bell, Search, Plus, Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface HeaderProps {
  title: string
  onNewTask: () => void
  onMenuToggle?: () => void
}

export const Header = memo(function Header({ title, onNewTask, onMenuToggle }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Avoid hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => !prev)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/95 px-3 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 gap-2">
      {/* Left Section: Menu Button (Mobile) + Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {/* Hamburger Menu - Mobile Only */}
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="h-10 w-10 shrink-0 lg:hidden text-muted-foreground hover:text-foreground hover:bg-secondary touch-manipulation"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Title - Truncated on mobile */}
        <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-foreground truncate">
          {title}
        </h1>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
        {/* Desktop Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search anything..."
            className="flex h-10 w-48 lg:w-64 rounded-md border border-input bg-secondary/50 px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all border-border focus:border-primary/50"
          />
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="h-10 w-10 md:hidden text-muted-foreground hover:text-foreground hover:bg-secondary touch-manipulation"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors touch-manipulation"
          title="Toggle theme"
        >
          {!mounted ? (
            <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
          ) : resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5 transition-all text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 transition-all text-indigo-500" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors touch-manipulation"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
        </Button>

        {/* New Task Button */}
        <Button
          size="sm"
          className="gap-1 sm:gap-2 h-9 sm:h-10 px-2.5 sm:px-4 touch-manipulation"
          onClick={onNewTask}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">New Task</span>
        </Button>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-border bg-background p-3 md:hidden shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search anything..."
              className="flex h-12 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 pl-9 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all border-border focus:border-primary/50"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground touch-manipulation"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
})
