export type UserRole = "scientist" | "conservationist" | "policymaker" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  avatar?: string
  clearanceLevel?: "basic" | "standard" | "advanced" | "restricted"
  specializations?: string[]
  projectAccess?: string[]
  dataClassifications?: string[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user data for demonstration
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Aman Antil",
    email: "aman.antil@cmlre.gov.in",
    role: "scientist",
    department: "Marine Biology",
    avatar: "/female-scientist-lab.png",
    clearanceLevel: "advanced",
    specializations: ["Oceanography", "Marine Biology", "Data Analysis"],
    projectAccess: ["OS-2024-001", "OS-2024-002", "DS-2024-001"],
    dataClassifications: ["public", "internal", "restricted"],
  },
  {
    id: "2",
    name: "Yogesh",
    email: "yogesh@cmlre.gov.in",
    role: "conservationist",
    department: "Marine Conservation",
    avatar: "/male-conservationist.jpg",
    clearanceLevel: "standard",
    specializations: ["Conservation", "Ecosystem Management"],
    projectAccess: ["OS-2024-001", "DS-2024-002"],
    dataClassifications: ["public", "internal"],
  },
  {
    id: "3",
    name: "Yash",
    email: "yash@cmlre.gov.in",
    role: "policymaker",
    department: "Policy & Planning",
    avatar: "/female-policymaker.jpg",
    clearanceLevel: "standard",
    specializations: ["Policy Analysis", "Environmental Planning"],
    projectAccess: ["OS-2024-001"],
    dataClassifications: ["public"],
  },
]

export const rolePermissions = {
  scientist: {
    canViewData: true,
    canEditData: true,
    canExportData: true,
    canViewReports: true,
    canCreateReports: true,
    canManageUsers: false,
    canAccessTaxonomy: true,
    canAccessMolecular: true,
    canAccessOceanography: true,
    canUploadData: true,
    canCreateSurveys: true,
    canModifyOwnSurveys: true,
    canModifyOthersSurveys: false,
    canDeleteData: true,
    canAccessRestrictedData: true,
    canManageProjects: true,
    canApproveData: true,
    canConfigureSystem: false,
    canViewAuditLogs: false,
    canManageIntegrations: false,
  },
  conservationist: {
    canViewData: true,
    canEditData: false,
    canExportData: true,
    canViewReports: true,
    canCreateReports: true,
    canManageUsers: false,
    canAccessTaxonomy: true,
    canAccessMolecular: false,
    canAccessOceanography: true,
    canUploadData: false,
    canCreateSurveys: true,
    canModifyOwnSurveys: true,
    canModifyOthersSurveys: false,
    canDeleteData: false,
    canAccessRestrictedData: false,
    canManageProjects: false,
    canApproveData: false,
    canConfigureSystem: false,
    canViewAuditLogs: false,
    canManageIntegrations: false,
  },
  policymaker: {
    canViewData: true,
    canEditData: false,
    canExportData: true,
    canViewReports: true,
    canCreateReports: false,
    canManageUsers: false,
    canAccessTaxonomy: false,
    canAccessMolecular: false,
    canAccessOceanography: true,
    canUploadData: false,
    canCreateSurveys: false,
    canModifyOwnSurveys: false,
    canModifyOthersSurveys: false,
    canDeleteData: false,
    canAccessRestrictedData: false,
    canManageProjects: false,
    canApproveData: false,
    canConfigureSystem: false,
    canViewAuditLogs: false,
    canManageIntegrations: false,
  },
  admin: {
    canViewData: true,
    canEditData: true,
    canExportData: true,
    canViewReports: true,
    canCreateReports: true,
    canManageUsers: true,
    canAccessTaxonomy: true,
    canAccessMolecular: true,
    canAccessOceanography: true,
    canUploadData: true,
    canCreateSurveys: true,
    canModifyOwnSurveys: true,
    canModifyOthersSurveys: true,
    canDeleteData: true,
    canAccessRestrictedData: true,
    canManageProjects: true,
    canApproveData: true,
    canConfigureSystem: true,
    canViewAuditLogs: true,
    canManageIntegrations: true,
  },
}

export function hasPermission(role: UserRole, permission: keyof typeof rolePermissions.scientist): boolean {
  return rolePermissions[role][permission]
}

export function hasDataClassificationAccess(user: User, classification: string): boolean {
  return user.dataClassifications?.includes(classification) || false
}

export function hasProjectAccess(user: User, projectId: string): boolean {
  return user.projectAccess?.includes(projectId) || user.role === "admin"
}

export function hasClearanceLevel(user: User, requiredLevel: string): boolean {
  const levels = ["basic", "standard", "advanced", "restricted"]
  const userLevel = levels.indexOf(user.clearanceLevel || "basic")
  const required = levels.indexOf(requiredLevel)
  return userLevel >= required
}

export function hasSpecialization(user: User, specialization: string): boolean {
  return user.specializations?.includes(specialization) || false
}

export function canAccessModule(user: User, module: string): boolean {
  const modulePermissions = {
    oceanography: hasPermission(user.role, "canAccessOceanography"),
    taxonomy: hasPermission(user.role, "canAccessTaxonomy"),
    molecular: hasPermission(user.role, "canAccessMolecular"),
    data: hasPermission(user.role, "canViewData"),
  }
  return modulePermissions[module as keyof typeof modulePermissions] || false
}

export function canPerformAction(user: User, action: string, context?: any): boolean {
  switch (action) {
    case "upload_data":
      return hasPermission(user.role, "canUploadData") && hasClearanceLevel(user, "standard")
    case "create_survey":
      return hasPermission(user.role, "canCreateSurveys")
    case "modify_survey":
      if (context?.ownerId === user.id) {
        return hasPermission(user.role, "canModifyOwnSurveys")
      }
      return hasPermission(user.role, "canModifyOthersSurveys")
    case "delete_data":
      return hasPermission(user.role, "canDeleteData") && hasClearanceLevel(user, "advanced")
    case "access_restricted_data":
      return hasPermission(user.role, "canAccessRestrictedData") && hasClearanceLevel(user, "restricted")
    case "manage_users":
      return hasPermission(user.role, "canManageUsers")
    case "configure_system":
      return hasPermission(user.role, "canConfigureSystem")
    default:
      return false
  }
}

export function getAccessibleModules(user: User): string[] {
  const modules = []
  if (canAccessModule(user, "oceanography")) modules.push("oceanography")
  if (canAccessModule(user, "taxonomy")) modules.push("taxonomy")
  if (canAccessModule(user, "molecular")) modules.push("molecular")
  if (canAccessModule(user, "data")) modules.push("data")
  return modules
}

export function getRoleColor(role: UserRole): string {
  const colors = {
    scientist: "bg-blue-100 text-blue-800",
    conservationist: "bg-green-100 text-green-800",
    policymaker: "bg-purple-100 text-purple-800",
    admin: "bg-red-100 text-red-800",
  }
  return colors[role]
}

export function getRoleIcon(role: UserRole): string {
  const icons = {
    scientist: "🔬",
    conservationist: "🌊",
    policymaker: "📋",
    admin: "⚙️",
  }
  return icons[role]
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: string
  details?: any
  ipAddress?: string
  userAgent?: string
}

export function logUserAction(user: User, action: string, resource: string, details?: any): AuditLog {
  const log: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId: user.id,
    userName: user.name,
    action,
    resource,
    timestamp: new Date().toISOString(),
    details,
  }

  // In a real application, this would be sent to a logging service
  console.log("[AUDIT]", log)
  return log
}

export function validatePermission(
  user: User,
  permission: string,
  context?: any,
): { allowed: boolean; reason?: string } {
  if (!user) {
    return { allowed: false, reason: "User not authenticated" }
  }

  const hasBasicPermission = hasPermission(user.role, permission as keyof typeof rolePermissions.scientist)
  if (!hasBasicPermission) {
    return { allowed: false, reason: `Role '${user.role}' does not have permission '${permission}'` }
  }

  // Additional context-based validation
  if (context?.requiresClearance && !hasClearanceLevel(user, context.requiresClearance)) {
    return { allowed: false, reason: `Requires clearance level '${context.requiresClearance}' or higher` }
  }

  if (context?.requiresSpecialization && !hasSpecialization(user, context.requiresSpecialization)) {
    return { allowed: false, reason: `Requires specialization in '${context.requiresSpecialization}'` }
  }

  if (context?.dataClassification && !hasDataClassificationAccess(user, context.dataClassification)) {
    return { allowed: false, reason: `No access to '${context.dataClassification}' classified data` }
  }

  if (context?.projectId && !hasProjectAccess(user, context.projectId)) {
    return { allowed: false, reason: `No access to project '${context.projectId}'` }
  }

  return { allowed: true }
}
