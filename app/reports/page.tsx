"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { ReportsContent } from "@/components/reports/reports-content"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ReportsContent />
      </main>
    </div>
  )
}
