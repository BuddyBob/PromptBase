"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Heart, 
  BookOpen, 
  Edit3, 
  Trash2, 
  User, 
  Calendar,
  TrendingUp,
  Eye,
  Plus,
  Filter,
  Search,
  Settings,
  LogOut,
  Star,
  BookMarked,
  FileText,
  Target,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Essay, 
  getSession, 
  getUserEssays, 
  getUserSavedEssays, 
  getUserLikedEssays,
  deleteEssay,
  logout,
  saveEssay,
  unsaveEssay
} from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type DashboardTab = 'overview' | 'my-essays' | 'saved' | 'liked' | 'stats'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [myEssays, setMyEssays] = useState<Essay[]>([])
  const [savedEssays, setSavedEssays] = useState<Essay[]>([])
  const [likedEssays, setLikedEssays] = useState<Essay[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const session = await getSession()
      if (!session) {
        router.push('/essays')
        return
      }
      
      setUser(session.user)
      
      // Load all user data
      const [myEssaysData, savedEssaysData, likedEssaysData] = await Promise.all([
        getUserEssays(session.user.id),
        getUserSavedEssays(session.user.id),
        getUserLikedEssays(session.user.id)
      ])
      
      setMyEssays(myEssaysData)
      setSavedEssays(savedEssaysData)
      setLikedEssays(likedEssaysData)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEssay = async (essayId: string) => {
    if (window.confirm('Are you sure you want to delete this essay?')) {
      try {
        await deleteEssay(essayId)
        setMyEssays(myEssays.filter(essay => essay.id !== essayId))
      } catch (error) {
        console.error('Error deleting essay:', error)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const filteredEssays = (essays: Essay[]) => {
    return essays.filter(essay => 
      essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      essay.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      essay.major.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getStats = () => {
    // For now, use simple stats until we add likes count properly
    const totalViews = 0 // Will be implemented with view tracking
    const totalLikes = 0 // Will be implemented with proper likes counting
    const avgWordCount = myEssays.length > 0 
      ? Math.round(myEssays.reduce((sum, essay) => sum + essay.word_count, 0) / myEssays.length)
      : 0
    
    return { totalViews, totalLikes, avgWordCount }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <BookOpen className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Home', icon: User },
    { id: 'my-essays', label: 'My Stories', icon: FileText },
    { id: 'saved', label: 'Saved', icon: BookMarked },
    { id: 'stats', label: 'Analytics', icon: TrendingUp }
  ]

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-blue-900 dark:to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative inline-block">
            <motion.div 
              className="text-5xl mb-4"
              animate={{ 
                rotate: [0, 8, -8, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              👋
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">{user?.user_metadata?.name || user?.email?.split('@')[0] || 'Buddy'}</span>!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your personal space to manage essays, celebrate achievements, and connect with the community
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => router.push('/submit')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">My Stories</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{myEssays.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Essays shared</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">Saved</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{savedEssays.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For inspiration</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl">
                <BookMarked className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">Community Love</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalLikes}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Likes received</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                <Heart className="w-6 h-6 text-red-500 dark:text-red-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.div
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id as DashboardTab)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Search */}
        {(activeTab === 'my-essays' || activeTab === 'saved' || activeTab === 'liked') && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search essays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <OverviewSection user={user} stats={stats} myEssays={myEssays} />
            )}
            
            {activeTab === 'my-essays' && (
              <EssayGrid 
                essays={filteredEssays(myEssays)} 
                title="My Essays"
                emptyMessage="You haven't submitted any essays yet."
                showActions={true}
                onDelete={handleDeleteEssay}
              />
            )}
            
            {activeTab === 'saved' && (
              <EssayGrid 
                essays={filteredEssays(savedEssays)} 
                title="Saved Essays"
                emptyMessage="You haven't saved any essays yet."
              />
            )}
            
            {activeTab === 'liked' && (
              <EssayGrid 
                essays={filteredEssays(likedEssays)} 
                title="Liked Essays"
                emptyMessage="You haven't liked any essays yet."
              />
            )}
            
            {activeTab === 'stats' && (
              <StatsSection stats={stats} myEssays={myEssays} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Overview Section Component
function OverviewSection({ user, stats, myEssays }: any) {
  const recentEssays = myEssays.slice(0, 3)
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Essays Submitted</span>
              <Badge variant="secondary">{myEssays.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Likes Received</span>
              <Badge variant="secondary">{stats.totalLikes}</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link href="/submit">
              <Button className="w-full justify-start mb-2" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Essay
              </Button>
            </Link>
            <Link href="/essays">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Essays
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {recentEssays.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Essays</h3>
          <div className="space-y-4">
            {recentEssays.map((essay: Essay) => (
              <div key={essay.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{essay.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{essay.college} • {essay.major}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{essay.word_count} words</Badge>
                  <Link href={`/essays/${essay.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// Essay Grid Component
function EssayGrid({ essays, title, emptyMessage, showActions = false, onDelete }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {essays.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-300">{emptyMessage}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essays.map((essay: Essay) => (
            <motion.div
              key={essay.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{essay.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {essay.college} • {essay.major}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{essay.word_count} words</Badge>
                    <Badge variant="outline">{essay.year}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/essays/${essay.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    {showActions && (
                      <>
                        <Link href={`/essays/${essay.id}/edit`}>
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onDelete(essay.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Stats Section Component
function StatsSection({ stats, myEssays }: any) {
  const collegeStats = myEssays.reduce((acc: any, essay: Essay) => {
    acc[essay.college] = (acc[essay.college] || 0) + 1
    return acc
  }, {})
  
  const majorStats = myEssays.reduce((acc: any, essay: Essay) => {
    acc[essay.major] = (acc[essay.major] || 0) + 1
    return acc
  }, {})
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Writing Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Essays</span>
              <span className="font-bold">{myEssays.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Word Count</span>
              <span className="font-bold">{stats.avgWordCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Words</span>
              <span className="font-bold">{myEssays.reduce((sum: number, essay: Essay) => sum + essay.word_count, 0)}</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Likes</span>
              <span className="font-bold">{stats.totalLikes}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Likes per Essay</span>
              <span className="font-bold">{myEssays.length > 0 ? Math.round(stats.totalLikes / myEssays.length) : 0}</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Achievement</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>Contributor</span>
            </div>
            {myEssays.length >= 5 && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Active Writer</span>
              </div>
            )}
            {stats.totalLikes >= 10 && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Community Favorite</span>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Essays by College</h3>
          <div className="space-y-2">
            {Object.entries(collegeStats).map(([college, count]) => (
              <div key={college} className="flex justify-between">
                <span className="truncate">{college}</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Essays by Major</h3>
          <div className="space-y-2">
            {Object.entries(majorStats).map(([major, count]) => (
              <div key={major} className="flex justify-between">
                <span className="truncate">{major}</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
