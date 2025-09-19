"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { ConservationistDashboard } from "@/components/conservationist/conservationist-dashboard"

export default function ConservationistPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/conservationist" />
      <main className="flex-1 overflow-auto">
        <ConservationistDashboard />
      </main>
    </div>
  )
}
