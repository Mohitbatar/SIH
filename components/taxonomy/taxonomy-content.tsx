"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { toast } from "sonner"
import {
  Fish,
  Search,
  Plus,
  Eye,
  Download,
  Upload,
  BarChart3,
  Microscope,
  BookOpen,
  Camera,
  Database,
  Brain,
  Zap,
  CheckCircle,
  X,
  AlertCircle,
  Star,
} from "lucide-react"

const taxonomyStats = [
  {
    category: "Fish Species",
    count: "2,847",
    change: "+45",
    icon: Fish,
    color: "text-blue-600",
  },
  {
    category: "Crustaceans",
    count: "892",
    change: "+12",
    icon: Search,
    color: "text-orange-600",
  },
  {
    category: "Mollusks",
    count: "634",
    change: "+8",
    icon: BookOpen,
    color: "text-purple-600",
  },
  {
    category: "Marine Plants",
    count: "419",
    change: "+23",
    icon: Database,
    color: "text-green-600",
  },
]

const recentClassifications = [
  {
    id: "TC-2024-001",
    species: "Lutjanus argentimaculatus",
    commonName: "Mangrove Red Snapper",
    status: "Verified",
    date: "2024-01-15",
    location: "Andaman Sea",
    confidence: 98,
  },
  {
    id: "TC-2024-002",
    species: "Epinephelus malabaricus",
    commonName: "Malabar Grouper",
    status: "Under Review",
    date: "2024-01-14",
    location: "Arabian Sea",
    confidence: 87,
  },
  {
    id: "TC-2024-003",
    species: "Scomberomorus commerson",
    commonName: "Narrow-barred Spanish Mackerel",
    status: "Verified",
    date: "2024-01-13",
    location: "Bay of Bengal",
    confidence: 95,
  },
]

const morphometricData = [
  {
    parameter: "Standard Length",
    range: "15.2 - 45.8 cm",
    mean: "28.5 cm",
    samples: 247,
  },
  {
    parameter: "Body Depth",
    range: "4.1 - 12.3 cm",
    mean: "7.8 cm",
    samples: 247,
  },
  {
    parameter: "Head Length",
    range: "3.8 - 11.2 cm",
    mean: "6.9 cm",
    samples: 247,
  },
  {
    parameter: "Eye Diameter",
    range: "0.8 - 2.4 cm",
    mean: "1.5 cm",
    samples: 247,
  },
]

export function TaxonomyContent() {
  const { authState } = useAuth()
  const user = authState.user
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [classificationDialogOpen, setClassificationDialogOpen] = useState(false)
  const [batchUploadDialogOpen, setBatchUploadDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isClassifying, setIsClassifying] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [classificationResults, setClassificationResults] = useState<any[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [newClassificationData, setNewClassificationData] = useState({
    species: "",
    commonName: "",
    family: "",
    location: "",
    habitat: "",
    notes: "",
    confidence: 0,
    verificationStatus: "pending",
  })

  if (!user) return null

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length !== files.length) {
      toast.error(`${files.length - imageFiles.length} files were rejected. Only image files are supported.`)
    }

    setSelectedFiles((prev) => [...prev, ...imageFiles])
  }

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to upload images")
      return
    }
    setUploadDialogOpen(true)
  }

  const handleAIClassification = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image")
      return
    }

    setIsClassifying(true)
    setUploadProgress(0)

    try {
      const results = []

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]

        // Simulate AI processing
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(Math.round((i * 100 + progress) / selectedFiles.length))
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        // Generate mock AI classification results
        const mockResults = [
          {
            species: "Lutjanus argentimaculatus",
            commonName: "Mangrove Red Snapper",
            family: "Lutjanidae",
            confidence: 94.5,
            alternativeMatches: [
              { species: "Lutjanus johnii", confidence: 78.2 },
              { species: "Lutjanus fulviflamma", confidence: 65.8 },
            ],
          },
          {
            species: "Epinephelus malabaricus",
            commonName: "Malabar Grouper",
            family: "Serranidae",
            confidence: 89.3,
            alternativeMatches: [
              { species: "Epinephelus coioides", confidence: 72.1 },
              { species: "Epinephelus bleekeri", confidence: 68.4 },
            ],
          },
          {
            species: "Scomberomorus commerson",
            commonName: "Narrow-barred Spanish Mackerel",
            family: "Scombridae",
            confidence: 96.7,
            alternativeMatches: [
              { species: "Scomberomorus guttatus", confidence: 81.3 },
              { species: "Scomberomorus lineolatus", confidence: 74.9 },
            ],
          },
        ]

        const result = mockResults[Math.floor(Math.random() * mockResults.length)]
        results.push({
          fileName: file.name,
          fileSize: file.size,
          ...result,
          processingTime: Math.random() * 3 + 1, // 1-4 seconds
          imageUrl: URL.createObjectURL(file),
        })
      }

      setClassificationResults(results)
      toast.success(`Successfully classified ${selectedFiles.length} image(s)`)
    } catch (error) {
      toast.error("Classification failed. Please try again.")
    } finally {
      setIsClassifying(false)
      setUploadProgress(0)
    }
  }

  const handleSaveClassification = async (result: any, index: number) => {
    try {
      // Simulate saving to database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newClassification = {
        id: `TC-${Date.now()}-${index}`,
        species: result.species,
        commonName: result.commonName,
        status: "Under Review",
        date: new Date().toISOString().split("T")[0],
        location: "Unknown", // Would be filled from metadata or user input
        confidence: Math.round(result.confidence),
        image: result.imageUrl,
        verifiedBy: user.name,
      }

      toast.success(`Classification saved: ${result.species}`)

      // Update the result to show it's been saved
      setClassificationResults((prev) => prev.map((r, i) => (i === index ? { ...r, saved: true } : r)))
    } catch (error) {
      toast.error("Failed to save classification")
    }
  }

  const handleCreateNewClassification = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to create classifications")
      return
    }
    setClassificationDialogOpen(true)
  }

  const handleSubmitNewClassification = async () => {
    if (!newClassificationData.species || !newClassificationData.commonName) {
      toast.error("Please fill in required fields")
      return
    }

    try {
      // Simulate saving new classification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success(`New classification created: ${newClassificationData.species}`)
      setClassificationDialogOpen(false)
      setNewClassificationData({
        species: "",
        commonName: "",
        family: "",
        location: "",
        habitat: "",
        notes: "",
        confidence: 0,
        verificationStatus: "pending",
      })
    } catch (error) {
      toast.error("Failed to create classification")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <Fish className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-balance">Taxonomy & Morphology</h1>
        </div>
        <p className="text-muted-foreground text-pretty">
          Species identification, classification, and morphometric analysis
        </p>
      </div>

      {/* Species Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxonomyStats.map((stat) => {
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
      <Tabs defaultValue="classification" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classification">Classification</TabsTrigger>
          <TabsTrigger value="morphometry">Morphometry</TabsTrigger>
          <TabsTrigger value="otoliths">Otoliths</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="classification" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Classifications */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Classifications</h2>
                <Button size="sm" onClick={handleCreateNewClassification}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Classification
                </Button>
              </div>
              <div className="space-y-4">
                {recentClassifications.map((classification) => (
                  <Card key={classification.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-italic">{classification.species}</CardTitle>
                          <CardDescription className="mt-1">
                            {classification.commonName} • {classification.location}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge variant={classification.status === "Verified" ? "default" : "secondary"}>
                            {classification.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{classification.confidence}% confidence</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{classification.date}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Images
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Classification Tools */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Classification Tools</h2>

              {/* AI Species Identification */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    AI Species Identification
                  </CardTitle>
                  <CardDescription>Upload images for automated species identification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleImageUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setBatchUploadDialogOpen(true)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Batch Processing
                  </Button>
                  <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                    <p className="font-medium mb-1">Supported formats:</p>
                    <p>JPEG, PNG, TIFF (max 10MB each)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Management</CardTitle>
                  <CardDescription>Manage taxonomic records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Search Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Field Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Browse Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="morphometry" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Morphometric Measurements</CardTitle>
                <CardDescription>Current dataset: Lutjanus argentimaculatus (247 specimens)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {morphometricData.map((measurement) => (
                    <div
                      key={measurement.parameter}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{measurement.parameter}</p>
                        <p className="text-sm text-muted-foreground">Range: {measurement.range}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{measurement.mean}</p>
                        <p className="text-xs text-muted-foreground">n = {measurement.samples}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Tools</CardTitle>
                <CardDescription>Morphometric analysis and visualization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Microscope className="h-4 w-4 mr-2" />
                  New Measurement
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Statistical Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="otoliths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Otolith Analysis</CardTitle>
              <CardDescription>Age determination and growth analysis through otolith examination</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Otolith analysis tools and age determination features will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxonomic Database</CardTitle>
              <CardDescription>Comprehensive species database and taxonomic hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Database browser and taxonomic hierarchy tools will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Image Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Species Identification</DialogTitle>
            <DialogDescription>Upload images for automated species classification</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* File Upload Area */}
            <div className="space-y-2">
              <Label>Select Images</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelection}
                  className="hidden"
                  id="image-upload"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("image-upload")?.click()}>
                  Choose Images
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Supported: JPEG, PNG, TIFF (max 10MB each)</p>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Images ({selectedFiles.length}):</p>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Camera className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-6 w-6 p-0 hover:bg-destructive/10"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Processing Progress */}
            {isClassifying && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-purple-600" />
                    AI Processing Images...
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Classification Results */}
            {classificationResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Classification Results</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {classificationResults.map((result, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                            <img
                              src={result.imageUrl || "/placeholder.svg"}
                              alt={result.fileName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-lg italic">{result.species}</p>
                                <p className="text-sm text-muted-foreground">{result.commonName}</p>
                                <p className="text-xs text-muted-foreground">Family: {result.family}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="font-bold text-lg">{result.confidence.toFixed(1)}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {result.processingTime.toFixed(1)}s processing
                                </p>
                              </div>
                            </div>

                            {/* Alternative Matches */}
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Alternative matches:</p>
                              {result.alternativeMatches.map((alt: any, altIndex: number) => (
                                <div key={altIndex} className="flex justify-between text-xs">
                                  <span className="italic">{alt.species}</span>
                                  <span>{alt.confidence.toFixed(1)}%</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                              {result.saved ? (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Saved
                                </Badge>
                              ) : (
                                <>
                                  <Button size="sm" onClick={() => handleSaveClassification(result, index)}>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Save
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Review
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)} disabled={isClassifying}>
                Cancel
              </Button>
              <Button onClick={handleAIClassification} disabled={selectedFiles.length === 0 || isClassifying}>
                {isClassifying ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Classify Images
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Classification Dialog */}
      <Dialog open={classificationDialogOpen} onOpenChange={setClassificationDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Classification</DialogTitle>
            <DialogDescription>Manually add a new species classification</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="species-name">Scientific Name *</Label>
                <Input
                  id="species-name"
                  value={newClassificationData.species}
                  onChange={(e) => setNewClassificationData((prev) => ({ ...prev, species: e.target.value }))}
                  placeholder="e.g., Lutjanus argentimaculatus"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="common-name">Common Name *</Label>
                <Input
                  id="common-name"
                  value={newClassificationData.commonName}
                  onChange={(e) => setNewClassificationData((prev) => ({ ...prev, commonName: e.target.value }))}
                  placeholder="e.g., Mangrove Red Snapper"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="family">Family</Label>
                <Input
                  id="family"
                  value={newClassificationData.family}
                  onChange={(e) => setNewClassificationData((prev) => ({ ...prev, family: e.target.value }))}
                  placeholder="e.g., Lutjanidae"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newClassificationData.location}
                  onChange={(e) => setNewClassificationData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Arabian Sea"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="habitat">Habitat</Label>
              <Input
                id="habitat"
                value={newClassificationData.habitat}
                onChange={(e) => setNewClassificationData((prev) => ({ ...prev, habitat: e.target.value }))}
                placeholder="e.g., Coastal waters, mangroves"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newClassificationData.notes}
                onChange={(e) => setNewClassificationData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional observations and notes..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setClassificationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitNewClassification}>
                <Plus className="h-4 w-4 mr-2" />
                Create Classification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
