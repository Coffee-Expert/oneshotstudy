import Link from "next/link"
import { Mail, Phone } from "lucide-react"

/**
 * SiteFooter Component
 * Main footer with navigation links, contact info, and motivational message
 * Features background text and comprehensive site navigation
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white relative overflow-hidden">
      

      <div className="container relative z-10 flex flex-col gap-8 py-8 md:py-12">
        {/* Footer content organized in responsive grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand and social links section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-slate-800">One Shot Study</h3>
            <p className="text-sm text-slate-600">Your comprehensive study resource for B.Tech students.</p>

            {/* Social media links */}
            <div className="flex gap-2 mt-2">
              <Link href="https://www.youtube.com/@OneShotEngineer" target="_blank" rel="noreferrer">
                <div className="h-5 w-5 text-slate-500 hover:text-slate-700 transition-colors">
                  {/* YouTube icon SVG */}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="sr-only">YouTube</span>
              </Link>
              {/* <Link href="https://chat.whatsapp.com/invite/engineering-community" target="_blank" rel="noreferrer">
                <Phone className="h-5 w-5 text-slate-500 hover:text-slate-700 transition-colors" />
                <span className="sr-only">WhatsApp</span>
              </Link> */}
            </div>
          </div>

          {/* Resources navigation section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-slate-800">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              <li>
                <Link href="/courses" className="hover:text-slate-800 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-slate-800 transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-slate-800 transition-colors">
                  Internship Alerts
                </Link>
              </li>
              <li>
                <Link href="/quantum" className="hover:text-slate-800 transition-colors">
                  AKTU Quantum PDFs
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-slate-800 transition-colors">
                  Important Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* Company information section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-slate-800">Company</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-slate-800 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-800 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-slate-800 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-slate-800 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-800 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-slate-800">Contact</h3>
            <p className="text-sm text-slate-600">Have questions or feedback?</p>
            <Link
              href="mailto:oneshotengineer@gmail.com"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Mail className="h-4 w-4" />
              oneshotengineer@gmail.com
            </Link>
          </div>
        </div>

        {/* Footer bottom section with copyright and motivational message */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} One Shot Engineer. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-bold text-slate-700 opacity-80">Made with ❤️ by students, for students.</p>
          </div>
        </div>
      </div>

      {/* Large motivational text at the bottom */}
      <div className="bg-slate-50 py-8">
        <div className="container text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-300 select-none">ALL THE BEST</h2>
        </div>
      </div>
    </footer>
  )
}
