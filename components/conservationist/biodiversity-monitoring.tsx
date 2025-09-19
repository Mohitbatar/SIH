"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TreePine, Fish, Bird, Flower, TrendingUp, TrendingDown, MapPin, BarChart3 } from "lucide-react"

const biodiversityMetrics = [
  {
    category: "Marine Fish",
    species: 342,
    trend: "stable",
    change: "+2%",
    icon: Fish,
    color: "text-blue-600",
    status: "good",
  },
  {
    category: "Coral Species",
    species: 89,
    trend: "declining",
    change: "-12%",
    icon: Flower,
    color: "text-pink-600",
    status: "concern",
  },
  {
    category: "Seabirds",
    species: 67,
    trend: "improving",
    change: "+8%",
    icon: Bird,
    color: "text-green-600",
    status: "good",
  },
  {
    category: "Mangrove Flora",
    species: 45,
    trend: "stable",
    change: "+1%",
    icon: TreePine,
    color: "text-emerald-600",
    status: "good",
  },
]

const ecosystemAreas = [
  {
    name: "Coral Reefs",
    coverage: "2,340 km²",
    health: 68,
    species: 234,
    threats: ["bleaching", "pollution"],
    trend: "declining",
  },
  {
    name: "Mangrove Forests",
    coverage: "4,863 km²",
    health: 82,
    species: 156,
    threats: ["deforestation", "development"],
    trend: "stable",
  },
  {
    name: "Seagrass Beds",
    coverage: "1,567 km²",
    health: 74,
    species: 89,
    threats: ["sedimentation", "boat damage"],
    trend: "improving",
  },
  {
    name: "Deep Sea Habitats",
    coverage: "45,000 km²",
    health: 91,
    species: 445,
    threats: ["fishing", "mining"],
    trend: "stable",
  },
]

export function BiodiversityMonitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Biodiversity Monitoring</h2>
          <p className="text-muted-foreground">Track species diversity and ecosystem health indicators</p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="species" className="space-y-4">
        <TabsList>
          <TabsTrigger value="species">Species Diversity</TabsTrigger>
          <TabsTrigger value="ecosystems">Ecosystem Health</TabsTrigger>
          <TabsTrigger value="trends">Population Trends</TabsTrigger>
          <TabsTrigger value="hotspots">Biodiversity Hotspots</TabsTrigger>
        </TabsList>

        <TabsContent value="species" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {biodiversityMetrics.map((metric) => {
              const Icon = metric.icon
              const TrendIcon = metric.trend === "improving" ? TrendingUp : TrendingDown
              return (
                <Card key={metric.category} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`h-8 w-8 ${metric.color}`} />
                      <Badge
                        variant={
                          metric.status === "good"
                            ? "default"
                            : metric.status === "concern"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.category}</p>
                      <p className="text-2xl font-bold">{metric.species}</p>
                      <p className="text-sm text-muted-foreground">species recorded</p>
                      <div className="flex items-center mt-2">
                        {metric.trend !== "stable" && (
                          <TrendIcon
                            className={`h-3 w-3 mr-1 ${
                              metric.trend === "improving" ? "text-green-600" : "text-red-600"
                            }`}
                          />
                        )}
                        <span
                          className={`text-xs ${
                            metric.trend === "improving"
                              ? "text-green-600"
                              : metric.trend === "declining"
                                ? "text-red-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {metric.change} this year
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Species Richness by Location</CardTitle>
              <CardDescription>Distribution of species diversity across marine protected areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive species distribution map will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecosystems" className="space-y-4">
          <div className="grid gap-4">
            {ecosystemAreas.map((ecosystem, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{ecosystem.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          ecosystem.trend === "improving"
                            ? "default"
                            : ecosystem.trend === "declining"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {ecosystem.trend}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-medium">{ecosystem.coverage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Health Score</p>
                      <p className="font-medium">{ecosystem.health}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Species Count</p>
                      <p className="font-medium">{ecosystem.species}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Threats</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ecosystem.threats.map((threat, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Ecosystem Health</span>
                      <span>{ecosystem.health}%</span>
                    </div>
                    <Progress value={ecosystem.health} className="h-2" />
                  </div>
                  <div className="flex items-center space-x-2 pt-3">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View Location
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Population Trend Analysis</h3>
                <p className="text-muted-foreground mb-4">Long-term population trends and species abundance patterns</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotspots">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Biodiversity Hotspots</h3>
                <p className="text-muted-foreground mb-4">Identification and mapping of critical biodiversity areas</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
