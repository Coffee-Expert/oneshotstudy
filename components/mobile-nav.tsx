"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onSupportClick: () => void
}

/**
 * MobileNav Component
 * Responsive mobile navigation menu with smooth animations
 * Displays navigation links and support button for mobile devices
 */
export function MobileNav({ isOpen, onClose, onSupportClick }: MobileNavProps) {
  /**
   * Handles navigation link clicks
   * Closes mobile menu when user navigates to a new page
   */
  const handleLinkClick = () => {
    onClose()
  }

  /**
   * Handles support button click in mobile menu
   * Closes menu and triggers UPI payment flow
   */
  const handleMobileSupportClick = () => {
    onClose()
    onSupportClick()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Mobile menu content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50 md:hidden"
          >
            <nav className="container py-6 space-y-4">
              {/* Navigation Links */}
              <Link
                href="/courses"
                className="block py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                Courses
              </Link>
              <Link
                href="/notes"
                className="block py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                Notes
              </Link>
              <Link
                href="/internships"
                className="block py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                Internships
              </Link>
              <Link
                href="/quantum"
                className="block py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                AKTU Quantum
              </Link>
              <Link
                href="/alerts"
                className="flex items-center gap-2 py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                <Bell className="h-4 w-4" />
                Alerts
              </Link>
              <Link
                href="/blog"
                className="block py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium border-b border-slate-100"
                onClick={handleLinkClick}
              >
                Blog
              </Link>

              {/* Support Button */}
              <div className="pt-4">
                <Button
                  onClick={handleMobileSupportClick}
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <Coffee className="h-4 w-4" />
                  Support Us / Buy Me a Coffee
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
