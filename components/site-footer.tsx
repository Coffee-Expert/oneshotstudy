import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      <div className="container relative z-10 flex flex-col gap-8 py-8 md:py-12">
        {/* Grid Sections */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand & Social */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">One Shot Study</h3>
            <p className="text-sm text-muted-foreground">
              Your comprehensive study resource for B.Tech students.
            </p>
            <div className="flex gap-3 mt-2">
              {/* YouTube Icon */}
              <Link
                href="https://www.youtube.com/@OneShotEngineer"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* WhatsApp / Phone */}
              <Link
                href="https://chat.whatsapp.com/DOifOx5wRGa66ZCmi9xakz"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                { label: "Courses", href: "/courses" },
                { label: "Notes", href: "/notes" },
                { label: "Internship Alerts", href: "/internships" },
                { label: "AKTU Quantum PDFs", href: "/quantum" },
                { label: "Important Alerts", href: "/alerts" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Company</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Contact</h3>
            <p className="text-sm text-muted-foreground">Have questions or feedback?</p>
            <Link
              href="mailto:oneshotengineer@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              oneshotengineer@gmail.com
            </Link>
          </div>
        </div>

        {/* Bottom Footer Text */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} One Shot Engineer. All rights reserved.
          </p>
          <p className="font-bold text-foreground opacity-80">
            Made with ❤️ by students, for students.
          </p>
        </div>
      </div>

      {/* Motivational Footer Banner */}
      <div className="bg-muted py-8">
        <div className="container text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-muted-foreground select-none tracking-tight">
            ALL THE BEST
          </h2>
        </div>
      </div>
    </footer>
  )
}
