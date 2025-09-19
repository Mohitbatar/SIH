"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { TaxonomyContent } from "@/components/taxonomy/taxonomy-content"

export default function TaxonomyPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <TaxonomyContent />
      </main>
    </div>
  )
}
