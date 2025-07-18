"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { supabase, loginWithGoogle, logout, getSession } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-black/20 border-b border-white/30 shadow-lg slide-in-bottom">
      <div className="absolute inset-0 bg-animate opacity-20"></div>
      <div className="container relative flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold group hover-lift">
          <div className="relative pulse-subtle">
            <span className="text-xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
              PromptBase
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 scale-in"></div>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 slide-in-left">
          <Link href="/" className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 relative group hover-lift">
            <span className="relative z-10">Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-700 group-hover:w-full transition-all duration-300"></span>
            <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
          <Link href="/essays" className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 relative group hover-lift" style={{animationDelay: '0.1s'}}>
            <span className="relative z-10">Browse Essays</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-stone-600 group-hover:w-full transition-all duration-300"></span>
            <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
          <Link href="/submit" className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 relative group flex items-center gap-1 hover-lift" style={{animationDelay: '0.2s'}}>
            <span className="relative z-10">Submit Essay</span>
            {!session && (
              <span className="text-xs bg-gradient-to-r from-stone-100 to-slate-100 dark:from-stone-800/50 dark:to-slate-800/50 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-full border border-stone-200 dark:border-stone-700 pulse-subtle">
                Login Required
              </span>
            )}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-stone-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
            <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
        </nav>
        <div className="flex items-center gap-3 slide-in-right">
          <div className="hover-lift">
            <ThemeToggle />
          </div>
          
          {session ? (
            <div className="flex items-center gap-4 fade-in">
              <div className="hidden sm:flex items-center gap-2 hover-lift">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-500 to-stone-600 flex items-center justify-center text-white font-semibold text-sm float-gentle">
                  {session.user?.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium bg-gradient-to-r from-slate-700 to-stone-700 dark:from-slate-300 dark:to-stone-300 bg-clip-text text-transparent">
                  {session.user?.email?.split("@")[0]}
                </span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="bg-background"
              >
                <span className="relative z-10">Logout</span>
                
              </Button>
            </div>
          ) : (
            <Button
              onClick={loginWithGoogle}
              className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover-lift scale-in"
            >
              <span className="relative z-10">Sign in with Google</span>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Button>
          )}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="glass">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-500 to-stone-500"></div>
                  Home
                </Link>
                <Link
                  href="/essays"
                  className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-stone-500 to-slate-600"></div>
                  Browse Essays
                </Link>
                <Link
                  href="/submit"
                  className="text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-600 to-stone-600"></div>
                  Submit Essay
                  {!session && (
                    <span className="text-xs bg-gradient-to-r from-stone-100 to-slate-100 dark:from-stone-800/50 dark:to-slate-800/50 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-full border border-stone-200 dark:border-stone-700">
                      Login Required
                    </span>
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
