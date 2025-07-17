"use client"

import { useState, useEffect } from "react"
import { FilterBar } from "@/components/filterbar"
import { EssayCard } from "@/components/essay-card"
import { getEssays, type Essay } from "@/lib/supabase"
import { addSampleEssays } from "@/lib/sample-data"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Sparkles } from "lucide-react"

export default function EssaysPage() {
  const [allEssays, setAllEssays] = useState<Essay[]>([])
  const [filteredEssays, setFilteredEssays] = useState<Essay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingData, setAddingData] = useState(false)

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
    promptSearch: string
    major: string
    search: string
  }) => {
    let filtered = allEssays

    if (filters.college !== "All Colleges") {
      filtered = filtered.filter(essay => essay.college === filters.college)
    }

    if (filters.promptSearch) {
      filtered = filtered.filter(essay => 
        essay.prompt.toLowerCase().includes(filters.promptSearch.toLowerCase())
      )
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

  const handleAddSampleData = async () => {
    setAddingData(true)
    try {
      await addSampleEssays()
      // Reload essays after adding sample data
      const essays = await getEssays()
      setAllEssays(essays)
      setFilteredEssays(essays)
    } catch (error) {
      console.error('Error adding sample data:', error)
    } finally {
      setAddingData(false)
    }
  }

  const handleDeleteEssay = (deletedEssayId: string) => {
    // Remove the deleted essay from both state arrays
    setAllEssays(prev => prev.filter(essay => essay.id !== deletedEssayId))
    setFilteredEssays(prev => prev.filter(essay => essay.id !== deletedEssayId))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white dark:bg-black rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">Loading essays...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-red-950/20 dark:via-pink-950/20 dark:to-orange-950/20"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">!</span>
          </div>
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 dark:from-purple-950/10 dark:via-blue-950/10 dark:to-cyan-950/10"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium border border-purple-200 dark:border-purple-700 mb-6">
            <Sparkles className="w-4 h-4" />
            Real Success Stories
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-gray-800 dark:from-blue-400 dark:to-gray-200 bg-clip-text text-transparent">
              Browse Essays
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover successful college essays from students who got into top universities. 
            Filter by school, major, or prompt to find exactly what you're looking for.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="px-4 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 shadow-lg">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="font-bold text-purple-600">{allEssays.length}</span> Essays Available
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 shadow-lg">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="font-bold text-blue-600">{filteredEssays.length}</span> Currently Showing
              </span>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        
        {/* Essays Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEssays.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  {allEssays.length === 0 ? 'No Essays Yet' : 'No Essays Found'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {allEssays.length === 0 
                    ? 'The database appears to be empty. Add some sample essays to get started.' 
                    : 'Try adjusting your filters to find the essays you\'re looking for.'
                  }
                </p>
                {allEssays.length === 0 && (
                  <Button 
                    onClick={handleAddSampleData} 
                    disabled={addingData}
                    className="btn-gradient shadow-lg"
                  >
                    {addingData ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding Sample Data...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Add Sample Essays
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredEssays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} onDelete={handleDeleteEssay} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
