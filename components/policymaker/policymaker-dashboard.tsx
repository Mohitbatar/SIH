"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PolicyInsights } from "@/components/policymaker/policy-insights"
import { EconomicImpact } from "@/components/policymaker/economic-impact"
import { ComplianceMonitoring } from "@/components/policymaker/compliance-monitoring"
import { StrategicPlanning } from "@/components/policymaker/strategic-planning"
import {
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  BarChart3,
} from "lucide-react"

const keyMetrics = [
  {
    title: "Marine Protected Areas",
    value: "89",
    unit: "areas",
    change: "+12%",
    trend: "up",
    target: "100 by 2025",
    icon: Shield,
    color: "text-green-600",
  },
  {
    title: "Blue Economy Value",
    value: "₹2.1",
    unit: "trillion",
    change: "+8.5%",
    trend: "up",
    target: "₹3T by 2030",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    title: "Fishing Communities",
    value: "4.2M",
    unit: "people",
    change: "+2.1%",
    trend: "up",
    target: "Sustainable livelihoods",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Policy Compliance",
    value: "78%",
    unit: "compliance",
    change: "-3%",
    trend: "down",
    target: "90% by 2025",
    icon: CheckCircle,
    color: "text-orange-600",
  },
]

const policyPriorities = [
  {
    title: "Marine Spatial Planning",
    status: "in-progress",
    priority: "high",
    deadline: "Q2 2024",
    progress: 65,
    description: "Comprehensive zoning of marine areas for sustainable use",
  },
  {
    title: "Plastic Waste Reduction",
    status: "review",
    priority: "high",
    deadline: "Q1 2024",
    progress: 85,
    description: "National policy framework for marine plastic pollution",
  },
  {
    title: "Fisheries Management Reform",
    status: "draft",
    priority: "medium",
    deadline: "Q3 2024",
    progress: 40,
    description: "Sustainable fishing quotas and community-based management",
  },
  {
    title: "Climate Adaptation Strategy",
    status: "planning",
    priority: "high",
    deadline: "Q4 2024",
    progress: 20,
    description: "Coastal resilience and ecosystem-based adaptation",
  },
]

const recentReports = [
  {
    title: "State of Marine Biodiversity 2024",
    type: "Annual Report",
    date: "2024-01-15",
    status: "published",
    downloads: 1247,
  },
  {
    title: "Economic Impact of Marine Tourism",
    type: "Economic Analysis",
    date: "2024-01-10",
    status: "published",
    downloads: 892,
  },
  {
    title: "Coastal Vulnerability Assessment",
    type: "Risk Assessment",
    date: "2024-01-08",
    status: "draft",
    downloads: 0,
  },
  {
    title: "Fisheries Sustainability Index",
    type: "Performance Report",
    date: "2024-01-05",
    status: "review",
    downloads: 0,
  },
]

export function PolicymakerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-balance">Policy Dashboard</h1>
          <p className="text-muted-foreground">
            Strategic insights and evidence-based recommendations for marine policy decisions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Summary
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Policy Brief
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                  <TrendIcon className={`h-4 w-4 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.unit}</p>
                  </div>
                  <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change} from last year
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Policy Insights</TabsTrigger>
          <TabsTrigger value="economic">Economic Impact</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="planning">Strategic Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Policy Priorities */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">Current Policy Priorities</h2>
              <div className="space-y-4">
                {policyPriorities.map((policy, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-balance">{policy.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              policy.priority === "high"
                                ? "destructive"
                                : policy.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {policy.priority} priority
                          </Badge>
                          <Badge
                            variant={
                              policy.status === "in-progress"
                                ? "default"
                                : policy.status === "review"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {policy.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{policy.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{policy.progress}%</span>
                        </div>
                        <Progress value={policy.progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Deadline: {policy.deadline}</p>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Impact Analysis
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reports and Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Reports</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Policy Documents</CardTitle>
                  <CardDescription>Latest reports and analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            report.status === "published"
                              ? "bg-green-500"
                              : report.status === "review"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-balance">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.type}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                          {report.status === "published" && (
                            <p className="text-xs text-muted-foreground">{report.downloads} downloads</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-green-800">Marine Protection Targets</p>
                    </div>
                    <p className="text-xs text-green-700">89% progress towards 2025 MPA goals</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm font-medium text-yellow-800">Compliance Concerns</p>
                    </div>
                    <p className="text-xs text-yellow-700">Fishing regulations compliance at 78%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">Economic Growth</p>
                    </div>
                    <p className="text-xs text-blue-700">Blue economy value increased by 8.5%</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Draft Policy Brief
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Impact Assessment
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Stakeholder Meeting
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <PolicyInsights />
        </TabsContent>

        <TabsContent value="economic">
          <EconomicImpact />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceMonitoring />
        </TabsContent>

        <TabsContent value="planning">
          <StrategicPlanning />
        </TabsContent>
      </Tabs>
    </div>
  )
}
