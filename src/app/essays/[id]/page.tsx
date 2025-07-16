
"use client"

import { useParams, notFound } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Share2 } from "lucide-react"
import { getEssayById, type Essay } from "@/lib/supabase"

export default function EssayPage() {
  const params = useParams()
  const id = params?.id as string
  const [essay, setEssay] = useState<Essay | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEssay() {
      if (!id) return
      
      try {
        const essayData = await getEssayById(id)
        setEssay(essayData)
      } catch (err) {
        setError('Essay not found')
        console.error('Error loading essay:', err)
      } finally {
        setLoading(false)
      }
    }

    loadEssay()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading essay...</p>
        </div>
      </div>
    )
  }

  if (error || !essay) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/essays">
          <Button variant="ghost" className="pl-0 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Essays
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{essay.title}</h1>
              {essay.verified && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified</span>
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{essay.college}</Badge>
              <Badge variant="secondary">{essay.prompt}</Badge>
              <Badge variant="secondary">{essay.major}</Badge>
              <Badge variant="secondary">{essay.word_count} words</Badge>
              <Badge variant="secondary">{essay.year}</Badge>
            </div>
          </div>

          <Card className="p-6">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{essay.content}</p>
              <p className="text-slate-500 mt-8">
                Note: This essay is shared for educational purposes only. Do not plagiarize or submit as your own work.
              </p>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">About This Essay</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">College</p>
                <p className="text-slate-500">{essay.college}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Prompt</p>
                <p className="text-slate-500">{essay.prompt}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Major</p>
                <p className="text-slate-500">{essay.major}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Word Count</p>
                <p className="text-slate-500">{essay.word_count} words</p>
              </div>
              <div>
                <p className="text-sm font-medium">Admission Year</p>
                <p className="text-slate-500">{essay.year}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Share This Essay</h3>
            <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Copy Link
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

