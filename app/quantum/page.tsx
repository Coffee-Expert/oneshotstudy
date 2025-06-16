"use client"

import { useState, useEffect } from "react"
import { Download, Search, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { quantumData } from "@/data/quantum-data"

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

  const handleDownload = (title: string) => {
    const params = new URLSearchParams({
      title: `${title} Quantum`,
      description: "AKTU quantum PDF for this subject",
      link: "https://drive.google.com/file/d/sample-quantum/view",
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
              <h1 className="text-3xl font-bold tracking-tight relative text-stone-800">
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
              <p className="text-stone-600 mt-2">Download AKTU quantum PDFs for all subjects and semesters.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
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
  {/* Sidebar Filters */}
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
      <Badge variant="outline">{quantum.pages} Pages</Badge>
    </div>
  </CardContent>
  <CardFooter className="border-t border-border pt-4">
    <Button
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      size="sm"
      onClick={() => handleDownload(quantum.title)}
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
                    <h3 className="text-lg font-medium text-stone-800">No quantum PDFs found</h3>
                    <p className="text-stone-600 mt-2">Try adjusting your filters or search query</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedBranch("cse")
                        setSelectedSemester("all")
                      }}
                      className="mt-6 bg-stone-700 hover:bg-stone-800 text-stone-100"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
