"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { SettingsContent } from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <SettingsContent />
      </main>
    </div>
  )
}
