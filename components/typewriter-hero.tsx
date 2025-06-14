"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

/**
 * TypewriterHero Component
 * Creates an animated typewriter effect for the main hero text
 * Cycles through different phrases to showcase platform features
 */
export function TypewriterHero() {
  // Array of phrases to cycle through in the typewriter effect
  const phrases = [
    "Your one stop study hub",
    "Master Engineering Concepts",
    "Ace Your Exams",
    "Land Your Dream Job",
    "Build Your Future",
  ]

  // State management for typewriter animation
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    /**
     * Typewriter animation logic
     * Handles typing, pausing, and deleting text with realistic timing
     */
    const typeSpeed = isDeleting ? 50 : 100 // Faster deletion, slower typing
    const pauseTime = 2000 // Pause duration when phrase is complete

    const timer = setTimeout(
      () => {
        const currentPhrase = phrases[currentPhraseIndex]

        if (isPaused) {
          // Pause completed, start deleting
          setIsPaused(false)
          setIsDeleting(true)
        } else if (isDeleting) {
          // Deleting characters
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            // Finished deleting, move to next phrase
            setIsDeleting(false)
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        } else {
          // Typing characters
          if (currentText.length < currentPhrase.length) {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1))
          } else {
            // Finished typing, pause before deleting
            setIsPaused(true)
          }
        }
      },
      isPaused ? pauseTime : typeSpeed,
    )

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases])

  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
      {/* Main heading with typewriter effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
          {/* Static part of the heading */}
          <span className="block mb-4">One Shot Study</span>

          {/* Animated typewriter text with cursor */}
          <span className="block text-3xl md:text-4xl lg:text-5xl text-slate-600">
            {currentText}
            <span className="animate-pulse text-slate-400">|</span>
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive courses, notes, and resources for engineering students. Everything you need to excel in your
          B.Tech journey.
        </p>
      </motion.div>

      {/* Call-to-action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.a
          href="/courses"
          className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Courses
        </motion.a>

        <motion.a
          href="/notes"
          className="border-2 border-slate-800 text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Notes
        </motion.a>
      </motion.div>
    </div>
  )
}
