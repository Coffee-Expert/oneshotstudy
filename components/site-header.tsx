"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

/**
 * SiteHeader Component
 * Uses your Tailwind theme's CSS variables
 */
export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSupportClick = () => {
    window.location.href = "/support-us"

    const upiId = "9473692928@yapl"
    const amount = "50"
    const note = "Support One Shot Study"

    const upiUrl = `upi://pay?pa=${upiId}&pn=One Shot Engineer&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`

    try {
      window.open(upiUrl, "_blank")
    } catch (error) {
      alert(`UPI ID: ${upiId}\nAmount: ₹${amount}\nNote: ${note}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 border-border backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OSS</span>
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:inline-block">One Shot Study</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Courses
          </Link>
          <Link href="/notes" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Notes
          </Link>
          <Link href="/internships" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Internships
          </Link>
          <Link href="/quantum" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            AKTU Quantum
          </Link>
          <Link
            href="/alerts"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1"
          >
            <Bell className="h-4 w-4" />
            Alerts
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Blog
          </Link>
        </nav>

        {/* Desktop Support Button (optional, you had it commented out) */}
        {/* 
        <div className="hidden md:flex items-center space-x-4">
          <Button
            onClick={handleSupportClick}
            variant="outline"
            className="border-border text-foreground hover:bg-muted flex items-center gap-2"
          >
            <Coffee className="h-4 w-4" />
            Support Us
          </Button>
        </div> 
        */}

        {/* Mobile Menu Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSupportClick={handleSupportClick}
      />
    </header>
  )
}
