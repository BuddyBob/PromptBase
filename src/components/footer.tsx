import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-orange-100 dark:border-orange-800/30 bg-gradient-to-r from-orange-50/30 via-pink-50/30 to-purple-50/30 dark:from-orange-900/10 dark:via-pink-900/10 dark:to-purple-900/10 backdrop-blur-sm py-8 mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
            ✨ &copy; {new Date().getFullYear()} PromptBase - Made with 💝 for students
          </p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200 dark:border-orange-700/50">
            💡 <strong>Remember:</strong> These essays are for inspiration only. Write your own authentic story!
          </p>
        </div>
        <nav className="flex gap-6">
          <Link href="/about" className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
            About Us
          </Link>
          <Link href="/privacy" className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
