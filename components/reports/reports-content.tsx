"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import {
  FileText,
  Plus,
  Download,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react"

const reportStats = [
  {
    category: "Generated Reports",
    count: "247",
    change: "+23",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    category: "Scheduled Reports",
    count: "18",
    change: "+3",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    category: "Active Templates",
    count: "12",
    change: "+2",
    icon: BarChart3,
    color: "text-purple-600",
  },
  {
    category: "Shared Reports",
    count: "89",
    change: "+15",
    icon: Users,
    color: "text-orange-600",
  },
]

const recentReports = [
  {
    id: "RPT-2024-001",
    title: "Monthly Biodiversity Assessment",
    type: "Biodiversity",
    status: "Completed",
    generated: "2024-01-15",
    author: "Dr. Marine Biologist",
    size: "2.4 MB",
    pages: 45,
    downloads: 23,
  },
  {
    id: "RPT-2024-002",
    title: "Arabian Sea Temperature Analysis",
    type: "Oceanographic",
    status: "Processing",
    generated: "2024-01-14",
    author: "Dr. Ocean Researcher",
    size: "1.8 MB",
    pages: 32,
    downloads: 0,
  },
  {
    id: "RPT-2024-003",
    title: "Coral Reef Health Survey",
    type: "Conservation",
    status: "Completed",
    generated: "2024-01-13",
    author: "Marine Conservationist",
    size: "3.2 MB",
    pages: 67,
    downloads: 45,
  },
  {
    id: "RPT-2024-004",
    title: "eDNA Species Detection Summary",
    type: "Molecular",
    status: "Draft",
    generated: "2024-01-12",
    author: "Molecular Biologist",
    size: "1.1 MB",
    pages: 28,
    downloads: 0,
  },
]

const reportTemplates = [
  {
    id: "TPL-001",
    name: "Biodiversity Assessment",
    description: "Comprehensive species diversity and abundance analysis",
    category: "Ecological",
    lastUsed: "2024-01-15",
    usage: 45,
  },
  {
    id: "TPL-002",
    name: "Oceanographic Survey",
    description: "Physical and chemical ocean parameter analysis",
    category: "Oceanographic",
    lastUsed: "2024-01-14",
    usage: 32,
  },
  {
    id: "TPL-003",
    name: "Conservation Impact",
    description: "Marine protected area effectiveness assessment",
    category: "Conservation",
    lastUsed: "2024-01-13",
    usage: 28,
  },
  {
    id: "TPL-004",
    name: "Molecular Analysis",
    description: "eDNA and genetic sequencing results summary",
    category: "Molecular",
    lastUsed: "2024-01-12",
    usage: 19,
  },
]

export function ReportsContent() {
  const { authState } = useAuth()
  const user = authState.user

  if (!user) return null

  const canCreateReports = hasPermission(user.role, "canCreateReports")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Draft":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "Processing":
        return "secondary"
      case "Draft":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-balance">Reports</h1>
        </div>
        <p className="text-muted-foreground text-pretty">
          Generate, manage, and share comprehensive marine research reports
        </p>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.category} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.category}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Reports</h2>
                {canCreateReports && (
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {report.type} • {report.pages} pages • {report.size}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(report.status)}
                          <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            By {report.author} • {report.generated}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{report.downloads} downloads</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {report.status === "Completed" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Report Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              {canCreateReports && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Create Report</CardTitle>
                    <CardDescription>Generate new research reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Custom Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      From Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Report
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Analytics</CardTitle>
                  <CardDescription>Usage and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Usage Statistics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Metrics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <PieChart className="h-4 w-4 mr-2" />
                    Report Types
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Report Templates</h2>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">{template.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Last used: {template.lastUsed}</p>
                          <p className="text-xs text-muted-foreground mt-1">Used {template.usage} times</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          {canCreateReports && (
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Template Management</CardTitle>
                <CardDescription>Manage and customize report templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {canCreateReports && (
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Browse Templates
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Import Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated report generation and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Scheduled report management and automation tools will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Reports</CardTitle>
              <CardDescription>Reports shared with you by other team members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Shared report access and collaboration features will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
