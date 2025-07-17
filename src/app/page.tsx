import Link from "next/link"
import { BookOpen, Filter, Upload, Sparkles, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 float-gentle"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-blue-50 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 float-gentle animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-50 dark:bg-gray-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 rotate-slow"></div>
      </div>
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative bg-background dark:bg-gray-900">
          <div className="container px-4 md:px-6 relative z-10" >
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-6 fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700 slide-in-bottom">
                  <Sparkles className="w-4 h-4" />
                  Discover Real Success Stories
                </div>
                
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none slide-in-left">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    A Public Repo for Real,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-gray-800 dark:from-blue-400 dark:to-gray-200 bg-clip-text text-transparent">
                    Admitted College Essays
                  </span>
                </h1>
                
                <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed slide-in-right">
                  Search by school, prompt, or major. Learn from the best and get inspired by real essays that got students into their dream colleges.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 scale-in">
                <Link href="/essays">
                  <Button className="btn-minimal text-lg px-8 py-3 shadow-lg hover-lift">
                    <Zap className="w-5 h-5 mr-2" />
                    Explore Essays
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button variant="outline" className="text-lg px-8 py-3 border-2 border-gray-200 hover:border-blue-300 bg-white/60 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300 hover-lift">
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Your Essay
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 p-6 rounded-2xl card-minimal hover-lift shadow-lg fade-in-delay">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-800 dark:from-blue-400 dark:to-gray-200 bg-clip-text text-transparent">1000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Essays</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-blue-600 dark:from-gray-300 dark:to-blue-400 bg-clip-text text-transparent">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-gray-700 dark:from-blue-300 dark:to-gray-300 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Majors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4 fade-in">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-gray-900 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
                  Simple steps to help you find inspiration and succeed in your college applications.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12 lg:gap-16 mt-12">
                <div className="group relative scale-in">
                  <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl card-minimal hover-lift transition-all duration-500">
                    <div className="relative">
                      <div className="p-4 rounded-2xl bg-blue-500 shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/50 transition-all duration-300">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">1</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Browse Real Essays</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Read through essays from students who got admitted to top schools across the country.
                    </p>
                  </div>
                </div>
                
                <div className="group relative scale-in" style={{animationDelay: '0.2s'}}>
                  <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl card-minimal hover-lift transition-all duration-500">
                    <div className="relative">
                      <div className="p-4 rounded-2xl bg-gray-600 shadow-lg group-hover:shadow-gray-200 dark:group-hover:shadow-gray-900/50 transition-all duration-300">
                        <Filter className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">2</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Filter By Criteria</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Find essays by college, prompt type, major, or word count to match your needs.
                    </p>
                  </div>
                </div>
                
                <div className="group relative scale-in" style={{animationDelay: '0.4s'}}>
                  <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl card-minimal hover-lift transition-all duration-500">
                    <div className="relative">
                      <div className="p-4 rounded-2xl bg-gray-700 shadow-lg group-hover:shadow-gray-200 dark:group-hover:shadow-gray-900/50 transition-all duration-300">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">3</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Submit Your Own</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Help others by sharing your successful essays with the community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-animate opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700">
                  <Target className="w-4 h-4" />
                  Ready to Get Started?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-blue-600 to-gray-800 dark:from-blue-400 dark:to-gray-200 bg-clip-text text-transparent">
                    Start Your Journey Today
                  </span>
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
                  Join thousands of students who have found inspiration and success through our platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 scale-in">
                <Link href="/essays">
                  <Button className="btn-minimal text-lg px-8 py-3 shadow-lg hover-lift">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Essays Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
