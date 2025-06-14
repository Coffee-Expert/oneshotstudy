"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

// This would normally come from your API
const fetchPrivacyPolicyData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    title: "Privacy Policy",
    lastUpdated: "May 15, 2024",
    sections: [
      {
        heading: "Introduction",
        content:
          "At One Shot Engineer, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you. Please read this privacy policy carefully before using our services.",
      },
      {
        heading: "Information We Collect",
        content:
          "We collect several types of information from and about users of our website, including information by which you may be personally identified, such as name, email address, and phone number; information about your internet connection, the equipment you use to access our website, and usage details; and information about your preferences and interests to personalize your experience.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use information that we collect about you or that you provide to us: To present our website and its contents to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it; to notify you about changes to our website or any products or services we offer; and to improve our website and services.",
      },
      {
        heading: "Disclosure of Your Information",
        content:
          "We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide: To our subsidiaries and affiliates; to contractors, service providers, and other third parties we use to support our business; to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.",
      },
      {
        heading: "Data Security",
        content:
          "We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.",
      },
      {
        heading: "Your Rights",
        content:
          "You have the right to access, correct, or delete your personal information at any time. You can do this by contacting us at privacy@oneshotengineer.com. We may ask you to verify your identity before responding to such requests. You also have the right to data portability and the right to restrict or object to our processing of your personal data.",
      },
      {
        heading: "Changes to Our Privacy Policy",
        content:
          "We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting our website and this privacy policy to check for any changes.",
      },
      {
        heading: "Contact Information",
        content:
          "To ask questions or comment about this privacy policy and our privacy practices, contact us at: privacy@oneshotengineer.com or via our phone number: +91 9876543210.",
      },
    ],
  }
}

export default function PrivacyPolicyPage() {
  const [privacyData, setPrivacyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPrivacyPolicyData()
        setPrivacyData(data)
      } catch (error) {
        console.error("Failed to load privacy policy data:", error)
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{privacyData?.title}</h1>
                <p className="text-muted-foreground">Last Updated: {privacyData?.lastUpdated}</p>
              </div>
              <div className="mx-auto max-w-3xl py-12 space-y-8">
                {privacyData?.sections.map((section: any, index: number) => (
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
