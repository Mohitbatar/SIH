"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { toast } from "sonner"
import { Upload, Plus, FileText, X, CheckCircle, Camera, Video, FileSpreadsheet } from "lucide-react"

interface SurveyUploadSystemProps {
  module: "oceanography" | "taxonomy" | "molecular" | "ecological"
  onSurveyCreated?: (survey: any) => void
  onDataUploaded?: (data: any) => void
}

interface SurveyData {
  title: string
  location: string
  description: string
  startDate: string
  endDate: string
  parameters: string[]
  methodology: string
  objectives: string
  equipment: string[]
  teamMembers: string
  budget: string
  expectedDuration: string
}

interface UploadData {
  surveyId: string
  files: File[]
  dataType: string
  processingLevel: string
  qualityFlags: string[]
  metadata: {
    collectionDate: string
    collectionTime: string
    weather: string
    instruments: string[]
    notes: string
  }
}

const moduleParameters = {
  oceanography: [
    "Temperature",
    "Salinity",
    "Currents",
    "Density",
    "Nutrients",
    "Chlorophyll",
    "Oxygen",
    "pH",
    "Turbidity",
    "Wave Height",
    "Pressure",
  ],
  taxonomy: [
    "Species Identification",
    "Morphometric Analysis",
    "Population Count",
    "Habitat Assessment",
    "Behavioral Observations",
    "Size Distribution",
  ],
  molecular: [
    "eDNA Sampling",
    "Genetic Sequencing",
    "Protein Analysis",
    "Metabolomics",
    "Microbiome Analysis",
    "Biomarker Detection",
  ],
  ecological: [
    "Biodiversity Assessment",
    "Ecosystem Health",
    "Food Web Analysis",
    "Habitat Mapping",
    "Conservation Status",
    "Environmental Impact",
  ],
}

const equipmentOptions = {
  oceanography: ["CTD Profiler", "ADCP", "Water Sampler", "pH Meter", "Turbidity Meter", "Wave Buoy"],
  taxonomy: ["Microscope", "Camera", "Measuring Tools", "Collection Nets", "Preservation Kit"],
  molecular: ["DNA Sequencer", "PCR Machine", "Centrifuge", "Spectrophotometer", "Sample Storage"],
  ecological: ["GPS", "Underwater Camera", "Quadrat Frames", "Data Logger", "Field Notebook"],
}

export function SurveyUploadSystem({ module, onSurveyCreated, onDataUploaded }: SurveyUploadSystemProps) {
  const { authState } = useAuth()
  const user = authState.user

  // Survey Creation State
  const [surveyDialogOpen, setSurveyDialogOpen] = useState(false)
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    parameters: [],
    methodology: "",
    objectives: "",
    equipment: [],
    teamMembers: "",
    budget: "",
    expectedDuration: "",
  })

  // Data Upload State
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadData, setUploadData] = useState<UploadData>({
    surveyId: "",
    files: [],
    dataType: "",
    processingLevel: "raw",
    qualityFlags: [],
    metadata: {
      collectionDate: "",
      collectionTime: "",
      weather: "",
      instruments: [],
      notes: "",
    },
  })

  // Bulk Upload State
  const [bulkUploadDialogOpen, setBulkUploadDialogOpen] = useState(false)
  const [bulkFiles, setBulkFiles] = useState<File[]>([])

  if (!user) return null

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent, isBulk = false) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter((file) => validateFile(file))

    if (validFiles.length !== files.length) {
      toast.error(`${files.length - validFiles.length} files were rejected due to invalid format or size`)
    }

    if (isBulk) {
      setBulkFiles((prev) => [...prev, ...validFiles])
    } else {
      setUploadData((prev) => ({ ...prev, files: [...prev.files, ...validFiles] }))
    }
  }

  const validateFile = (file: File): boolean => {
    const maxSize = 500 * 1024 * 1024 // 500MB for survey data
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/json",
      "text/plain",
      "application/x-netcdf",
      "application/x-matlab-data",
      "application/zip",
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/avi",
    ]

    const allowedExtensions = [
      ".csv",
      ".xlsx",
      ".json",
      ".txt",
      ".nc",
      ".mat",
      ".zip",
      ".jpg",
      ".jpeg",
      ".png",
      ".mp4",
      ".avi",
    ]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))

    if (file.size > maxSize) {
      toast.error(`File ${file.name} is too large. Maximum size is 500MB.`)
      return false
    }

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(`File ${file.name} has unsupported format. Allowed: ${allowedExtensions.join(", ")}`)
      return false
    }

    return true
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."))
    switch (extension) {
      case ".csv":
      case ".xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />
      case ".jpg":
      case ".jpeg":
      case ".png":
        return <Camera className="h-4 w-4 text-blue-600" />
      case ".mp4":
      case ".avi":
        return <Video className="h-4 w-4 text-purple-600" />
      case ".json":
        return <FileText className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const handleCreateSurvey = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to create surveys")
      return
    }
    setSurveyDialogOpen(true)
  }

  const handleSurveySubmit = async () => {
    if (!surveyData.title || !surveyData.location || !surveyData.startDate) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsCreatingSurvey(true)
    try {
      // Simulate survey creation process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newSurvey = {
        id: `${module.toUpperCase()}-${Date.now()}`,
        ...surveyData,
        module,
        status: "planned",
        createdBy: user.name,
        createdAt: new Date().toISOString(),
      }

      toast.success(`Survey "${surveyData.title}" created successfully`)
      onSurveyCreated?.(newSurvey)

      // Reset form
      setSurveyDialogOpen(false)
      setSurveyData({
        title: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        parameters: [],
        methodology: "",
        objectives: "",
        equipment: [],
        teamMembers: "",
        budget: "",
        expectedDuration: "",
      })
    } catch (error) {
      toast.error("Failed to create survey")
    } finally {
      setIsCreatingSurvey(false)
    }
  }

  const handleUploadData = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to upload data")
      return
    }
    setUploadDialogOpen(true)
  }

  const handleDataUpload = async () => {
    if (uploadData.files.length === 0) {
      toast.error("Please select at least one file to upload")
      return
    }

    if (!uploadData.dataType || !uploadData.metadata.collectionDate) {
      toast.error("Please fill in required fields")
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

      const uploadResult = {
        id: `UPLOAD-${Date.now()}`,
        ...uploadData,
        module,
        uploadedBy: user.name,
        uploadedAt: new Date().toISOString(),
        status: "processing",
      }

      const fileNames = uploadData.files.map((f) => f.name).join(", ")
      const totalSize = uploadData.files.reduce((sum, file) => sum + file.size, 0)

      toast.success(`Successfully uploaded ${uploadData.files.length} file(s) for ${module} module`)
      toast.info(`Files: ${fileNames} (${(totalSize / 1024 / 1024).toFixed(2)} MB)`)

      onDataUploaded?.(uploadResult)

      // Reset form
      setUploadDialogOpen(false)
      setUploadData({
        surveyId: "",
        files: [],
        dataType: "",
        processingLevel: "raw",
        qualityFlags: [],
        metadata: {
          collectionDate: "",
          collectionTime: "",
          weather: "",
          instruments: [],
          notes: "",
        },
      })
    } catch (error) {
      toast.error("Failed to upload data")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      toast.error("Please select files for bulk upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate bulk upload
      for (let i = 0; i <= 100; i += 5) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      const totalSize = bulkFiles.reduce((sum, file) => sum + file.size, 0)
      toast.success(`Bulk uploaded ${bulkFiles.length} files to ${module} module`)
      toast.info(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

      setBulkUploadDialogOpen(false)
      setBulkFiles([])
    } catch (error) {
      toast.error("Failed to bulk upload files")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleParameterToggle = (parameter: string) => {
    setSurveyData((prev) => ({
      ...prev,
      parameters: prev.parameters.includes(parameter)
        ? prev.parameters.filter((p) => p !== parameter)
        : [...prev.parameters, parameter],
    }))
  }

  const handleEquipmentToggle = (equipment: string) => {
    setSurveyData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter((e) => e !== equipment)
        : [...prev.equipment, equipment],
    }))
  }

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>, isBulk = false) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => validateFile(file))

    if (isBulk) {
      setBulkFiles((prev) => [...prev, ...validFiles])
    } else {
      setUploadData((prev) => ({ ...prev, files: [...prev.files, ...validFiles] }))
    }
  }

  const removeFile = (index: number, isBulk = false) => {
    if (isBulk) {
      setBulkFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setUploadData((prev) => ({
        ...prev,
        files: prev.files.filter((_, i) => i !== index),
      }))
    }
  }

  const availableParameters = moduleParameters[module] || []
  const availableEquipment = equipmentOptions[module] || []

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button onClick={handleCreateSurvey}>
          <Plus className="h-4 w-4 mr-2" />
          Create Survey
        </Button>
        <Button variant="outline" onClick={handleUploadData}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Data
        </Button>
        <Button variant="outline" onClick={() => setBulkUploadDialogOpen(true)}>
          <FileText className="h-4 w-4 mr-2" />
          Bulk Upload
        </Button>
      </div>

      {/* Survey Creation Dialog */}
      <Dialog open={surveyDialogOpen} onOpenChange={setSurveyDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New {module.charAt(0).toUpperCase() + module.slice(1)} Survey</DialogTitle>
            <DialogDescription>Plan a comprehensive survey for {module} data collection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="survey-title">Survey Title *</Label>
                <Input
                  id="survey-title"
                  value={surveyData.title}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={`e.g., ${module} Survey 2024`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="survey-location">Location *</Label>
                <Input
                  id="survey-location"
                  value={surveyData.location}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Arabian Sea, Coordinates"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={surveyData.startDate}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={surveyData.endDate}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Parameters to Measure</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableParameters.map((param) => (
                  <Button
                    key={param}
                    variant={surveyData.parameters.includes(param) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleParameterToggle(param)}
                    className="justify-start text-xs"
                  >
                    {param}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Equipment Required</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableEquipment.map((equipment) => (
                  <Button
                    key={equipment}
                    variant={surveyData.equipment.includes(equipment) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEquipmentToggle(equipment)}
                    className="justify-start text-xs"
                  >
                    {equipment}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="survey-objectives">Objectives</Label>
              <Textarea
                id="survey-objectives"
                value={surveyData.objectives}
                onChange={(e) => setSurveyData((prev) => ({ ...prev, objectives: e.target.value }))}
                placeholder="Survey objectives and goals..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="survey-methodology">Methodology</Label>
              <Textarea
                id="survey-methodology"
                value={surveyData.methodology}
                onChange={(e) => setSurveyData((prev) => ({ ...prev, methodology: e.target.value }))}
                placeholder="Data collection methodology and procedures..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team-members">Team Members</Label>
                <Input
                  id="team-members"
                  value={surveyData.teamMembers}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, teamMembers: e.target.value }))}
                  placeholder="Team member names"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-duration">Expected Duration</Label>
                <Input
                  id="expected-duration"
                  value={surveyData.expectedDuration}
                  onChange={(e) => setSurveyData((prev) => ({ ...prev, expectedDuration: e.target.value }))}
                  placeholder="e.g., 2 weeks"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSurveyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSurveySubmit} disabled={isCreatingSurvey}>
                {isCreatingSurvey ? (
                  <>
                    <Plus className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Survey
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Data Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload {module.charAt(0).toUpperCase() + module.slice(1)} Data</DialogTitle>
            <DialogDescription>Upload survey data and measurements</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-type">Data Type *</Label>
              <Select
                value={uploadData.dataType}
                onValueChange={(value) => setUploadData((prev) => ({ ...prev, dataType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw">Raw Data</SelectItem>
                  <SelectItem value="processed">Processed Data</SelectItem>
                  <SelectItem value="analysis">Analysis Results</SelectItem>
                  <SelectItem value="images">Images/Photos</SelectItem>
                  <SelectItem value="video">Video Data</SelectItem>
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
                onDrop={(e) => handleDrop(e, false)}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your files here, or click to browse</p>
                <Input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.json,.txt,.nc,.mat,.zip,.jpg,.jpeg,.png,.mp4,.avi"
                  onChange={(e) => handleFileSelection(e)}
                  className="hidden"
                  id="upload-files"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("upload-files")?.click()}>
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: CSV, Excel, JSON, Images, Videos, NetCDF, MATLAB (max 500MB each)
                </p>
              </div>

              {uploadData.files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files ({uploadData.files.length}):</p>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {uploadData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.name)}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collection-date">Collection Date *</Label>
                <Input
                  id="collection-date"
                  type="date"
                  value={uploadData.metadata.collectionDate}
                  onChange={(e) =>
                    setUploadData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, collectionDate: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-time">Collection Time</Label>
                <Input
                  id="collection-time"
                  type="time"
                  value={uploadData.metadata.collectionTime}
                  onChange={(e) =>
                    setUploadData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, collectionTime: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weather">Weather Conditions</Label>
              <Input
                id="weather"
                value={uploadData.metadata.weather}
                onChange={(e) =>
                  setUploadData((prev) => ({
                    ...prev,
                    metadata: { ...prev.metadata, weather: e.target.value },
                  }))
                }
                placeholder="e.g., Clear, 15°C, Light winds"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={uploadData.metadata.notes}
                onChange={(e) =>
                  setUploadData((prev) => ({
                    ...prev,
                    metadata: { ...prev.metadata, notes: e.target.value },
                  }))
                }
                placeholder="Any additional information about the data..."
                rows={2}
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
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleDataUpload} disabled={uploadData.files.length === 0 || isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={bulkUploadDialogOpen} onOpenChange={setBulkUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Bulk Upload Files</DialogTitle>
            <DialogDescription>Upload multiple files at once for {module} module</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Multiple Files</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, true)}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop multiple files here, or click to browse
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.json,.txt,.nc,.mat,.zip,.jpg,.jpeg,.png,.mp4,.avi"
                  onChange={(e) => handleFileSelection(e, true)}
                  className="hidden"
                  id="bulk-files"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("bulk-files")?.click()}>
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: CSV, Excel, JSON, Images, Videos, NetCDF, MATLAB (max 500MB each)
                </p>
              </div>

              {bulkFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files ({bulkFiles.length}):</p>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {bulkFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.name)}
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
                            onClick={() => removeFile(index, true)}
                            className="h-6 w-6 p-0 hover:bg-destructive/10"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total size: {(bulkFiles.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
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
              <Button onClick={handleBulkUpload} disabled={bulkFiles.length === 0 || isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading {bulkFiles.length} files...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {bulkFiles.length} Files
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
