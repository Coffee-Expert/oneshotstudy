"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, PlayCircle, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FeaturedCourse } from "@/components/featured-course"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TypewriterHero } from "@/components/typewriter-hero"
import { LoadingSpinner } from "@/components/loading-spinner"

// Reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const FEATURES = [
  {
    title: "Organized Courses",
    description: "Structured video lectures organized by subject and topic for easy navigation.",
    icon: PlayCircle,
  },
  {
    title: "Downloadable Notes",
    description: "Access comprehensive notes and study materials to complement video lectures.",
    icon: BookOpen,
  },
  {
    title: "Internship Alerts",
    description: "Stay updated with the latest internship opportunities for engineering students.",
    icon: Briefcase,
  },
  {
    title: "YouTube Integration",
    description: "Direct access to our YouTube channel with organized playlists and tutorials.",
    icon: PlayCircle,
  },
  {
    title: "AKTU Resources",
    description: "Specialized content for AKTU students with quantum PDFs and exam updates.",
    icon: GraduationCap,
  },
  {
    title: "Student Community",
    description: "Connect with fellow students through our WhatsApp groups and discussions.",
    icon: Users,
  },
]

const COURSES = [
  {
    title: "Design Thinking",
    description: "Learn design thinking methodology and human-centered design principles.",
    slug: "/courses/design-thinking",
    icon: "code",
    level: "Beginner" as const,
    videos: 6,
    hours: 8,
  },
  {
    title: "Cloud Computing",
    description: "Master cloud computing concepts, services, and deployment models.",
    slug: "/courses/cloud-computing",
    icon: "server",
    level: "Intermediate" as const,
    videos: 5,
    hours: 7,
  },
  {
    title: "Software Testing",
    description: "Learn software testing methodologies, tools, and best practices.",
    slug: "/courses/software-testing",
    icon: "code",
    level: "Intermediate" as const,
    videos: 6,
    hours: 6,
  },
  {
    title: "Social Media & Digital Marketing",
    description: "Understand social media strategies and digital marketing techniques.",
    slug: "/courses/social-media-digital-marketing",
    icon: "globe",
    level: "Beginner" as const,
    videos: 5,
    hours: 5,
  },
]

export default function Home() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleNavigation = (href: string) => {
    setIsNavigating(true)
    setTimeout(() => router.push(href), 500) // uses Next.js SPA routing
  }

  if (isNavigating) return <LoadingSpinner />

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero */}
        <motion.section
          className="space-y-8 pb-12 pt-8 md:pb-16 md:pt-12 lg:py-40"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center px-6">
            <motion.div variants={fadeInUp}>
              <Link
                href="https://www.youtube.com/@OneShotEngineer"
                className="rounded-2xl bg-stone-200 px-6 py-2 text-sm font-medium text-stone-700 hover:bg-stone-300 transition-all shadow-sm"
                target="_blank"
              >
                Visit our YouTube Channel
              </Link>
            </motion.div>

            <motion.h1
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl relative text-stone-800 leading-tight"
              variants={fadeInUp}
            >
              <TypewriterHero  />
              <svg className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md h-8" viewBox="0 0 400 30" fill="none" aria-hidden="true">
                <path d="M20 20 Q 100 8 200 15 Q 300 22 380 12" stroke="#78716c" strokeWidth="3" opacity="0.6" />
                <path d="M25 22 Q 120 10 220 17 Q 320 24 375 14" stroke="#78716c" strokeWidth="2" opacity="0.4" />
              </svg>
            </motion.h1>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          id="features"
          className="container space-y-8 bg-stone-100 py-12 md:py-16 lg:py-32 rounded-3xl mx-auto my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-[58rem] text-center space-y-6 px-6">
            <h2 className="font-heading text-3xl md:text-6xl relative text-stone-800">
              Features
              <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-6" viewBox="0 0 200 25" fill="none" aria-hidden="true">
                <path d="M15 18 Q 60 8 100 15 Q 140 22 185 12" stroke="#78716c" strokeWidth="2" opacity="0.5" />
              </svg>
            </h2>
            <p className="text-stone-600 sm:text-lg">
              Everything you need to excel in your engineering studies in one place.
            </p>
          </div>

          <motion.div
            className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {FEATURES.map(({ title, description, icon: Icon }, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg border bg-white/90 backdrop-blur-sm p-2 transition-all">
                  <CardHeader className="flex items-center justify-between pb-3">
                    <CardTitle className="text-sm font-medium text-stone-800">{title}</CardTitle>
                    <Icon className="h-5 w-5 text-stone-600" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-stone-600">{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Courses */}
        <motion.section
          id="courses"
          className="container py-12 md:py-16 lg:py-32 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-6 max-w-[58rem] mx-auto">
            <h2 className="font-heading text-3xl md:text-6xl relative text-stone-800">
              Available Courses
              <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-6" viewBox="0 0 300 25" fill="none" aria-hidden="true">
                <path d="M20 18 Q 80 8 150 15 Q 220 22 280 12" stroke="#78716c" strokeWidth="2" opacity="0.5" />
              </svg>
            </h2>
            <p className="text-stone-600 sm:text-lg">Explore our curated courses with YouTube integration and notes.</p>
          </div>

          {/* Course Cards */}
          <div className="mt-12">
            <motion.div
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {COURSES.map((course, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <FeaturedCourse {...course} />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-12">
              <Button
                className="bg-stone-700 hover:bg-stone-800 text-stone-100 px-8 py-4 text-lg shadow-lg hover:shadow-xl"
                onClick={() => handleNavigation("/courses")}
              >
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Community */}
        <motion.section
          id="community"
          className="container py-12 md:py-16 lg:py-32 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-6 max-w-[58rem] mx-auto">
            <h2 className="font-heading text-3xl md:text-6xl text-stone-800 relative">
              Join Our Community
              <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-6" viewBox="0 0 280 25" fill="none" aria-hidden="true">
                <path d="M20 18 Q 70 8 140 15 Q 210 22 260 12" stroke="#78716c" strokeWidth="2" opacity="0.5" />
              </svg>
            </h2>
            <p className="text-stone-600 sm:text-lg">Connect with fellow students, ask questions, collaborate on projects.</p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button asChild variant="outline" size="lg" className="border-2 border-stone-300 text-stone-700">
                <Link href="https://chat.whatsapp.com/DOifOx5wRGa66ZCmi9xakz" target="_blank">
                  Join WhatsApp Group <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-stone-700 text-stone-100">
                <Link href="https://www.youtube.com/@OneShotEngineer" target="_blank">
                  Subscribe on YouTube <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
