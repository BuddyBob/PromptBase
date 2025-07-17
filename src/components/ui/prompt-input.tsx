import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// Common essay prompts for quick selection
const commonPrompts = [
  "Tell us about yourself.",
  "Why do you want to attend this college?",
  "Describe a challenge you overcame.",
  "What are your academic interests and why?",
  "Tell us about a meaningful experience.",
  "Describe your leadership experience.",
  "What makes you unique?",
  "Discuss your career goals.",
  "Tell us about your community involvement.",
  "Describe a time you failed and what you learned.",
]

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  // Show first 100 characters as preview
  const previewText = value ? (value.length > 100 ? value.slice(0, 100) + '...' : value) : ''
  
  const handleSuggestionClick = (prompt: string) => {
    onChange(prompt)
    setShowSuggestions(false)
    setIsExpanded(true)
  }

  return (
    <div className="space-y-2">
      {/* Suggestions Button */}
      {!value && !isExpanded && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Common Prompts
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-xs"
          >
            Custom Prompt
          </Button>
        </div>
      )}

      {/* Suggestions List */}
      {showSuggestions && (
        <div className="grid grid-cols-1 gap-1 p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 max-h-48 overflow-y-auto">
          {commonPrompts.map((prompt, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(prompt)}
              className="text-left text-xs p-2 rounded hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
      
      {/* Preview/Collapsed View */}
      {!isExpanded && value && (
        <div 
          className="min-h-[40px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-2">
              {previewText}
            </p>
            <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>
        </div>
      )}
      
      {/* Expanded/Edit View */}
      {isExpanded && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Essay prompt:</span>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Collapse <ChevronUp className="h-3 w-3" />
            </button>
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Enter the full essay prompt you responded to..."}
            className="min-h-[120px] resize-y"
            autoFocus
          />
          <div className="text-xs text-gray-500">
            {value.length} characters
          </div>
        </div>
      )}
    </div>
  )
}
