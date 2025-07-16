"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SearchableSelect } from "@/components/ui/searchable-select"
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
  prompt: z.string().min(1, {
    message: "Please select a prompt type.",
  }),
  major: z.string().min(1, {
    message: "Please select a major.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (e.g., 2023).",
  }),
  includeProof: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function SubmitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

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
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true)
    try {


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
      }

      // Submit to Supabase (works for both logged-in and anonymous users)
      await createEssay(essayData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting essay:', error)
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false)
    }
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
                    <FormLabel>Prompt Type</FormLabel>
                    <FormControl>
                      <SearchableSelect
                        options={prompts.slice(1)}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a prompt type"
                      />
                    </FormControl>
                    <FormDescription>The type of prompt you responded to.</FormDescription>
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
