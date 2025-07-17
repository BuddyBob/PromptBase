import { createEssay } from './supabase'

export const sampleEssays = [
  {
    title: "Overcoming Challenges Through Coding",
    content: "When I first started learning to code, I never imagined that debugging a simple 'Hello World' program would teach me one of life's most valuable lessons about perseverance. It was my sophomore year of high school when I decided to take my first computer science class...",
    college: "Stanford University",
    prompt: "Tell us about something that is meaningful to you and why.",
    major: "Computer Science",
    year: 2023,
    author_name: "Alex Chen"
  },
  {
    title: "Finding Community Through Music",
    content: "The auditorium was silent except for the sound of my violin bow trembling against the strings. I had practiced this piece hundreds of times, but standing before an audience of my peers, everything felt different...",
    college: "Harvard University", 
    prompt: "Describe a place or environment where you are perfectly content. What do you do or experience there, and why is it meaningful to you?",
    major: "Music",
    year: 2024,
    author_name: "Maria Rodriguez"
  },
  {
    title: "The Science of Baking",
    content: "Most people see baking as an art, but I've always approached it as a science. The precise measurements, the chemical reactions between ingredients, the way temperature and timing can completely transform raw materials into something beautiful and delicious...",
    college: "MIT",
    prompt: "Tell us about something you do simply for the pleasure of it.",
    major: "Chemical Engineering", 
    year: 2023,
    author_name: "David Kim"
  },
  {
    title: "Building Bridges in My Community",
    content: "Growing up in a neighborhood where English and Spanish flowed seamlessly from house to house, I learned early that language could either be a bridge or a barrier. When my elderly neighbor Mrs. Patterson struggled to communicate with her new doctor...",
    college: "Yale University",
    prompt: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
    major: "International Relations",
    year: 2024, 
    author_name: "Sofia Gonzalez"
  },
  {
    title: "From Failure to Innovation",
    content: "The robot lay in pieces on my bedroom floor, a testament to three months of failed attempts at building something that could solve my grandmother's mobility challenges. Each broken servo and tangled wire represented another lesson learned the hard way...",
    college: "UC Berkeley",
    prompt: "Describe a time you failed. How did it affect you, and what did you learn from the experience?",
    major: "Mechanical Engineering",
    year: 2023,
    author_name: "Jason Wu"
  }
]

export async function addSampleEssays() {
  try {
    console.log('Adding sample essays...')
    for (const essay of sampleEssays) {
      const wordCount = essay.content.trim().split(/\s+/).length
      const essayWithWordCount = {
        ...essay,
        word_count: wordCount
      }
      await createEssay(essayWithWordCount)
      console.log(`Added essay: ${essay.title}`)
    }
    console.log('All sample essays added successfully!')
  } catch (error) {
    console.error('Error adding sample essays:', error)
  }
}
