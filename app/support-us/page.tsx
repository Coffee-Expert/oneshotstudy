"use client"
import Image from "next/image";

import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * supportus Component
 * Refined donation UI with soft, neutral tones — not too white, not too dark.
 */
export default function SupportUs() {
  const upiId = '9473692928@yapl'
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState(100)

  const presetAmounts = [50, 100, 250, 500]

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 overflow-hidden">
      {/* Soft animated shapes */}
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gray-300 opacity-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gray-400 opacity-15"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
      />

      <motion.div
        className="relative w-full max-w-lg bg-gray-50 rounded-2xl shadow-md p-8 z-10 border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-3">
          Support Our Mission ❤️
        </h1>
        <p className="text-center text-gray-600 mb-6 leading-relaxed">
          Your contribution ensures every student, everywhere, has access to quality resources. Thank you for being part of this journey.
        </p>

        {/* Preset amounts */}
        <div className="flex justify-center gap-3 mb-5">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 
                ${amount === amt
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* UPI ID section */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div>
            <div className="text-xs text-gray-500">UPI ID</div>
            <div className="font-semibold text-lg text-gray-800">{upiId}</div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Actual QR Code */}
<div className="flex justify-center bg-white p-8 rounded-lg border border-gray-200 mb-6">
  <Image
  width={800} height={400} 
    src="/qr.svg"
    alt="UPI QR Code"
    className="w-40 h-40 object-contain"
  />
</div>


        {/* Donate button */}
        <button
          type="button"
          onClick={() => window.open(`upi://pay?pa=${upiId}&pn=One Shot Study&am=${amount}&cu=INR`, '_blank')}
          className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow mb-4"
        >
          Donate ₹{amount}
        </button>

        <p className="text-center text-sm text-gray-500">
          Every bit helps. Thank you for fueling free education.
        </p>
      </motion.div>
    </div>
  )
}
