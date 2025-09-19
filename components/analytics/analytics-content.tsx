"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChartIcon,
  LineChartIcon,
  Activity,
  Target,
  Users,
  Download,
  RefreshCw,
  Map,
  Zap,
  Brain,
  Settings,
  Eye,
} from "lucide-react"

const analyticsStats = [
  {
    metric: "Data Collection Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: Activity,
    color: "text-green-600",
  },
  {
    metric: "Species Discovery",
    value: "156",
    change: "+23",
    trend: "up",
    icon: Target,
    color: "text-blue-600",
  },
  {
    metric: "Research Efficiency",
    value: "87.5%",
    change: "-1.2%",
    trend: "down",
    icon: TrendingUp,
    color: "text-orange-600",
  },
  {
    metric: "Active Researchers",
    value: "42",
    change: "+5",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
]

const trendData = [
  {
    category: "Oceanographic Data",
    thisMonth: 1247,
    lastMonth: 1156,
    change: 7.9,
    trend: "up",
  },
  {
    category: "Species Records",
    thisMonth: 892,
    lastMonth: 834,
    change: 7.0,
    trend: "up",
  },
  {
    category: "Molecular Samples",
    thisMonth: 634,
    lastMonth: 678,
    change: -6.5,
    trend: "down",
  },
  {
    category: "Research Projects",
    thisMonth: 28,
    lastMonth: 24,
    change: 16.7,
    trend: "up",
  },
]

const researchMetrics = [
  {
    domain: "Oceanography",
    datasets: 456,
    publications: 23,
    citations: 187,
    impact: 4.2,
    color: "bg-blue-50 border-blue-200",
  },
  {
    domain: "Taxonomy",
    datasets: 342,
    publications: 18,
    citations: 156,
    impact: 3.8,
    color: "bg-green-50 border-green-200",
  },
  {
    domain: "Molecular Biology",
    datasets: 289,
    publications: 15,
    citations: 134,
    impact: 4.1,
    color: "bg-purple-50 border-purple-200",
  },
  {
    domain: "Conservation",
    datasets: 234,
    publications: 12,
    citations: 98,
    impact: 3.5,
    color: "bg-orange-50 border-orange-200",
  },
]

const geographicData = [
  {
    region: "Arabian Sea",
    studies: 45,
    species: 234,
    coverage: 78,
    priority: "High",
  },
  {
    region: "Bay of Bengal",
    studies: 38,
    species: 198,
    coverage: 65,
    priority: "High",
  },
  {
    region: "Indian Ocean",
    studies: 32,
    species: 167,
    coverage: 52,
    priority: "Medium",
  },
  {
    region: "Coastal Waters",
    studies: 28,
    species: 145,
    coverage: 43,
    priority: "Medium",
  },
]

// Chart data
const monthlyTrendData = [
  { month: "Jan", oceanography: 1200, taxonomy: 800, molecular: 600, conservation: 400 },
  { month: "Feb", oceanography: 1100, taxonomy: 850, molecular: 580, conservation: 420 },
  { month: "Mar", oceanography: 1300, taxonomy: 900, molecular: 650, conservation: 380 },
  { month: "Apr", oceanography: 1250, taxonomy: 820, molecular: 620, conservation: 450 },
  { month: "May", oceanography: 1400, taxonomy: 880, molecular: 680, conservation: 480 },
  { month: "Jun", oceanography: 1247, taxonomy: 892, molecular: 634, conservation: 234 },
]

const speciesDistributionData = [
  { name: "Fish", value: 2847, color: "#3B82F6" },
  { name: "Crustaceans", value: 892, color: "#10B981" },
  { name: "Mollusks", value: 634, color: "#8B5CF6" },
  { name: "Marine Plants", value: 419, color: "#F59E0B" },
  { name: "Corals", value: 287, color: "#EF4444" },
  { name: "Others", value: 156, color: "#6B7280" },
]

const temperatureData = [
  { depth: 0, temperature: 28.5, salinity: 35.2 },
  { depth: 10, temperature: 28.2, salinity: 35.1 },
  { depth: 20, temperature: 27.8, salinity: 35.0 },
  { depth: 50, temperature: 26.5, salinity: 34.8 },
  { depth: 100, temperature: 24.2, salinity: 34.5 },
  { depth: 200, temperature: 20.1, salinity: 34.2 },
  { depth: 500, temperature: 15.8, salinity: 34.0 },
  { depth: 1000, temperature: 8.5, salinity: 33.8 },
]

const biodiversityData = [
  { location: "Arabian Sea", diversity: 4.2, species: 234, samples: 45 },
  { location: "Bay of Bengal", diversity: 3.8, species: 198, samples: 38 },
  { location: "Indian Ocean", diversity: 4.1, species: 167, samples: 32 },
  { location: "Coastal Waters", diversity: 3.5, species: 145, samples: 28 },
  { location: "Deep Sea", diversity: 2.9, species: 89, samples: 15 },
]

export function AnalyticsContent() {
  const { authState } = useAuth()
  const user = authState.user
  const [chartDialogOpen, setChartDialogOpen] = useState(false)
  const [selectedChartType, setSelectedChartType] = useState("")
  const [selectedDataset, setSelectedDataset] = useState("")
  const [isGeneratingChart, setIsGeneratingChart] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")

  if (!user) return null

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleGenerateChart = async () => {
    if (!selectedChartType || !selectedDataset) {
      toast.error("Please select chart type and dataset")
      return
    }

    setIsGeneratingChart(true)
    try {
      // Simulate chart generation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success(`${selectedChartType} chart generated for ${selectedDataset}`)
      setChartDialogOpen(false)
      setSelectedChartType("")
      setSelectedDataset("")
    } catch (error) {
      toast.error("Failed to generate chart")
    } finally {
      setIsGeneratingChart(false)
    }
  }

  const handleExportData = async () => {
    try {
      // Simulate data export
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Analytics data exported successfully")
      setExportDialogOpen(false)
    } catch (error) {
      toast.error("Failed to export data")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-balance">Analytics</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => setChartDialogOpen(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              New Chart
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground text-pretty">
          Comprehensive insights and performance metrics for marine research activities
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.metric} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.metric}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendIcon
                        className={`h-3 w-3 mr-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      />
                      <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChartIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Data Collection Trends
                </CardTitle>
                <CardDescription>Monthly data collection across research domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="oceanography" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="taxonomy" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="molecular" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="conservation" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Species Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="h-5 w-5 mr-2 text-green-600" />
                  Species Distribution
                </CardTitle>
                <CardDescription>Distribution of catalogued marine species</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={speciesDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {speciesDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Research Domain Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Research Impact
                </CardTitle>
                <CardDescription>Publications and citations by domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={researchMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="domain" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="publications" fill="#3B82F6" />
                      <Bar dataKey="citations" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Ocean Temperature Profile
                </CardTitle>
                <CardDescription>Temperature and salinity by depth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="depth" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="salinity"
                        stackId="2"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Biodiversity Scatter Plot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Biodiversity Analysis
                </CardTitle>
                <CardDescription>Species diversity vs sample size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={biodiversityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="samples" name="Samples" />
                      <YAxis dataKey="diversity" name="Diversity Index" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter name="Locations" dataKey="diversity" fill="#10B981" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Research Metrics Cards */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Research Domain Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {researchMetrics.map((domain) => (
                  <Card key={domain.domain} className={`hover:shadow-md transition-shadow ${domain.color}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{domain.domain}</CardTitle>
                        <Badge variant="outline">Impact: {domain.impact}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{domain.datasets}</p>
                          <p className="text-xs text-muted-foreground">Datasets</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{domain.publications}</p>
                          <p className="text-xs text-muted-foreground">Publications</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{domain.citations}</p>
                          <p className="text-xs text-muted-foreground">Citations</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-blue-600" />
                  Geographic Coverage
                </CardTitle>
                <CardDescription>Research coverage by marine regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.studies} studies • {region.species} species
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{region.coverage}%</p>
                        <Badge variant={getPriorityColor(region.priority)} className="mt-1">
                          {region.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                  Regional Research Activity
                </CardTitle>
                <CardDescription>Studies and species by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geographicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="studies" fill="#3B82F6" />
                      <Bar dataKey="species" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Advanced Analytics Tools */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Advanced Analytics Tools</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-600" />
                      Predictive Analytics
                    </CardTitle>
                    <CardDescription>AI-powered trend prediction and forecasting</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">Species Population Trends</p>
                        <p className="text-xs text-purple-700">Predict future population changes</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Environmental Impact</p>
                        <p className="text-xs text-blue-700">Forecast ecosystem changes</p>
                      </div>
                      <Button className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Run Prediction Model
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-600" />
                      Correlation Analysis
                    </CardTitle>
                    <CardDescription>Statistical relationships between variables</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Temperature vs Species</p>
                        <p className="text-xs text-green-700">r = 0.73 (strong correlation)</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-orange-900">Depth vs Diversity</p>
                        <p className="text-xs text-orange-700">r = -0.45 (moderate negative)</p>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Correlations
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Anomaly Detection
                    </CardTitle>
                    <CardDescription>Identify unusual patterns in marine data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Temperature Anomalies</span>
                        <Badge variant="destructive">3 detected</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Species Outliers</span>
                        <Badge variant="secondary">1 detected</Badge>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        Investigate Anomalies
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-gray-600" />
                      Custom Analysis
                    </CardTitle>
                    <CardDescription>Build custom analytical workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select analysis type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regression">Regression Analysis</SelectItem>
                          <SelectItem value="clustering">Clustering</SelectItem>
                          <SelectItem value="timeseries">Time Series</SelectItem>
                          <SelectItem value="classification">Classification</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full">
                        <Brain className="h-4 w-4 mr-2" />
                        Create Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Analysis History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Analysis</h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis History</CardTitle>
                  <CardDescription>Your recent analytical work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Correlation</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm font-medium">Temperature-Species Analysis</p>
                      <p className="text-xs text-muted-foreground">Arabian Sea dataset</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        View Results →
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Prediction</Badge>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm font-medium">Population Forecast</p>
                      <p className="text-xs text-muted-foreground">Fish species trends</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        View Results →
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Anomaly</Badge>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                      </div>
                      <p className="text-sm font-medium">Outlier Detection</p>
                      <p className="text-xs text-muted-foreground">Bay of Bengal data</p>
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
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Data Points</span>
                      <span className="font-medium">2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Models Trained</span>
                      <span className="font-medium">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                      <span className="font-medium text-green-600">94.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  System Performance
                </CardTitle>
                <CardDescription>Platform performance metrics and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">System Uptime</p>
                      <p className="text-sm text-green-700">Last 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-900">99.9%</p>
                      <p className="text-xs text-green-700">Excellent</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Response Time</p>
                      <p className="text-sm text-blue-700">Average query time</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-900">1.2s</p>
                      <p className="text-xs text-blue-700">Good</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">Data Processing</p>
                      <p className="text-sm text-purple-700">Daily throughput</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-900">2.4TB</p>
                      <p className="text-xs text-purple-700">High</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Usage Analytics
                </CardTitle>
                <CardDescription>User activity and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Users (24h)</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Data Uploads</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Analyses Run</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reports Generated</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">API Calls</span>
                    <span className="font-medium">12.4K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Chart Generation Dialog */}
      <Dialog open={chartDialogOpen} onOpenChange={setChartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Custom Chart</DialogTitle>
            <DialogDescription>Create a new visualization from your data</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Chart Type</Label>
              <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="heatmap">Heat Map</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dataset</Label>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oceanography">Oceanographic Data</SelectItem>
                  <SelectItem value="taxonomy">Species Records</SelectItem>
                  <SelectItem value="molecular">Molecular Samples</SelectItem>
                  <SelectItem value="conservation">Conservation Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setChartDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateChart} disabled={isGeneratingChart}>
                {isGeneratingChart ? (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Chart
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Analytics Data</DialogTitle>
            <DialogDescription>Choose the data and format for export</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
