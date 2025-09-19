"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardContent />
      </main>
    </div>
  )
}
