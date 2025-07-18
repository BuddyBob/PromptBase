"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ThumbsUp, User, Trash2, BookMarked, Bookmark } from "lucide-react"
import type { Essay } from "@/lib/supabase"
import { 
  likeEssay, 
  unlikeEssay, 
  getLikeCount, 
  getSession, 
  supabase, 
  deleteEssay,
  saveEssay,
  unsaveEssay,
  isEssaySaved
} from "@/lib/supabase"
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
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    // Fetch initial like count, user's like status, saved status, and current user info
    const fetchLikeData = async () => {
      try {
        const count = await getLikeCount(essay.id)
        setLikeCount(count)
        
        // Check if current user has liked this essay and get user ID
        const session = await getSession()
        if (session) {
          setCurrentUserId(session.user.id)
          
          // Check like status
          const { data: likeData } = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('essay_id', essay.id)
            .single()
          
          setIsLiked(!!likeData)
          
          // Check saved status
          const savedStatus = await isEssaySaved(session.user.id, essay.id)
          setIsSaved(savedStatus)
        }
      } catch (error) {
        console.error('Error fetching like data:', error)
      }
    }

    fetchLikeData()
  }, [essay.id])

  const handleLikeToggle = async () => {
    const session = await getSession()
    
    if (!session) {
      setShowLoginModal(true)
      return
    }

    setIsLoading(true)
    
    try {
      if (isLiked) {
        await unlikeEssay(essay.id)
        setLikeCount(prev => prev - 1)
        setIsLiked(false)
      } else {
        await likeEssay(essay.id)
        setLikeCount(prev => prev + 1)
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!currentUserId) {
      setShowLoginModal(true)
      return
    }

    setIsLoading(true)
    try {
      if (isSaved) {
        await unsaveEssay(currentUserId, essay.id)
        setIsSaved(false)
      } else {
        await saveEssay(currentUserId, essay.id)
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error saving/unsaving essay:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setIsDeleting(true)
    
    try {
      await deleteEssay(essay.id)
      onDelete?.(essay.id)
    } catch (error) {
      console.error('Error deleting essay:', error)
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
      transition={{ duration: 0.2 }}
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
            
            {essay.major && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
                  📚 {essay.major}
                </Badge>
              </motion.div>
            )}
          </div>
          
          {/* Delete confirmation warning */}
          {showDeleteConfirm && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Click the delete button again to confirm deletion.
              </div>
            </motion.div>
          )}
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">{essay.content}</p>
          
          {/* Author information */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {essay.author_name || 'Anonymous'}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Top row: Word count and year */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                {essay.word_count} words
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                {essay.year}
              </span>
            </div>
            
            <motion.button 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
              }`}
              onClick={handleLikeToggle}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className={`h-4 w-4 transition-transform duration-300 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likeCount}</span>
            </motion.button>
          </div>
          
          {/* Bottom row: Save and Read buttons */}
          <div className="flex items-center gap-3 w-full">
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                isSaved 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600'
              }`}
              onClick={handleSave}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isSaved ? 'Unsave this essay' : 'Save this essay'}
            >
              {isSaved ? (
                <Bookmark className="h-4 w-4 fill-current" />
              ) : (
                <BookMarked className="h-4 w-4" />
              )}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </motion.button>
            
            <Link href={`/essays/${essay.id}`} className="flex-1">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                  Read Full Essay
                </Button>
              </motion.div>
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
    </motion.div>
  )
}
