"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft, MapPin, Calendar, Clock, Building, Users, 
  DollarSign, ExternalLink, GraduationCap, Briefcase, ListChecks,
  Gift, Lightbulb, Link as LinkIcon // Renamed Link to LinkIcon to avoid conflict
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define the InternshipData interface based on your schema
interface InternshipData {
  id: string;
  title: string;
  companyName: string | null;
  companyLogo: string | null;
  website: string | null; // This will be used as the application link
  location: string | null;
  jobType: string | null;
  batch: string | null;
  streamRequired: string | null;
  salaryStipend: string | null;
  duration: string | null;
  applicationDeadline: string | null; // ISO string from timestamp with time zone
  description: string | null;
  skills: string[] | null;
  perks: string[] | null;
  interviewRounds: string[] | null;
  created_at: string | null;
}

export default function InternshipDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [internshipData, setInternshipData] = useState<InternshipData | null>(null)
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
        // Corrected Edge Function name to getintdet
        const res = await fetch(`https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/getintdet?id=${id}`, {
          cache: "no-store", // Ensure fresh data on each visit
        })
        if (!res.ok) {
          if (res.status === 404) {
            setInternshipData(null); // Explicitly set to null if not found
          }
          throw new Error(`Failed to fetch internship details: ${res.statusText}`);
        }

        const data: InternshipData = await res.json()
        setInternshipData(data || null)
      } catch (err) {
        console.error("Error fetching internship:", err)
        setInternshipData(null) // Set to null on error to show "not found"
      } finally {
        setLoading(false)
      }
    }

    fetchInternshipDetails()
  }, [id])

  const handleApplyClick = () => {
    // Use internshipData.website as the application link
    if (internshipData?.website) {
      sessionStorage.setItem('currentDownloadInfo', JSON.stringify({
        url: internshipData.website,
        title: `${internshipData.title} Application`,
        description: `Application form for ${internshipData.title} at ${internshipData.companyName}`,
        returnPath: `/internships/${id}`, // Return to this page
      }));
      router.push("/download-page");
    } 
  }

  // Format the application deadline
  const formattedDeadline = internshipData?.applicationDeadline
    ? new Date(internshipData.applicationDeadline).toLocaleDateString("en-IN", {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : "N/A";

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!internshipData) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full text-center p-8 border border-border shadow-md">
            <CardTitle className="text-2xl font-bold text-foreground mb-4">Internship Not Found</CardTitle>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find the internship you&apos;re looking for. It might have been removed or the link is incorrect.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/internships">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Internships
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <motion.div
          className="container max-w-7xl py-8 md:py-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted">
            <Link href="/internships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Internships
            </Link>
          </Button>

          {/* Hero Section */}
          <Card className="p-6 md:p-8 mb-8 border border-border shadow-lg bg-card">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-0 mb-6">
              <div className="flex items-center gap-6">
                {internshipData.companyLogo && (
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-input bg-background p-1">
                    <Image
                      src={internshipData.companyLogo}
                      alt={`${internshipData.companyName} logo`}
                      layout="fill"
                      objectFit="contain"
                      className="p-1" // Add padding to image inside div
                      onError={(e) => {
                        // fallback in case logo doesn't load
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                    {internshipData.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-semibold text-muted-foreground mt-1">
                    {internshipData.companyName}
                  </p>
                  {internshipData.website && (
                    <Link href={internshipData.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 mt-2">
                        Visit Company Website <LinkIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm md:text-base text-foreground p-0 pt-4 border-t border-border/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{internshipData.location || "Not Specified"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Duration: {internshipData.duration || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Apply by: {formattedDeadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Stipend: {internshipData.salaryStipend || "Unpaid"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Type: {internshipData.jobType || "Internship"}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>Batch: {internshipData.batch || "Any"}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              {internshipData.description && (
                <Card className="border border-border shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">About the Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {/* You might want to parse Markdown if description contains it */}
                      <p>{internshipData.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Eligibility */}
              {(internshipData.streamRequired || internshipData.batch) && (
                <Card className="border border-border shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Eligibility & Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-2">
                    {internshipData.streamRequired && (
                      <p className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">Stream Required:</span> {internshipData.streamRequired}</p>
                    )}
                    {internshipData.batch && (
                      <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">Target Batch:</span> {internshipData.batch}</p>
                    )}
                  </CardContent>
                </Card>
              )}


              {/* Skills */}
              {internshipData.skills && internshipData.skills.length > 0 && (
                <Card className="border border-border shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {internshipData.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-foreground border border-input py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Perks */}
              {internshipData.perks && internshipData.perks.length > 0 && (
                <Card className="border border-border shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Perks & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {internshipData.perks.map((perk: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Interview Rounds */}
              {internshipData.interviewRounds && internshipData.interviewRounds.length > 0 && (
                <Card className="border border-border shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Interview Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {internshipData.interviewRounds.map((round: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <ListChecks className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span>{round}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

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

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6"> {/* Added space-y for consistent spacing */}
              <Card className="sticky top-24 border border-border shadow-md bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    Apply for Internship
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 border-t border-border/70">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-foreground">
                      <span>Deadline:</span>
                      <span className="font-semibold text-primary">{formattedDeadline}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span>Duration:</span>
                      <span className="font-semibold text-primary">{internshipData.duration || "N/A"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <Button
                      onClick={handleApplyClick}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      size="lg"
                    >
                      <ExternalLink className="h-5 w-5" />
                      APPLY NOW
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      You&apos;ll be redirected to the official application page after a short timer.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar AdSense Block */}
              <Card className="border border-border shadow-sm bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Sponsored</CardTitle>
                </CardHeader>
                <CardContent>
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: '100%', height: '250px' }} // Added fixed size for placeholder
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
