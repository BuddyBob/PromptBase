import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for better TypeScript support
export type Essay = {
  id: string
  title: string
  college: string
  prompt: string
  major: string
  word_count: number
  year: number
  content: string
  verified: boolean
  likes: number
  created_at: string
  updated_at: string
}

// Database operations
export async function getEssays() {
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Essay[]
}

export async function getEssayById(id: string) {
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Essay
}

export async function createEssay(essay: Omit<Essay, 'id' | 'likes' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('essays')
    .insert([{ ...essay, likes: 0 }])
    .select()
    .single()
  
  if (error) throw error
  return data as Essay
}

export async function updateEssay(id: string, updates: Partial<Essay>) {
  const { data, error } = await supabase
    .from('essays')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Essay
}

export async function deleteEssay(id: string) {
  const { error } = await supabase
    .from('essays')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Filter functions for your website
export async function getEssaysByCollege(college: string) {
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .eq('college', college)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Essay[]
}

export async function getEssaysByMajor(major: string) {
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .eq('major', major)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Essay[]
}

export async function searchEssays(searchTerm: string) {
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Essay[]
}

// Like functionality 
export async function likeEssay(essayId: string) {
  // First get the current likes count
  const { data: essay, error: fetchError } = await supabase
    .from('essays')
    .select('likes')
    .eq('id', essayId)
    .single()
    
  if (fetchError) throw fetchError
  
  // Then increment the likes
  const { data, error } = await supabase
    .from('essays')
    .update({ likes: (essay.likes || 0) + 1 })
    .eq('id', essayId)
    .select()
    
  if (error) throw error
  return data[0]
}

export async function getLikesCount(essayId: string) {
  const { data, error } = await supabase
    .from('essays')
    .select('likes')
    .eq('id', essayId)
    .single()
  
  if (error) throw error
  return data?.likes || 0
}

// Constants for filters (these can still be static)
export const colleges = [
  "All Colleges",
  "Stanford University", 
  "Harvard University",
  "MIT",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "UC Berkeley",
  "Duke University",
  "Brown University",
  "Dartmouth College",
]

export const prompts = [
  "All Prompts",
  "Common App - Personal Growth",
  "Stanford Roommate",
  "UC PIQ - Creative Expression", 
  "Community Contribution",
  "Background and Identity",
  "Academic Interest",
  "Why Engineering",
  "Literary Influence",
  "Extracurricular Activity",
  "Challenge or Setback",
]

export const majors = [
  "All Majors",
  "Computer Science",
  "Biology", 
  "English Literature",
  "Economics",
  "Physics",
  "History",
  "Mechanical Engineering",
  "Philosophy",
  "Political Science",
  "Psychology",
]
