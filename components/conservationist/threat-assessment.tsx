"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Thermometer, Factory, Ship, Trash2, MapPin, TrendingUp } from "lucide-react"

const threatCategories = [
  {
    name: "Climate Change",
    severity: "high",
    impact: 85,
    trend: "increasing",
    icon: Thermometer,
    threats: ["Ocean warming", "Acidification", "Sea level rise", "Extreme weather"],
    affectedAreas: 12,
  },
  {
    name: "Pollution",
    severity: "high",
    impact: 78,
    trend: "stable",
    icon: Factory,
    threats: ["Chemical runoff", "Plastic waste", "Oil spills", "Sewage discharge"],
    affectedAreas: 8,
  },
  {
    name: "Overfishing",
    severity: "medium",
    impact: 65,
    trend: "decreasing",
    icon: Ship,
    threats: ["Commercial fishing", "Illegal fishing", "Bycatch", "Habitat damage"],
    affectedAreas: 15,
  },
  {
    name: "Marine Debris",
    severity: "medium",
    impact: 58,
    trend: "increasing",
    icon: Trash2,
    threats: ["Plastic pollution", "Ghost nets", "Microplastics", "Beach litter"],
    affectedAreas: 20,
  },
]

const recentIncidents = [
  {
    id: "INC001",
    type: "Coral Bleaching Event",
    location: "Andaman Sea",
    severity: "high",
    date: "2024-01-15",
    status: "ongoing",
    description: "Mass bleaching event affecting 40% of coral coverage",
  },
  {
    id: "INC002",
    type: "Oil Spill",
    location: "Mumbai Coast",
    severity: "medium",
    date: "2024-01-12",
    status: "contained",
    description: "Small oil spill from cargo vessel, cleanup in progress",
  },
  {
    id: "INC003",
    type: "Illegal Fishing",
    location: "Gulf of Mannar",
    severity: "medium",
    date: "2024-01-10",
    status: "investigated",
    description: "Unauthorized trawling in protected marine area",
  },
]

export function ThreatAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Threat Assessment</h2>
          <p className="text-muted-foreground">Monitor and assess threats to marine ecosystems</p>
        </div>
        <Button>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Categories */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Major Threat Categories</h3>
          <div className="space-y-4">
            {threatCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            category.severity === "high"
                              ? "destructive"
                              : category.severity === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {category.severity} risk
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            category.trend === "increasing"
                              ? "border-red-200 text-red-700"
                              : category.trend === "decreasing"
                                ? "border-green-200 text-green-700"
                                : "border-gray-200 text-gray-700"
                          }
                        >
                          {category.trend}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Impact Level</span>
                          <span>{category.impact}%</span>
                        </div>
                        <Progress value={category.impact} className="h-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specific Threats</p>
                        <div className="flex flex-wrap gap-1">
                          {category.threats.map((threat, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {threat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-muted-foreground">Affected areas: {category.affectedAreas}</p>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            View Map
                          </Button>
                          <Button variant="outline" size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Incidents and Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Incidents</h3>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Threats</CardTitle>
              <CardDescription>Recent incidents requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${
                        incident.severity === "high"
                          ? "bg-red-500"
                          : incident.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-balance">{incident.type}</p>
                      <Badge
                        variant={
                          incident.status === "ongoing"
                            ? "destructive"
                            : incident.status === "contained"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{incident.location}</p>
                    <p className="text-xs text-muted-foreground text-pretty">{incident.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{incident.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Threat Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">High Risk Areas</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Incidents</span>
                <span className="font-medium">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Resolved This Month</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Response Time (Avg)</span>
                <span className="font-medium">4.2 hrs</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Response
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Site Inspection
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                Risk Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
