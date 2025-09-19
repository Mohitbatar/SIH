"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import {
  FlaskConical,
  Dna,
  Microscope,
  BarChart3,
  Upload,
  Download,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

const molecularStats = [
  {
    category: "eDNA Samples",
    count: "1,247",
    change: "+89",
    icon: FlaskConical,
    color: "text-purple-600",
  },
  {
    category: "Sequences Analyzed",
    count: "3,892",
    change: "+156",
    icon: Dna,
    color: "text-blue-600",
  },
  {
    category: "Species Identified",
    count: "634",
    change: "+23",
    icon: Microscope,
    color: "text-green-600",
  },
  {
    category: "Active Projects",
    count: "28",
    change: "+4",
    icon: BarChart3,
    color: "text-orange-600",
  },
]

const sequencingRuns = [
  {
    id: "SEQ-2024-001",
    project: "Coral Reef Biodiversity Assessment",
    samples: 48,
    status: "Completed",
    progress: 100,
    date: "2024-01-15",
    platform: "Illumina MiSeq",
    reads: "2.4M",
  },
  {
    id: "SEQ-2024-002",
    project: "Mangrove eDNA Survey",
    samples: 36,
    status: "Processing",
    progress: 75,
    date: "2024-01-14",
    platform: "Oxford Nanopore",
    reads: "1.8M",
  },
  {
    id: "SEQ-2024-003",
    project: "Deep Sea Metabarcoding",
    samples: 24,
    status: "Queued",
    progress: 0,
    date: "2024-01-13",
    platform: "Illumina NovaSeq",
    reads: "Pending",
  },
]

const biodiversityMetrics = [
  {
    metric: "Shannon Diversity Index",
    value: "3.47",
    site: "Coral Reef Site A",
    samples: 24,
    confidence: "95%",
  },
  {
    metric: "Species Richness",
    value: "156",
    site: "Mangrove Ecosystem",
    samples: 18,
    confidence: "98%",
  },
  {
    metric: "Simpson's Index",
    value: "0.89",
    site: "Seagrass Meadow",
    samples: 32,
    confidence: "92%",
  },
  {
    metric: "Evenness Index",
    value: "0.73",
    site: "Rocky Intertidal",
    samples: 28,
    confidence: "96%",
  },
]

export function MolecularContent() {
  const { authState } = useAuth()
  const user = authState.user

  if (!user) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Queued":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <FlaskConical className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-balance">Molecular Biology</h1>
        </div>
        <p className="text-muted-foreground text-pretty">
          eDNA analysis, genetic sequencing, and biodiversity assessment
        </p>
      </div>

      {/* Molecular Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {molecularStats.map((stat) => {
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
      <Tabs defaultValue="sequencing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sequencing">Sequencing</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="sequencing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sequencing Runs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Sequencing Runs</h2>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Samples
                </Button>
              </div>
              <div className="space-y-4">
                {sequencingRuns.map((run) => (
                  <Card key={run.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{run.project}</CardTitle>
                          <CardDescription className="mt-1">
                            {run.samples} samples • {run.platform} • {run.reads} reads
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(run.status)}
                          <Badge
                            variant={
                              run.status === "Completed"
                                ? "default"
                                : run.status === "Processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {run.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{run.progress}%</span>
                        </div>
                        <Progress value={run.progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{run.date}</p>
                          <div className="flex space-x-2">
                            {run.status === "Processing" && (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </Button>
                            )}
                            {run.status === "Queued" && (
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </Button>
                            )}
                            {run.status === "Completed" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sequencing Tools */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Sequencing Tools</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Management</CardTitle>
                  <CardDescription>Manage eDNA samples and metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Samples
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Sample Tracker
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Quality Control
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Status</CardTitle>
                  <CardDescription>Sequencing platform availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Illumina MiSeq</span>
                    <Badge variant="default">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Oxford Nanopore</span>
                    <Badge variant="secondary">In Use</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Illumina NovaSeq</span>
                    <Badge variant="outline">Maintenance</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bioinformatics Pipeline</CardTitle>
              <CardDescription>Automated sequence analysis and species identification</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bioinformatics analysis tools and pipeline management will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biodiversity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Biodiversity Metrics</CardTitle>
                <CardDescription>Ecological diversity indices from molecular data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {biodiversityMetrics.map((metric) => (
                    <div key={metric.metric} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">
                          {metric.site} • n = {metric.samples}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.confidence} CI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diversity Analysis</CardTitle>
                <CardDescription>Advanced biodiversity assessment tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Dna className="h-4 w-4 mr-2" />
                  Calculate Indices
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Comparative Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Protocols</CardTitle>
              <CardDescription>Standardized protocols for eDNA extraction and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Laboratory protocols and standard operating procedures will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
