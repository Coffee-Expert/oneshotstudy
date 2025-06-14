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
      <div className="flex min-h-screen flex-col bg-stone-50">
        <SiteHeader />
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
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.div
          className="container py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back navigation button */}
          <div className="mb-6">
            <BackButton href="/courses" label="Back to Courses" />
          </div>

          {/* Course header section */}
          <div className="space-y-8">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="mb-2 bg-stone-200 border-stone-300 text-stone-700">
                  {courseData.level}
                </Badge>
              </div>

              {/* Course title with handmade underline decoration */}
              <h1 className="text-4xl font-bold mb-2 relative text-stone-800">
                {courseData.title}
                {/* Handmade underline */}
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

              <p className="text-xl text-stone-600 mb-4">{courseData.description}</p>

              {/* Course metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-stone-600">
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

            {/* Main content grid */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left column - Video player and content */}
              <div className="lg:col-span-2 space-y-8">
                {/* YouTube video player */}
                <Card className="overflow-hidden shadow-lg border border-stone-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-stone-100 p-6">
                    <CardTitle className="flex items-center gap-2 text-stone-800">
                      <Play className="h-5 w-5 text-stone-600" />
                      {selectedVideo?.title}
                    </CardTitle>
                    <CardDescription className="text-stone-600">{selectedVideo?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <YouTubePlayer videoId={selectedVideo?.id} title={selectedVideo?.title} className="aspect-video" />
                  </CardContent>
                </Card>

                {/* Video playlist */}
                <Card className="shadow-lg border border-stone-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-stone-100 p-6">
                    <CardTitle className="relative text-stone-800">
                      Course Videos
                      {/* Decorative arrow */}
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
                    {/* Video list with selection functionality */}
                    {courseData.videos.map((video: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-stone-100 border ${
                          selectedVideo?.id === video.id
                            ? "bg-stone-100 border-stone-300"
                            : "border-transparent hover:border-stone-200"
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-stone-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-stone-800">{video.title}</h4>
                            <p className="text-sm text-stone-600">{video.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Course summary */}
                <Card className="shadow-lg border border-stone-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-stone-100 p-6">
                    <CardTitle className="text-stone-800">Course Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-stone-600 leading-relaxed">{courseData.summary}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right sidebar */}
              <div className="space-y-8">
                {/* Notes download card */}
                <Card className="shadow-lg border border-stone-200 bg-stone-100/50 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2 text-stone-800">
                      <BookOpen className="h-5 w-5" />
                      Course Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-stone-600 mb-4">Download comprehensive notes for this course</p>
                    <Button
                      onClick={handleNotesDownload}
                      className="w-full bg-stone-700 hover:bg-stone-800 text-stone-100"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Notes
                    </Button>
                  </CardContent>
                </Card>

                {/* AKTU exam information */}
                <Card className="shadow-lg border border-stone-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-stone-100 p-6">
                    <CardTitle className="text-stone-800">AKTU Exam Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm p-6">
                    <div>
                      <span className="font-medium text-stone-800">Exam Pattern:</span>
                      <br />
                      <span className="text-stone-600">{courseData.examInfo.examPattern}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">Duration:</span>
                      <br />
                      <span className="text-stone-600">{courseData.examInfo.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">Passing Marks:</span>
                      <br />
                      <span className="text-stone-600">{courseData.examInfo.passingMarks}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 border-stone-300 text-stone-600 hover:bg-stone-100"
                      asChild
                    >
                      <Link href={courseData.examInfo.aktuLink} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        AKTU Exam Updates
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* YouTube channel promotion */}
                <Card className="shadow-lg border border-stone-200 bg-stone-100/50 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2 text-stone-800">
                      <Play className="h-5 w-5" />
                      YouTube Channel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-stone-600 mb-4">
                      Visit our YouTube channel for more videos and tutorials
                    </p>
                    <Button asChild className="w-full bg-stone-700 hover:bg-stone-800 text-stone-100">
                      <Link href="https://www.youtube.com/@OneShotEngineer" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Channel
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Course information summary */}
                <Card className="shadow-lg border border-stone-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-stone-100 p-6">
                    <CardTitle className="text-stone-800">Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm p-6">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Level:</span>
                      <span className="text-stone-800">{courseData.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Duration:</span>
                      <span className="text-stone-800">{courseData.duration} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Lessons:</span>
                      <span className="text-stone-800">{courseData.lessons}</span>
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
  )
}
