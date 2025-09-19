"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { OceanographyContent } from "@/components/oceanography/oceanography-content"

export default function OceanographyPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <OceanographyContent />
      </main>
    </div>
  )
}
