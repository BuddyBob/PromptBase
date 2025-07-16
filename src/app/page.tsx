import Link from "next/link"
import { BookOpen, Filter, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  A Public Repo for Real, Admitted College Essays.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Search by school, prompt, or major. Learn from the best.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/essays">
                  <Button>Explore Essays</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Simple steps to help you find inspiration and succeed in your college applications.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12 lg:gap-16 mt-8">
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card">
                  <div className="p-3 rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Browse Real Essays</h3>
                  <p className="text-muted-foreground text-center">
                    Read through essays from students who got admitted to top schools.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Filter className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Filter By Criteria</h3>
                  <p className="text-muted-foreground text-center">
                    Find essays by college, prompt type, major, or word count.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Submit Your Own</h3>
                  <p className="text-muted-foreground text-center">
                    Help others by sharing your successful essays with the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Coming Soon</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Advanced Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We're working on new tools to make your college application journey even better.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:gap-16 mt-8 opacity-70">
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card">
                  <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground text-center">Get insights on what makes successful essays stand out.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card">
                  <h3 className="text-xl font-bold">Essay Builder Tools</h3>
                  <p className="text-muted-foreground text-center">
                    Interactive tools to help structure and improve your essays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
