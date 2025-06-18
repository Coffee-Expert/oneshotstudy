"use client"

import { useState, useEffect } from "react"
import { Briefcase, GraduationCap, MapPin, Search, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation" // Import useRouter

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
  id: string; // Assuming 'id' is also returned or can be derived/generated for keys
  title: string;
  location: string;
  companyName: string;
  salaryStipend: string;
  batch: string;
  isNew?: boolean; // Optional: If you want to manually mark some as new
  // Note: 'description' and 'skills' are not returned by your current Edge Function's select.
  // They would need a separate fetch on a detail page or to be added to the Edge Function's select.
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
  const [location, setLocation] = useState("all");

  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch internships from Supabase Edge Function
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        // Make sure the Supabase_URL and SUPABASE_ANON_KEY are correctly set up
        const res = await fetch("https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/get-internships");
        
        if (!res.ok) {
          const errorText = await res.text(); // Get raw error response
          throw new Error(`Failed to fetch internships: ${res.status} ${res.statusText} - ${errorText}`);
        }
        
        const data: InternshipData[] = await res.json();
        
        // Assign a temporary ID if your data doesn't have one, or fetch a proper ID
        // For demonstration, let's assume we can use a combination for a unique key if no 'id' comes back
        const dataWithIds = data.map((item, index) => ({
          ...item,
          id: item.title.replace(/\s+/g, '-').toLowerCase() + '-' + index, // Simple unique ID
          isNew: index < 2 // Example: Mark first two as new for landing page preview
        }));

        setInternships(dataWithIds);
        setFilteredInternships(dataWithIds);
      } catch (err: any) {
        console.error("Error fetching internships:", err); // Log full error
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
        internship.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = location === "all" || internship.location?.includes(location);

      return matchesSearch && matchesLocation;
    });

    setFilteredInternships(filtered);
  }, [searchQuery, location, internships]);

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Showing internships based on your filters.",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("all");
    // Re-apply filters to show all original internships
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
          <div className="grid gap-4 md:grid-cols-2 md:items-end md:justify-between">
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
                    stroke="currentColor" // Use currentColor for consistent theme
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
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> {/* Adjusted color */}
                <Input
                  type="search"
                  placeholder="Search internships..."
                  className="pl-8 border border-input focus:border-primary bg-background text-foreground" // Adjusted colors
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
              className="space-y-4 md:col-span-1 p-4 rounded-lg bg-card border border-border shadow-sm" // Added card styling to filter box
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                
                {/* Location Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Location</h4>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full border border-input bg-background text-foreground"> {/* Adjusted colors */}
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Bangalore">Bengaluru</SelectItem> {/* Use Bengaluru as per data */}
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Noida">Noida</SelectItem> {/* Added Noida */}
                      <SelectItem value="Pune">Pune</SelectItem> {/* Added Pune */}
                      <SelectItem value="Chennai">Chennai</SelectItem> {/* Added Chennai */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={applyFilters}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground" // Adjusted colors
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border border-input text-foreground hover:bg-muted" // Adjusted colors
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
              <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show"> {/* Adjusted grid for more cards per row */}
                {loading ? (
                  <div className="text-center text-muted-foreground py-12 md:col-span-3">Loading internships...</div>
                ) : error ? (
                  <div className="text-center text-destructive py-12 md:col-span-3">Error: {error}</div>
                ) : filteredInternships.length > 0 ? (
                  filteredInternships.map((internship: InternshipData) => (
                    <motion.div key={internship.id} variants={item}>
                      <Card className="shadow-sm border border-border hover:border-primary transition-all bg-card backdrop-blur-sm h-full flex flex-col"> {/* Added flex-col and h-full */}
                        <CardHeader className="flex-grow"> {/* Allows header to grow */}
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                                {internship.title}
                            </CardTitle>
                            {internship.isNew && (
                                <Badge className="bg-primary text-primary-foreground">New</Badge>
                            )}
                          </div>
                          <CardDescription className="text-muted-foreground text-sm">
                            {internship.companyName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-4">
                            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    {internship.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GraduationCap className="h-4 w-4 text-primary" /> {/* Changed Calendar to GraduationCap for batch */}
                                    Batch: {internship.batch}
                                </span>
                                <span className="flex items-center gap-1 font-semibold bg-muted px-3 py-1 rounded-full text-foreground border border-input">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    {internship.salaryStipend}
                                </span>
                            </div>
                            {/* Skills and Description are not available in current Edge Function output */}
                            {/* <p className="text-sm text-muted-foreground mt-2">
                                {internship.description?.length > 100 ? `${internship.description.substring(0, 100)}...` : internship.description}
                            </p>
                            {internship.skills && internship.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {internship.skills.slice(0, 3).map((skill: string, idx: number) => (
                                        <Badge key={idx} variant="outline" className="bg-secondary text-secondary-foreground border border-input">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {internship.skills.length > 3 && (
                                        <Badge variant="outline" className="bg-secondary text-secondary-foreground border border-input">
                                            +{internship.skills.length - 3} more
                                        </Badge>
                                    )}
                                </div>
                            )} */}
                        </CardContent>
                        <CardFooter className="pt-0 mt-auto"> {/* Ensures button is at bottom */}
                          <div className="flex justify-end w-full">
                            {/* NOTE: You'll need an 'application_link' in your Supabase table for this to work */}
                            <Button
                              asChild
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2"
                            >
                              {/* Assuming 'internship.id' will route to a detail page where more info can be fetched */}
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
                  ))
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
              </motion.div>
              
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
