"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BiodiversityMonitoring } from "@/components/conservationist/biodiversity-monitoring"
import { EcosystemHealth } from "@/components/conservationist/ecosystem-health"
import { ConservationPlanning } from "@/components/conservationist/conservation-planning"
import { ThreatAssessment } from "@/components/conservationist/threat-assessment"
import {
  TreePine,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MapPin,
  Waves,
  BarChart3,
  FileText,
  Download,
} from "lucide-react"

const conservationAreas = [
  {
    id: "CA001",
    name: "Lakshadweep Marine Protected Area",
    type: "Marine Reserve",
    area: "32,000 km²",
    status: "protected",
    biodiversityIndex: 8.7,
    threatLevel: "low",
    lastAssessment: "2024-01-10",
  },
  {
    id: "CA002",
    name: "Gulf of Mannar Biosphere",
    type: "Biosphere Reserve",
    area: "10,500 km²",
    status: "protected",
    biodiversityIndex: 7.9,
    threatLevel: "medium",
    lastAssessment: "2024-01-08",
  },
  {
    id: "CA003",
    name: "Sundarbans Mangrove Forest",
    type: "World Heritage Site",
    area: "4,143 km²",
    status: "critical",
    biodiversityIndex: 9.2,
    threatLevel: "high",
    lastAssessment: "2024-01-05",
  },
]

const conservationMetrics = [
  {
    title: "Protected Areas",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: Shield,
    color: "text-green-600",
  },
  {
    title: "Species at Risk",
    value: "127",
    change: "-8%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Biodiversity Index",
    value: "8.4",
    change: "+2.1%",
    trend: "up",
    icon: TreePine,
    color: "text-emerald-600",
  },
  {
    title: "Ecosystem Health",
    value: "76%",
    change: "+3%",
    trend: "up",
    icon: Waves,
    color: "text-blue-600",
  },
]

const recentAlerts = [
  {
    id: "ALT001",
    type: "Coral Bleaching",
    location: "Andaman Sea",
    severity: "high",
    date: "2024-01-15",
    description: "Elevated water temperatures causing coral stress",
  },
  {
    id: "ALT002",
    type: "Overfishing",
    location: "Bay of Bengal",
    severity: "medium",
    date: "2024-01-14",
    description: "Declining fish populations in commercial fishing zones",
  },
  {
    id: "ALT003",
    type: "Habitat Loss",
    location: "Western Ghats",
    severity: "high",
    date: "2024-01-12",
    description: "Mangrove deforestation detected via satellite imagery",
  },
]

export function ConservationistDashboard() {
  const [selectedArea, setSelectedArea] = useState("CA001")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-balance">Conservation Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor biodiversity, ecosystem health, and conservation effectiveness
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Conservation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {conservationMetrics.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p
                      className={`text-xs flex items-center mt-1 ${
                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {metric.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
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
          <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          <TabsTrigger value="ecosystem">Ecosystem Health</TabsTrigger>
          <TabsTrigger value="planning">Conservation Planning</TabsTrigger>
          <TabsTrigger value="threats">Threat Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conservation Areas */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">Protected Areas Status</h2>
              <div className="space-y-4">
                {conservationAreas.map((area) => (
                  <Card key={area.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-balance">{area.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              area.status === "protected"
                                ? "default"
                                : area.status === "critical"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {area.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              area.threatLevel === "low"
                                ? "border-green-200 text-green-700"
                                : area.threatLevel === "medium"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            }
                          >
                            {area.threatLevel} threat
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{area.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Area</p>
                            <p className="font-medium">{area.area}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Biodiversity Index</p>
                            <p className="font-medium">{area.biodiversityIndex}/10</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Conservation Effectiveness</span>
                            <span>{Math.round(area.biodiversityIndex * 10)}%</span>
                          </div>
                          <Progress value={area.biodiversityIndex * 10} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm text-muted-foreground">Last assessed: {area.lastAssessment}</p>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              View Map
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Alerts and Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Conservation Alerts</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Threats</CardTitle>
                  <CardDescription>Environmental alerts requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-3 pb-3 border-b border-border last:border-0"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{alert.type}</p>
                          <Badge
                            variant="outline"
                            className={
                              alert.severity === "high"
                                ? "border-red-200 text-red-700"
                                : alert.severity === "medium"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-green-200 text-green-700"
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{alert.location}</p>
                        <p className="text-xs text-muted-foreground text-pretty">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <TreePine className="h-4 w-4 mr-2" />
                    Biodiversity Assessment
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Protection Status Review
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Threat Analysis
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="biodiversity">
          <BiodiversityMonitoring />
        </TabsContent>

        <TabsContent value="ecosystem">
          <EcosystemHealth />
        </TabsContent>

        <TabsContent value="planning">
          <ConservationPlanning />
        </TabsContent>

        <TabsContent value="threats">
          <ThreatAssessment />
        </TabsContent>
      </Tabs>
    </div>
  )
}
