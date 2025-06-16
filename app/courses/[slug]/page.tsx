"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Clock, Play, Users, Star, Download, BookOpen, ExternalLink } from "lucide-react"
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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Find course data by slug
      const data = courseDetailsData.find((item) => item.slug === `/courses/${slug}`)
      if (data) {
        setCourseData(data)
        setSelectedVideo(data.videos[0]) // Set first video as default
      }
      setLoading(false)
    }

    fetchCourseDetails()
  }, [slug])

  const handleNotesDownload = () => {
    const link = selectedVideo?.notesLink
    if (!link) return alert("No notes link available.")
  
    window.location.href = `/download-page?url=${link}`
  }
  

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />
  }

  // Show error message if course not found
  if (!courseData) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8 text-center">
            <h1 className="text-2xl font-bold text-stone-800">Course not found</h1>
            <p className="text-stone-600 mt-2">The course you&apos;re looking for doesn&apos;t exist.</p>
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
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="mb-2 bg-popover border-input text-muted-foreground">
                  {courseData.level}
                </Badge>
              </div>
  
              <h1 className="text-4xl font-bold mb-2 relative text-foreground">
                {courseData.title}
                <svg className="absolute -bottom-3 left-0 w-full max-w-lg h-6" viewBox="0 0 500 30" fill="none">
                  <path
                    d="M20 20 Q 120 8 250 15 Q 380 22 480 12"
                    stroke="#78716c"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M25 22 Q 130 10 260 17 Q 390 24 475 14"
                    stroke="#78716c"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              </h1>
  
              <p className="text-xl text-muted-foreground mb-4">{courseData.description}</p>
  
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {courseData.duration} hours
                </div>
                <div className="flex items-center">
                  <Play className="mr-1 h-4 w-4" />
                  {courseData.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {courseData.enrolled} students
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4" />
                  {courseData.rating} ({courseData.reviews} reviews)
                </div>
              </div>
            </div>
  
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Play className="h-5 w-5 text-muted-foreground" />
                      {selectedVideo?.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{selectedVideo?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <YouTubePlayer videoId={selectedVideo?.id} title={selectedVideo?.title} className="aspect-video" />
                  </CardContent>
                </Card>
  
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="relative text-foreground">
                      Course Videos
                      <svg className="absolute -right-8 -top-2 w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="#78716c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.4"
                        />
                      </svg>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6">
                    {courseData.videos.map((video: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${
                          selectedVideo?.id === video.id
                            ? "bg-muted border-input"
                            : "border-transparent hover:bg-muted hover:border-border"
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{video.title}</h4>
                            <p className="text-sm text-muted-foreground">{video.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
  
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="text-foreground">Course Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{courseData.summary}</p>
                  </CardContent>
                </Card>
              </div>
  
              <div className="space-y-8">
                <Card className="shadow-lg border border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <BookOpen className="h-5 w-5" />
                      Course Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">Download comprehensive notes for this course</p>
                    <Button
                      onClick={handleNotesDownload}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Notes
                    </Button>
                  </CardContent>
                </Card>
  
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="text-foreground">AKTU Exam Information</CardTitle>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 border-input text-muted-foreground hover:bg-muted"
                      asChild
                    >
                      <Link href={courseData.examInfo.aktuLink} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        AKTU Exam Updates
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
  
                <Card className="shadow-lg border border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Play className="h-5 w-5" />
                      YouTube Channel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Visit our YouTube channel for more videos and tutorials
                    </p>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href="https://www.youtube.com/@OneShotEngineer" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Channel
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
  
                <Card className="shadow-lg border border-border bg-card/90 backdrop-blur-sm">
                  <CardHeader className="bg-card p-6">
                    <CardTitle className="text-foreground">Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm p-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="text-foreground">{courseData.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">{courseData.duration} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="text-foreground">{courseData.lessons}</span>
                    </div>
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
