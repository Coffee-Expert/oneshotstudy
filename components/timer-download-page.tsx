interface TimerDownloadPageProps {
  link: string
}


"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackButton } from "@/components/back-button"

export default function TimerDownloadPage({ link }: TimerDownloadPageProps) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [showLink, setShowLink] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setShowLink(true)
    }
  }, [timeLeft])

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <motion.div
          className="container max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center border border-stone-200 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-stone-800 text-xl">
                <Download className="h-6 w-6" />
                Download
              </CardTitle>
              <CardDescription className="text-stone-600 text-base leading-relaxed px-4">
                Preparing your download link...
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 pb-8">
              {!showLink ? (
                <motion.div className="space-y-6 text-stone-600">
                  <p className="text-lg font-medium">
                    Generating Download Link – {timeLeft} second{timeLeft !== 1 ? "s" : ""}
                  </p>

                  <div className="min-h-[150px] bg-stone-100 border border-dashed border-stone-300 rounded-md flex items-center justify-center px-4 py-6">
                    <p className="text-stone-500 text-sm">This space is for ads or announcements.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <motion.div
                    className="text-stone-700 text-3xl font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    Ready! 🎉
                  </motion.div>

                  <motion.p
                    className="text-stone-600 text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Your download is now available
                  </motion.p>

                  <Button
                    asChild
                    className="w-full bg-stone-700 hover:bg-stone-800 text-stone-100 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-3 h-5 w-5" />
                      Click here
                    </a>
                  </Button>
                </motion.div>
              )}

              <div className="mt-6">
                <BackButton
                  href="/"
                  label="Go Back"
                  className="w-full border-stone-300 text-stone-600 hover:bg-stone-100 py-3"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
