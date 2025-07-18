"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PromptInput } from "@/components/ui/prompt-input"
import { Checkbox } from "@/components/ui/checkbox"
import { colleges, majors, prompts, createEssay, getSession } from "@/lib/supabase"
import { LoginRecommendation } from "@/components/login-recommendation"
import { motion } from "motion/react"

const formSchema = z.object({
  content: z.string().min(100, {
    message: "Essay must be at least 100 characters.",
  }),
  college: z.string().min(1, {
    message: "Please select the college or platform this essay is for.",
  }),
  prompt: z.string().min(1, {
    message: "Please provide the prompt or select 'Unknown'.",
  }),
  submitAnonymously: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function SubmitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      content: "",
      college: "",
      prompt: "",
      submitAnonymously: false,
    },
  })

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession()
        setIsAuthenticated(!!session)
        if (!session) {
          setShowLoginModal(true)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
        setShowLoginModal(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true)
    try {
      // Ensure user is authenticated
      const session = await getSession()
      if (!session) {
        setShowLoginModal(true)
        setIsSubmitting(false)
        return
      }

      // Calculate word count
      const wordCount = values.content.trim().split(/\s+/).length

      // Generate a simple title from the prompt or college
      const autoTitle = values.prompt.length > 50 
        ? `${values.college} Essay` 
        : values.prompt.slice(0, 50) + "..."

      // Create essay object for Supabase
      const essayData = {
        title: autoTitle,
        content: values.content,
        college: values.college,
        prompt: values.prompt,
        major: "Unknown", // Default value, can be edited later
        word_count: wordCount,
        year: new Date().getFullYear(), // Current year as default
        verified: false,
        author_name: values.submitAnonymously ? 'Anonymous' : undefined,
      }

      // Submit to Supabase (only for authenticated users)
      await createEssay(essayData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting essay:', error)
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500">Checking authentication...</p>
      </div>
    )
  }

  // Show login requirement if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Login Required</h1>
        <p className="text-slate-500 max-w-md mb-8">
          You must be logged in to submit essays. This helps us maintain quality and prevents spam submissions.
        </p>
        <LoginRecommendation
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          message="Create an account to submit your essays and help other students succeed!"
          actionText="Sign in with Google"
          onContinueWithoutLogin={() => {
            // For submit page, we don't allow continuing without login
            // Just close the modal and they'll see the login requirement message
          }}
        />
        <Button onClick={() => setShowLoginModal(true)} className="bg-blue-600 hover:bg-blue-700">
          Sign in to Submit Essays
        </Button>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <motion.div 
        className="container px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1 
          className="text-3xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          Thank You!
        </motion.h1>
        <motion.p 
          className="text-gray-500 max-w-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Your essay has been submitted and is now under review. We appreciate your contribution to helping other
          students!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Essay</Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="container px-4 py-8 md:px-6 md:py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.2 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-4">Share Your Essay</h1>
        <p className="text-gray-500 mb-4">
          Help other students by sharing your college essay. Quick 3-step process - just paste your essay, 
          select the college, and add the prompt if you have it.
        </p>
        <motion.div 
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">⚡ Quick Submit Process:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li><strong>Step 1:</strong> Paste your essay content</li>
            <li><strong>Step 2:</strong> Select college or platform (Common App, UC, etc.)</li>
            <li><strong>Step 3:</strong> Add prompt or mark as "Unknown"</li>
          </ul>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
            ✨ Additional details like major and admission status can be added later
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        <Card className="p-6 max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
              
              {/* Step 1: Essay Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <FormField
                  control={form.control as any}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Step 1: Your Essay</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste your complete essay here..." 
                          className="min-h-[300px] text-base leading-relaxed" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Copy and paste your complete college essay. We'll automatically remove any personal information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Step 2: College/Platform */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <FormField
                  control={form.control as any}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Step 2: College or Platform</FormLabel>
                      <FormControl>
                        <SearchableSelect
                          options={[...colleges.slice(1), "Common Application", "UC System", "Other"]}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select college or platform"
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the college this essay was written for, or select a platform like "Common Application"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </motion.div>

              {/* Step 3: Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <FormField
                  control={form.control as any}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Step 3: Essay Prompt</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <PromptInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Paste the full prompt, or type a short description..."
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => field.onChange("Unknown")}
                        className="text-xs"
                      >
                        Mark as "Unknown"
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add the essay prompt if you have it, or click "Unknown" to skip this step
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </motion.div>

              {/* Anonymous submission option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.2 }}
              >
                <FormField
              control={form.control as any}
              name="submitAnonymously"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium">Submit anonymously</FormLabel>
                    <FormDescription>
                      Your name won't be displayed publicly with this essay
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Essay"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </Card>
      </motion.div>
    </motion.div>
  )
}
