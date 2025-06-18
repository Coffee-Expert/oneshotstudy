"use client"

import { useState, useEffect } from "react"
import { Briefcase, Calendar, MapPin, Search, Eye, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image" // Assuming you use next/image for optimized images

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast" // Assuming use-toast is properly configured

// Type definition for internship data returned by the Edge Function
interface InternshipData {
  id: string; // Assuming 'id' is returned by the Edge Function or can be reliably generated
  title: string;
  location: string;
  companyName: string;
  salaryStipend: string;
  batch: string;
  companyLogo?: string; // URL for company logo
  duration?: string; // e.g., "6 months" - for display
  domain?: string; // e.g., "software" - for filtering
  stipendCategory?: string; // e.g., "10-20k" - for filtering
  durationCategory?: string; // e.g., "3-6" - for filtering
  isNew?: boolean; // If you want to manually mark some as new
  description?: string; // Detailed description for a potential detail page
  skills?: string[]; // List of skills for a potential detail page
  applicationLink?: string; // Direct link to apply, if available
}

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [duration, setDuration] = useState("all");
  const [location, setLocation] = useState("all");
  const [stipend, setStipend] = useState("all");

  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch internships from Supabase Edge Function
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        // IMPORTANT: Your get-internships Edge Function needs to be updated to select
        // 'id', 'companyLogo', 'duration', 'domain', 'stipendCategory', 'durationCategory', 'description', 'skills', 'applicationLink'
        // for these filters and display fields to work correctly.
        const res = await fetch("https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/get-internships");
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch internships: ${res.status} ${res.statusText} - ${errorText}`);
        }
        
        const data: InternshipData[] = await res.json();
        
        // Assign a temporary ID if your data doesn't have one, or fetch a proper ID from DB
        const dataWithIds = data.map((item, index) => ({
          ...item,
          id: item.id || `${item.title.replace(/\s+/g, '-').toLowerCase()}-${index}`, // Use existing ID or generate one
          isNew: index < 2 // Example: Mark first two as new for demo purposes
        }));

        setInternships(dataWithIds);
        setFilteredInternships(dataWithIds);
      } catch (err: any) {
        console.error("Error fetching internships:", err);
        setError(err.message || "Something went wrong fetching internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Apply filters based on state
  useEffect(() => {
    const filtered = internships.filter((internship: InternshipData) => {
      const matchesSearch =
        searchQuery === "" ||
        internship.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())); // Search in skills too

      // These filter fields (domain, durationCategory, stipendCategory)
      // must be returned by your Supabase Edge Function for proper filtering.
      const matchesDomain = domain === "all" || internship.domain === domain;
      const matchesDuration = duration === "all" || internship.durationCategory === duration;
      const matchesLocation = location === "all" || internship.location?.includes(location);
      const matchesStipend = stipend === "all" || internship.stipendCategory === stipend;

      return matchesSearch && matchesDomain && matchesDuration && matchesLocation && matchesStipend;
    });

    setFilteredInternships(filtered);
  }, [searchQuery, domain, duration, location, stipend, internships]);

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Showing internships based on your filters.",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDomain("all");
    setDuration("all");
    setLocation("all");
    setStipend("all");
    setFilteredInternships(internships);
  };

  // Updated handleApply to use sessionStorage for secure parameter passing
  const handleApply = (title: string, company: string, applicationLink: string) => {
    sessionStorage.setItem('currentDownloadInfo', JSON.stringify({
      url: applicationLink,
      title: `${title} Application`,
      description: `Application form for ${title} at ${company}`,
      returnPath: "/internships",
    }));
    router.push("/download-page"); // Navigate to the download page
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container max-w-7xl px-4 py-6 md:py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top section with title and search */}
          <div className="grid gap-4 md:grid-cols-2 md:items-end md:justify-between pb-6 border-b border-border/70 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground relative">
                Internship Alerts
                <svg
                  className="absolute -bottom-2 left-0 w-40 h-4"
                  viewBox="0 0 250 20"
                  fill="none"
                >
                  <path
                    d="M10 15 Q 125 5 240 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Latest internship opportunities for engineering students.
              </p>
            </div>
            
            <div className="w-full md:w-auto flex items-center justify-start md:justify-end">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search internships..."
                  className="pl-8 border border-input focus:border-primary bg-background text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Main Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {/* Increased gap */}
            {/* Sidebar Filters */}
            <motion.div
              className="space-y-6 md:col-span-1 p-6 rounded-lg bg-card border border-border shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4"> {/* Increased spacing for filter items */}
                <h3 className="text-lg font-semibold text-foreground border-b pb-2 mb-2 border-border/70">Filters</h3>
                
                {/* Domain Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Domain</h4>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger className="w-full border border-input bg-background text-foreground">
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
                      <SelectItem value="marketing">Marketing</SelectItem> {/* Added marketing */}
                      <SelectItem value="content">Content Writing</SelectItem> {/* Added content */}
                      <SelectItem value="support">Technical Support</SelectItem> {/* Added support */}
                      <SelectItem value="analytics">Analytics</SelectItem> {/* Added analytics */}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Duration Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Duration</h4>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full border border-input bg-background text-foreground">
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

                {/* Location Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Location</h4>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full border border-input bg-background text-foreground">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Noida">Noida</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Kolkata">Kolkata</SelectItem> {/* Added as per data */}
                      <SelectItem value="Coimbatore">Coimbatore</SelectItem> {/* Added as per data */}
                      <SelectItem value="Kochi">Kochi</SelectItem> {/* Added as per data */}
                      <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem> {/* Added as per data */}
                      <SelectItem value="Indore">Indore</SelectItem> {/* Added as per data */}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Stipend Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Stipend</h4>
                  <Select value={stipend} onValueChange={setStipend}>
                    <SelectTrigger className="w-full border border-input bg-background text-foreground">
                      <SelectValue placeholder="Select stipend range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem> {/* Example: if you have unpaid */}
                      <SelectItem value="0-5k">₹0 - ₹5,000</SelectItem>
                      <SelectItem value="5-10k">₹5,000 - ₹10,000</SelectItem>
                      <SelectItem value="10-20k">₹10,000 - ₹20,000</SelectItem>
                      <SelectItem value="20k+">₹20,000+</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem> {/* Example: if you have negotiable */}
                      <SelectItem value="lpa">LPA (Annual Salary)</SelectItem> {/* For FTEs with LPA */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/70 mt-4">
                <Button
                  onClick={applyFilters}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border border-input text-foreground hover:bg-muted"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
            
            {/* Internship Cards */}
            <motion.div
              className="md:col-span-3 space-y-6" // Added space-y for vertical spacing between cards
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {loading ? (
                <div className="text-center text-muted-foreground py-12 md:col-span-3">Loading internships...</div>
              ) : error ? (
                <div className="text-center text-destructive py-12 md:col-span-3">Error: {error}</div>
              ) : filteredInternships.length > 0 ? (
                <motion.div className="grid gap-6 grid-cols-1" variants={container} initial="hidden" animate="show"> {/* Always 1 column */}
                  {filteredInternships.map((internship: InternshipData) => (
                    <motion.div key={internship.id} variants={item}>
                      <Card className="shadow-lg border border-border hover:shadow-xl transition-all bg-card backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                          <div className="flex items-center gap-4">
                              {internship.companyLogo && (
                                  <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-input">
                                      <Image
                                          src={internship.companyLogo}
                                          alt={`${internship.companyName} logo`}
                                          layout="fill"
                                          objectFit="contain"
                                          className="p-1"
                                      />
                                  </div>
                              )}
                              <div>
                                  <CardTitle className="text-xl font-bold text-foreground leading-snug">
                                      {internship.title}
                                  </CardTitle>
                                  <CardDescription className="text-muted-foreground text-sm mt-1">
                                      {internship.companyName}
                                  </CardDescription>
                              </div>
                          </div>
                          {internship.isNew && (
                              <Badge className="bg-primary text-primary-foreground text-xs py-1 px-3">New</Badge>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4 px-6 pb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    {internship.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" /> {/* Reverted to Calendar for duration */}
                                    Duration: {internship.duration || 'N/A'}
                                </span>
                                <span className="flex items-center gap-2 font-semibold text-foreground">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    Stipend: {internship.salaryStipend}
                                </span>
                                <span className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-primary" />
                                    Batch: {internship.batch}
                                </span>
                                {/* Add Domain if available */}
                                {internship.domain && (
                                    <span className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-primary" />
                                        Domain: {internship.domain}
                                    </span>
                                )}
                            </div>
                            {/* Detailed Description (if available from Edge Function) */}
                            {internship.description && (
                                <p className="text-sm text-foreground leading-relaxed mt-4">
                                    {internship.description.length > 200 ? `${internship.description.substring(0, 200)}...` : internship.description}
                                </p>
                            )}
                            {/* Skills (if available from Edge Function) */}
                            {internship.skills && internship.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {internship.skills.slice(0, 4).map((skill: string, idx: number) => (
                                        <Badge key={idx} variant="outline" className="bg-secondary text-secondary-foreground border border-input">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {internship.skills.length > 4 && (
                                        <Badge variant="outline" className="bg-secondary text-secondary-foreground border border-input">
                                            +{internship.skills.length - 4} more
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-0 px-6 pb-6">
                          <div className="flex justify-end w-full">
                            <Button
                              asChild
                              size="default" // Using default size for better clickability
                              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 shadow-md"
                            >
                              <Link href={`/internships/${internship.id}`}>
                                <div className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Click to Know More
                                </div>
                              </Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 md:col-span-3">
                  <h3 className="text-lg font-medium text-foreground">
                    No internships found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Load More - This button won't function fully without backend pagination */}
              {filteredInternships.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="border border-input text-foreground hover:bg-muted">
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
