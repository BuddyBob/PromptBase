"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { colleges, majors, prompts } from "@/lib/supabase"

interface FilterBarProps {
  onFilterChange: (filters: {
    college: string
    promptSearch: string
    major: string
    search: string
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    college: "All Colleges",
    promptSearch: "",
    major: "All Majors",
    search: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="w-full gradient-card p-6 rounded-2xl border-0 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300" />
          <Input
            type="search"
            placeholder="Search keywords..."
            className="pl-10 h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-slate-500 dark:focus:border-slate-400 transition-all duration-300 bg-white/60 dark:bg-black/30 backdrop-blur-sm"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="relative">
          <SearchableSelect
            options={colleges}
            value={filters.college}
            onValueChange={(value) => handleFilterChange("college", value)}
            placeholder="Select College"
          />
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-stone-600 transition-colors duration-300" />
          <Input
            type="search"
            placeholder="Search prompts..."
            className="pl-10 h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-stone-500 dark:focus:border-stone-400 transition-all duration-300 bg-white/60 dark:bg-black/30 backdrop-blur-sm"
            value={filters.promptSearch}
            onChange={(e) => handleFilterChange("promptSearch", e.target.value)}
          />
        </div>

        <div className="relative">
          <SearchableSelect
            options={majors}
            value={filters.major}
            onValueChange={(value) => handleFilterChange("major", value)}
            placeholder="Select Major"
          />
        </div>
      </div>
    </div>
  )
}
