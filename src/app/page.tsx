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
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-blue-900 dark:to-indigo-800">
          {/* Floating essay documents and student photos */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating essay documents */}
            <motion.div 
              className="absolute top-16 left-8 w-32 h-40 bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-purple-900 rounded-lg shadow-lg opacity-30"
              animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, opacity: 0.6 }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gradient-to-r from-pink-300 to-purple-300 dark:bg-gradient-to-r dark:from-pink-600 dark:to-purple-600 rounded"></div>
                <div className="h-2 bg-gradient-to-r from-blue-300 to-indigo-300 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 rounded w-3/4"></div>
                <div className="h-2 bg-gradient-to-r from-green-300 to-teal-300 dark:bg-gradient-to-r dark:from-green-600 dark:to-teal-600 rounded w-1/2"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-32 right-12 w-28 h-36 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-lg shadow-lg opacity-35"
              animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, opacity: 0.6 }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gradient-to-r from-orange-300 to-red-300 dark:bg-gradient-to-r dark:from-orange-600 dark:to-red-600 rounded"></div>
                <div className="h-2 bg-gradient-to-r from-purple-300 to-pink-300 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 rounded w-2/3"></div>
                <div className="h-2 bg-gradient-to-r from-blue-300 to-cyan-300 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600 rounded w-3/4"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-32 left-16 w-36 h-44 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-lg shadow-lg opacity-30"
              animate={{ y: [-8, 12, -8], rotate: [-1, 1, -1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, opacity: 0.6 }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gradient-to-r from-teal-300 to-green-300 dark:bg-gradient-to-r dark:from-teal-600 dark:to-green-600 rounded"></div>
                <div className="h-2 bg-gradient-to-r from-indigo-300 to-purple-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-600 rounded w-4/5"></div>
                <div className="h-2 bg-gradient-to-r from-pink-300 to-rose-300 dark:bg-gradient-to-r dark:from-pink-600 dark:to-rose-600 rounded w-2/3"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-16 right-8 w-30 h-38 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-lg shadow-lg opacity-35"
              animate={{ y: [12, -8, 12], rotate: [1, -1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, opacity: 0.6 }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gradient-to-r from-violet-300 to-purple-300 dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 rounded"></div>
                <div className="h-2 bg-gradient-to-r from-cyan-300 to-blue-300 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 rounded w-3/4"></div>
                <div className="h-2 bg-gradient-to-r from-rose-300 to-pink-300 dark:bg-gradient-to-r dark:from-rose-600 dark:to-pink-600 rounded w-5/6"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 text-sm shadow-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <Heart className="w-4 h-4 text-blue-500" />
                  100% FREE • Community-Powered • Student-First
                </motion.div>
                
                <motion.h1 
                  className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  The Free Community<br />
                  for College Essays
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-600 dark:text-blue-300 max-w-2xl mx-auto leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  No paywalls, no subscriptions, no gatekeeping.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  Real essays from real students, shared freely to help the next generation succeed. Join our supportive community where everyone wins together.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link href="/essays">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1 }} 
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <Button className="text-lg px-8 py-3 h-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300">
                      🎉 Explore Free Essays →
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/submit">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -1 }} 
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <Button variant="outline" className="text-lg px-8 py-3 h-auto border-2 border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transform transition-all duration-300">
                      ✨ Help Others →
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
                  <span className="font-bold text-blue-600 dark:text-blue-400">A thriving community</span> where students support each other. <Link href="/essays" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Join for free today →</Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section - What Makes Us Different */}
        <section className="w-full py-16 md:py-20 bg-white dark:bg-gray-950 border-b">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Why Choose PromptBase?
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  We're different from other essay platforms. Here's how we put students first:
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-gradient-to-br from-purple-100 via-pink-50 to-red-100 dark:from-purple-900/30 dark:via-pink-900/20 dark:to-red-900/30 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 1, y: -10 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">💸 100% Free Forever</h3>
                  <p className="text-purple-700 dark:text-purple-200 text-sm leading-relaxed">
                    No hidden fees, no premium tiers, no paywalls. Every essay, every feature, completely free. 
                    We believe great college advice shouldn't cost a fortune.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: -1, y: -10 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">🤝 Community-Powered</h3>
                  <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                    Built by students, for students. Real essays from real people who got accepted. 
                    We grow stronger when we help each other succeed.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-green-100 via-teal-50 to-cyan-100 dark:from-green-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 p-6 rounded-xl border-2 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 1, y: -10 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">✨ Student-Friendly Design</h3>
                  <p className="text-green-700 dark:text-green-200 text-sm leading-relaxed">
                    Clean, intuitive interface that doesn't overwhelm. Easy filtering, smooth reading experience, 
                    and mobile-friendly design that works the way you think.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-800">
                  <span className="text-blue-600 dark:text-blue-400">✓</span> No account required to browse
                  <span className="text-purple-600 dark:text-purple-400">✓</span> No spam or marketing emails
                  <span className="text-indigo-600 dark:text-indigo-400">✓</span> No data tracking or selling
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
                  Real Stories, Real Impact
                </motion.div>
                
                <motion.h2 
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  From blank page anxiety to acceptance letters
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Every student in our community started exactly where you are now. See how they transformed their experiences 
                  into compelling stories that opened doors to their dream schools. No consultants, no expensive services - 
                  just authentic stories shared freely.
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
                        Browse Success Stories (Free)
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
                  How our community works
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Simple, free, and built on the power of students helping students
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl">
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05, duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-18 h-18 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <BookOpen className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">📚 Discover Real Essays</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Browse authentic essays from students who got accepted to top colleges - all shared freely
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-18 h-18 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <Search className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">🎯 Find Your Inspiration</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Filter by dream school, major, or essay type to find stories that resonate with your journey
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-teal-50 dark:hover:from-green-900/20 dark:hover:to-teal-900/20 transform transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-18 h-18 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <Users className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">💖 Pay It Forward</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Share your own successful essay to help the next generation of students (completely optional!)
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
                  Students love our free community
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Real feedback from students who found their voice without paying a penny
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
                    "I couldn't afford expensive essay consultants, but I didn't need them! The free essays here showed me exactly what admissions officers want to see. So grateful for this community!"
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
                    "This platform is amazing - completely free and filled with genuine stories from real students. No fake testimonials or sales pitches, just authentic help when you need it most."
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
                    "The community here is incredible - students genuinely helping each other without expecting anything in return. After getting accepted, I shared my essay to help others. It's the circle of kindness!"
                  </blockquote>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <Link href="/essays">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -1 }} 
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button className="text-lg px-8 py-3 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-300">
                      🚀 Start browsing for free
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
