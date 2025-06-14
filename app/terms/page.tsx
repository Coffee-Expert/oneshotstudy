"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

// This would normally come from your API
const fetchTermsData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    title: "Terms and Conditions",
    lastUpdated: "May 15, 2024",
    sections: [
      {
        heading: "Acceptance of Terms",
        content:
          "By accessing or using One Shot Engineer's website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
      },
      {
        heading: "Use License",
        content:
          "Permission is granted to temporarily download one copy of the materials on One Shot Engineer's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on One Shot Engineer's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server.",
      },
      {
        heading: "User Accounts",
        content:
          "Some features of the website may require registration for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password. You agree not to disclose your password to any third party.",
      },
      {
        heading: "User Content",
        content:
          "Our website may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the website, including its legality, reliability, and appropriateness. By posting content to the website, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the website.",
      },
      {
        heading: "Educational Content",
        content:
          "The educational content provided on One Shot Engineer is for informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.",
      },
      {
        heading: "Disclaimer",
        content:
          "The materials on One Shot Engineer's website are provided on an 'as is' basis. One Shot Engineer makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, One Shot Engineer does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.",
      },
      {
        heading: "Limitations",
        content:
          "In no event shall One Shot Engineer or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on One Shot Engineer's website, even if One Shot Engineer or a One Shot Engineer authorized representative has been notified orally or in writing of the possibility of such damage.",
      },
      {
        heading: "Revisions and Errata",
        content:
          "The materials appearing on One Shot Engineer's website could include technical, typographical, or photographic errors. One Shot Engineer does not warrant that any of the materials on its website are accurate, complete or current. One Shot Engineer may make changes to the materials contained on its website at any time without notice. One Shot Engineer does not, however, make any commitment to update the materials.",
      },
      {
        heading: "Governing Law",
        content:
          "These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
      },
    ],
  }
}

export default function TermsPage() {
  const [termsData, setTermsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTermsData()
        setTermsData(data)
      } catch (error) {
        console.error("Failed to load terms data:", error)
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
                <Skeleton className="h-12 w-[300px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
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
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{termsData?.title}</h1>
                <p className="text-muted-foreground">Last Updated: {termsData?.lastUpdated}</p>
              </div>
              <div className="mx-auto max-w-3xl py-12 space-y-8">
                {termsData?.sections.map((section: any, index: number) => (
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
