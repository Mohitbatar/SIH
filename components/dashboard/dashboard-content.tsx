"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { toast } from "sonner"
import {
  BarChart3,
  Database,
  FileText,
  TrendingUp,
  Waves,
  Fish,
  FlaskConical,
  Globe,
  Microscope,
  TreePine,
  Upload,
  Download,
} from "lucide-react"

const quickStats = [
  {
    title: "Active Datasets",
    value: "1,247",
    change: "+12%",
    icon: Database,
    color: "text-blue-600",
  },
  {
    title: "Species Catalogued",
    value: "3,892",
    change: "+8%",
    icon: Fish,
    color: "text-green-600",
  },
  {
    title: "Research Projects",
    value: "156",
    change: "+23%",
    icon: Microscope,
    color: "text-purple-600",
  },
  {
    title: "Conservation Areas",
    value: "89",
    change: "+5%",
    icon: TreePine,
    color: "text-emerald-600",
  },
]

const recentActivities = [
  {
    title: "New Oceanographic Survey Data",
    description: "Arabian Sea temperature and salinity measurements uploaded",
    time: "2 hours ago",
    type: "data",
  },
  {
    title: "Species Classification Updated",
    description: "Taxonomic data for 45 new fish species added to database",
    time: "4 hours ago",
    type: "taxonomy",
  },
  {
    title: "Conservation Report Generated",
    description: "Monthly biodiversity assessment report for Western Ghats region",
    time: "1 day ago",
    type: "report",
  },
  {
    title: "Molecular Analysis Complete",
    description: "eDNA sequencing results for coral reef samples processed",
    time: "2 days ago",
    type: "molecular",
  },
]

const moduleCards = [
  {
    title: "Oceanography",
    description: "Physical, chemical, and biological ocean data analysis",
    icon: Waves,
    permission: "canAccessOceanography" as const,
    color:
      "bg-blue-100 border-blue-300 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:hover:bg-blue-800/40",
    iconColor: "text-blue-700 dark:text-blue-400",
    textColor: "text-blue-900 dark:text-blue-100",
  },
  {
    title: "Taxonomy & Morphology",
    description: "Species identification, classification, and otolith analysis",
    icon: Fish,
    permission: "canAccessTaxonomy" as const,
    color:
      "bg-green-100 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:border-green-700 dark:hover:bg-green-800/40",
    iconColor: "text-green-700 dark:text-green-400",
    textColor: "text-green-900 dark:text-green-100",
  },
  {
    title: "Molecular Biology",
    description: "eDNA analysis, genetic sequencing, and biodiversity assessment",
    icon: FlaskConical,
    permission: "canAccessMolecular" as const,
    color:
      "bg-purple-100 border-purple-300 hover:bg-purple-200 dark:bg-purple-900/30 dark:border-purple-700 dark:hover:bg-purple-800/40",
    iconColor: "text-purple-700 dark:text-purple-400",
    textColor: "text-purple-900 dark:text-purple-100",
  },
  {
    title: "Data Management",
    description: "Integrated data storage, retrieval, and cross-domain analysis",
    icon: Database,
    permission: "canViewData" as const,
    color:
      "bg-orange-100 border-orange-300 hover:bg-orange-200 dark:bg-orange-900/30 dark:border-orange-700 dark:hover:bg-orange-800/40",
    iconColor: "text-orange-700 dark:text-orange-400",
    textColor: "text-orange-900 dark:text-orange-100",
  },
]

export function DashboardContent() {
  const { authState } = useAuth()
  const user = authState.user
  const router = useRouter()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState("")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  if (!user) return null

  const accessibleModules = moduleCards.filter(
    (module) => !module.permission || hasPermission(user.role, module.permission),
  )

  const handleModuleAccess = (moduleTitle: string) => {
    switch (moduleTitle) {
      case "Oceanography":
        router.push("/oceanography")
        toast.success("Navigating to Oceanography module")
        break
      case "Taxonomy & Morphology":
        router.push("/taxonomy")
        toast.success("Navigating to Taxonomy & Morphology module")
        break
      case "Molecular Biology":
        router.push("/molecular")
        toast.success("Navigating to Molecular Biology module")
        break
      case "Data Management":
        router.push("/data")
        toast.success("Navigating to Data Management module")
        break
      default:
        toast.error("Module not available")
    }
  }

  const handleGenerateReport = () => {
    setReportDialogOpen(true)
  }

  const handleUploadData = () => {
    setUploadDialogOpen(true)
  }

  const handleViewAnalytics = () => {
    router.push("/analytics")
    toast.success("Navigating to Analytics Dashboard")
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload")
      return
    }

    setIsUploading(true)
    try {
      // Simulate file upload process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success(`Successfully uploaded ${selectedFile.name}`)
      setUploadDialogOpen(false)
      setSelectedFile(null)
    } catch (error) {
      toast.error("Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleReportGeneration = async () => {
    if (!reportType) {
      toast.error("Please select a report type")
      return
    }

    setIsGeneratingReport(true)
    try {
      // Simulate report generation process
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success(`${reportType} report generated successfully`)
      setReportDialogOpen(false)
      setReportType("")
      // Navigate to reports page to view the generated report
      router.push("/reports")
    } catch (error) {
      toast.error("Failed to generate report")
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-balance">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-foreground/70 text-pretty">
          Centre for Marine Living Resources and Ecology - Your gateway to comprehensive marine data insights
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground/70">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Access Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Research Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessibleModules.map((module) => {
              const Icon = module.icon
              return (
                <Card
                  key={module.title}
                  className={`cursor-pointer transition-all duration-200 ${module.color}`}
                  onClick={() => handleModuleAccess(module.title)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${module.iconColor}`} />
                      <CardTitle className={`text-lg ${module.textColor}`}>{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className={`text-sm ${module.textColor}/80`}>{module.description}</CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`mt-3 bg-transparent border-current ${module.textColor} hover:bg-current/10`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleAccess(module.title)
                      }}
                    >
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest Updates</CardTitle>
              <CardDescription>Recent data uploads and system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex space-x-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-balance">{activity.title}</p>
                    <p className="text-xs text-foreground/70 text-pretty">{activity.description}</p>
                    <p className="text-xs text-foreground/60 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Role-specific Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {hasPermission(user.role, "canCreateReports") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent hover:bg-accent"
                  onClick={handleGenerateReport}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              )}
              {hasPermission(user.role, "canEditData") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent hover:bg-accent"
                  onClick={handleUploadData}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Upload Data
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent hover:bg-accent"
                onClick={handleViewAnalytics}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Role-specific Information */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Globe className="h-8 w-8 text-primary animate-float" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-balance">
                {user.role === "scientist" && "Advanced Research Tools"}
                {user.role === "conservationist" && "Conservation Insights"}
                {user.role === "policymaker" && "Policy Support Data"}
              </h3>
              <p className="text-sm text-foreground/70 text-pretty mt-1">
                {user.role === "scientist" &&
                  "Access comprehensive datasets, taxonomic tools, and molecular analysis capabilities for your research projects."}
                {user.role === "conservationist" &&
                  "Monitor biodiversity trends, ecosystem health indicators, and conservation effectiveness metrics."}
                {user.role === "policymaker" &&
                  "Review aggregated data insights, trend analyses, and evidence-based recommendations for marine policy decisions."}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {user.role} Access
                </Badge>
                <Badge variant="outline">{user.department}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Data</DialogTitle>
            <DialogDescription>Select a file to upload to the marine data platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.json,.txt"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload} disabled={!selectedFile || isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Select the type of report you want to generate</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="biodiversity">Biodiversity Assessment</SelectItem>
                  <SelectItem value="oceanographic">Oceanographic Analysis</SelectItem>
                  <SelectItem value="species">Species Distribution</SelectItem>
                  <SelectItem value="conservation">Conservation Status</SelectItem>
                  <SelectItem value="molecular">Molecular Analysis Summary</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive Marine Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportGeneration} disabled={!reportType || isGeneratingReport}>
                {isGeneratingReport ? (
                  <>
                    <Download className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
