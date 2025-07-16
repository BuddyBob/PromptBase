import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ThumbsUp } from "lucide-react"
import type { Essay } from "@/lib/supabase"
import { likeEssay, getLikesCount } from "@/lib/supabase"

interface EssayCardProps {
  essay: Essay
}

export function EssayCard({ essay }: EssayCardProps) {
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
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-slate-500">
          {essay.word_count} words • {essay.year}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            onClick={() => {
              likeEssay(essay.id)
              getLikesCount(essay.id).then(likes => {
                essay.likes = likes
              })
            }}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs">{essay.likes || 0}</span>
          </button>
          
          <Link href={`/essays/${essay.id}`}>
            <Badge className="bg-blue-600 hover:bg-blue-700">Read Full Essay</Badge>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
