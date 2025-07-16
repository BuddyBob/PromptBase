import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} PromptBase. All rights reserved.</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-slate-500 max-w-md">
            Disclaimer: Essays are shared for educational purposes only. Do not plagiarize or submit others&apos; work
            as your own.
          </p>
        </div>
        <nav className="flex gap-4">
          <Link href="/about" className="text-xs text-slate-500 hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/privacy" className="text-xs text-slate-500 hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-slate-500 hover:underline underline-offset-4">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
