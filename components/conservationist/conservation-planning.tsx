"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Target, Calendar, Users, FileText, CheckCircle } from "lucide-react"

const conservationProjects = [
  {
    id: "CP001",
    name: "Coral Restoration Initiative",
    location: "Lakshadweep Islands",
    status: "active",
    progress: 65,
    budget: "₹2.5 Cr",
    timeline: "2023-2026",
    objectives: ["Restore 50 hectares", "Plant 10,000 coral fragments", "Train 25 local divers"],
  },
  {
    id: "CP002",
    name: "Mangrove Conservation Program",
    location: "Sundarbans",
    status: "planning",
    progress: 25,
    budget: "₹4.2 Cr",
    timeline: "2024-2027",
    objectives: ["Protect 200 hectares", "Community engagement", "Sustainable livelihood"],
  },
  {
    id: "CP003",
    name: "Marine Protected Area Expansion",
    location: "Gulf of Mannar",
    status: "completed",
    progress: 100,
    budget: "₹1.8 Cr",
    timeline: "2022-2024",
    objectives: ["Expand MPA by 150 km²", "Establish monitoring", "Stakeholder consultation"],
  },
]

export function ConservationPlanning() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Conservation Planning</h2>
          <p className="text-muted-foreground">
            Strategic planning and project management for conservation initiatives
          </p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Active Projects</h3>
          <div className="space-y-4">
            {conservationProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-balance">{project.name}</CardTitle>
                    <Badge
                      variant={
                        project.status === "active"
                          ? "default"
                          : project.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timeline</p>
                        <p className="font-medium">{project.timeline}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Objectives</p>
                      <div className="space-y-1">
                        {project.objectives.map((objective, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Target className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Timeline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Planning Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Planning Tools</h3>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Projects</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">In Planning</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="font-medium">₹12.8 Cr</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Target className="h-4 w-4 mr-2" />
                Site Assessment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Stakeholder Meeting
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Progress Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Coral Fragment Planting</p>
                <p className="text-muted-foreground">Due: Feb 15, 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Community Training</p>
                <p className="text-muted-foreground">Due: Mar 1, 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Quarterly Assessment</p>
                <p className="text-muted-foreground">Due: Mar 31, 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
