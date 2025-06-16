import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/next';

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { LenisScroll } from "@/components/lenis-scroll"

const inter = Inter({ subsets: ["latin"] })

/**
 * Metadata configuration for SEO and social sharing
 * Defines how the site appears in search results and social media
 */
export const metadata: Metadata = {
  title: "One Shot Study - Your Complete Engineering Study Resource",
  description:
    "Master engineering concepts with comprehensive courses, notes, GATE preparation, and internship opportunities. Your one-stop destination for B.Tech success.",
  keywords: [
    "engineering",
    "B.Tech",
    "courses",
    "notes",
    "GATE",
    "internships",
    "study material",
    "CSE",
    "computer science",
  ],
  authors: [{ name: "One Shot StudyTeam" }],
  creator: "One Shot Engineer",
  publisher: "One Shot Engineer",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oneshotengineer.com",
    siteName: "One Shot Engineer",
    title: "One Shot Study- Your Complete Engineering Study Resource",
    description:
      "Master engineering concepts with comprehensive courses, notes, GATE preparation, and internship opportunities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Shot Study- Your Complete Engineering Study Resource",
    description:
      "Master engineering concepts with comprehensive courses, notes, GATE preparation, and internship opportunities.",
    creator: "@oneshotengineer",
  },
}

/**
 * Root Layout Component
 * Wraps all pages with common HTML structure, fonts, and global components
 * Includes smooth scrolling, toast notifications, and consistent styling
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" >
      <head>
        {/* Basic meta tags for responsive design and favicon */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/* Smooth scrolling component for better UX */}
        <LenisScroll />

        {/* Main content area - all pages render here */}
        {children}
        <Analytics />
        {/* Global toast notification system */}
        <Toaster />
      </body>
    </html>
  )
}
