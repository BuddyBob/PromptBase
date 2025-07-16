import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ThumbsUp, User } from "lucide-react"
import type { Essay } from "@/lib/supabase"
import { likeEssay, unlikeEssay, getLikeCount, getSession, supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { LoginRecommendation } from "./login-recommendation"

interface EssayCardProps {
  essay: Essay
}

export function EssayCard({ essay }: EssayCardProps) {
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    // Fetch initial like count and user's like status
    const fetchLikeData = async () => {
      try {
        const count = await getLikeCount(essay.id)
        setLikeCount(count)
        
        // Check if current user has liked this essay
        const session = await getSession()
        if (session) {
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
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{essay.title}</CardTitle>
          {essay.verified && (
            <Badge
              variant="outline"
              className="ml-2 bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{essay.college}</Badge>
          <Badge variant="secondary">{essay.prompt}</Badge>
          <Badge variant="secondary">{essay.major}</Badge>
        </div>
        <p className="text-sm text-slate-500 line-clamp-3">{essay.content}</p>
        
        {/* Author information */}
        <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
          <User className="h-3 w-3" />
          <span>by {essay.author_name || '- Anonymous'}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-slate-500">
          {essay.word_count} words • {essay.year}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className={`flex items-center gap-1 transition-colors ${
              isLiked 
                ? 'text-blue-600 hover:text-blue-700' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            onClick={handleLikeToggle}
            disabled={isLoading}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs">{likeCount}</span>
          </button>
          
          <Link href={`/essays/${essay.id}`}>
            <Badge className="bg-blue-600 hover:bg-blue-700">Read Full Essay</Badge>
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
