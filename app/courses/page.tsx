"use client"

import { useState, useEffect } from "react"
import { Filter, Search, X } from "lucide-react"
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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const levelColors = {
  beginner: "bg-green-100 text-green-800 border-green-300",
  intermediate: "bg-blue-100 text-blue-800 border-blue-300",
  advanced: "bg-purple-100 text-purple-800 border-purple-300",
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("cse")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState(coursesData)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  const activeFiltersCount = 
    (searchQuery !== "" ? 1 : 0) + 
    (selectedLevel !== "all" ? 1 : 0) + 
    (selectedBranch !== "cse" ? 1 : 0) + 
    selectedTopics.length

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/10">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-8 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Master Tech Skills
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Explore curated courses to advance your career in computer science and engineering
            </motion.p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses, topics, or keywords..."
                  className="w-full pl-10 pr-4 py-2 h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 flex-1 md:flex-none">
                      <Filter className="h-4 w-4" />
                      Filter
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-1 px-1.5 py-0.5">{activeFiltersCount}</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filter Courses</SheetTitle>
                      <SheetDescription>
                        Narrow down courses based on your preferences
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Level</h3>
                        <div className="flex flex-wrap gap-2">
                          {["all", "beginner", "intermediate", "advanced"].map((level) => (
                            <Badge
                              key={level}
                              variant={selectedLevel === level ? "default" : "outline"}
                              className="cursor-pointer capitalize"
                              onClick={() => setSelectedLevel(level)}
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Topics</h3>
                        <div className="grid grid-cols-2 gap-3">
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
                              <Label htmlFor={topic} className="text-sm font-normal capitalize">
                                {topic.replace("-", " ")}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={clearFilters} className="flex-1">
                          Clear All
                        </Button>
                        <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Active Filters */}
            {(searchQuery || selectedLevel !== "all" || selectedTopics.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedLevel !== "all" && (
                  <Badge className="flex items-center gap-1 capitalize">
                    Level: {selectedLevel}
                    <button onClick={() => setSelectedLevel("all")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedTopics.map((topic) => (
                  <Badge key={topic} className="flex items-center gap-1 capitalize">
                    {topic.replace("-", " ")}
                    <button onClick={() => handleTopicChange(topic)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Courses Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Available Courses
                <span className="text-muted-foreground ml-2 font-normal">
                  ({filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"})
                </span>
              </h2>
              
              <Tabs 
                value={selectedLevel} 
                onValueChange={setSelectedLevel} 
                className="w-full md:w-auto"
              >
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  {["all", "beginner", "intermediate", "advanced"].map((level) => (
                    <TabsTrigger
                      key={level}
                      value={level}
                      className="capitalize"
                    >
                      {level}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filteredCourses.length > 0 ? (
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredCourses
                  .filter((course) => 
                    selectedLevel === "all" || course.level.toLowerCase() === selectedLevel
                  )
                  .map((course) => (
                    <motion.div key={course.slug} variants={item}>
                      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30">
                        <CardHeader className="p-0">
                          <div className="relative">
                            <div className="bg-muted border-b aspect-video flex items-center justify-center">
                              <div className="bg-accent/10 p-4 rounded-full">
                                <course.icon />
                              </div>
                            </div>
                            <Badge 
                              className={`absolute top-3 right-3 capitalize border ${levelColors[course.level.toLowerCase() as keyof typeof levelColors]}`}
                            >
                              {course.level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-1">
                          <h3 className="font-bold text-lg line-clamp-2 mb-1">{course.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{course.description}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{course.videos} videos</span>
                            <span>{course.hours} hours</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" className="w-full">
                            View Course
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16 rounded-xl border border-dashed border-border bg-card/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mx-auto max-w-md">
                  <h3 className="text-xl font-medium mb-2">No courses match your filters</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}