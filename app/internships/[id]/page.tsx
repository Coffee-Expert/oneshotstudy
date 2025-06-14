"use client"
import Image from "next/image";

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Clock, Building, Users, DollarSign, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"

/**
 * InternshipDetailsPage Component
 * Displays detailed information about a specific internship
 * Includes APPLY NOW button that redirects to timer page before external application
 */
export default function InternshipDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [internshipData, setInternshipData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Load AdSense script only on client
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    script.async = true
    script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXXXXXX") // Replace with your AdSense ID
    document.head.appendChild(script)
  }, [])

  // Re-initialize ads (after DOM update)
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("AdSense render failed:", e)
    }
  }, [internshipData])

  useEffect(() => {
    if (!id) return

    const fetchInternshipDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/getintid?id=${id}`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch internship details")

        const data = await res.json()
        setInternshipData(data || null)
      } catch (err) {
        console.error("Error fetching internship:", err)
        setInternshipData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchInternshipDetails()
  }, [id])

  const handleApplyClick = () => {
    if (internshipData?.applicationUrl) {
      const targetUrl = `/timer-download?url=${encodeURIComponent(internshipData.applicationUrl)}&type=internship`
      console.log("Redirecting to:", targetUrl) // DEBUG LOG
      router.push(targetUrl)
    } else {
      console.warn("Missing applicationUrl, cannot redirect.")
    }
  }
  
  

  if (loading) return <LoadingSpinner />

  if (!internshipData) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-50">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-12 text-center">
            <h1 className="text-2xl font-bold text-stone-800">Internship not found</h1>
            <p className="text-stone-600 mt-2">The internship you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild className="mt-6 bg-stone-700 hover:bg-stone-800 text-stone-100">
              <Link href="/internships">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Internships
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.div
          className="container py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-8 text-stone-600 hover:text-stone-800 hover:bg-stone-100">
            <Link href="/internships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Internships
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
  {/* Internship Header with Logo and Type Badge */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl md:text-4xl font-bold text-stone-800">{internshipData.title}</h1>
      <div className="flex items-center gap-2 text-stone-600">
        <Building className="h-5 w-5" />
        <span className="text-lg font-medium">{internshipData.company}</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {/* Company Logo */}
      {internshipData.logo_url && (
        <div className="h-20 w-20 rounded-md overflow-hidden bg-white shadow border border-stone-200 flex items-center justify-center">
          <Image
            src={internshipData.logo_url}
            alt={`${internshipData.company} logo`}
            width={800} height={400} 
            className="h-full w-full object-contain"
            onError={(e) => {
              // fallback in case logo doesn&apos;t load
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
      )}

      {/* Badge for internship type */}
      <Badge variant={internshipData.type === "paid" ? "default" : "secondary"} className="text-sm">
        {internshipData.type === "paid" ? "Paid" : "Unpaid"}
      </Badge>
    </div>
  </div>

                <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{internshipData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{internshipData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Apply by {internshipData.deadline}</span>
                  </div>
                  {internshipData.stipend && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{internshipData.stipend}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Internship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-700 leading-relaxed">{internshipData.description}</p>
                </CardContent>
              </Card>

              {/* Optional Ad: Mid-Content AdSense */}
              {/* <div className="py-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="fluid"
                  data-layout="in-article"
                  data-full-width-responsive="true"
                ></ins>
              </div> */}

              {/* Responsibilities */}
              {internshipData.responsibilities?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {internshipData.responsibilities.map((responsibility: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-stone-700">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Requirements */}
              {internshipData.requirements?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {internshipData.requirements.map((requirement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-stone-700">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Skills */}
              {internshipData.skills?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {internshipData.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-stone-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Positions:</span>
                      <span className="font-medium">{internshipData.positions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Start Date:</span>
                      <span className="font-medium">{internshipData.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Duration:</span>
                      <span className="font-medium">{internshipData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Deadline:</span>
                      <span className="font-medium text-red-600">{internshipData.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <Button
                      onClick={handleApplyClick}
                      className="w-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      APPLY NOW
                    </Button>
                    <p className="text-xs text-stone-500 mt-2 text-center">
                      You&apos;ll be redirected to the application page
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar AdSense Block */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Sponsored</CardTitle>
                </CardHeader>
                <CardContent>
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
                    data-ad-slot="XXXXXXXXXX" // Replace with your ad slot
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  ></ins>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
