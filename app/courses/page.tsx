"use client"

import { useState, useEffect } from "react"
import { Filter, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedCourse } from "@/components/featured-course"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { coursesData } from "@/data/courses-data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("cse")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  // Filter courses based on search, level, branch, and topics
  useEffect(() => {
    const filtered = coursesData.filter((course) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by level
      const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()

      // Filter by branch
      const matchesBranch = selectedBranch === "all" || course.branch === selectedBranch

      // Filter by topics
      const matchesTopics = selectedTopics.length === 0 || selectedTopics.some((topic) => course.topics.includes(topic))

      return matchesSearch && matchesLevel && matchesBranch && (selectedTopics.length === 0 || matchesTopics)
    })

    setFilteredCourses(filtered)
  }, [searchQuery, selectedLevel, selectedBranch, selectedTopics])

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLevel("all")
    setSelectedBranch("cse")
    setSelectedTopics([])
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-8 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 relative">
                Courses
                {/* Handmade underline */}
                <svg className="absolute -bottom-2 left-0 w-32 h-4" viewBox="0 0 150 20" fill="none">
                  <path
                    d="M10 15 Q 75 5 140 12"
                    stroke="#64748b"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              <p className="text-slate-600">Browse all available courses organized by subject and topic.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px] border-slate-200 focus:border-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-slate-300 text-slate-600 hover:bg-slate-100">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white border-slate-200">
                  <SheetHeader>
                    <SheetTitle className="text-slate-800">Filter Courses</SheetTitle>
                    <SheetDescription className="text-slate-600">
                      Narrow down courses based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-800">Branch</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={selectedBranch === "cse" ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedBranch === "cse"
                              ? "bg-slate-700 text-slate-100"
                              : "border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                          onClick={() => setSelectedBranch("cse")}
                        >
                          CSE
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-800">Topics</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "programming",
                          "data-structures",
                          "algorithms",
                          "databases",
                          "web-development",
                          "operating-systems",
                        ].map((topic) => (
                          <div key={topic} className="flex items-center space-x-2">
                            <Checkbox
                              id={topic}
                              checked={selectedTopics.includes(topic)}
                              onCheckedChange={() => handleTopicChange(topic)}
                              className="border-slate-300"
                            />
                            <Label htmlFor={topic} className="text-sm text-slate-600 capitalize">
                              {topic.replace("-", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={clearFilters} className="bg-slate-700 hover:bg-slate-800 text-slate-100">
                      Clear Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-8" value={selectedLevel} onValueChange={setSelectedLevel}>
            <div className="flex justify-between">
              <TabsList className="bg-slate-200 border border-slate-300">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
                >
                  All Courses
                </TabsTrigger>
                <TabsTrigger
                  value="beginner"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
                >
                  Beginner
                </TabsTrigger>
                <TabsTrigger
                  value="intermediate"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
                >
                  Intermediate
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-md border-slate-300 text-slate-600">
                  CSE
                </Badge>
              </div>
            </div>
            <TabsContent value="all" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <motion.div key={course.slug} variants={item}>
                      <FeaturedCourse
                        title={course.title}
                        description={course.description}
                        slug={course.slug}
                        icon={course.icon}
                        level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                        videos={course.videos}
                        hours={course.hours}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium text-slate-800">No courses found</h3>
                    <p className="text-slate-600">Try adjusting your filters or search query</p>
                    <Button onClick={clearFilters} className="mt-4 bg-slate-700 hover:bg-slate-800 text-slate-100">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="beginner" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredCourses.filter((course) => course.level === "Beginner").length > 0 ? (
                  filteredCourses
                    .filter((course) => course.level === "Beginner")
                    .map((course) => (
                      <motion.div key={course.slug} variants={item}>
                        <FeaturedCourse
                          title={course.title}
                          description={course.description}
                          slug={course.slug}
                          icon={course.icon}
                          level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                          videos={course.videos}
                          hours={course.hours}
                        />
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium text-slate-800">No beginner courses found</h3>
                    <p className="text-slate-600">Try adjusting your filters or search query</p>
                    <Button onClick={clearFilters} className="mt-4 bg-slate-700 hover:bg-slate-800 text-slate-100">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="intermediate" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredCourses.filter((course) => course.level === "Intermediate").length > 0 ? (
                  filteredCourses
                    .filter((course) => course.level === "Intermediate")
                    .map((course) => (
                      <motion.div key={course.slug} variants={item}>
                        <FeaturedCourse
                          title={course.title}
                          description={course.description}
                          slug={course.slug}
                          icon={course.icon}
                          level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                          videos={course.videos}
                          hours={course.hours}
                        />
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium text-slate-800">No intermediate courses found</h3>
                    <p className="text-slate-600">Try adjusting your filters or search query</p>
                    <Button onClick={clearFilters} className="mt-4 bg-slate-700 hover:bg-slate-800 text-slate-100">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="advanced" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredCourses.filter((course) => course.level === "Advanced").length > 0 ? (
                  filteredCourses
                    .filter((course) => course.level === "Advanced")
                    .map((course) => (
                      <motion.div key={course.slug} variants={item}>
                        <FeaturedCourse
                          title={course.title}
                          description={course.description}
                          slug={course.slug}
                          icon={course.icon}
                          level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                          videos={course.videos}
                          hours={course.hours}
                        />
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium text-slate-800">No advanced courses found</h3>
                    <p className="text-slate-600">Try adjusting your filters or search query</p>
                    <Button onClick={clearFilters} className="mt-4 bg-slate-700 hover:bg-slate-800 text-slate-100">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
