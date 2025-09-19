"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { DataManagementContent } from "@/components/data/data-management-content"

export default function DataManagementPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DataManagementContent />
      </main>
    </div>
  )
}
