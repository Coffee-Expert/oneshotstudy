"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

/**
 * TypewriterHero Component
 * Displays a heading with animated typewriter text that cycles through key phrases.
 */
export function TypewriterHero() {
  /**
   * ✅ Wrap the phrases in useMemo so they don’t trigger re-renders
   * This ensures the array is stable across renders
   */
  const phrases = useMemo(
    () => [
      "Your one stop study hub",
      "Master Engineering Concepts",
      "Ace Your Exams",
      "Land Your Dream Job",
      "Build Your Future",
    ],
    [],
  )

  // Index of the current phrase being typed
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  // Text currently displayed by the typewriter
  const [currentText, setCurrentText] = useState("")

  // State flags to manage typewriter animation flow
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Typing and deleting speeds in ms
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000 // Pause before deleting when phrase completes

    const currentPhrase = phrases[currentPhraseIndex]

    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true) // Start deleting after pause
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1)) // Delete one char
        } else {
          // Phrase fully deleted, move to next
          setIsDeleting(false)
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      } else {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1)) // Type one more char
        } else {
          setIsPaused(true) // Full phrase typed, now pause
        }
      }
    }, isPaused ? pauseTime : typeSpeed)

    // Cleanup the timer on component unmount or state change
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases])

  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-grey-800 leading-tight">
          <span className="block mb-4">One Shot Study</span>

          {/* Dynamic typewriter text */}
          <span className="block text-3xl md:text-4xl lg:text-5xl text-grey-600">
            {currentText}
            <span className="animate-pulse text-grey-400">|</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-grey-600 max-w-3xl mx-auto leading-relaxed">
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
          className="bg-grey-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-grey-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Courses
        </motion.a>

        <motion.a
          href="/notes"
          className="border-2 border-grey-800 text-grey-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-grey-800 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Notes
        </motion.a>
      </motion.div>
    </div>
  )
}
