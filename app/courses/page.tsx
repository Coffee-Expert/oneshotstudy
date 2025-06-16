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

  useEffect(() => {
    const filtered = coursesData.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
      const matchesBranch = selectedBranch === "all" || course.branch === selectedBranch
      const matchesTopics =
        selectedTopics.length === 0 || selectedTopics.some((topic) => course.topics.includes(topic))

      return matchesSearch && matchesLevel && matchesBranch && matchesTopics
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
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
              <h1 className="text-3xl font-bold tracking-tight relative">
                Courses
                <svg className="absolute -bottom-2 left-0 w-32 h-4" viewBox="0 0 150 20" fill="none">
                  <path
                    d="M10 15 Q 75 5 140 12"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              <p className="text-muted-foreground">Browse all available courses organized by subject and topic.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Courses</SheetTitle>
                    <SheetDescription>
                      Narrow down courses based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Branch</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={selectedBranch === "cse" ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedBranch("cse")}
                        >
                          CSE
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Topics</h3>
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
                            />
                            <Label htmlFor={topic} className="text-sm capitalize">
                              {topic.replace("-", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <Tabs defaultValue="all" value={selectedLevel} onValueChange={setSelectedLevel} className="mt-8">
            <div className="flex justify-between">
              <TabsList>
                {["all", "beginner", "intermediate", "advanced"].map((level) => (
                  <TabsTrigger
                    key={level}
                    value={level}
                    className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {level}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline">CSE</Badge>
              </div>
            </div>

            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <TabsContent key={level} value={level} className="mt-6">
                <motion.div
                  className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredCourses.filter((course) =>
                    level === "all" ? true : course.level.toLowerCase() === level
                  ).length > 0 ? (
                    filteredCourses
                      .filter((course) => level === "all" || course.level.toLowerCase() === level)
                      .map((course) => (
                        <motion.div key={course.slug} variants={item}>
                          <FeaturedCourse title={course.title}
                          description={course.description}
                          slug={course.slug}
                          icon={course.icon}
                          level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                          videos={course.videos}
                          hours={course.hours}/>
                        </motion.div>
                      ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <h3 className="text-lg font-medium">No {level} courses found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                      <Button onClick={clearFilters} className="mt-4">
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
