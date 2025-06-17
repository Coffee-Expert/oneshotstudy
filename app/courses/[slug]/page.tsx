"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Clock, Play, Users, Star, Download, BookOpen, ExternalLink, GraduationCap, Briefcase, Lightbulb, ClipboardCheck, Code } // Added Code icon for skills
from "lucide-react" 
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { YouTubePlayer } from "@/components/youtube-player"
import { BackButton } from "@/components/back-button"
import { courseDetailsData } from "@/data/course-details-data"
import { LoadingSpinner } from "@/components/loading-spinner"

/**
 * Course Details Page Component
 * Displays detailed information about a specific course including videos, notes, and exam info
 */
export default function CourseDetailsPage() {
  const params = useParams()
  const slug = params.slug as string

  // State management for course data and video selection
  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  // Fetch course details on component mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      // Simulate API call with loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000)) 

      // Find course data by slug
      const data = courseDetailsData.find((item) => item.slug === `/courses/${slug}`)
      if (data) {
        setCourseData(data)
        // Ensure data.videos exists and has elements before setting selectedVideo
        setSelectedVideo(data.videos && data.videos.length > 0 ? data.videos[0] : null)
      }
      setLoading(false)
    }

    fetchCourseDetails()
  }, [slug])

  const handleNotesDownload = () => {
    const link = selectedVideo?.notesLink
    if (link) {
      window.open(link, "_blank");
    } else {
      console.warn("No notes link available for the selected video.");
    }
  }

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />
  }

  // Show error message if course not found
  if (!courseData) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
            <p className="text-muted-foreground mt-2">The course you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-4">
              <BackButton href="/courses" label="Back to Courses" />
            </div>
          </div>
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
          className="container py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <BackButton href="/courses" label="Back to Courses" />
          </div>

          <div className="space-y-8">
            {/* Course Header Section */}
            <div className="relative pb-6 border-b border-border/70"> {/* Added bottom border */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-popover border-input text-muted-foreground">
                  {courseData.level}
                </Badge>
                <Badge variant="outline" className="bg-popover border-input text-muted-foreground">
                  {courseData.language}
                </Badge>
               
                {courseData.subjectCode && (
                  <Badge variant="outline" className="bg-popover border-input text-muted-foreground">
                    Code: {courseData.subjectCode}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-2 relative text-foreground">
                {courseData.title}
                <svg className="absolute -bottom-3 left-0 w-full max-w-lg h-6" viewBox="0 0 500 30" fill="none">
                  <path
                    d="M20 20 Q 120 8 250 15 Q 380 22 480 12"
                    stroke="#a8a29e" 
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M25 22 Q 130 10 260 17 Q 390 24 475 14"
                    stroke="#a8a29e" 
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              </h1>
<br/>
              <p className="text-xl text-foreground mb-4" dangerouslySetInnerHTML={{ __html: courseData.description }}></p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-primary" />
                  {courseData.duration} weeks
                </div>
                <div className="flex items-center">
                  <Play className="mr-1 h-4 w-4 text-primary" />
                  {courseData.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-primary" />
                  {courseData.enrolled} students enrolled
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  {courseData.rating} ({courseData.reviews} reviews)
                </div>
              </div>
            </div>
<br/>
{/* Career Opportunities */}
{courseData.careerOpportunities && courseData.careerOpportunities.length > 0 && (
                  <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                    <CardHeader className="bg-card p-6">
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        Career Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2"> {/* Changed to flexbox for badges */}
                        {courseData.careerOpportunities.map((opportunity: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-muted text-foreground border border-input px-3 py-1 text-sm rounded-md shadow-sm">
                            {opportunity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                <br/>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Main Video Player */}
                <Card className="overflow-hidden shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Play className="h-5 w-5 text-muted-foreground" />
                      {selectedVideo?.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{selectedVideo?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {selectedVideo?.id ? (
                      <YouTubePlayer videoId={selectedVideo.id} title={selectedVideo.title} className="aspect-video" />
                    ) : (
                      <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                        No video available for this unit.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Course Videos List */}
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Play className="h-5 w-5 text-muted-foreground" />
                      Course Curriculum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6">
                    {courseData.videos.map((video: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${
                          selectedVideo?.id === video.id
                            ? "bg-muted border-primary-foreground/20" 
                            : "border-transparent hover:bg-muted/50 hover:border-border"
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{video.title}</h4>
                            <p className="text-sm text-muted-foreground">{video.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {courseData.youtubePlaylist && (
                      <div className="pt-4">
                        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm">
                          <Link href={`https://www.youtube.com/playlist?list=${courseData.youtubePlaylist}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full YouTube Playlist
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Course Summary */}
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      About This Course
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {courseData.summary.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                    ))}
                  </CardContent>
                </Card>

                {/* Learning Outcomes */}
                {courseData.learningOutcomes && courseData.learningOutcomes.length > 0 && (
                  <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                    <CardHeader className="bg-card p-6">
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        What You Will Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {courseData.learningOutcomes.map((outcome: string, index: number) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: outcome }}></li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Skills You'll Get */}
                {courseData.skillsGained && courseData.skillsGained.length > 0 && (
                  <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                    <CardHeader className="bg-card p-6">
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Code className="h-5 w-5 text-muted-foreground" />
                        Skills You'll Get
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {courseData.skillsGained.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-muted text-foreground border border-input px-3 py-1 text-sm rounded-md shadow-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                
              </div>

              {/* Sidebar Column */}
              <div className="space-y-8">
                {/* Course Notes Download (for current video) */}
                {selectedVideo?.notesLink && ( 
                  <Card className="shadow-lg border border-border bg-card/50 backdrop-blur-sm">
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        Notes for Current Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">Download comprehensive notes for this video lecture.</p>
                      <Button
                        onClick={handleNotesDownload}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Notes
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {/* Prerequisites */}
                {courseData.prerequisites && (
                  <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                    <CardHeader className="bg-card p-6">
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                        Prerequisites
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: courseData.prerequisites }}></p>
                    </CardContent>
                  </Card>
                )}

                {/* Study Tips */}
                {courseData.studyTips && courseData.studyTips.length > 0 && (
                  <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                    <CardHeader className="bg-card p-6">
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-muted-foreground" />
                        Study Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {courseData.studyTips.map((tip: string, index: number) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: tip }}></li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* AKTU Exam Information */}
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                      AKTU Exam Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm p-6">
                    <div>
                      <span className="font-medium text-foreground">Exam Pattern:</span>
                      <br />
                      <span className="text-muted-foreground">{courseData.examInfo.examPattern}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Duration:</span>
                      <br />
                      <span className="text-muted-foreground">{courseData.examInfo.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Passing Marks:</span>
                      <br />
                      <span className="text-muted-foreground">{courseData.examInfo.passingMarks}</span>
                    </div>
                    {courseData.examInfo.preparationTips && courseData.examInfo.preparationTips.length > 0 && (
                      <div>
                        <span className="font-medium text-foreground">Preparation Tips:</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-muted-foreground">
                          {courseData.examInfo.preparationTips.map((tip: string, index: number) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: tip }}></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 border-input text-foreground hover:bg-muted"
                      asChild
                    >
                      <Link href={"/alerts"} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View AKTU Exam Portal
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
