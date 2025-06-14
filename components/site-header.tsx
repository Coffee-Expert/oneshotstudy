"use client"
import { redirect } from 'next/navigation';
import { useState } from "react"
import Link from "next/link"
import { Menu, X, Coffee, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

/**
 * SiteHeader Component
 * Main navigation header with responsive design
 * Includes logo, navigation links, support button, and mobile menu
 */
export function SiteHeader() {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /**
   * Toggles mobile menu open/closed state
   * Used for hamburger menu on mobile devices
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  /**
   * Opens UPI payment interface for supporting the platform
   * Pre-filled with the specified UPI ID for donations
   */
  const handleSupportClick = () => {
    window.location.href = "/support-us"

    // Create UPI payment URL with pre-filled details
    const upiId = "9473692928@yapl"
    const amount = "50" // Default amount in INR
    const note = "Support One Shot Study"

    // UPI URL format for payment apps
    const upiUrl = `upi://pay?pa=${upiId}&pn=One Shot Engineer&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`

    // Try to open UPI app, fallback to showing UPI ID
    try {
      window.open(upiUrl, "_blank")
    } catch (error) {
      alert(`UPI ID: ${upiId}\nAmount: ₹${amount}\nNote: ${note}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand name */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">OSS</span>
          </div>
          <span className="font-bold text-xl text-slate-800 hidden sm:inline-block">One Shot Study</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/courses" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
            Courses
          </Link>
          <Link href="/notes" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
            Notes
          </Link>
          <Link href="/internships" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
            Internships
          </Link>
          <Link href="/quantum" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
            AKTU Quantum
          </Link>
          <Link
            href="/alerts"
            className="text-slate-600 hover:text-slate-800 transition-colors font-medium flex items-center gap-1"
          >
            <Bell className="h-4 w-4" />
            Alerts
          </Link>
          <Link href="/blog" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
            Blog
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Support Us Button with Coffee Icon */}
          {/* <Button
            onClick={handleSupportClick}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Coffee className="h-4 w-4" />
            Support Us 
          </Button> */}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
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

      {/* Mobile Navigation Menu */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSupportClick={handleSupportClick}
      />
    </header>
  )
}
