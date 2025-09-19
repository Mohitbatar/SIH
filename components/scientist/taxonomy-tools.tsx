"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fish, Search, Upload, Eye, Microscope, Camera, Database } from "lucide-react"

const speciesDatabase = [
  {
    id: "SP001",
    scientificName: "Lutjanus argentimaculatus",
    commonName: "Mangrove Red Snapper",
    family: "Lutjanidae",
    habitat: "Coastal waters, mangroves",
    status: "verified",
    samples: 23,
    image: "/fish-species-1.jpg",
  },
  {
    id: "SP002",
    scientificName: "Epinephelus malabaricus",
    commonName: "Malabar Grouper",
    family: "Serranidae",
    habitat: "Rocky reefs, 20-200m depth",
    status: "pending",
    samples: 8,
    image: "/fish-species-2.jpg",
  },
  {
    id: "SP003",
    scientificName: "Scomberomorus commerson",
    commonName: "Narrow-barred Spanish Mackerel",
    family: "Scombridae",
    habitat: "Pelagic, coastal waters",
    status: "verified",
    samples: 45,
    image: "/fish-species-3.jpg",
  },
]

const otolithSamples = [
  {
    id: "OT001",
    species: "Lutjanus argentimaculatus",
    length: "12.5mm",
    width: "8.2mm",
    age: "3 years",
    location: "Arabian Sea",
    status: "analyzed",
  },
  {
    id: "OT002",
    species: "Epinephelus malabaricus",
    length: "18.7mm",
    width: "11.3mm",
    age: "5 years",
    location: "Bay of Bengal",
    status: "processing",
  },
]

export function TaxonomyTools() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)

  const filteredSpecies = speciesDatabase.filter(
    (species) =>
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.commonName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Taxonomy & Morphology</h2>
          <p className="text-muted-foreground">Species identification, classification, and otolith analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Sample
          </Button>
          <Button>
            <Fish className="h-4 w-4 mr-2" />
            New Species
          </Button>
        </div>
      </div>

      <Tabs defaultValue="species" className="space-y-4">
        <TabsList>
          <TabsTrigger value="species">Species Database</TabsTrigger>
          <TabsTrigger value="identification">AI Identification</TabsTrigger>
          <TabsTrigger value="otolith">Otolith Analysis</TabsTrigger>
          <TabsTrigger value="morphometry">Morphometry</TabsTrigger>
        </TabsList>

        <TabsContent value="species" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Species</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Filter by Family</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">All Families</option>
                      <option value="Lutjanidae">Lutjanidae</option>
                      <option value="Serranidae">Serranidae</option>
                      <option value="Scombridae">Scombridae</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">All Status</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending Review</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Species</span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Verified</span>
                    <span className="font-medium">298</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pending Review</span>
                    <span className="font-medium">44</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Families</span>
                    <span className="font-medium">67</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Species List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid gap-4">
                {filteredSpecies.map((species) => (
                  <Card key={species.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <Fish className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-balance">{species.scientificName}</h3>
                              <p className="text-sm text-muted-foreground">{species.commonName}</p>
                            </div>
                            <Badge variant={species.status === "verified" ? "default" : "secondary"}>
                              {species.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Family</p>
                              <p className="font-medium">{species.family}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Samples</p>
                              <p className="font-medium">{species.samples}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground text-pretty">{species.habitat}</p>
                          <div className="flex items-center space-x-2 pt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Database className="h-4 w-4 mr-1" />
                              Samples
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="identification">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Species Identification</h3>
                <p className="text-muted-foreground mb-4">
                  Upload images for automated species identification using machine learning
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otolith">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Otolith Samples</CardTitle>
                <CardDescription>Morphometric analysis and age determination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {otolithSamples.map((sample) => (
                  <div key={sample.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{sample.id}</Badge>
                      <Badge variant={sample.status === "analyzed" ? "default" : "secondary"}>{sample.status}</Badge>
                    </div>
                    <p className="text-sm font-medium text-balance">{sample.species}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                      <div>
                        <p className="text-muted-foreground">Length</p>
                        <p>{sample.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Width</p>
                        <p>{sample.width}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Age</p>
                        <p>{sample.age}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p>{sample.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Microscope className="h-4 w-4 mr-2" />
                  Shape Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  Image Processing
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Database className="h-4 w-4 mr-2" />
                  Age Determination
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Batch Upload
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="morphometry">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Microscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Morphometric Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced morphological measurements and statistical analysis
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
