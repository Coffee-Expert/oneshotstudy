"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft, MapPin, Calendar, Clock, Users,
  DollarSign, ExternalLink, GraduationCap, Briefcase, ListChecks,
  Gift, Lightbulb, Link as LinkIcon, Building, ChevronRight, BookOpen,
  Star, CheckCircle, ChevronDown, ChevronUp, MoveRight
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  applicationLink: string | null;
}

// Format text with newlines and paragraphs
const formatDescription = (text: string | null) => {
  if (!text) return null;
  
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-5 last:mb-0 text-foreground/90 leading-relaxed">
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [similarOpportunities, setSimilarOpportunities] = useState<any[]>([])

  // Format the application deadline
  const formattedDeadline = internshipData?.applicationDeadline
    ? new Date(internshipData.applicationDeadline).toLocaleDateString("en-IN", {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : "Rolling basis";

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
        
        // Simulate fetching similar opportunities
        setTimeout(() => {
          setSimilarOpportunities([
            {
              id: "1",
              title: "Software Developer Intern",
              company: "Tech Innovations Inc",
              location: "Remote",
              salary: "₹20k/month",
              logo: "/tech-innovations.png"
            },
            {
              id: "2",
              title: "Marketing Analyst Intern",
              company: "Digital Growth Co",
              location: "Bangalore",
              salary: "₹18k/month",
              logo: "/digital-growth.png"
            },
            {
              id: "3",
              title: "Data Science Intern",
              company: "AI Solutions Ltd",
              location: "Hybrid",
              salary: "₹25k/month",
              logo: "/ai-solutions.png"
            }
          ]);
        }, 800);
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
    if (internshipData?.applicationLink) {
      window.open(internshipData.applicationLink, '_blank', 'noopener,noreferrer');
    } else if (internshipData?.website) {
      window.open(internshipData.website, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Application link not available",
        description: "This internship does not have an external application link provided.",
        variant: "destructive",
      });
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <LoadingSpinner  />
            <p className="text-lg text-foreground/80">Loading internship details...</p>
          </div>
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
          <Card className="max-w-md w-full text-center p-8 border border-border shadow-lg rounded-2xl bg-gradient-to-br from-card to-card/80">
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
        {/* Banner with company color */}
        <div className="w-full h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 dark:from-blue-900/30 dark:to-indigo-900/30">
          <div className="container max-w-7xl h-full flex items-center justify-between px-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl">
                {internshipData.title}
              </h1>
              <p className="text-xl text-foreground/80 mt-2">
                {internshipData.companyName || "Leading Company"}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white dark:bg-card p-4 rounded-xl shadow-lg border border-border/30">
                <Button 
                  onClick={handleApplyClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-primary-foreground flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg py-6 rounded-xl"
                  size="lg"
                >
                  <ExternalLink className="h-6 w-6" />
                  APPLY NOW
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Apply before {formattedDeadline}
                </p>
              </div>
            </div>
          </div>
        </div>

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
          <Card className="p-6 md:p-8 mb-10 border border-border shadow-xl rounded-2xl bg-gradient-to-br from-card to-card/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 dark:bg-blue-900/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full relative z-10">
              {internshipData.companyLogo && (
                <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white bg-white shadow-lg">
                  <Image
                    src={internshipData.companyLogo}
                    alt={`${internshipData.companyName} logo`}
                    fill
                    className="object-contain p-3"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/144x144/e0e0e0/555555?text=${internshipData.companyName ? internshipData.companyName.charAt(0) : '?'}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
              )}
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary py-2 px-4 rounded-full text-base w-fit mx-auto md:mx-0">
                    {internshipData.jobType || "Internship"}
                  </Badge>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-300" />
                    <span className="text-foreground/80">Featured Opportunity</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                  {internshipData.title}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
                  <p className="text-xl font-semibold text-muted-foreground flex items-center justify-center md:justify-start">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    {internshipData.companyName || "Company Name N/A"}
                  </p>
                  
                  {internshipData.website && (
                    <Link href={internshipData.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 text-base flex items-center">
                        Visit Website <MoveRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-foreground font-medium">{internshipData.location || "Not Specified"}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 rounded-full">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-foreground font-medium">Apply by: {formattedDeadline}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-foreground font-medium">{internshipData.salaryStipend || "Competitive Stipend"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-10 border-t border-border/40">
              <div className="flex flex-col p-5 bg-background rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  <span className="font-medium text-lg">Duration</span>
                </div>
                <p className="text-foreground font-semibold text-xl">{internshipData.duration || "Flexible"}</p>
              </div>
              
              <div className="flex flex-col p-5 bg-background rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <GraduationCap className="h-6 w-6 text-blue-500" />
                  <span className="font-medium text-lg">Batch</span>
                </div>
                <p className="text-foreground font-semibold text-xl">{internshipData.batch || "All Batches"}</p>
              </div>
              
              <div className="flex flex-col p-5 bg-background rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Lightbulb className="h-6 w-6 text-blue-500" />
                  <span className="font-medium text-lg">Stream</span>
                </div>
                <p className="text-foreground font-semibold text-xl">{internshipData.streamRequired || "All Streams"}</p>
              </div>
              
              <div className="flex flex-col p-5 bg-background rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                  <span className="font-medium text-lg">Job Type</span>
                </div>
                <p className="text-foreground font-semibold text-xl">{internshipData.jobType || "Internship"}</p>
              </div>
            </div>
          </Card>

          {/* Main Content and Sidebar Layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content area (left 2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="border border-border rounded-2xl shadow-xl bg-card">
                <CardHeader className="pb-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('description')}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-7 w-7 text-blue-500" />
                      <CardTitle className="text-2xl font-bold text-foreground">Job Description</CardTitle>
                    </div>
                    {expandedSection === 'description' ? 
                      <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    }
                  </div>
                </CardHeader>
                <CardContent className={cn("pt-0", expandedSection === 'description' ? "block" : "hidden md:block")}>
                  <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
                    {formatDescription(internshipData.description) || (
                      <p className="text-muted-foreground italic">Detailed description coming soon</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              {internshipData.skills && internshipData.skills.length > 0 && (
                <Card className="border border-border rounded-2xl shadow-xl bg-card">
                  <CardHeader className="pb-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('skills')}
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-7 w-7 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-foreground">Skills Required</CardTitle>
                      </div>
                      {expandedSection === 'skills' ? 
                        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                  </CardHeader>
                  <CardContent className={cn("pt-0", expandedSection === 'skills' ? "block" : "hidden md:block")}>
                    <div className="flex flex-wrap gap-3">
                      {internshipData.skills.map((skill: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-blue-100 dark:bg-blue-900/30 text-foreground border border-border text-base py-2.5 px-5 rounded-xl flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Perks */}
              {internshipData.perks && internshipData.perks.length > 0 && (
                <Card className="border border-border rounded-2xl shadow-xl bg-card">
                  <CardHeader className="pb-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('perks')}
                    >
                      <div className="flex items-center gap-3">
                        <Gift className="h-7 w-7 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-foreground">Perks & Benefits</CardTitle>
                      </div>
                      {expandedSection === 'perks' ? 
                        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                  </CardHeader>
                  <CardContent className={cn("pt-0", expandedSection === 'perks' ? "block" : "hidden md:block")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {internshipData.perks.map((perk: string, index: number) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border/30"
                        >
                          <div className="bg-blue-100 dark:bg-blue-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          </div>
                          <span className="text-foreground/90">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Interview Rounds */}
              {internshipData.interviewRounds && internshipData.interviewRounds.length > 0 && (
                <Card className="border border-border rounded-2xl shadow-xl bg-card">
                  <CardHeader className="pb-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('interview')}
                    >
                      <div className="flex items-center gap-3">
                        <ListChecks className="h-7 w-7 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-foreground">Interview Process</CardTitle>
                      </div>
                      {expandedSection === 'interview' ? 
                        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                  </CardHeader>
                  <CardContent className={cn("pt-0", expandedSection === 'interview' ? "block" : "hidden md:block")}>
                    <div className="space-y-4">
                      {internshipData.interviewRounds.map((round: string, index: number) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border/30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex flex-col items-center">
                            <div className="bg-blue-500/10 w-9 h-9 rounded-full flex items-center justify-center">
                              <span className="text-blue-500 font-bold text-lg">{index + 1}</span>
                            </div>
                            {index < internshipData.interviewRounds!.length - 1 && (
                              <div className="h-10 w-0.5 bg-border my-1"></div>
                            )}
                          </div>
                          <p className="text-foreground/90 pt-1 text-lg">{round}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar (right 1/3) */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="sticky top-24 border border-border rounded-2xl shadow-2xl bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-foreground">
                    <Users className="h-7 w-7 text-blue-500" />
                    Apply Now
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Don&apos;t miss this opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-3">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground text-lg">Deadline:</span>
                      <span className="font-semibold text-blue-500 text-lg">{formattedDeadline}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground text-lg">Duration:</span>
                      <span className="font-semibold text-blue-500 text-lg">{internshipData.duration || "Flexible"}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground text-lg">Location:</span>
                      <span className="font-semibold text-blue-500 text-lg">{internshipData.location || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center text-foreground">
                      <span className="text-muted-foreground text-lg">Stipend:</span>
                      <span className="font-semibold text-blue-500 text-lg">{internshipData.salaryStipend || "Competitive"}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-border/30">
                    <Button
                      onClick={handleApplyClick}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-primary-foreground flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg py-7 rounded-xl"
                      size="lg"
                    >
                      <ExternalLink className="h-6 w-6" />
                      APPLY NOW
                    </Button>
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      Opens in a new tab
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Opportunities */}
              <Card className="border border-border rounded-2xl shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    <MoveRight className="h-5 w-5 text-blue-500" />
                    Similar Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {similarOpportunities.map((opportunity) => (
                      <motion.div 
                        key={opportunity.id}
                        className="p-4 bg-background rounded-xl border border-border/30 hover:border-blue-300 transition-colors cursor-pointer"
                        whileHover={{ y: -5 }}
                        onClick={() => router.push(`/internships/${opportunity.id}`)}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                            <AvatarImage src={opportunity.logo} />
                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30">
                              {opportunity.company.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground text-lg">{opportunity.title}</h4>
                            <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="outline" className="text-xs py-1.5 px-3 bg-blue-50 dark:bg-blue-900/20">
                                {opportunity.location}
                              </Badge>
                              <Badge variant="outline" className="text-xs py-1.5 px-3 bg-blue-50 dark:bg-blue-900/20">
                                {opportunity.salary}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="w-full mt-4 text-blue-500 text-lg"
                    asChild
                  >
                    <Link href="/internships">
                      View all internships
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Share This Opportunity */}
              <Card className="border border-border rounded-2xl shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Share This Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 py-6">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1 py-6">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                      Twitter
                    </Button>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" className="flex-1 py-6">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="flex-1 py-6">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </Button>
                  </div>
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