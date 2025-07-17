import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client for browser
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

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
  created_at: string
  updated_at: string
  user_id?: string
  author_name?: string
  author_email?: string
}

// Type definitions for essay data
export type EssayData = {
  title: string;
  college: string;
  prompt: string;
  major: string;
  word_count: number;
  content: string;
  year: number;
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

// Create a new essay (allows anonymous submissions)
export async function createEssay(essayData: EssayData & { author_name?: string }) {
  const session = await getSession();
  
  const essayToInsert = {
    ...essayData,
    user_id: session?.user.id || null,
    author_name: essayData.author_name || session?.user.email || 'Anonymous',
    author_email: session?.user.email || null,
  };

  const { error } = await supabase.from('essays').insert(essayToInsert);
  if (error) throw error;
}

// Update an essay (only if the logged-in user is the owner)
export async function updateEssay(essayId: string, updatedData: Partial<EssayData>) {
  const session = await getSession();
  if (!session) throw new Error('User not logged in');

  const { error } = await supabase
    .from('essays')
    .update(updatedData)
    .eq('id', essayId)
    .eq('user_id', session.user.id);
  if (error) throw error;
}

// Delete an essay (only if the logged-in user is the owner)
export async function deleteEssay(essayId: string) {
  const session = await getSession();
  if (!session) throw new Error('User not logged in');

  // First, verify that the user owns this essay
  const { data: essay, error: fetchError } = await supabase
    .from('essays')
    .select('user_id')
    .eq('id', essayId)
    .single();

  if (fetchError) throw fetchError;
  if (!essay || essay.user_id !== session.user.id) {
    throw new Error('You can only delete your own essays');
  }

  // Delete all likes associated with this essay (regardless of who liked it)
  const { error: likesError } = await supabase
    .from('likes')
    .delete()
    .eq('essay_id', essayId);
  
  if (likesError) throw likesError;

  // Then, delete the essay itself
  const { error: essayError } = await supabase
    .from('essays')
    .delete()
    .eq('id', essayId)
    .eq('user_id', session.user.id);
  
  if (essayError) throw essayError;
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
  const session = await getSession();
  if (!session) throw new Error('User not logged in');

  // Check if the user has already liked the essay
  const { data: existingLike, error: checkError } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('essay_id', essayId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') throw checkError; // Handle unexpected errors
  if (existingLike) throw new Error('You have already liked this essay');

  // Insert the like
  const { error } = await supabase.from('likes').insert({
    user_id: session.user.id,
    essay_id: essayId,
  });
  if (error) throw error;
}


export async function unlikeEssay(essayId: string) {
  const session = await getSession();
  if (!session) throw new Error('User not logged in');

  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', session.user.id)
    .eq('essay_id', essayId);
  if (error) throw error;
}


export async function getLikeCount(essayId: string) {
  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('essay_id', essayId);

  if (error) throw error;
  return count || 0;
}

// Authentication functions
export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) throw error;
}

// Function to log out
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

    window.location.reload();
}

// Function to get the current user session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Constants for filters (these can still be static)
export const colleges = [
  "All Colleges",
  // Ivy League
  "Harvard University",
  "Yale University", 
  "Princeton University",
  "Columbia University",
  "University of Pennsylvania",
  "Dartmouth College",
  "Brown University",
  "Cornell University",
  
  // Top Public Universities
  "UC Berkeley",
  "UCLA",
  "UC San Diego",
  "UC Santa Barbara",
  "UC Irvine",
  "UC Davis",
  "UC Santa Cruz",
  "UC Riverside",
  "UC Merced",
  "University of Michigan",
  "University of Virginia",
  "University of North Carolina at Chapel Hill",
  "University of Georgia",
  "University of Florida",
  "University of Texas at Austin",
  "University of Wisconsin-Madison",
  "University of Illinois at Urbana-Champaign",
  "Ohio State University",
  "Penn State University",
  "University of Washington",
  "Georgia Institute of Technology",
  "University of Maryland",
  "Purdue University",
  "Indiana University",
  "University of Minnesota",
  "University of Colorado Boulder",
  "University of Arizona",
  "Arizona State University",
  "University of Utah",
  "University of Oregon",
  "Oregon State University",
  "University of Iowa",
  "Iowa State University",
  
  // Top Private Universities
  "Stanford University",
  "MIT",
  "California Institute of Technology",
  "University of Chicago",
  "Northwestern University",
  "Duke University",
  "Johns Hopkins University",
  "Washington University in St. Louis",
  "Vanderbilt University",
  "Rice University",
  "Notre Dame",
  "Georgetown University",
  "Carnegie Mellon University",
  "Emory University",
  "University of Southern California",
  "Tufts University",
  "Wake Forest University",
  "Boston College",
  "Boston University",
  "Northeastern University",
  "New York University",
  "Fordham University",
  "University of Rochester",
  "Case Western Reserve University",
  "Lehigh University",
  "Villanova University",
  "Syracuse University",
  "University of Miami",
  "Tulane University",
  "Southern Methodist University",
  "Baylor University",
  "Texas Christian University",
  "University of Denver",
  "Santa Clara University",
  "Pepperdine University",
  "Loyola Marymount University",
  
  // Liberal Arts Colleges
  "Williams College",
  "Amherst College",
  "Swarthmore College",
  "Wellesley College",
  "Pomona College",
  "Bowdoin College",
  "Carleton College",
  "Middlebury College",
  "Claremont McKenna College",
  "Harvey Mudd College",
  "Davidson College",
  "Haverford College",
  "Vassar College",
  "Colby College",
  "Hamilton College",
  "Bates College",
  "Grinnell College",
  "Oberlin College",
  "Macalester College",
  "Reed College",
  "Kenyon College",
  "Bucknell University",
  "Colgate University",
  "Colorado College",
  "Trinity College",
  
  // Specialized Schools
  "Babson College",
  "Bentley University",
  "Berklee College of Music",
  "Cooper Union",
  "Fashion Institute of Technology",
  "Juilliard School",
  "Parsons School of Design",
  "Rhode Island School of Design",
  "Savannah College of Art and Design",
  "School of Visual Arts",
  "The New School",
  "Webb Institute",
  
  // State Universities
  "University of Alabama",
  "Auburn University",
  "University of Arkansas",
  "University of California System",
  "Colorado State University",
  "University of Connecticut",
  "University of Delaware",
  "Florida State University",
  "University of Hawaii",
  "Boise State University",
  "University of Idaho",
  "University of Illinois System",
  "University of Kansas",
  "University of Kentucky",
  "Louisiana State University",
  "University of Maine",
  "University of Mississippi",
  "University of Missouri",
  "University of Montana",
  "University of Nebraska",
  "University of Nevada",
  "University of New Hampshire",
  "Rutgers University",
  "University of New Mexico",
  "SUNY System",
  "North Carolina State University",
  "University of North Dakota",
  "Oklahoma State University",
  "University of Oklahoma",
  "Portland State University",
  "University of Rhode Island",
  "University of South Carolina",
  "University of South Dakota",
  "University of Tennessee",
  "Texas A&M University",
  "Utah State University",
  "University of Vermont",
  "Virginia Tech",
  "Washington State University",
  "West Virginia University",
  "University of Wyoming"
]

export const prompts = [
    "All Prompts",
    "Personal Growth",
    "Identity/Background",
    "Community/Impact",
    "Leadership",
    "Creativity",
    "Academic Interest / Why Major",
    "Why Us / Fit",
    "Challenge / Setback",
    "Additional Info",
    "Short Takes / Quick Hits",
    "Roommate / Personality"
]

export const majors = [
  "All Majors",
  
  // STEM Fields
  "Computer Science",
  "Software Engineering",
  "Computer Engineering",
  "Data Science",
  "Information Technology",
  "Cybersecurity",
  "Artificial Intelligence",
  "Machine Learning",
  "Robotics",
  "Game Design",
  "Web Development",
  
  // Engineering
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
  "Materials Engineering",
  "Nuclear Engineering",
  "Petroleum Engineering",
  "Systems Engineering",
  
  // Physical Sciences
  "Physics",
  "Chemistry",
  "Mathematics",
  "Statistics",
  "Astronomy",
  "Astrophysics",
  "Geology",
  "Meteorology",
  "Environmental Science",
  "Earth Sciences",
  
  // Life Sciences
  "Biology",
  "Biochemistry",
  "Biophysics",
  "Biotechnology",
  "Microbiology",
  "Molecular Biology",
  "Cell Biology",
  "Genetics",
  "Neuroscience",
  "Marine Biology",
  "Ecology",
  "Zoology",
  "Botany",
  "Pre-Med",
  "Pre-Dental",
  "Pre-Veterinary",
  "Public Health",
  "Health Sciences",
  "Kinesiology",
  "Exercise Science",
  "Sports Medicine",
  "Nutrition",
  "Nursing",
  "Physical Therapy",
  "Occupational Therapy",
  
  // Business & Economics
  "Business Administration",
  "Economics",
  "Finance",
  "Accounting",
  "Marketing",
  "Management",
  "Entrepreneurship",
  "International Business",
  "Supply Chain Management",
  "Human Resources",
  "Business Analytics",
  "Operations Management",
  "Real Estate",
  "Insurance",
  
  // Social Sciences
  "Psychology",
  "Sociology",
  "Anthropology",
  "Political Science",
  "International Relations",
  "Public Policy",
  "Criminal Justice",
  "Social Work",
  "Geography",
  "Urban Planning",
  "Public Administration",
  "Diplomacy",
  
  // Humanities
  "English Literature",
  "English Language",
  "Creative Writing",
  "Linguistics",
  "Philosophy",
  "History",
  "Art History",
  "Classical Studies",
  "Religious Studies",
  "Theology",
  "Comparative Literature",
  "Medieval Studies",
  "Renaissance Studies",
  "American Studies",
  "European Studies",
  "Asian Studies",
  "African Studies",
  "Latin American Studies",
  "Middle Eastern Studies",
  
  // Languages
  "Spanish",
  "French",
  "German",
  "Italian",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Portuguese",
  "Hindi",
  "Hebrew",
  "Latin",
  "Greek",
  
  // Arts & Design
  "Fine Arts",
  "Studio Art",
  "Graphic Design",
  "Industrial Design",
  "Interior Design",
  "Fashion Design",
  "Architecture",
  "Landscape Architecture",
  "Photography",
  "Film Studies",
  "Video Production",
  "Animation",
  "Digital Media",
  "Game Art",
  
  // Music & Performing Arts
  "Music",
  "Music Performance",
  "Music Composition",
  "Music Education",
  "Music Therapy",
  "Theatre Arts",
  "Acting",
  "Dance",
  "Musical Theatre",
  "Opera",
  "Jazz Studies",
  
  // Communications & Media
  "Communications",
  "Journalism",
  "Public Relations",
  "Advertising",
  "Broadcasting",
  "Media Studies",
  "Digital Communications",
  "Sports Communications",
  
  // Education
  "Elementary Education",
  "Secondary Education",
  "Special Education",
  "Educational Psychology",
  "Curriculum and Instruction",
  "Educational Leadership",
  "Early Childhood Education",
  
  // Law & Legal Studies
  "Pre-Law",
  "Legal Studies",
  "Paralegal Studies",
  "Constitutional Studies",
  
  // Agriculture & Natural Resources
  "Agriculture",
  "Agricultural Engineering",
  "Animal Science",
  "Plant Science",
  "Forestry",
  "Natural Resource Management",
  "Sustainable Agriculture",
  "Food Science",
  "Viticulture",
  
  // Other Professional Fields
  "Architecture",
  "Library Science",
  "Information Science",
  "Hospitality Management",
  "Tourism",
  "Recreation",
  "Sports Management",
  "Fashion Merchandising",
  "Culinary Arts",
  "Event Planning",
  
  // Interdisciplinary
  "Liberal Arts",
  "General Studies",
  "Undecided",
  "Double Major",
  "Custom/Interdisciplinary"
]
