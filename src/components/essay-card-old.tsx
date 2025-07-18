"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ThumbsUp, User, Trash2 } from "lucide-react"
import type { Essay } from "@/lib/supabase"
import { likeEssay, unlikeEssay, getLikeCount, getSession, supabase, deleteEssay } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { LoginRecommendation } from "./login-recommendation"
import { motion } from "motion/react"

interface EssayCardProps {
  essay: Essay
  onDelete?: (essayId: string) => void
}

export function EssayCard({ essay, onDelete }: EssayCardProps) {
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    // Fetch initial like count, user's like status, and current user info
    const fetchLikeData = async () => {
      try {
        const count = await getLikeCount(essay.id)
        setLikeCount(count)
        
        // Check if current user has liked this essay and get user ID
        const session = await getSession()
        if (session) {
          setCurrentUserId(session.user.id)
          
          const { data } = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('essay_id', essay.id)
            .single()
          
          setIsLiked(!!data)
        }
      } catch (error) {
        console.error('Error fetching like data:', error)
      }
    }

    fetchLikeData()
  }, [essay.id])

  const handleLikeToggle = async () => {
    try {
      setIsLoading(true)
      
      const session = await getSession()
      if (!session) {
        setShowLoginModal(true)
        setIsLoading(false)
        return
      }
      
      if (isLiked) {
        await unlikeEssay(essay.id)
        setIsLiked(false)
        setLikeCount(prev => prev - 1)
      } else {
        await likeEssay(essay.id)
        setIsLiked(true)
        setLikeCount(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      // Show user-friendly error message here if needed
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    try {
      setIsDeleting(true)
      await deleteEssay(essay.id)
      onDelete?.(essay.id)
    } catch (error) {
      console.error('Error deleting essay:', error)
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete essay'
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const isOwner = currentUserId && essay.user_id === currentUserId
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {essay.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              {essay.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Verified</span>
                  </Badge>
                </motion.div>
              )}
              {isOwner && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${
                      showDeleteConfirm 
                        ? 'text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title={showDeleteConfirm ? 'Click again to confirm deletion' : 'Delete essay'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                🏛️ {essay.college}
              </Badge>
            </motion.div>
          
          {essay.prompt !== "Unknown" && (
            <Badge className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 hover:shadow-md transition-all duration-200">
              💭 {essay.prompt.length > 40 ? essay.prompt.slice(0, 40) + "..." : essay.prompt}
            </Badge>
          )}
          
          {essay.major && essay.major !== "Unknown" && (
            <Badge className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 hover:shadow-md transition-all duration-200">
              🎓 {essay.major}
            </Badge>
          )}
        </div>
        
        {showDeleteConfirm && (
          <div className="mb-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg text-sm text-red-700 shadow-inner animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              Click the delete button again to confirm deletion.
            </div>
          </div>
        )}
        
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{essay.content}</p>
        
        {/* Author information */}
        <div className="flex items-center gap-2 mt-4 p-2 rounded-lg bg-gradient-to-r from-stone-50 to-slate-100 dark:from-stone-800/50 dark:to-slate-700/50 border border-stone-200/50 dark:border-slate-600/50">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-500 to-stone-600 flex items-center justify-center">
            <User className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {essay.author_name || 'Anonymous'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-slate-200/50 dark:border-slate-700/50 pt-4 relative z-10">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gradient-to-b from-stone-100 to-slate-100 dark:from-stone-800/50 dark:to-slate-800/50 text-stone-700 dark:text-stone-300 rounded-full">
              {essay.word_count} words
            </span>
            <span className="px-2 py-1 bg-gradient-to-b from-slate-100 to-stone-100 dark:from-slate-800/50 dark:to-stone-800/50 text-slate-700 dark:text-slate-300 rounded-full">
              {essay.year}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 shadow-lg ${
              isLiked 
                ? 'bg-gradient-to-r from-slate-600 to-stone-700 text-white shadow-slate-200 dark:shadow-slate-900/50' 
                : 'bg-gradient-to-r from-stone-100 to-slate-200 dark:from-stone-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 hover:from-slate-100 hover:to-stone-100 dark:hover:from-slate-800/50 dark:hover:to-stone-800/50 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            onClick={handleLikeToggle}
            disabled={isLoading}
          >
            <ThumbsUp className={`h-4 w-4 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : 'hover:scale-110'}`} />
            <span className="text-xs font-semibold">{likeCount}</span>
          </button>
          
          <Link href={`/essays/${essay.id}`}>
            <Badge className="bg-gradient-to-r from-stone-600 to-slate-700 hover:from-stone-700 hover:to-slate-800 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-3 py-1.5">
              Read Full Essay
            </Badge>
          </Link>
        </div>
      </CardFooter>
      
      <LoginRecommendation
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Create an account to like essays and track your favorites!"
        actionText="Sign in with Google"
      />
    </Card>
  )
}
