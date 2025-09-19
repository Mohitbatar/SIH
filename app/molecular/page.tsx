"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { MolecularContent } from "@/components/molecular/molecular-content"

export default function MolecularPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <MolecularContent />
      </main>
    </div>
  )
}
