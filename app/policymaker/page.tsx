"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { PolicymakerDashboard } from "@/components/policymaker/policymaker-dashboard"

export default function PolicymakerPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/policymaker" />
      <main className="flex-1 overflow-auto">
        <PolicymakerDashboard />
      </main>
    </div>
  )
}
