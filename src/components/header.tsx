"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { supabase, loginWithGoogle, logout, getSession } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { motion } from "motion/react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
          <motion.span 
            className="text-xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            PromptBase
          </motion.span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/essays" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              Browse Essays
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2">
              Share Your Story
              {!session && (
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                  Login required
                </span>
              )}
            </Link>
          </motion.div>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {session ? (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="hidden sm:flex items-center gap-2">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-medium text-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {session.user?.email?.charAt(0).toUpperCase()}
                </motion.div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {session.user?.email?.split("@")[0]}
                </span>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="bg-background"
                >
                  Logout
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                onClick={loginWithGoogle}
                className="bg-gray-800 hover:bg-gray-900 text-white"
              >
                Sign in with Google
              </Button>
            </motion.div>
          )}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/essays"
                  className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Browse Essays
                </Link>
                <Link
                  href="/submit"
                  className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Share Your Story
                  {!session && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded ml-2">
                      Login Required
                    </span>
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
