"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Thermometer, Droplets, Wind, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const healthIndicators = [
  {
    name: "Water Quality",
    score: 78,
    status: "good",
    trend: "stable",
    parameters: ["pH", "Dissolved Oxygen", "Turbidity", "Nutrients"],
  },
  {
    name: "Coral Health",
    score: 62,
    status: "concern",
    trend: "declining",
    parameters: ["Bleaching", "Disease", "Coverage", "Recruitment"],
  },
  {
    name: "Fish Populations",
    score: 84,
    status: "excellent",
    trend: "improving",
    parameters: ["Abundance", "Diversity", "Size Structure", "Recruitment"],
  },
  {
    name: "Habitat Integrity",
    score: 71,
    status: "good",
    trend: "stable",
    parameters: ["Coverage", "Fragmentation", "Connectivity", "Restoration"],
  },
]

const environmentalParameters = [
  {
    parameter: "Sea Surface Temperature",
    value: "28.5°C",
    status: "normal",
    threshold: "< 30°C",
    icon: Thermometer,
  },
  {
    parameter: "Ocean pH",
    value: "8.1",
    status: "normal",
    threshold: "> 7.8",
    icon: Droplets,
  },
  {
    parameter: "Dissolved Oxygen",
    value: "6.2 mg/L",
    status: "good",
    threshold: "> 5.0 mg/L",
    icon: Wind,
  },
  {
    parameter: "Chlorophyll-a",
    value: "0.8 mg/m³",
    status: "normal",
    threshold: "< 2.0 mg/m³",
    icon: Waves,
  },
]

export function EcosystemHealth() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Ecosystem Health Assessment</h2>
          <p className="text-muted-foreground">Monitor environmental parameters and ecosystem indicators</p>
        </div>
        <Button>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Health Report
        </Button>
      </div>

      <Tabs defaultValue="indicators" className="space-y-4">
        <TabsList>
          <TabsTrigger value="indicators">Health Indicators</TabsTrigger>
          <TabsTrigger value="parameters">Environmental Parameters</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring Sites</TabsTrigger>
          <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthIndicators.map((indicator, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{indicator.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          indicator.status === "excellent"
                            ? "default"
                            : indicator.status === "good"
                              ? "secondary"
                              : indicator.status === "concern"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {indicator.status}
                      </Badge>
                      {indicator.status === "excellent" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {indicator.status === "concern" && <XCircle className="h-4 w-4 text-red-600" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium">{indicator.score}/100</span>
                      </div>
                      <Progress value={indicator.score} className="h-3" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Parameters</p>
                      <div className="flex flex-wrap gap-1">
                        {indicator.parameters.map((param, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm text-muted-foreground">Trend: {indicator.trend}</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Ecosystem Health</CardTitle>
              <CardDescription>Composite health score based on all indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-4xl font-bold text-primary mb-2">74/100</div>
                <Badge variant="secondary" className="mb-4">
                  Good Health
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Ecosystem showing stable health with some areas requiring attention
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {environmentalParameters.map((param, index) => {
              const Icon = param.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium text-balance">{param.parameter}</p>
                          <p className="text-sm text-muted-foreground">Threshold: {param.threshold}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          param.status === "good" || param.status === "normal"
                            ? "default"
                            : param.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {param.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{param.value}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parameter Trends</CardTitle>
              <CardDescription>Historical trends of key environmental parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Waves className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Environmental parameter trend charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Waves className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Monitoring Site Network</h3>
                <p className="text-muted-foreground mb-4">Real-time monitoring stations and data collection points</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ecosystem Health Alerts</h3>
                <p className="text-muted-foreground mb-4">Automated alerts for ecosystem health threshold breaches</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
