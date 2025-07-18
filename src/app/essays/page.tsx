"use client"

import { useState, useEffect } from "react"
import { FilterBar } from "@/components/filterbar"
import { EssayCard } from "@/components/essay-card"
import { getEssays, type Essay } from "@/lib/supabase"
import { addSampleEssays } from "@/lib/sample-data"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

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
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </motion.div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading essays...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">!</span>
          </div>
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          className="mb-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background student photos */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-8 left-1/4 w-16 h-16 rounded-full overflow-hidden opacity-10 shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/pexels-ketut-subiyanto-4560083.jpg"
                alt="Student"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <motion.div 
              className="absolute top-16 right-1/4 w-12 h-12 rounded-full overflow-hidden opacity-15 shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/20943606.jpg"
                alt="Student"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <motion.div 
              className="absolute bottom-8 left-1/3 w-14 h-14 rounded-full overflow-hidden opacity-12 shadow-lg"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/8772513.jpg"
                alt="Student"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>

          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-700/50 mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.2 }}
          >
            <BookOpen className="w-4 h-4" />
            Real Success Stories Await
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Discover Amazing Essays
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            Find inspiration from real students who made their dreams come true! 
            <br />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Filter by school, major, or prompt to find your perfect match.</span>
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-700/50 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-orange-600 dark:text-orange-400 font-semibold">{allEssays.length} Success Stories</span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{filteredEssays.length} Showing Now</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Filter Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <FilterBar onFilterChange={handleFilterChange} />
        </motion.div>
        
        {/* Essays Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          {filteredEssays.length === 0 ? (
            <motion.div 
              className="col-span-full text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {allEssays.length === 0 ? 'No Essays Yet' : 'No Essays Found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {allEssays.length === 0 
                    ? 'The database appears to be empty. Add some sample essays to get started.' 
                    : 'Try adjusting your filters to find the essays you\'re looking for.'
                  }
                </p>
                {allEssays.length === 0 && (
                  <Button 
                    onClick={handleAddSampleData} 
                    disabled={addingData}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
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
            </motion.div>
          ) : (
            filteredEssays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} onDelete={handleDeleteEssay} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
