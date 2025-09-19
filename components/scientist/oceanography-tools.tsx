"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Thermometer, Droplets, Wind, MapPin, TrendingUp } from "lucide-react"

const oceanStations = [
  { id: "A12", name: "Arabian Sea - Deep Water", lat: "15.5°N", lon: "68.2°E", depth: "2400m" },
  { id: "B07", name: "Bay of Bengal - Coastal", lat: "13.1°N", lon: "80.3°E", depth: "150m" },
  { id: "C03", name: "Indian Ocean - Abyssal", lat: "8.4°N", lon: "73.1°E", depth: "4200m" },
]

const recentMeasurements = [
  {
    station: "A12",
    temperature: "24.5°C",
    salinity: "35.2 PSU",
    oxygen: "4.8 mg/L",
    ph: "8.1",
    date: "2024-01-15",
    status: "validated",
  },
  {
    station: "B07",
    temperature: "28.1°C",
    salinity: "34.8 PSU",
    oxygen: "5.2 mg/L",
    ph: "8.0",
    date: "2024-01-14",
    status: "processing",
  },
  {
    station: "C03",
    temperature: "2.1°C",
    salinity: "34.7 PSU",
    oxygen: "6.1 mg/L",
    ph: "7.9",
    date: "2024-01-13",
    status: "validated",
  },
]

export function OceanographyTools() {
  const [selectedStation, setSelectedStation] = useState("A12")
  const [dateRange, setDateRange] = useState("30")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Oceanographic Data Analysis</h2>
          <p className="text-muted-foreground">Physical, chemical, and biological ocean parameters</p>
        </div>
        <Button>
          <Waves className="h-4 w-4 mr-2" />
          New Survey
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Data</TabsTrigger>
          <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
          <TabsTrigger value="modeling">Predictive Models</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Station Selection and Controls */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Station Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Monitoring Station</Label>
                    <Select value={selectedStation} onValueChange={setSelectedStation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {oceanStations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.id} - {station.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 3 months</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Station Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {oceanStations
                    .filter((station) => station.id === selectedStation)
                    .map((station) => (
                      <div key={station.id} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{station.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Latitude</p>
                            <p className="font-medium">{station.lat}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Longitude</p>
                            <p className="font-medium">{station.lon}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Max Depth</p>
                            <p className="font-medium">{station.depth}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Current Measurements */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Real-time Parameters</CardTitle>
                  <CardDescription>Latest oceanographic measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Thermometer className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-xl font-bold text-blue-600">24.5°C</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Droplets className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salinity</p>
                      <p className="text-xl font-bold text-green-600">35.2 PSU</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Wind className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Dissolved O₂</p>
                      <p className="text-xl font-bold text-purple-600">4.8 mg/L</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="w-6 h-6 bg-orange-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">
                        pH
                      </div>
                      <p className="text-sm text-muted-foreground">pH Level</p>
                      <p className="text-xl font-bold text-orange-600">8.1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Measurements</CardTitle>
                  <CardDescription>Historical data from selected stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentMeasurements.map((measurement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{measurement.station}</Badge>
                          <div className="text-sm">
                            <p className="font-medium">{measurement.date}</p>
                            <p className="text-muted-foreground">
                              T: {measurement.temperature} | S: {measurement.salinity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={measurement.status === "validated" ? "default" : "secondary"}>
                            {measurement.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Waves className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Historical Analysis Tools</h3>
                <p className="text-muted-foreground mb-4">Analyze long-term oceanographic trends and patterns</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modeling">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Predictive Modeling</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered ocean parameter prediction and ecosystem modeling
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
