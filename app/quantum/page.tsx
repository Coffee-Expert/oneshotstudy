"use client"

import { useState, useEffect } from "react"
import { Download, Search, BookOpen, Youtube, PenLine } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { quantumData } from "@/data/quantum-data" // Ensure this path is correct based on your project structure

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

export default function QuantumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("cse")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [filteredQuantums, setFilteredQuantums] = useState(quantumData)

  useEffect(() => {
    const filtered = quantumData.filter((quantum) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        quantum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quantum.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by branch
      const matchesBranch = selectedBranch === "all" || quantum.branch === selectedBranch

      // Filter by semester
      const matchesSemester = selectedSemester === "all" || quantum.semester === selectedSemester

      return matchesSearch && matchesBranch && matchesSemester
    })

    setFilteredQuantums(filtered)
  }, [searchQuery, selectedBranch, selectedSemester])

  const handleDownload = (link: string, title: string) => {
    // Correctly use the 'link' from the quantum object
    const params = new URLSearchParams({
      title: `${title} Quantum`,
      description: `AKTU quantum PDF for ${title}`,
      link: link,
      return: "/quantum",
    })
    window.location.href = `/timer-download?${params.toString()}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-12 md:py-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight relative text-foreground">
                AKTU Quantum PDFs
                {/* Handwritten underline */}
                <svg className="absolute -bottom-3 left-0 w-48 h-5" viewBox="0 0 300 20" fill="none">
                  <path
                    d="M10 15 Q 150 5 290 12"
                    stroke="#78716c"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search quantums..."
                  className="w-full pl-10 md:w-[200px] lg:w-[300px] border-2 border-stone-200 focus:border-stone-400 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 md:flex-row">
            {/* Sidebar Filters and Additional Content */}
            <div className="md:w-1/4 space-y-6">
              <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm transition-colors">
                {/* Branch Filter */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Branch</h3>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="border-muted bg-background text-foreground">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      {/* Add more branches here */}
                    </SelectContent>
                  </Select>
                </div>

                {/* Semester Filter */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Semester</h3>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="border-muted bg-background text-foreground">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  className="w-full border-muted text-foreground hover:bg-muted/40"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedBranch("cse")
                    setSelectedSemester("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>

              {/* YouTube Channel & Handwritten Notes Promotion */}
              <div className="space-y-4 rounded-lg border bg-gradient-to-br from-stone-100 to-stone-200 p-6 shadow-md transition-colors">
                <h3 className="text-lg font-bold text-foreground">Want something more?</h3>
                <p className="text-sm text-muted-foreground">
                  Dive deeper into concepts with our detailed explanations and handwritten notes.
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm"
                  onClick={() => window.open("https://www.youtube.com/@OneShotEngineer", "_blank")}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Visit Our YouTube Channel
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-stone-400 text-muted-foreground hover:bg-stone-200 shadow-sm"
                  onClick={() => window.open("/notes", "_blank")}
                >
                  <PenLine className="mr-2 h-4 w-4" />
                  Access Handwritten Notes
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  (Links will open in a new tab)
                </p>
              </div>
            </div>

            <div className="md:w-3/4">
              <motion.div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredQuantums.length > 0 ? (
                  filteredQuantums.map((quantum) => (
                    <motion.div key={quantum.id} variants={item}>
                      <Card className="flex flex-col h-full shadow-lg border bg-card hover:border-border transition-all">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                            <div className="flex-1">
                              <CardTitle className="line-clamp-2 text-foreground text-lg leading-tight">
                                {quantum.title}
                              </CardTitle>
                              <div className="mt-1">
                                <Badge variant="outline" className="bg-muted text-muted-foreground border">
                                  {quantum.subjectCode}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="line-clamp-3 text-muted-foreground">
                            {quantum.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-0">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">AKTU</Badge>
                            <Badge variant="outline">Semester {quantum.semester}</Badge>
                            <Badge variant="outline">PDF</Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-border pt-4">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            size="sm"
                            onClick={() => handleDownload(quantum.link, quantum.title)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Quantum
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-lg font-medium text-foreground">No quantum PDFs found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedBranch("cse")
                        setSelectedSemester("all")
                      }}
                      className="mt-6 bg-stone-700 hover:bg-stone-800 text-white"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
        {/* Introduction to the website */}
        <p className="text-muted-foreground mt-2 mx-5">
                Welcome to our platform, your one-stop solution for AKTU study materials! We aim to{" "}
                <strong className="font-semibold text-foreground">centralize learning content</strong>, offering easy
                access to <strong className="font-semibold text-foreground">AKTU Quantum PDFs</strong> and our exclusive{" "}
                <strong className="font-semibold text-foreground">handwritten notes</strong>.
                
              </p>
              {/* Disclaimer */}
              <p className="text-muted-foreground text-sm mt-4 italic mx-5 mb-10">
                <strong className="font-semibold text-red-600">Important Note on Materials:</strong> We curate and organize these resources for
                <strong className="font-semibold text-foreground"> educational purposes only</strong>, and do not create them.
                We <strong className="font-semibold text-foreground">strongly urge you to purchase original books and publications</strong> to support the creators. This platform is
                a supplementary tool, not a means to promote piracy.
              </p>
      </main>
      <SiteFooter />
    </div>
  )
}
