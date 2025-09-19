"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { AnalyticsContent } from "@/components/analytics/analytics-content"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <AnalyticsContent />
      </main>
    </div>
  )
}
