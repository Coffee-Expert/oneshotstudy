"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Youtube, Send } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackButton } from "@/components/back-button"

const fadeInUp = {
  initial: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-8 md:py-12 px-4 md:px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="mb-6">
            <BackButton href="/" label="Back to Home" />
          </div>

          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 relative text-stone-800">
              Contact Us
              <svg
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-80 h-6"
                viewBox="0 0 400 25"
                fill="none"
              >
                <path
                  d="M20 18 Q 100 8 200 15 Q 300 22 380 12"
                  stroke="#78716c"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Reach out to us for support, collaborations, or just to say hi. We love hearing from our community.
            </p>
          </motion.div>

          <motion.div className="grid gap-8 md:grid-cols-2" variants={staggerContainer}>
            {/* Support Contact Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-stone-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <Mail className="h-5 w-5" />
                    Support
                  </CardTitle>
                  <CardDescription className="text-stone-600">
                    General queries, technical issues, or feedback?
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                  <div className="flex items-center gap-3 text-stone-600">
                    <Mail className="h-4 w-4" />
                    <span>oneshotengineer@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Phone className="h-4 w-4" />
                    <span>+91 94736 92928</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-6 border-stone-300 text-stone-700 hover:bg-stone-200"
                  >
                    <Link href="mailto:oneshotengineer@gmail.com">Send Message</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Media Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-stone-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <Send className="h-5 w-5" />
                    Connect Online
                  </CardTitle>
                  <CardDescription className="text-stone-600">
                    Let&apos;s build a better community, together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                   <div className="flex items-center gap-3 text-stone-600">
                    <Phone className="h-4 w-4" />
                    <Link
                      href="https://chat.whatsapp.com/DOifOx5wRGa66ZCmi9xakz"
                      target="_blank"
                      className="hover:underline"
                    >
                      @oneshotengineer WhatsApp Community
                    </Link>
                  </div> 
                  <div className="flex items-center gap-3 text-stone-600">
                    <Youtube className="h-4 w-4" />
                    <Link
                      href="https://youtube.com/@oneshotengineer"
                      target="_blank"
                      className="hover:underline"
                    >
                      YouTube Channel
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="mt-16 text-center" variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 text-stone-800">Want to Collaborate?</h2>
            <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              If you have ideas, partnership proposals, or initiatives to share, we&apos;re all ears.
            </p>
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-4"
            >
              <Link href="mailto:oneshotengineer@gmail.com">Pitch a Collaboration</Link>
            </Button>
          </motion.div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
