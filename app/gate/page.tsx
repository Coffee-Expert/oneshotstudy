"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, Calendar, CheckCircle, Download, FileText, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { gatePapersData, gateSyllabusData } from "@/data/gate-data"
import { toast } from "@/hooks/use-toast"

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

export default function GatePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [filteredPapers, setFilteredPapers] = useState(gatePapersData)

  useEffect(() => {
    const filtered = gatePapersData.filter((paper) => {
      // Filter by search query
      const matchesSearch = searchQuery === "" || paper.year.toString().includes(searchQuery)

      // Filter by year
      const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear

      return matchesSearch && matchesYear
    })

    setFilteredPapers(filtered)
  }, [searchQuery, selectedYear])

  const handleDownload = (type: string, year: number) => {
    toast({
      title: "Download Started",
      description: `GATE ${year} ${type} is being downloaded.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
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
              <h1 className="text-3xl font-bold tracking-tight">GATE Preparation</h1>
              <p className="text-muted-foreground">Comprehensive resources for GATE aspirants.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>GATE CSE Syllabus</CardTitle>
                  <CardDescription>Complete syllabus for GATE Computer Science & Engineering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gateSyllabusData.map((topic) => (
                      <motion.div
                        key={topic.name}
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{topic.name}</h3>
                          <span className="text-xs text-muted-foreground">{topic.percentage}%</span>
                        </div>
                        <Progress value={topic.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{topic.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleDownload("Syllabus", 2025)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Complete Syllabus
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>GATE 2025 Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Application Form</h3>
                        <p className="text-xs text-muted-foreground">September 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Admit Card</h3>
                        <p className="text-xs text-muted-foreground">January 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Examination</h3>
                        <p className="text-xs text-muted-foreground">February 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Result</h3>
                        <p className="text-xs text-muted-foreground">March 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/gate/previous-papers">
                        <FileText className="mr-2 h-4 w-4" />
                        Previous Year Papers
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/gate/mock-tests">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mock Tests
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/gate/study-material">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Study Material
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/gate/video-lectures">
                        <FileText className="mr-2 h-4 w-4" />
                        Video Lectures
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Previous Year Papers with Solutions</h2>
              <div className="flex items-center gap-2">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                  <motion.div key={paper.year} variants={item}>
                    <Card>
                      <CardHeader>
                        <CardTitle>GATE CSE {paper.year}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <span>{paper.questions} Questions</span>
                          <span>{paper.marks} Marks</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload("Question Paper", paper.year)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Question Paper
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => handleDownload("Solutions", paper.year)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Solutions
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium">No papers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedYear("all")
                    }}
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </motion.div>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/gate/previous-papers">View All Papers</Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
