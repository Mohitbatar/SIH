"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, AlertTriangle, Target, FileText, BarChart3 } from "lucide-react"

const policyRecommendations = [
  {
    id: "REC001",
    title: "Strengthen Marine Protected Area Enforcement",
    priority: "high",
    impact: "high",
    timeframe: "immediate",
    evidence: "Compliance monitoring shows 22% violation rate in MPAs",
    recommendation:
      "Deploy additional patrol vessels and implement satellite monitoring systems for real-time surveillance",
    expectedOutcome: "Reduce violations by 60% within 12 months",
    cost: "₹45 Cr",
  },
  {
    id: "REC002",
    title: "Implement Ecosystem-Based Fisheries Management",
    priority: "high",
    impact: "medium",
    timeframe: "6-12 months",
    evidence: "Fish stock assessments indicate declining populations in 15 key species",
    recommendation: "Establish science-based catch limits and seasonal closures based on ecosystem health indicators",
    expectedOutcome: "Stabilize fish populations and improve ecosystem resilience",
    cost: "₹28 Cr",
  },
  {
    id: "REC003",
    title: "Expand Blue Carbon Initiative",
    priority: "medium",
    impact: "high",
    timeframe: "12-24 months",
    evidence: "Mangrove restoration can sequester 3.5 tons CO2/hectare/year",
    recommendation: "Scale up mangrove and seagrass restoration programs with carbon credit incentives",
    expectedOutcome: "Restore 5,000 hectares and generate ₹120 Cr in carbon credits",
    cost: "₹85 Cr",
  },
]

const trendAnalysis = [
  {
    trend: "Marine Plastic Pollution",
    direction: "increasing",
    impact: "high",
    data: "35% increase in microplastics detected in fish samples",
    recommendation: "Accelerate single-use plastic ban implementation",
  },
  {
    trend: "Coastal Tourism Revenue",
    direction: "recovering",
    impact: "medium",
    data: "Tourism revenue at 85% of pre-pandemic levels",
    recommendation: "Promote sustainable marine tourism practices",
  },
  {
    trend: "Fishing Community Income",
    direction: "declining",
    impact: "high",
    data: "Average income decreased by 12% due to reduced catch",
    recommendation: "Implement alternative livelihood programs",
  },
  {
    trend: "Coral Reef Health",
    direction: "declining",
    impact: "high",
    data: "18% coral cover loss in the past 3 years",
    recommendation: "Establish coral restoration and protection programs",
  },
]

export function PolicyInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Policy Insights & Recommendations</h2>
          <p className="text-muted-foreground">Evidence-based policy recommendations and trend analysis</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Policy Brief
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="benchmarks">International Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {policyRecommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-balance">{rec.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "outline"
                        }
                      >
                        {rec.priority} priority
                      </Badge>
                      <Badge
                        variant={rec.impact === "high" ? "default" : rec.impact === "medium" ? "secondary" : "outline"}
                      >
                        {rec.impact} impact
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Timeframe: {rec.timeframe} | Estimated cost: {rec.cost}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                        Evidence
                      </h4>
                      <p className="text-sm text-muted-foreground text-pretty">{rec.evidence}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1 text-blue-500" />
                        Recommendation
                      </h4>
                      <p className="text-sm text-muted-foreground text-pretty">{rec.recommendation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center">
                        <Target className="h-4 w-4 mr-1 text-green-500" />
                        Expected Outcome
                      </h4>
                      <p className="text-sm text-muted-foreground text-pretty">{rec.expectedOutcome}</p>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Full Analysis
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Impact Model
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendAnalysis.map((trend, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-balance">{trend.trend}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          trend.direction === "increasing"
                            ? "destructive"
                            : trend.direction === "declining"
                              ? "destructive"
                              : "default"
                        }
                      >
                        {trend.direction}
                      </Badge>
                      <Badge
                        variant={
                          trend.impact === "high" ? "destructive" : trend.impact === "medium" ? "secondary" : "outline"
                        }
                      >
                        {trend.impact} impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Key Data</p>
                      <p className="text-sm text-muted-foreground text-pretty">{trend.data}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Policy Response</p>
                      <p className="text-sm text-muted-foreground text-pretty">{trend.recommendation}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      View Trend Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scenario Planning</h3>
                <p className="text-muted-foreground mb-4">
                  Model different policy scenarios and their potential outcomes
                </p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">International Benchmarks</h3>
                <p className="text-muted-foreground mb-4">
                  Compare India's marine policies with international best practices
                </p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
