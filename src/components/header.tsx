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
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-xl font-bold">PromptBase</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/essays" className="text-sm font-medium hover:underline underline-offset-4">
            Browse Essays
          </Link>
          <Link href="/submit" className="text-sm font-medium hover:underline underline-offset-4">
            Submit Essay
          </Link>
        </nav>
        <div className="flex items-center gap-5">
            <ThemeToggle />
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
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/essays"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                Browse Essays
              </Link>
              <Link
                href="/submit"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                Submit Essay
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {session ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {session.user?.email?.split("@")[0]}</span>
            <button
              onClick={logout}
              className="bg-destructive px-4 py-2 rounded hover:bg-destructive"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-muted px-4 py-2 rounded hover:bg-button-hover"
          >
            Login with Google
          </button>
        )}
        </div>
      </div>
    </header>
  )
}
