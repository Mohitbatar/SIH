"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, Shield, FileText, BarChart3 } from "lucide-react"

const complianceMetrics = [
  {
    regulation: "Marine Protected Area Regulations",
    compliance: 78,
    violations: 156,
    trend: "improving",
    lastAudit: "2024-01-10",
    status: "concern",
  },
  {
    regulation: "Fishing License Requirements",
    compliance: 92,
    violations: 45,
    trend: "stable",
    lastAudit: "2024-01-08",
    status: "good",
  },
  {
    regulation: "Coastal Zone Management",
    compliance: 85,
    violations: 89,
    trend: "improving",
    lastAudit: "2024-01-05",
    status: "good",
  },
  {
    regulation: "Marine Pollution Control",
    compliance: 67,
    violations: 234,
    trend: "declining",
    lastAudit: "2024-01-03",
    status: "critical",
  },
]

const enforcementActions = [
  {
    id: "ENF001",
    type: "Fine Imposed",
    violation: "Illegal fishing in MPA",
    amount: "₹2.5 lakh",
    date: "2024-01-15",
    status: "collected",
  },
  {
    id: "ENF002",
    type: "License Suspended",
    violation: "Coastal construction violation",
    amount: "N/A",
    date: "2024-01-12",
    status: "active",
  },
  {
    id: "ENF003",
    type: "Warning Issued",
    violation: "Waste discharge",
    amount: "N/A",
    date: "2024-01-10",
    status: "resolved",
  },
  {
    id: "ENF004",
    type: "Court Case Filed",
    violation: "Major oil spill",
    amount: "₹50 lakh",
    date: "2024-01-08",
    status: "pending",
  },
]

export function ComplianceMonitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Compliance Monitoring</h2>
          <p className="text-muted-foreground">Track regulatory compliance and enforcement actions</p>
        </div>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          Compliance Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Overall Compliance</p>
            <p className="text-2xl font-bold">81%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Active Violations</p>
            <p className="text-2xl font-bold">524</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Pending Cases</p>
            <p className="text-2xl font-bold">89</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Enforcement Actions</p>
            <p className="text-2xl font-bold">156</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance by Regulation */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Compliance by Regulation</h3>
          <div className="space-y-4">
            {complianceMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-balance">{metric.regulation}</CardTitle>
                    <Badge
                      variant={
                        metric.status === "good" ? "default" : metric.status === "concern" ? "secondary" : "destructive"
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Compliance Rate</span>
                        <span>{metric.compliance}%</span>
                      </div>
                      <Progress value={metric.compliance} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Violations</p>
                        <p className="font-medium">{metric.violations}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Trend</p>
                        <p
                          className={`font-medium ${
                            metric.trend === "improving"
                              ? "text-green-600"
                              : metric.trend === "declining"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {metric.trend}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Audit</p>
                        <p className="font-medium">{metric.lastAudit}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Trend Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enforcement Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Enforcement</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enforcement Actions</CardTitle>
              <CardDescription>Recent regulatory enforcement activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {enforcementActions.map((action) => (
                <div key={action.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${
                        action.status === "collected" || action.status === "resolved"
                          ? "bg-green-500"
                          : action.status === "active"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{action.type}</p>
                      <Badge
                        variant={
                          action.status === "collected" || action.status === "resolved"
                            ? "default"
                            : action.status === "active"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {action.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground text-pretty">{action.violation}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{action.date}</p>
                      {action.amount !== "N/A" && <p className="text-xs font-medium text-green-600">{action.amount}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fines Collected</span>
                <span className="font-medium">₹12.8 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Licenses Revoked</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Court Cases</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Compliance Rate</span>
                <span className="font-medium">81%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Violation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Schedule Audit
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Compliance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
