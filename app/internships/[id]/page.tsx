"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft, MapPin, Calendar, Clock, Users,
  DollarSign, ExternalLink, GraduationCap, Briefcase, ListChecks,
  Gift, Lightbulb, Link as LinkIcon, Building, ChevronRight, BookOpen
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"

// Define the InternshipData interface
interface InternshipData {
  id: string;
  title: string;
  companyName: string | null;
  companyLogo: string | null;
  website: string | null;
  location: string | null;
  jobType: string | null;
  batch: string | null;
  streamRequired: string | null;
  salaryStipend: string | null;
  duration: string | null;
  applicationDeadline: string | null;
  description: string | null;
  skills: string[] | null;
  perks: string[] | null;
  interviewRounds: string[] | null;
  created_at: string | null;
}

// Format text with newlines and paragraphs
const formatDescription = (text: string | null) => {
  if (!text) return null;
  
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {paragraph.split('\n').map((line, lineIndex, lines) => (
        <span key={lineIndex}>
          {line}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
};

export default function InternshipDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [internshipData, setInternshipData] = useState<InternshipData | null>(null)
  const [loading, setLoading] = useState(true)

  // Format the application deadline
  const formattedDeadline = internshipData?.applicationDeadline
    ? new Date(internshipData.applicationDeadline).toLocaleDateString("en-IN", {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : "N/A";

  useEffect(() => {
    if (!id) return

    const fetchInternshipDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/getintid?id=${id}`, {
          cache: "no-store",
        })
        if (!res.ok) {
          if (res.status === 404) {
            setInternshipData(null);
          }
          const errorText = await res.text();
          throw new Error(`Failed to fetch internship details: ${res.statusText} - ${errorText}`);
        }

        const data: InternshipData = await res.json()
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
    if (internshipData?.website) {
      sessionStorage.setItem('currentDownloadInfo', JSON.stringify({
        url: internshipData.website,
        title: `${internshipData.title} Application`,
        description: `Application form for ${internshipData.title} at ${internshipData.companyName}`,
        returnPath: `/internships/${id}`,
      }));
      router.push("/download-page");
    } else {
      toast({
        title: "Application link not available",
        description: "This internship does not have an external application link provided.",
        variant: "destructive",
      });
    }
  }

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
          <Card className="max-w-md w-full text-center p-8 border border-border shadow-lg rounded-xl">
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
          {/* Back button */}
          <Button 
            variant="ghost" 
            asChild 
            className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted group"
          >
            <Link href="/internships">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Internships
            </Link>
          </Button>

          {/* Hero Section */}
          <Card className="p-6 md:p-8 mb-10 border border-border shadow-lg rounded-xl bg-gradient-to-br from-card to-card/70">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
              {internshipData.companyLogo && (
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden border border-input bg-white p-2 shadow-md">
                  <Image
                    src={internshipData.companyLogo}
                    alt={`${internshipData.companyName} logo`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/128x128/e0e0e0/555555?text=${internshipData.companyName ? internshipData.companyName.charAt(0) : '?'}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
              )}
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary py-1.5 px-3 rounded-full text-sm w-fit mx-auto md:mx-0">
                    {internshipData.jobType || "Internship"}
                  </Badge>
                  {internshipData && (
                    <Badge className="bg-green-500/10 text-green-600 py-1.5 px-3 rounded-full text-sm w-fit mx-auto md:mx-0">
                      New Opportunity
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
                  {internshipData.title}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                  <p className="text-xl font-semibold text-muted-foreground flex items-center justify-center md:justify-start">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    {internshipData.companyName || "Company Name N/A"}
                  </p>
                  
                  {internshipData.website && (
                    <Link href={internshipData.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 text-base">
                        Visit Website <LinkIcon className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <div className="flex items-center gap-1.5 bg-secondary/30 py-1.5 px-3 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{internshipData.location || "Not Specified"}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-secondary/30 py-1.5 px-3 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Apply by: {formattedDeadline}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-secondary/30 py-1.5 px-3 rounded-full">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{internshipData.salaryStipend || "Unpaid"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border/40">
              <div className="flex flex-col p-4 bg-background rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-foreground font-medium">{internshipData.duration || "N/A"}</p>
              </div>
              
              <div className="flex flex-col p-4 bg-background rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="font-medium">Batch</span>
                </div>
                <p className="text-foreground font-medium">{internshipData.batch || "Any"}</p>
              </div>
              
              <div className="flex flex-col p-4 bg-background rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span className="font-medium">Stream Required</span>
                </div>
                <p className="text-foreground font-medium">{internshipData.streamRequired || "Any"}</p>
              </div>
              
              <div className="flex flex-col p-4 bg-background rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="font-medium">Job Type</span>
                </div>
                <p className="text-foreground font-medium">{internshipData.jobType || "Internship"}</p>
              </div>
            </div>
          </Card>

          {/* Main Content and Sidebar Layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content area (left 2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="border border-border rounded-xl shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl font-bold text-foreground">Job Description</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
                    {formatDescription(internshipData.description) || (
                      <p className="text-muted-foreground italic">No description provided</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              {internshipData.skills && internshipData.skills.length > 0 && (
                <Card className="border border-border rounded-xl shadow-sm bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl font-bold text-foreground">Skills Required</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-3">
                      {internshipData.skills.map((skill: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-secondary/30 text-foreground border border-border text-base py-2 px-4 rounded-lg"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Perks */}
              {internshipData.perks && internshipData.perks.length > 0 && (
                <Card className="border border-border rounded-xl shadow-sm bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Gift className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl font-bold text-foreground">Perks & Benefits</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 text-foreground/90">
                      {internshipData.perks.map((perk: string, index: number) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3 text-lg pl-1 py-2 border-b border-border/30 last:border-0"
                        >
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Interview Rounds */}
              {internshipData.interviewRounds && internshipData.interviewRounds.length > 0 && (
                <Card className="border border-border rounded-xl shadow-sm bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <ListChecks className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl font-bold text-foreground">Interview Process</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {internshipData.interviewRounds.map((round: string, index: number) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border/30"
                        >
                          <div className="flex flex-col items-center">
                            <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold">{index + 1}</span>
                            </div>
                            {index < internshipData.interviewRounds!.length - 1 && (
                              <div className="h-8 w-0.5 bg-border my-1"></div>
                            )}
                          </div>
                          <p className="text-foreground/90 pt-1">{round}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar (right 1/3) */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="sticky top-24 border border-border rounded-xl shadow-lg bg-gradient-to-br from-card to-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-foreground">
                    <Users className="h-6 w-6 text-primary" />
                    Apply for This Position
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-3">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-semibold text-primary">{formattedDeadline}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold text-primary">{internshipData.duration || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-semibold text-primary">{internshipData.location || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground">Stipend:</span>
                      <span className="font-semibold text-primary">{internshipData.salaryStipend || "Unpaid"}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-border/30">
                    <Button
                      onClick={handleApplyClick}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg py-6 rounded-xl"
                      size="lg"
                    >
                      <ExternalLink className="h-6 w-6" />
                      APPLY NOW
                    </Button>
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      You&apos;ll be redirected to the official application page
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Opportunities */}
              <Card className="border border-border rounded-xl shadow-sm bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Similar Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 bg-background rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="bg-muted border rounded-lg w-12 h-12 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-foreground">Software Developer Intern</h4>
                            <p className="text-sm text-muted-foreground">Tech Company</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs py-1 px-2">
                                Remote
                              </Badge>
                              <Badge variant="outline" className="text-xs py-1 px-2">
                                ₹15-20k
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4 text-primary">
                    View all similar internships
                  </Button>
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