"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { toast } from "sonner"
import {
  Database,
  HardDrive,
  Upload,
  Download,
  Search,
  Filter,
  RefreshCw,
  Shield,
  Archive,
  Trash2,
  BarChart3,
  FileText,
  CheckCircle,
  X,
} from "lucide-react"

const storageStats = [
  {
    category: "Total Storage",
    value: "2.4 TB",
    used: "1.8 TB",
    percentage: 75,
    icon: HardDrive,
    color: "text-blue-600",
  },
  {
    category: "Active Datasets",
    value: "1,247",
    change: "+89",
    icon: Database,
    color: "text-green-600",
  },
  {
    category: "Data Sources",
    value: "23",
    change: "+3",
    icon: Upload,
    color: "text-purple-600",
  },
  {
    category: "Backup Status",
    value: "98.5%",
    change: "Healthy",
    icon: Shield,
    color: "text-emerald-600",
  },
]

const recentDatasets = [
  {
    id: "DS-2024-001",
    name: "Arabian Sea Temperature Survey",
    type: "Oceanographic",
    size: "145 MB",
    records: "12,847",
    lastModified: "2024-01-15",
    status: "Active",
    quality: 98,
  },
  {
    id: "DS-2024-002",
    name: "Coral Reef Species Inventory",
    type: "Taxonomic",
    size: "89 MB",
    records: "3,456",
    lastModified: "2024-01-14",
    status: "Processing",
    quality: 94,
  },
  {
    id: "DS-2024-003",
    name: "eDNA Metabarcoding Results",
    type: "Molecular",
    size: "234 MB",
    records: "8,923",
    lastModified: "2024-01-13",
    status: "Active",
    quality: 96,
  },
  {
    id: "DS-2024-004",
    name: "Mangrove Ecosystem Survey",
    type: "Ecological",
    size: "67 MB",
    records: "2,134",
    lastModified: "2024-01-12",
    status: "Archived",
    quality: 92,
  },
]

const dataIntegration = [
  {
    source: "Field Instruments",
    datasets: 45,
    lastSync: "2 hours ago",
    status: "Connected",
    type: "Real-time",
  },
  {
    source: "Laboratory Systems",
    datasets: 23,
    lastSync: "30 minutes ago",
    status: "Connected",
    type: "Batch",
  },
  {
    source: "External Databases",
    datasets: 12,
    lastSync: "1 day ago",
    status: "Connected",
    type: "Scheduled",
  },
  {
    source: "Satellite Data",
    datasets: 8,
    lastSync: "6 hours ago",
    status: "Connected",
    type: "Automated",
  },
]

export function DataManagementContent() {
  const { authState } = useAuth()
  const user = authState.user
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [bulkUploadDialogOpen, setBulkUploadDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    isPublic: false,
    hasMetadata: false,
  })

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
    const validFiles = files.filter((file) => validateFile(file))

    if (validFiles.length !== files.length) {
      toast.error(`${files.length - validFiles.length} files were rejected due to invalid format or size`)
    }

    setSelectedFiles((prev) => [...prev, ...validFiles])
  }

  const validateFile = (file: File): boolean => {
    const maxSize = 100 * 1024 * 1024 // 100MB
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/json",
      "text/plain",
      "application/x-netcdf",
      "application/x-matlab-data",
      "application/zip",
    ]

    const allowedExtensions = [".csv", ".xlsx", ".json", ".txt", ".nc", ".mat", ".zip"]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))

    if (file.size > maxSize) {
      toast.error(`File ${file.name} is too large. Maximum size is 100MB.`)
      return false
    }

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(`File ${file.name} has unsupported format. Allowed: ${allowedExtensions.join(", ")}`)
      return false
    }

    return true
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Processing":
        return "secondary"
      case "Archived":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleUploadData = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to upload data")
      return
    }
    setUploadDialogOpen(true)
  }

  const handleBulkUpload = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to upload data")
      return
    }
    setBulkUploadDialogOpen(true)
  }

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to upload")
      return
    }

    if (!uploadData.title || !uploadData.category) {
      toast.error("Please fill in required fields (title and category)")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      const fileNames = selectedFiles.map((f) => f.name).join(", ")
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0)

      toast.success(`Successfully uploaded ${selectedFiles.length} file(s): ${fileNames}`)
      toast.info(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

      // Reset form
      setUploadDialogOpen(false)
      setBulkUploadDialogOpen(false)
      setSelectedFiles([])
      setUploadData({
        title: "",
        description: "",
        category: "",
        tags: "",
        isPublic: false,
        hasMetadata: false,
      })
    } catch (error) {
      toast.error("Failed to upload files")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>, multiple = false) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => validateFile(file))

    if (multiple) {
      setSelectedFiles((prev) => [...prev, ...validFiles])
    } else {
      setSelectedFiles(validFiles.slice(0, 1))
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const dataCategories = [
    "Oceanographic",
    "Taxonomic",
    "Molecular",
    "Ecological",
    "Geological",
    "Chemical",
    "Biological",
    "Environmental",
  ]

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."))
    switch (extension) {
      case ".csv":
        return "📊"
      case ".xlsx":
        return "📈"
      case ".json":
        return "🔧"
      case ".txt":
        return "📄"
      case ".nc":
        return "🌊"
      case ".mat":
        return "🧮"
      case ".zip":
        return "📦"
      default:
        return "📁"
    }
  }

  if (!user) return null

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-balance">Data Management</h1>
        </div>
        <p className="text-muted-foreground text-pretty">
          Integrated data storage, retrieval, and cross-domain analysis
        </p>
      </div>

      {/* Storage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {storageStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.category} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.category}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.percentage && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Used: {stat.used}</span>
                          <span>{stat.percentage}%</span>
                        </div>
                        <Progress value={stat.percentage} className="h-2" />
                      </div>
                    )}
                    {stat.change && <p className="text-xs text-green-600 mt-1">{stat.change}</p>}
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color} ml-4`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="datasets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dataset List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Datasets</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleBulkUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button size="sm" onClick={handleUploadData}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Data
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {recentDatasets.map((dataset) => (
                  <Card key={dataset.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{dataset.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {dataset.type} • {dataset.records} records • {dataset.size}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(dataset.status)}>{dataset.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Data Quality</span>
                          <span>{dataset.quality}%</span>
                        </div>
                        <Progress value={dataset.quality} className="h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Modified: {dataset.lastModified}</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Search className="h-4 w-4 mr-2" />
                              Explore
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Management Tools */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Management Tools</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Operations</CardTitle>
                  <CardDescription>Common data management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleUploadData}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Dataset
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleBulkUpload}>
                    <FileText className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Search Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Sources
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Lifecycle</CardTitle>
                  <CardDescription>Manage data retention and archival</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Old Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Backup Status
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cleanup Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Connected data sources and integration status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataIntegration.map((source) => (
                    <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {source.datasets} datasets • Last sync: {source.lastSync}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="mb-1">
                          {source.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{source.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Tools</CardTitle>
                <CardDescription>Manage data source connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All Sources
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Database className="h-4 w-4 mr-2" />
                  Add Data Source
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Integration Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Assessment</CardTitle>
              <CardDescription>Monitor and improve data quality across all datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Data quality monitoring and validation tools will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>Data backup status and disaster recovery management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Backup management and disaster recovery tools will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Single File Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Dataset</DialogTitle>
            <DialogDescription>Upload a new dataset to the marine data platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-title">Dataset Title *</Label>
              <Input
                id="dataset-title"
                value={uploadData.title}
                onChange={(e) => setUploadData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Arabian Sea Temperature Survey 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataset-category">Category *</Label>
              <Select
                value={uploadData.category}
                onValueChange={(value) => setUploadData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select data category" />
                </SelectTrigger>
                <SelectContent>
                  {dataCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select File *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                <Input
                  type="file"
                  accept=".csv,.xlsx,.json,.txt,.nc,.mat,.zip"
                  onChange={(e) => handleFileSelection(e)}
                  className="hidden"
                  id="file-input"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("file-input")?.click()}>
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: CSV, Excel, JSON, Text, NetCDF, MATLAB, ZIP (max 100MB)
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getFileIcon(file.name)}</span>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
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
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataset-description">Description</Label>
              <Textarea
                id="dataset-description"
                value={uploadData.description}
                onChange={(e) => setUploadData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Dataset description, methodology, and notes..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataset-tags">Tags</Label>
              <Input
                id="dataset-tags"
                value={uploadData.tags}
                onChange={(e) => setUploadData((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="temperature, salinity, survey (comma-separated)"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-public"
                checked={uploadData.isPublic}
                onCheckedChange={(checked) => setUploadData((prev) => ({ ...prev, isPublic: checked as boolean }))}
              />
              <Label htmlFor="is-public">Make dataset publicly accessible</Label>
            </div>
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload} disabled={selectedFiles.length === 0 || isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Dataset
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={bulkUploadDialogOpen} onOpenChange={setBulkUploadDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Datasets</DialogTitle>
            <DialogDescription>Upload multiple datasets at once to the marine data platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-dataset-title">Collection Title *</Label>
              <Input
                id="bulk-dataset-title"
                value={uploadData.title}
                onChange={(e) => setUploadData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Marine Survey Collection 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulk-dataset-category">Category *</Label>
              <Select
                value={uploadData.category}
                onValueChange={(value) => setUploadData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select data category" />
                </SelectTrigger>
                <SelectContent>
                  {dataCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Files *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop multiple files here, or click to browse
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.json,.txt,.nc,.mat,.zip"
                  onChange={(e) => handleFileSelection(e, true)}
                  className="hidden"
                  id="bulk-file-input"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("bulk-file-input")?.click()}>
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: CSV, Excel, JSON, Text, NetCDF, MATLAB, ZIP (max 100MB each)
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files ({selectedFiles.length}):</p>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getFileIcon(file.name)}</span>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
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
                  <p className="text-xs text-muted-foreground">
                    Total size: {(selectedFiles.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-description">Description</Label>
              <Textarea
                id="bulk-description"
                value={uploadData.description}
                onChange={(e) => setUploadData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Collection description and notes..."
                rows={3}
              />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setBulkUploadDialogOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload} disabled={selectedFiles.length === 0 || isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading {selectedFiles.length} files...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {selectedFiles.length} Files
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
