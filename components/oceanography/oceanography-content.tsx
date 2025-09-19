"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { toast } from "sonner"
import {
  Waves,
  Thermometer,
  Droplets,
  Wind,
  Compass,
  TrendingUp,
  Download,
  Upload,
  BarChart3,
  MapPin,
  Calendar,
  Activity,
  Plus,
  LineChart,
  Map,
  Calculator,
  Brain,
  Zap,
} from "lucide-react"

const oceanographicData = [
  {
    parameter: "Sea Surface Temperature",
    value: "28.5°C",
    change: "+0.3°C",
    trend: "up",
    location: "Arabian Sea",
    icon: Thermometer,
    color: "text-red-500",
  },
  {
    parameter: "Salinity",
    value: "35.2 PSU",
    change: "-0.1 PSU",
    trend: "down",
    location: "Bay of Bengal",
    icon: Droplets,
    color: "text-blue-500",
  },
  {
    parameter: "Current Speed",
    value: "0.45 m/s",
    change: "+0.05 m/s",
    trend: "up",
    location: "Indian Ocean",
    icon: Wind,
    color: "text-green-500",
  },
  {
    parameter: "Wave Height",
    value: "2.1 m",
    change: "-0.3 m",
    trend: "down",
    location: "Western Coast",
    icon: Waves,
    color: "text-cyan-500",
  },
]

const recentSurveys = [
  {
    id: "OS-2024-001",
    title: "Arabian Sea Monsoon Survey",
    date: "2024-01-15",
    status: "Completed",
    parameters: ["Temperature", "Salinity", "Currents"],
    dataPoints: 1247,
  },
  {
    id: "OS-2024-002",
    title: "Bay of Bengal Circulation Study",
    date: "2024-01-10",
    status: "Processing",
    parameters: ["Temperature", "Density", "Nutrients"],
    dataPoints: 892,
  },
  {
    id: "OS-2024-003",
    title: "Coastal Upwelling Analysis",
    date: "2024-01-08",
    status: "In Progress",
    parameters: ["Temperature", "Chlorophyll", "Oxygen"],
    dataPoints: 634,
  },
]

export function OceanographyContent() {
  const { authState } = useAuth()
  const user = authState.user
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [surveyDialogOpen, setSurveyDialogOpen] = useState(false)
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false)
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)
  const [analysisType, setAnalysisType] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [surveyData, setSurveyData] = useState({
    title: "",
    location: "",
    parameters: [] as string[],
    description: "",
    startDate: "",
    endDate: "",
  })

  if (!user) return null

  const handleUploadData = () => {
    if (!hasPermission(user.role, "canEditData")) {
      toast.error("You don't have permission to upload data")
      return
    }
    setUploadDialogOpen(true)
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload")
      return
    }

    setIsUploading(true)
    try {
      // Simulate file upload process with validation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success(`Successfully uploaded ${selectedFile.name} to oceanography database`)
      setUploadDialogOpen(false)
      setSelectedFile(null)
    } catch (error) {
      toast.error("Failed to upload oceanographic data")
    } finally {
      setIsUploading(false)
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
      toast.success(`Survey "${surveyData.title}" created successfully`)
      setSurveyDialogOpen(false)
      setSurveyData({
        title: "",
        location: "",
        parameters: [],
        description: "",
        startDate: "",
        endDate: "",
      })
    } catch (error) {
      toast.error("Failed to create survey")
    } finally {
      setIsCreatingSurvey(false)
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

  const availableParameters = [
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
  ]

  const handleRunAnalysis = async (type: string) => {
    setAnalysisType(type)
    setAnalysisDialogOpen(true)
    setIsRunningAnalysis(true)

    try {
      // Simulate analysis processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate mock analysis results based on type
      let results = {}
      switch (type) {
        case "statistical":
          results = {
            mean_temperature: 26.8,
            std_temperature: 2.4,
            mean_salinity: 35.1,
            std_salinity: 0.8,
            correlation_temp_sal: 0.73,
            data_points: 1247,
            confidence_interval: "95%",
          }
          break
        case "trend":
          results = {
            temperature_trend: "+0.15°C/year",
            salinity_trend: "-0.02 PSU/year",
            trend_significance: "p < 0.001",
            r_squared: 0.84,
            forecast_2025: "27.2°C ± 0.5°C",
          }
          break
        case "spatial":
          results = {
            hotspot_locations: ["15.5°N, 68.2°E", "13.1°N, 80.3°E"],
            spatial_autocorrelation: 0.67,
            cluster_analysis: "3 distinct regions identified",
            gradient_strength: "Strong north-south gradient",
          }
          break
      }

      setAnalysisResults(results)
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} analysis completed successfully`)
    } catch (error) {
      toast.error("Analysis failed. Please try again.")
    } finally {
      setIsRunningAnalysis(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <Waves className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-balance">Oceanography</h1>
        </div>
        <p className="text-muted-foreground text-pretty">
          Physical, chemical, and biological ocean data analysis and monitoring
        </p>
      </div>

      {/* Real-time Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {oceanographicData.map((param) => {
          const Icon = param.icon
          return (
            <Card key={param.parameter} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{param.parameter}</p>
                    <p className="text-2xl font-bold">{param.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp
                        className={`h-3 w-3 mr-1 ${param.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      />
                      <p className={`text-xs ${param.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {param.change}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {param.location}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${param.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="surveys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="surveys" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Surveys */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Surveys</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleCreateSurvey}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Survey
                  </Button>
                  <Button size="sm" onClick={handleUploadData}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Data
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {recentSurveys.map((survey) => (
                  <Card key={survey.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{survey.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {survey.date} • {survey.dataPoints} data points
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            survey.status === "Completed"
                              ? "default"
                              : survey.status === "Processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {survey.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {survey.parameters.map((param) => (
                          <Badge key={param} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Data
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Collection</CardTitle>
                  <CardDescription>Manage oceanographic data collection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleUploadData}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Survey Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={handleCreateSurvey}
                  >
                    <Compass className="h-4 w-4 mr-2" />
                    Plan New Survey
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Activity className="h-4 w-4 mr-2" />
                    Real-time Monitoring
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Tools</CardTitle>
                  <CardDescription>Advanced oceanographic analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistical Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trend Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    Spatial Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analysis Tools */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">Analysis Tools</h2>

              {/* Statistical Analysis */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                    Statistical Analysis
                  </CardTitle>
                  <CardDescription>
                    Descriptive statistics, correlations, and hypothesis testing for oceanographic data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">Available Tests</p>
                        <p className="text-blue-700">T-tests, ANOVA, Regression</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="font-medium text-green-900">Data Types</p>
                        <p className="text-green-700">Temperature, Salinity, pH, O₂</p>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleRunAnalysis("statistical")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Run Statistical Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trend Analysis */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Trend Analysis
                  </CardTitle>
                  <CardDescription>Long-term trends, seasonal patterns, and time series forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="font-medium text-green-900">Methods</p>
                        <p className="text-green-700">Linear, Polynomial, Seasonal</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="font-medium text-purple-900">Forecasting</p>
                        <p className="text-purple-700">ARIMA, Prophet, ML Models</p>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleRunAnalysis("trend")}>
                      <LineChart className="h-4 w-4 mr-2" />
                      Analyze Trends
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Spatial Analysis */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Map className="h-5 w-5 mr-2 text-purple-600" />
                    Spatial Analysis
                  </CardTitle>
                  <CardDescription>Geographic patterns, interpolation, and spatial correlations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="font-medium text-purple-900">Techniques</p>
                        <p className="text-purple-700">Kriging, IDW, Clustering</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="font-medium text-orange-900">Outputs</p>
                        <p className="text-orange-700">Heat maps, Contours, Zones</p>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleRunAnalysis("spatial")}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Run Spatial Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Modeling */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                    Predictive Modeling
                  </CardTitle>
                  <CardDescription>AI/ML models for ocean parameter prediction and ecosystem modeling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <p className="font-medium text-indigo-900">Models</p>
                        <p className="text-indigo-700">Neural Networks, Random Forest</p>
                      </div>
                      <div className="p-3 bg-cyan-50 rounded-lg">
                        <p className="font-medium text-cyan-900">Predictions</p>
                        <p className="text-cyan-700">Temperature, Currents, Events</p>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Train Predictive Model
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results Panel */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Analysis</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis History</CardTitle>
                  <CardDescription>Your recent analysis results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Statistical</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm font-medium">Temperature Correlation Analysis</p>
                      <p className="text-xs text-muted-foreground">Arabian Sea dataset (1,247 points)</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        View Results →
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Trend</Badge>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm font-medium">Seasonal Temperature Trends</p>
                      <p className="text-xs text-muted-foreground">Bay of Bengal (5-year data)</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        View Results →
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Spatial</Badge>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                      </div>
                      <p className="text-sm font-medium">Salinity Distribution Map</p>
                      <p className="text-xs text-muted-foreground">Indian Ocean region</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        View Results →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Analyses</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Data Points</span>
                      <span className="font-medium">15,432</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Models</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="font-medium text-green-600">94.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>Live oceanographic parameter monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Real-time monitoring dashboard will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oceanographic Reports</CardTitle>
              <CardDescription>Generate and manage oceanographic analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Report generation tools will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Results Dialog */}
      <Dialog open={analysisDialogOpen} onOpenChange={setAnalysisDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis Results</DialogTitle>
            <DialogDescription>Analysis completed for oceanographic dataset</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {isRunningAnalysis ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Running {analysisType} analysis...</p>
              </div>
            ) : analysisResults ? (
              <div className="space-y-3">
                {Object.entries(analysisResults).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm font-medium capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="text-sm font-mono">{String(value)}</span>
                  </div>
                ))}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                  <Button size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Charts
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Data Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Oceanographic Data</DialogTitle>
            <DialogDescription>Upload survey data, measurements, or analysis results</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ocean-file-upload">Select Data File</Label>
              <Input
                id="ocean-file-upload"
                type="file"
                accept=".csv,.xlsx,.json,.txt,.nc,.mat"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
              <p className="text-xs text-muted-foreground">Supported formats: CSV, Excel, JSON, Text, NetCDF, MATLAB</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload} disabled={!selectedFile || isUploading}>
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

      {/* Survey Creation Dialog */}
      <Dialog open={surveyDialogOpen} onOpenChange={setSurveyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Survey</DialogTitle>
            <DialogDescription>Plan a new oceanographic survey and data collection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="survey-title">Survey Title *</Label>
              <Input
                id="survey-title"
                value={surveyData.title}
                onChange={(e) => setSurveyData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Arabian Sea Temperature Survey"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="survey-location">Location *</Label>
              <Input
                id="survey-location"
                value={surveyData.location}
                onChange={(e) => setSurveyData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Arabian Sea, Bay of Bengal"
              />
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
              <div className="grid grid-cols-2 gap-2">
                {availableParameters.map((param) => (
                  <Button
                    key={param}
                    variant={surveyData.parameters.includes(param) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleParameterToggle(param)}
                    className="justify-start"
                  >
                    {param}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="survey-description">Description</Label>
              <Textarea
                id="survey-description"
                value={surveyData.description}
                onChange={(e) => setSurveyData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Survey objectives, methodology, and notes..."
                rows={3}
              />
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
    </div>
  )
}
