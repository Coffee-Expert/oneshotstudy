"use client"

import { motion } from "framer-motion"

/**
 * Simplified Loading Spinner Component
 * Clean and attractive loading animation with softer design
 */
export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50/95 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-8">
        {/* Simplified main spinner */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-stone-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Inner spinning element */}
          <motion.div
            className="absolute inset-2 h-12 w-12 rounded-full border-4 border-transparent border-t-stone-600"
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-6 h-4 w-4 rounded-full bg-stone-600"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Simple text animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-3"
        >
          <motion.h3
            className="text-lg font-semibold text-stone-700"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading...
          </motion.h3>

          {/* Simple dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-stone-600 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
