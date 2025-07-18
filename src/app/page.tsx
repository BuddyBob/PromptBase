"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, Search, Users, Heart, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800">
          {/* Floating essay documents and student photos */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating essay documents */}
            <motion.div 
              className="absolute top-16 left-8 w-32 h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-32 right-12 w-28 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-25"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-32 left-16 w-36 h-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-20"
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-16 right-8 w-30 h-38 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-25"
              animate={{ y: [12, -8, 12] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            {/* Floating student photos */}
            <motion.div 
              className="absolute top-20 left-1/4 w-20 h-20 rounded-full overflow-hidden opacity-15 shadow-lg"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/pexels-ketut-subiyanto-4560083.jpg"
                alt="Student studying"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </motion.div>
            
            <motion.div 
              className="absolute top-40 right-1/4 w-16 h-16 rounded-full overflow-hidden opacity-20 shadow-lg"
              animate={{ y: [15, -15, 15] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/20943606.jpg"
                alt="Student writing"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </motion.div>

            <motion.div 
              className="absolute bottom-40 left-1/3 w-18 h-18 rounded-full overflow-hidden opacity-15 shadow-lg"
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/8772513.jpg"
                alt="Students collaborating"
                width={72}
                height={72}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-sm shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  Made by students, for students
                </motion.div>
                
                <motion.h1 
                  className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  Write Your Best<br />
                  College Essays Possible
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-600 dark:text-blue-300 max-w-2xl mx-auto leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Apply to colleges with confidence.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  We'll help you tell your story and capture your unique strengths.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link href="/essays">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="text-lg px-8 py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                      Read essay examples →
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/submit">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="text-lg px-8 py-3 h-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 shadow-lg">
                      Share your essay →
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Student success stats with photos */}
              <motion.div 
                className="flex items-center justify-center gap-4 mt-12 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-sm">
                    <Image
                      src="/pexels-zen-chung-5538616.jpg"
                      alt="Student"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-sm">
                    <Image
                      src="/pexels-ena-marinkovic-1814213-3640930.jpg"
                      alt="Student"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-sm">
                    <Image
                      src="/pexels-ketut-subiyanto-4560083.jpg"
                      alt="Student"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Helping</span> students and parents succeed in college admissions. <Link href="/essays" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Join our community today →</Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature Section with Photos */}
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <BookOpen className="w-4 h-4" />
                  Real Stories, Real Success
                </motion.div>
                
                <motion.h2 
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  From struggling with essays to acceptance letters
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Every student here started just like you - staring at a blank page, wondering what to write. 
                  See how they turned their experiences into compelling stories that opened doors to their dream schools.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <Link href="/essays">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Browse Success Stories
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/pexels-zen-chung-5538616.jpg"
                        alt="Student studying with laptop"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/pexels-element5-1370296.jpg"
                        alt="Students collaborating"
                        width={300}
                        height={225}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/pexels-ena-marinkovic-1814213-3640930.jpg"
                        alt="Student writing essay"
                        width={300}
                        height={225}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/pexels-ketut-subiyanto-4560083.jpg"
                        alt="Success infographic"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-12 text-center">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  How it works
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Three simple steps to find inspiration for your college application
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl">
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05, duration: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Browse real essays</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Read essays from students who got into top schools
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Find your match</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Filter by school, major, or essay type
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Give back</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Share your own essay to help future students
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Students love PromptBase
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Here's what students are saying about finding their inspiration
                </p>
              </div>
              
              {/* Multiple testimonials with photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="/pexels-zen-chung-5538616.jpg"
                        alt="Sarah"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Sarah M.</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Stanford '27</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-sm">
                    "I was stuck on my Common App essay for weeks. Reading real examples here helped me find my voice and write something authentic. Got into my dream school!"
                  </blockquote>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="/pexels-ena-marinkovic-1814213-3640930.jpg"
                        alt="Alex"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Alex R.</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">MIT '26</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-sm">
                    "The essays here showed me that vulnerability and authenticity matter more than perfect grammar. My 'messy' story got me into engineering school!"
                  </blockquote>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border md:col-span-2 lg:col-span-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="/pexels-element5-1370296.jpg"
                        alt="Maya"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Maya K.</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Harvard '25</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-sm">
                    "Found essays from students with similar backgrounds. It gave me confidence that my story was worth telling. Now I'm paying it forward by sharing mine!"
                  </blockquote>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <Link href="/essays">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="text-lg px-8 py-3 h-auto">
                      Start reading stories
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
