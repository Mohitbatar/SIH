"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { hasPermission, getRoleColor, getRoleIcon } from "@/lib/auth"
import {
  BarChart3,
  Database,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
  Waves,
  Fish,
  FlaskConical,
  X,
} from "lucide-react"

const navigationItems = [
  {
    name: "nav.dashboard",
    href: "/",
    icon: Home,
    permission: null,
  },
  {
    name: "nav.oceanography",
    href: "/oceanography",
    icon: Waves,
    permission: "canAccessOceanography" as const,
  },
  {
    name: "nav.taxonomy",
    href: "/taxonomy",
    icon: Fish,
    permission: "canAccessTaxonomy" as const,
  },
  {
    name: "nav.molecular",
    href: "/molecular",
    icon: FlaskConical,
    permission: "canAccessMolecular" as const,
  },
  {
    name: "nav.data",
    href: "/data",
    icon: Database,
    permission: "canViewData" as const,
  },
  {
    name: "nav.reports",
    href: "/reports",
    icon: FileText,
    permission: "canViewReports" as const,
  },
  {
    name: "nav.analytics",
    href: "/analytics",
    icon: BarChart3,
    permission: "canViewReports" as const,
  },
]

const adminItems = [
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
    permission: "canManageUsers" as const,
  },
  {
    name: "nav.settings",
    href: "/settings",
    icon: Settings,
    permission: null,
  },
]

interface SidebarProps {
  currentPath?: string
}

export function Sidebar({ currentPath }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { authState, logout } = useAuth()
  const { t } = useLanguage()
  const user = authState.user
  const router = useRouter()
  const pathname = usePathname()

  const activePath = currentPath || pathname

  if (!user) return null

  const filteredNavItems = navigationItems.filter(
    (item) => !item.permission || hasPermission(user.role, item.permission),
  )

  const filteredAdminItems = adminItems.filter((item) => !item.permission || hasPermission(user.role, item.permission))

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div
      className={`bg-sidebar text-sidebar-foreground h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center animate-float">
                <span className="text-lg text-sidebar-primary-foreground">🌊</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">CMLRE</h1>
                <p className="text-xs text-sidebar-foreground/70">Marine Research</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={getRoleColor(user.role)}>
                  <span className="mr-1">{getRoleIcon(user.role)}</span>
                  {user.role}
                </Badge>
              </div>
              {user.department && <p className="text-xs text-sidebar-foreground/70 truncate mt-1">{user.department}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activePath === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
                isActive ? "bg-sidebar-accent" : ""
              }`}
              size={isCollapsed ? "sm" : "default"}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">{t(item.name)}</span>}
            </Button>
          )
        })}

        {filteredAdminItems.length > 0 && (
          <>
            {!isCollapsed && (
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                  Administration
                </p>
              </div>
            )}
            {filteredAdminItems.map((item) => {
              const Icon = item.icon
              const isActive = activePath === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
                    isActive ? "bg-sidebar-accent" : ""
                  }`}
                  size={isCollapsed ? "sm" : "default"}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && (
                    <span className="ml-2">{item.name.startsWith("nav.") ? t(item.name) : item.name}</span>
                  )}
                </Button>
              )
            })}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          size={isCollapsed ? "sm" : "default"}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
