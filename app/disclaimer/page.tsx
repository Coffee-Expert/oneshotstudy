"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

// This would normally come from your API
const fetchDisclaimerData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    title: "Disclaimer",
    lastUpdated: "May 15, 2024",
    sections: [
      {
        heading: "Educational Purpose",
        content:
          "The content provided on One Shot Engineer is for educational purposes only. While we strive to ensure the accuracy and completeness of the information, we make no warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information on our website is strictly at your own risk, and we will not be liable for any losses or damages in connection with the use of our website.",
      },
      {
        heading: "External Links",
        content:
          "Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with One Shot Engineer. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.",
      },
      {
        heading: "Copyright",
        content:
          "All content on this website, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of One Shot Engineer or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of One Shot Engineer and is protected by international copyright laws.",
      },
      {
        heading: "AKTU Quantum PDFs",
        content:
          "The AKTU Quantum PDFs provided on our website are shared for educational purposes only. These materials are the intellectual property of AKTU (Dr. A.P.J. Abdul Kalam Technical University) and are shared to facilitate learning for students. We do not claim ownership of these materials and recommend students to also refer to official sources.",
      },
      {
        heading: "Internship Information",
        content:
          "The internship opportunities listed on our website are collected from various sources. While we make efforts to verify the authenticity of these listings, we cannot guarantee the accuracy of all details or the legitimacy of all opportunities. Students are advised to conduct their own research before applying to any internship position.",
      },
      {
        heading: "Changes to Disclaimer",
        content:
          "One Shot Engineer reserves the right to make changes to this disclaimer at any time. We encourage visitors to frequently check this page for any changes. Your continued use of the website after any changes to this disclaimer constitutes your acceptance of such changes.",
      },
    ],
  }
}

export default function DisclaimerPage() {
  const [disclaimerData, setDisclaimerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDisclaimerData()
        setDisclaimerData(data)
      } catch (error) {
        console.error("Failed to load disclaimer data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-8 md:py-12 lg:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-12 w-[250px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{disclaimerData?.title}</h1>
                <p className="text-muted-foreground">Last Updated: {disclaimerData?.lastUpdated}</p>
              </div>
              <div className="mx-auto max-w-3xl py-12 space-y-8">
                {disclaimerData?.sections.map((section: any, index: number) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h2 className="text-2xl font-bold">{section.heading}</h2>
                    <p className="text-muted-foreground">{section.content}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
