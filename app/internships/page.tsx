"use client"

import { useState, useEffect } from "react"
import { Briefcase, Calendar, MapPin, Search, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
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

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [domain, setDomain] = useState("all")
  const [duration, setDuration] = useState("all")
  const [location, setLocation] = useState("all")
  const [stipend, setStipend] = useState("all")

  const [internships, setInternships] = useState([])
  const [filteredInternships, setFilteredInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch internships from Supabase Edge Function
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/get-internships")
        if (!res.ok) throw new Error("Failed to fetch internships")
        const data = await res.json()
        setInternships(data)
        setFilteredInternships(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  // Apply filters based on state
  useEffect(() => {
    const filtered = internships.filter((internship: any) => {
      const matchesSearch =
        searchQuery === "" ||
        internship.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDomain = domain === "all" || internship.domain === domain
      const matchesDuration = duration === "all" || internship.durationCategory === duration
      const matchesLocation = location === "all" || internship.location?.includes(location)
      const matchesStipend = stipend === "all" || internship.stipendCategory === stipend

      return matchesSearch && matchesDomain && matchesDuration && matchesLocation && matchesStipend
    })

    setFilteredInternships(filtered)
  }, [searchQuery, domain, duration, location, stipend, internships])

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Showing internships based on your filters.",
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDomain("all")
    setDuration("all")
    setLocation("all")
    setStipend("all")
  }

  const handleApply = (title: string, company: string) => {
    const params = new URLSearchParams({
      title: `${title} Application`,
      description: `Application form for ${title} at ${company}`,
      link: "https://example.com/application-form",
      return: "/internships",
    })
    window.location.href = `/timer-download?${params.toString()}`
  }
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container max-w-7xl px-4 py-6 md:py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top section with title and search */}
          <div className="grid gap-4 md:grid-cols-2 md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-stone-800 relative">
                Internship Alerts
                <svg
                  className="absolute -bottom-2 left-0 w-40 h-4"
                  viewBox="0 0 250 20"
                  fill="none"
                >
                  <path
                    d="M10 15 Q 125 5 240 12"
                    stroke="#78716c"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Latest internship opportunities for engineering students.
              </p>
            </div>
  
            <div className="w-full md:w-auto flex items-center justify-start md:justify-end">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                <Input
                  type="search"
                  placeholder="Search internships..."
                  className="pl-8 border-2 border-stone-200 focus:border-stone-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
  
          {/* Main Content Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <motion.div
              className="space-y-4 md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-stone-800">Filters</h3>
  
                {/* Domain */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-1">Domain</h4>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger className="w-full border-2 border-stone-200">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      <SelectItem value="software">Software Development</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="ml">Machine Learning</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {/* Duration */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-1">Duration</h4>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full border-2 border-stone-200">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="1-3">1-3 Months</SelectItem>
                      <SelectItem value="3-6">3-6 Months</SelectItem>
                      <SelectItem value="6+">6+ Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {/* Location */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-1">Location</h4>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full border-2 border-stone-200">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {/* Stipend */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-1">Stipend</h4>
                  <Select value={stipend} onValueChange={setStipend}>
                    <SelectTrigger className="w-full border-2 border-stone-200">
                      <SelectValue placeholder="Select stipend range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      <SelectItem value="5-10k">₹5,000 - ₹10,000</SelectItem>
                      <SelectItem value="10-20k">₹10,000 - ₹20,000</SelectItem>
                      <SelectItem value="20k+">₹20,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
  
              {/* Filter Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={applyFilters}
                  className="bg-stone-600 hover:bg-stone-700 text-white"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-2 border-stone-300 text-stone-700"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
  
            {/* Internship Cards */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div className="grid gap-4" variants={container} initial="hidden" animate="show">
                {loading ? (
                  <div className="text-center text-stone-500 py-12">Loading internships...</div>
                ) : error ? (
                  <div className="text-center text-red-500 py-12">Error: {error}</div>
                ) : filteredInternships.length > 0 ? (
                  filteredInternships.map((internship: any) => (
                    <motion.div key={internship.id} variants={item}>
                      <Card className="shadow-sm border-2 border-stone-100 hover:border-stone-300 transition-all bg-muted backdrop-blur-sm">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle className="text-stone-800">{internship.title}</CardTitle>
      {internship.isNew && (
        <Badge className="bg-stone-600 text-white">New</Badge>
      )}
    </div>
    <CardDescription className="text-muted-foreground">
      {internship.company}
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    {/* Info Row with Location, Duration on Left, Stipend on Right */}
    <div className="flex justify-between items-center text-sm text-muted-foreground">
      <div className="flex gap-3 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {internship.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {internship.duration}
        </span>
      </div>

      {/* RIGHT-ALIGNED STIPEND */}
      <span className="flex items-center gap-1 font-semibold bg-stone-100 px-3 py-1 rounded-full text-stone-700 border border-stone-300">
        <Briefcase className="h-4 w-4" />
        {internship.stipend}
      </span>
    </div>

    {/* Description */}
    <p className="text-sm text-stone-700">{internship.description}</p>

    {/* Skills */}
    <div className="flex flex-wrap gap-2">
      {internship.skills?.map((skill: string, index: number) => (
        <Badge
          key={index}
          variant="outline"
          className="bg-stone-50 border-stone-200 text-stone-700"
        >
          {skill}
        </Badge>
      ))}
    </div>
  </CardContent>

  {/* Footer with right-aligned CTA */}
  <CardFooter className="pt-4">
    <div className="flex justify-end w-full">
      <Button
        asChild
        size="lg"
        className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-2"
      >
        <Link href={`/internships/${internship.id}`} className="flex items-center">
          <Eye className="mr-2 h-4 w-4" />
          Click to Know More
        </Link>
      </Button>
    </div>
  </CardFooter>
</Card>
 
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-stone-800">
                      No internships found
                    </h3>
                    <p className="text-stone-600">
                      Try adjusting your filters or search query.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="mt-4 bg-stone-700 hover:bg-stone-800 text-white"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
  
              {/* Load More */}
              {filteredInternships.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="border-2 border-stone-300 text-stone-700">
                    Load More
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
  
}