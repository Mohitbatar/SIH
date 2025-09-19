"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { ScientistDashboard } from "@/components/scientist/scientist-dashboard"

export default function ScientistPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/scientist" />
      <main className="flex-1 overflow-auto">
        <ScientistDashboard />
      </main>
    </div>
  )
}
