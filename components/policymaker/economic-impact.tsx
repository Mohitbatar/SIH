"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Ship, Building, Fish } from "lucide-react"

const economicSectors = [
  {
    name: "Fisheries & Aquaculture",
    value: "₹1.2 trillion",
    growth: "+6.2%",
    employment: "14.5M people",
    contribution: 35,
    icon: Fish,
  },
  {
    name: "Marine Tourism",
    value: "₹580 billion",
    growth: "+12.8%",
    employment: "8.2M people",
    contribution: 28,
    icon: Building,
  },
  {
    name: "Shipping & Ports",
    value: "₹420 billion",
    growth: "+4.5%",
    employment: "2.1M people",
    contribution: 20,
    icon: Ship,
  },
  {
    name: "Marine Biotechnology",
    value: "₹180 billion",
    growth: "+18.3%",
    employment: "450K people",
    contribution: 17,
    icon: DollarSign,
  },
]

const regionalImpact = [
  {
    region: "West Coast",
    gdp: "₹850 billion",
    growth: "+7.2%",
    sectors: ["Ports", "Tourism", "Fisheries"],
    employment: "12.5M",
  },
  {
    region: "East Coast",
    gdp: "₹620 billion",
    growth: "+5.8%",
    sectors: ["Aquaculture", "Shipping", "Tourism"],
    employment: "9.8M",
  },
  {
    region: "Island Territories",
    gdp: "₹45 billion",
    growth: "+9.1%",
    sectors: ["Tourism", "Fisheries", "Conservation"],
    employment: "850K",
  },
]

export function EconomicImpact() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Economic Impact Analysis</h2>
          <p className="text-muted-foreground">Blue economy contribution and sectoral performance</p>
        </div>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Economic Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-4 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-balance">Total Blue Economy Value</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-primary">₹2.1 trillion</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.5% YoY
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Contributing 6.2% to national GDP</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Employment</p>
                <p className="text-2xl font-bold">25.9M</p>
                <p className="text-sm text-muted-foreground">people employed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sectoral Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sectoral Contribution</h3>
          <div className="space-y-4">
            {economicSectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-balance">{sector.name}</h4>
                          <Badge variant="outline" className="text-green-700 border-green-200">
                            {sector.growth}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <p className="text-muted-foreground">Value</p>
                            <p className="font-medium">{sector.value}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Employment</p>
                            <p className="font-medium">{sector.employment}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>GDP Contribution</span>
                            <span>{sector.contribution}%</span>
                          </div>
                          <Progress value={sector.contribution} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Regional Impact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Regional Impact</h3>
          <div className="space-y-4">
            {regionalImpact.map((region, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{region.region}</CardTitle>
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      {region.growth}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Regional GDP</p>
                        <p className="font-medium">{region.gdp}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Employment</p>
                        <p className="font-medium">{region.employment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Key Sectors</p>
                      <div className="flex flex-wrap gap-1">
                        {region.sectors.map((sector, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Economic Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Economic Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Marine GDP Growth</span>
                <span className="font-medium text-green-600">+8.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Export Value</span>
                <span className="font-medium">₹1.2T</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">FDI in Marine Sector</span>
                <span className="font-medium">₹45,000 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Productivity Index</span>
                <span className="font-medium">112.5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investment Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Opportunities</CardTitle>
          <CardDescription>High-potential areas for blue economy investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Sustainable Aquaculture</h4>
              <p className="text-sm text-blue-700 mb-2">Potential: ₹500 billion by 2030</p>
              <p className="text-xs text-blue-600">Focus on cage farming and integrated systems</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Marine Renewable Energy</h4>
              <p className="text-sm text-green-700 mb-2">Potential: ₹300 billion by 2030</p>
              <p className="text-xs text-green-600">Offshore wind and tidal energy projects</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Blue Biotechnology</h4>
              <p className="text-sm text-purple-700 mb-2">Potential: ₹200 billion by 2030</p>
              <p className="text-xs text-purple-600">Marine pharmaceuticals and bioproducts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
