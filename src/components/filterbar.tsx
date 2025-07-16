"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { colleges, majors, prompts } from "@/lib/supabase"

interface FilterBarProps {
  onFilterChange: (filters: {
    college: string
    prompt: string
    major: string
    search: string
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    college: "All Colleges",
    prompt: "All Prompts",
    major: "All Majors",
    search: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="w-full bg-dark p-4 rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search keywords..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <Select value={filters.college} onValueChange={(value) => handleFilterChange("college", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select College" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((college) => (
              <SelectItem key={college} value={college}>
                {college}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.prompt} onValueChange={(value) => handleFilterChange("prompt", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Prompt" />
          </SelectTrigger>
          <SelectContent>
            {prompts.map((prompt) => (
              <SelectItem key={prompt} value={prompt}>
                {prompt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.major} onValueChange={(value) => handleFilterChange("major", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Major" />
          </SelectTrigger>
          <SelectContent>
            {majors.map((major) => (
              <SelectItem key={major} value={major}>
                {major}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
