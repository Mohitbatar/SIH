"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission, canPerformAction, validatePermission, logUserAction, type User } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle, Info, Eye, EyeOff, Clock, Activity } from "lucide-react"

interface AccessControlProps {
  permission?: string
  action?: string
  context?: any
  fallback?: ReactNode
  showReason?: boolean
  logAccess?: boolean
  children: ReactNode
}

interface PermissionGuardProps {
  user: User
  permission: string
  context?: any
  onAccessDenied?: (reason: string) => void
  children: ReactNode
}

interface RoleBasedComponentProps {
  allowedRoles: string[]
  fallback?: ReactNode
  children: ReactNode
}

interface AccessControlPanelProps {
  user: User
  showPermissions?: boolean
  showAuditLog?: boolean
}

// Main Access Control Component
export function AccessControl({
  permission,
  action,
  context,
  fallback,
  showReason = false,
  logAccess = false,
  children,
}: AccessControlProps) {
  const { authState } = useAuth()
  const user = authState.user
  const [accessAttempts, setAccessAttempts] = useState(0)
  const [hasAccess, setHasAccess] = useState(false)
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (!user) {
      setHasAccess(false)
      setReason("Please log in to access this content.")
      return
    }

    let access = false
    let reasonText = ""

    if (permission) {
      const validation = validatePermission(user, permission, context)
      access = validation.allowed
      reasonText = validation.reason || ""
    } else if (action) {
      access = canPerformAction(user, action, context)
      reasonText = access ? "" : `Action '${action}' not permitted for role '${user.role}'`
    } else {
      access = true // No specific permission required
    }

    setHasAccess(access)
    setReason(reasonText)

    if (logAccess) {
      logUserAction(user, access ? "access_granted" : "access_denied", permission || action || "unknown", {
        context,
        reason: access ? undefined : reasonText,
        timestamp: new Date().toISOString(),
      })

      if (!access) {
        setAccessAttempts((prev) => prev + 1)
        if (accessAttempts > 2) {
          toast.error("Multiple access attempts detected. Please contact your administrator.")
        }
      }
    }
  }, [user, permission, action, context, logAccess, accessAttempts])

  if (!hasAccess) {
    return (
      fallback || (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. {showReason && reason && `Reason: ${reason}`}
            {accessAttempts > 1 && (
              <div className="mt-2 text-xs">
                Multiple attempts detected ({accessAttempts}). Contact administrator if you believe this is an error.
              </div>
            )}
          </AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}

// Permission Guard Component
export function PermissionGuard({ user, permission, context, onAccessDenied, children }: PermissionGuardProps) {
  const validation = validatePermission(user, permission, context)

  if (!validation.allowed) {
    onAccessDenied?.(validation.reason || "Access denied")
    return null
  }

  return <>{children}</>
}

// Role-Based Component
export function RoleBasedComponent({ allowedRoles, fallback, children }: RoleBasedComponentProps) {
  const { authState } = useAuth()
  const user = authState.user

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>This content is restricted to: {allowedRoles.join(", ")}</AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}

// Enhanced Access Control Panel Component
export function AccessControlPanel({ user, showPermissions = true, showAuditLog = false }: AccessControlPanelProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [auditDialogOpen, setAuditDialogOpen] = useState(false)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  const userPermissions = Object.entries({
    "View Data": hasPermission(user.role, "canViewData"),
    "Edit Data": hasPermission(user.role, "canEditData"),
    "Upload Data": hasPermission(user.role, "canUploadData"),
    "Create Surveys": hasPermission(user.role, "canCreateSurveys"),
    "Create Reports": hasPermission(user.role, "canCreateReports"),
    "Manage Users": hasPermission(user.role, "canManageUsers"),
    "Access Oceanography": hasPermission(user.role, "canAccessOceanography"),
    "Access Taxonomy": hasPermission(user.role, "canAccessTaxonomy"),
    "Access Molecular": hasPermission(user.role, "canAccessMolecular"),
  })

  // Simulate recent activity data
  useEffect(() => {
    setRecentActivity([
      {
        action: "data_upload",
        resource: "Oceanographic Survey Data",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "success",
      },
      {
        action: "report_generation",
        resource: "Biodiversity Assessment",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: "success",
      },
      {
        action: "access_denied",
        resource: "User Management",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: "denied",
      },
    ])
  }, [])

  const handleViewAuditLog = () => {
    setAuditDialogOpen(true)
    toast.info("Loading audit log...")
  }

  const getPermissionCount = () => {
    return userPermissions.filter(([, hasAccess]) => hasAccess).length
  }

  const getSecurityScore = () => {
    const totalPermissions = userPermissions.length
    const grantedPermissions = getPermissionCount()
    const baseScore = Math.round((grantedPermissions / totalPermissions) * 100)

    // Adjust based on clearance level
    const clearanceMultiplier = {
      basic: 0.8,
      elevated: 1.0,
      restricted: 1.2,
    }

    return Math.min(
      100,
      Math.round(baseScore * (clearanceMultiplier[user.clearanceLevel as keyof typeof clearanceMultiplier] || 1.0)),
    )
  }

  return (
    <div className="space-y-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Access Control Information</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10">
                Security Score: {getSecurityScore()}%
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardDescription>Your current permissions and access levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge variant="secondary" className="mt-1">
                {user.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="text-sm mt-1">{user.department || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clearance Level</p>
              <Badge variant={user.clearanceLevel === "restricted" ? "destructive" : "default"} className="mt-1">
                {user.clearanceLevel || "basic"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Permissions</p>
              <Badge variant="outline" className="mt-1">
                {getPermissionCount()} of {userPermissions.length}
              </Badge>
            </div>
          </div>

          {showDetails && (
            <>
              {/* Data Classifications */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Data Classifications</p>
                <div className="flex flex-wrap gap-1">
                  {user.dataClassifications?.map((classification) => (
                    <DataClassificationBadge key={classification} classification={classification as any} />
                  )) || <span className="text-sm text-muted-foreground">None assigned</span>}
                </div>
              </div>

              {/* Specializations */}
              {user.specializations && user.specializations.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {user.specializations.map((spec) => (
                      <Badge key={spec} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Permissions */}
              {showPermissions && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Detailed Permissions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {userPermissions.map(([permission, hasAccess]) => (
                      <div key={permission} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
                        {hasAccess ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ${hasAccess ? "text-foreground" : "text-muted-foreground"}`}>
                          {permission}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Access */}
              {user.projectAccess && user.projectAccess.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Project Access</p>
                  <div className="flex flex-wrap gap-1">
                    {user.projectAccess.map((projectId) => (
                      <Badge key={projectId} variant="outline" className="text-xs">
                        {projectId}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                  {showAuditLog && (
                    <Button variant="ghost" size="sm" onClick={handleViewAuditLog}>
                      <Activity className="h-4 w-4 mr-1" />
                      View Full Log
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{activity.resource}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={activity.status === "success" ? "default" : "destructive"} className="text-xs">
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert className="border-primary/20 bg-primary/5">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Your access permissions are determined by your role and clearance level. Contact your administrator if you
          need additional access. All access attempts are logged for security purposes.
        </AlertDescription>
      </Alert>

      {/* Audit Log Dialog */}
      <Dialog open={auditDialogOpen} onOpenChange={setAuditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Access Audit Log</DialogTitle>
            <DialogDescription>Recent access attempts and system activities</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.action.replace("_", " ").toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{activity.resource}</p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === "success" ? "default" : "destructive"}>{activity.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Conditional Action Button Component
interface ConditionalActionButtonProps {
  action: string
  context?: any
  onAction: () => void
  children: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function ConditionalActionButton({
  action,
  context,
  onAction,
  children,
  variant = "default",
  size = "default",
  disabled = false,
}: ConditionalActionButtonProps) {
  const { authState } = useAuth()
  const user = authState.user

  if (!user) return null

  const canPerform = canPerformAction(user, action, context)

  const handleClick = () => {
    if (canPerform && !disabled) {
      logUserAction(user, action, "button_click", context)
      onAction()
    } else if (!canPerform) {
      toast.error(`Action '${action}' not permitted for your role`)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      disabled={!canPerform || disabled}
      onClick={handleClick}
      title={!canPerform ? `Action '${action}' not permitted` : undefined}
      className={!canPerform ? "opacity-50 cursor-not-allowed" : ""}
    >
      {children}
    </Button>
  )
}

// Enhanced Data Classification Badge Component
interface DataClassificationBadgeProps {
  classification: "public" | "internal" | "restricted" | "confidential"
  showIcon?: boolean
  showTooltip?: boolean
}

export function DataClassificationBadge({
  classification,
  showIcon = true,
  showTooltip = false,
}: DataClassificationBadgeProps) {
  const variants = {
    public: {
      variant: "secondary" as const,
      color: "text-green-600",
      icon: CheckCircle,
      description: "Publicly accessible data",
    },
    internal: {
      variant: "default" as const,
      color: "text-blue-600",
      icon: Info,
      description: "Internal use only",
    },
    restricted: {
      variant: "destructive" as const,
      color: "text-orange-600",
      icon: AlertTriangle,
      description: "Restricted access required",
    },
    confidential: {
      variant: "destructive" as const,
      color: "text-red-600",
      icon: Lock,
      description: "Confidential - highest security",
    },
  }

  const config = variants[classification]
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      className="flex items-center space-x-1"
      title={showTooltip ? config.description : undefined}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      <span className="capitalize">{classification}</span>
    </Badge>
  )
}

// Real-time Permission Monitor Hook
export function usePermissionMonitor(permission: string, context?: any) {
  const { authState } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    if (authState.user) {
      const validation = validatePermission(authState.user, permission, context)
      setHasAccess(validation.allowed)
      setLastChecked(new Date())
    }
  }, [authState.user, permission, context])

  return { hasAccess, lastChecked }
}
