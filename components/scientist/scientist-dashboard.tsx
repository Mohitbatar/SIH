"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DataVisualization } from "@/components/shared/data-visualization"
import { TaxonomyTools } from "@/components/scientist/taxonomy-tools"
import { MolecularAnalysis } from "@/components/scientist/molecular-analysis"
import { OceanographyTools } from "@/components/scientist/oceanography-tools"
import {
  FlaskConical,
  Microscope,
  Database,
  Upload,
  Download,
  Search,
  Filter,
  BarChart3,
  FileText,
  Waves,
  Fish,
} from "lucide-react"

const researchProjects = [
  {
    id: "1",
    title: "Arabian Sea Biodiversity Assessment",
    status: "active",
    progress: 75,
    samples: 234,
    species: 89,
    lastUpdate: "2 days ago",
  },
  {
    id: "2",
    title: "Coral Reef Ecosystem Monitoring",
    status: "active",
    progress: 45,
    samples: 156,
    species: 67,
    lastUpdate: "1 week ago",
  },
  {
    id: "3",
    title: "Deep Sea Fish Taxonomy Study",
    status: "completed",
    progress: 100,
    samples: 89,
    species: 23,
    lastUpdate: "1 month ago",
  },
]

const recentSamples = [
  {
    id: "S001",
    location: "Arabian Sea - Station A12",
    depth: "150m",
    type: "Water Sample",
    date: "2024-01-15",
    status: "analyzed",
  },
  {
    id: "S002",
    location: "Bay of Bengal - Station B07",
    depth: "75m",
    type: "Sediment Core",
    date: "2024-01-14",
    status: "processing",
  },
  {
    id: "S003",
    location: "Lakshadweep - Coral Reef",
    depth: "25m",
    type: "Tissue Sample",
    date: "2024-01-13",
    status: "pending",
  },
]

export function ScientistDashboard() {
  const [selectedProject, setSelectedProject] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-balance">Research Dashboard</h1>
          <p className="text-muted-foreground">Advanced tools for marine biological research and analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FlaskConical className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Microscope className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Samples Analyzed</p>
                <p className="text-2xl font-bold">1,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Fish className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Species Identified</p>
                <p className="text-2xl font-bold">342</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Datasets</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="oceanography">Oceanography</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="molecular">Molecular</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Research Projects */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Research Projects</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {researchProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-balance">{project.title}</CardTitle>
                        <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Samples</p>
                            <p className="font-medium">{project.samples}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Species</p>
                            <p className="font-medium">{project.species}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Updated</p>
                            <p className="font-medium">{project.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Samples */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Samples</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Processing</CardTitle>
                  <CardDescription>Latest collected samples and their status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="flex items-start space-x-3 pb-3 border-b border-border last:border-0"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            sample.status === "analyzed"
                              ? "bg-green-500"
                              : sample.status === "processing"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{sample.id}</p>
                        <p className="text-xs text-muted-foreground text-pretty">{sample.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {sample.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {sample.depth}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{sample.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Waves className="h-4 w-4 mr-2" />
                    Ocean Data Analysis
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Fish className="h-4 w-4 mr-2" />
                    Species Identification
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Molecular Sequencing
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="oceanography">
          <OceanographyTools />
        </TabsContent>

        <TabsContent value="taxonomy">
          <TaxonomyTools />
        </TabsContent>

        <TabsContent value="molecular">
          <MolecularAnalysis />
        </TabsContent>

        <TabsContent value="analysis">
          <DataVisualization />
        </TabsContent>
      </Tabs>
    </div>
  )
}
