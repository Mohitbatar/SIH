"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Calendar, Users, FileText, CheckCircle, Clock } from "lucide-react"

const strategicGoals = [
  {
    id: "SG001",
    title: "Achieve 30% Marine Protected Area Coverage",
    target: "2030",
    progress: 67,
    status: "on-track",
    initiatives: 8,
    budget: "₹450 Cr",
    description: "Expand marine protected areas to meet international conservation targets",
  },
  {
    id: "SG002",
    title: "Double Blue Economy Contribution",
    target: "2030",
    progress: 45,
    status: "at-risk",
    initiatives: 12,
    budget: "₹2,100 Cr",
    description: "Increase blue economy contribution to 12% of national GDP",
  },
  {
    id: "SG003",
    title: "Achieve Sustainable Fisheries",
    target: "2028",
    progress: 58,
    status: "on-track",
    initiatives: 6,
    budget: "₹320 Cr",
    description: "Implement ecosystem-based fisheries management nationwide",
  },
  {
    id: "SG004",
    title: "Zero Marine Plastic Pollution",
    target: "2035",
    progress: 23,
    status: "behind",
    initiatives: 15,
    budget: "₹180 Cr",
    description: "Eliminate single-use plastics and achieve circular economy",
  },
]

const upcomingMilestones = [
  {
    title: "National Ocean Policy Review",
    date: "2024-03-15",
    type: "Policy Review",
    priority: "high",
    stakeholders: ["MoES", "Coastal States", "Industry"],
  },
  {
    title: "Blue Economy Summit 2024",
    date: "2024-04-20",
    type: "Conference",
    priority: "medium",
    stakeholders: ["International Partners", "Private Sector"],
  },
  {
    title: "Marine Spatial Planning Framework",
    date: "2024-05-30",
    type: "Framework Launch",
    priority: "high",
    stakeholders: ["Coastal States", "Fishing Communities"],
  },
  {
    title: "Plastic Waste Reduction Targets",
    date: "2024-06-15",
    type: "Target Setting",
    priority: "medium",
    stakeholders: ["Industry", "NGOs", "Local Governments"],
  },
]

export function StrategicPlanning() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Strategic Planning</h2>
          <p className="text-muted-foreground">Long-term goals, milestones, and strategic initiatives</p>
        </div>
        <Button>
          <Target className="h-4 w-4 mr-2" />
          Strategic Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategic Goals */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Strategic Goals (2024-2035)</h3>
          <div className="space-y-4">
            {strategicGoals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-balance">{goal.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          goal.status === "on-track"
                            ? "default"
                            : goal.status === "at-risk"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {goal.status}
                      </Badge>
                      <Badge variant="outline">Target: {goal.target}</Badge>
                    </div>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Active Initiatives</p>
                        <p className="font-medium">{goal.initiatives}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Allocated Budget</p>
                        <p className="font-medium">{goal.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Target className="h-4 w-4 mr-1" />
                        View Roadmap
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Progress Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones and Planning Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Upcoming Milestones</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Events & Deadlines</CardTitle>
              <CardDescription>Important dates and milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0">
                    <Calendar className="h-4 w-4 text-primary mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-balance">{milestone.title}</p>
                      <Badge variant={milestone.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {milestone.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{milestone.type}</p>
                    <p className="text-xs text-muted-foreground mb-2">{milestone.date}</p>
                    <div className="flex flex-wrap gap-1">
                      {milestone.stakeholders.slice(0, 2).map((stakeholder, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {stakeholder}
                        </Badge>
                      ))}
                      {milestone.stakeholders.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{milestone.stakeholders.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Planning Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Goals</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">On Track</span>
                <span className="font-medium text-green-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">At Risk</span>
                <span className="font-medium text-yellow-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Behind Schedule</span>
                <span className="font-medium text-red-600">1</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Planning Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Target className="h-4 w-4 mr-2" />
                Goal Setting
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline Planning
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Stakeholder Mapping
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Progress Tracking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Strategic Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Target className="h-8 w-8 text-primary animate-float" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-balance">India's Marine Vision 2035</h3>
              <p className="text-sm text-muted-foreground text-pretty mt-1">
                Transform India into a global leader in sustainable ocean management, achieving a balance between
                economic growth, environmental protection, and social equity through science-based policies and
                innovative governance frameworks.
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">8 Goals On Track</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">4 Goals Need Attention</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
