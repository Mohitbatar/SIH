"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical, Dna, Upload, Download, BarChart3, FileText } from "lucide-react"

const sequencingProjects = [
  {
    id: "SEQ001",
    name: "Coral Reef eDNA Survey",
    samples: 45,
    sequences: 1247,
    species: 89,
    status: "completed",
    date: "2024-01-10",
  },
  {
    id: "SEQ002",
    name: "Deep Sea Biodiversity",
    samples: 23,
    sequences: 567,
    species: 34,
    status: "processing",
    date: "2024-01-08",
  },
  {
    id: "SEQ003",
    name: "Mangrove Ecosystem Study",
    samples: 67,
    sequences: 0,
    species: 0,
    status: "pending",
    date: "2024-01-05",
  },
]

const recentResults = [
  {
    sampleId: "DNA001",
    species: "Acropora cervicornis",
    confidence: 98.5,
    database: "NCBI GenBank",
    date: "2024-01-15",
  },
  {
    sampleId: "DNA002",
    species: "Epinephelus striatus",
    confidence: 95.2,
    database: "BOLD Systems",
    date: "2024-01-14",
  },
  {
    sampleId: "DNA003",
    species: "Thalassoma bifasciatum",
    confidence: 92.8,
    database: "NCBI GenBank",
    date: "2024-01-13",
  },
]

export function MolecularAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Molecular Biology & eDNA</h2>
          <p className="text-muted-foreground">Genetic sequencing, species detection, and biodiversity assessment</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Sequences
          </Button>
          <Button>
            <FlaskConical className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Sequencing Projects</TabsTrigger>
          <TabsTrigger value="analysis">Sequence Analysis</TabsTrigger>
          <TabsTrigger value="database">Species Database</TabsTrigger>
          <TabsTrigger value="phylogeny">Phylogenetic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold">Active Projects</h3>
              <div className="space-y-4">
                {sequencingProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-balance">{project.name}</CardTitle>
                        <Badge
                          variant={
                            project.status === "completed"
                              ? "default"
                              : project.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>Project ID: {project.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Samples</p>
                          <p className="text-xl font-bold">{project.samples}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sequences</p>
                          <p className="text-xl font-bold">{project.sequences}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Species</p>
                          <p className="text-xl font-bold">{project.species}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Started: {project.date}</p>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Results
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recent Results</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Species Identifications</CardTitle>
                  <CardDescription>Latest eDNA sequencing matches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{result.sampleId}</Badge>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {result.confidence}%
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-balance">{result.species}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                        <span>{result.database}</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Dna className="h-4 w-4 mr-2" />
                    BLAST Search
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Quality Control
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export FASTA
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Dna className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sequence Analysis Pipeline</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced bioinformatics tools for sequence processing and analysis
                </p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Molecular Database</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive genetic sequence database with taxonomic annotations
                </p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phylogeny">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phylogenetic Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Evolutionary relationship analysis and phylogenetic tree construction
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
