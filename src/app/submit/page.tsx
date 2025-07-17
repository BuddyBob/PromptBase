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
import { PromptInput } from "@/components/ui/prompt-input"
import { Checkbox } from "@/components/ui/checkbox"
import { colleges, majors, prompts, createEssay, getSession } from "@/lib/supabase"
import { LoginRecommendation } from "@/components/login-recommendation"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(100, {
    message: "Essay must be at least 100 characters.",
  }),
  college: z.string().min(1, {
    message: "Please select a college.",
  }),
  prompt: z.string().min(10, {
    message: "Please enter the essay prompt (at least 10 characters).",
  }),
  major: z.string().min(1, {
    message: "Please select a major.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (e.g., 2023).",
  }),
  includeProof: z.boolean(),
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
      title: "",
      content: "",
      college: "",
      prompt: "",
      major: "",
      year: new Date().getFullYear().toString(),
      includeProof: false,
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

      // Create essay object for Supabase
      const essayData = {
        title: values.title,
        content: values.content,
        college: values.college,
        prompt: values.prompt,
        major: values.major,
        word_count: wordCount,
        year: parseInt(values.year),
        verified: false, // New essays start unverified
        author_name: values.submitAnonymously ? 'Anonymous' : undefined, // Let createEssay handle default
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
      <div className="container px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Thank You!</h1>
        <p className="text-slate-500 max-w-md mb-8">
          Your essay has been submitted and is now under review. We appreciate your contribution to helping other
          students!
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Submit Another Essay</Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Submit Your Essay</h1>
        <p className="text-slate-500">
          Share your successful college essay to help other students. Your contribution will be reviewed before being
          added to our repository. All personal information will be removed.
        </p>
      </div>

      <Card className="p-6 max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
            <FormField
              control={form.control as any}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Essay Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Common App - Personal Growth" {...field} />
                  </FormControl>
                  <FormDescription>Give your essay a descriptive title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control as any}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <FormControl>
                      <SearchableSelect
                        options={colleges.slice(1)}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a college"
                      />
                    </FormControl>
                    <FormDescription>The college you were admitted to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Essay Prompt</FormLabel>
                    <FormControl>
                      <PromptInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter the full essay prompt you responded to..."
                      />
                    </FormControl>
                    <FormDescription>The exact prompt/question you answered in your essay.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control as any}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <SearchableSelect
                        options={majors.slice(1)}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a major"
                      />
                    </FormControl>
                    <FormDescription>Your intended or declared major.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2023" {...field} />
                    </FormControl>
                    <FormDescription>The year you were admitted.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control as any}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Essay Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your essay here..." className="min-h-[300px]" {...field} />
                  </FormControl>
                  <FormDescription>Your complete essay. Personal information will be redacted.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Anonymous submission option */}
            <FormField
              control={form.control as any}
              name="submitAnonymously"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Submit anonymously</FormLabel>
                    <FormDescription>
                      Check this box to submit your essay anonymously. Your name will not be displayed publicly,
                      even though you are logged in.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />


            <FormField
              control={form.control as any}
              name="includeProof"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include proof of admission (optional)</FormLabel>
                    <FormDescription>
                      You can upload proof of admission to receive a verification badge. This will be reviewed privately
                      and not shared publicly.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Essay"}
            </Button>
          </form>
        </Form>
      </Card>
        
    </div>
  )
}
