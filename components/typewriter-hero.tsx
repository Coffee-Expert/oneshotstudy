"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

export function TypewriterHero() {
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

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000
    const currentPhrase = phrases[currentPhraseIndex]

    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      } else {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        } else {
          setIsPaused(true)
        }
      }
    }, isPaused ? pauseTime : typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases])

  return (
    <section
      id="hero"
      className="relative w-full dark:from-background dark:to-muted/40  text-center"
    >
      {/* Optional radial background pattern */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-8 max-w-4xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
          <span className="block mb-4">One Shot Study</span>
          <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
            {currentText}
            <span className="animate-pulse text-primary">|</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Comprehensive courses, notes, and resources for engineering students. Everything you need to excel in your B.Tech journey.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="/courses"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold shadow-md transition duration-200 hover:shadow-lg hover:bg-primary/90 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Courses
          </motion.a>

          <motion.a
            href="/notes"
            className="inline-flex items-center justify-center rounded-md border border-muted bg-background text-foreground px-8 py-4 text-lg font-semibold transition duration-200 hover:bg-muted hover:text-foreground/90 hover:shadow-md focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Download Notes
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
