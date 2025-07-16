"use client"

import { useState, useEffect } from "react"
import { FilterBar } from "@/components/filterbar"
import { EssayCard } from "@/components/essay-card"
import { getEssays, type Essay } from "@/lib/supabase"

export default function EssaysPage() {
  const [allEssays, setAllEssays] = useState<Essay[]>([])
  const [filteredEssays, setFilteredEssays] = useState<Essay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load essays from Supabase on component mount
  useEffect(() => {
    async function loadEssays() {
      try {
        const essays = await getEssays()
        setAllEssays(essays)
        setFilteredEssays(essays)
      } catch (err) {
        setError('Failed to load essays. Please try again later.')
        console.error('Error loading essays:', err)
      } finally {
        setLoading(false)
      }
    }

    loadEssays()
  }, [])

  const handleFilterChange = (filters: {
    college: string
    prompt: string
    major: string
    search: string
  }) => {
    let filtered = allEssays

    if (filters.college !== "All Colleges") {
      filtered = filtered.filter(essay => essay.college === filters.college)
    }

    if (filters.prompt !== "All Prompts") {
      filtered = filtered.filter(essay => essay.prompt === filters.prompt)
    }

    if (filters.major !== "All Majors") {
      filtered = filtered.filter(essay => essay.major === filters.major)
    }

    if (filters.search) {
      filtered = filtered.filter(essay => 
        essay.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        essay.content.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredEssays(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading essays...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Browse Essays</h1>
        <p className="text-muted-foreground">
          Discover successful college essays from students who got into top universities.
        </p>
      </div>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="grid gap-6 mt-8">
        {filteredEssays.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>
    </div>
  )
}
