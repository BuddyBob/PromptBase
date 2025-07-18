"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Essay,
  getEssayById,
  updateEssay,
  deleteEssay,
  getSession,
  colleges,
  majors
} from '@/lib/supabase'
import Link from 'next/link'

export default function EditEssayPage() {
  const router = useRouter()
  const params = useParams()
  const essayId = params.id as string

  const [essay, setEssay] = useState<Essay | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    college: '',
    major: '',
    prompt: '',
    content: '',
    word_count: 0,
    year: new Date().getFullYear(),
    essay_type: 'common_app' as 'common_app' | 'supplemental' | 'piq',
    target_college: '',
    is_admitted: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    loadEssay()
  }, [essayId])

  const loadEssay = async () => {
    try {
      // Check authentication
      const session = await getSession()
      if (!session) {
        router.push('/essays')
        return
      }
      setUserId(session.user.id)

      // Load essay
      const essayData = await getEssayById(essayId)
      
      // Check if user owns this essay
      if (essayData.user_id !== session.user.id) {
        router.push('/dashboard')
        return
      }

      setEssay(essayData)
      setFormData({
        title: essayData.title,
        college: essayData.college,
        major: essayData.major,
        prompt: essayData.prompt,
        content: essayData.content,
        word_count: essayData.word_count,
        year: essayData.year,
        essay_type: (essayData.essay_type || 'common_app') as 'common_app' | 'supplemental' | 'piq',
        target_college: essayData.target_college || '',
        is_admitted: essayData.is_admitted ?? true
      })
    } catch (error) {
      console.error('Error loading essay:', error)
      setError('Failed to load essay')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-calculate word count for content changes
    if (field === 'content') {
      const wordCount = (value as string).trim().split(/\s+/).filter(word => word.length > 0).length
      setFormData(prev => ({
        ...prev,
        word_count: wordCount
      }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      await updateEssay(essayId, formData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating essay:', error)
      setError('Failed to update essay')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this essay? This action cannot be undone.')) {
      try {
        await deleteEssay(essayId)
        router.push('/dashboard')
      } catch (error) {
        console.error('Error deleting essay:', error)
        setError('Failed to delete essay')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Eye className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
    )
  }

  if (!essay) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Essay not found</h2>
          <p className="text-gray-600 mb-4">The essay you're looking for doesn't exist or you don't have permission to edit it.</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-blue-900 dark:to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </motion.div>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Essay</h1>
              <p className="text-gray-600 dark:text-gray-300">Make changes to your essay</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href={`/essays/${essayId}`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleDelete}
                variant="outline"
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Essay Content</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Essay Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter essay title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="prompt">Essay Prompt</Label>
                  <Textarea
                    id="prompt"
                    value={formData.prompt}
                    onChange={(e) => handleInputChange('prompt', e.target.value)}
                    placeholder="Enter the essay prompt..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Essay Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your essay here..."
                    className="mt-1 min-h-[400px]"
                  />
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>Word count: {formData.word_count}</span>
                    <span className="text-xs">Auto-saved as you type</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Essay Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="college">College/University</Label>
                  <Select 
                    value={formData.college} 
                    onValueChange={(value) => handleInputChange('college', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select college..." />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.slice(1).map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <Select 
                    value={formData.major} 
                    onValueChange={(value) => handleInputChange('major', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select major..." />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.slice(1).map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="year">Application Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    min="2020"
                    max="2030"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="essay_type">Essay Type</Label>
                  <Select 
                    value={formData.essay_type} 
                    onValueChange={(value) => handleInputChange('essay_type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common_app">Common Application</SelectItem>
                      <SelectItem value="supplemental">Supplemental Essay</SelectItem>
                      <SelectItem value="piq">Personal Insight Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_admitted"
                    checked={formData.is_admitted}
                    onChange={(e) => handleInputChange('is_admitted', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="is_admitted">Was admitted to this college</Label>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Essay Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Created</span>
                  <Badge variant="outline">
                    {new Date(essay.created_at).toLocaleDateString()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <Badge variant="outline">
                    {new Date(essay.updated_at).toLocaleDateString()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant={essay.verified ? "default" : "secondary"}>
                    {essay.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
