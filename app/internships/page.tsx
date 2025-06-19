"use client"

import { useState, useEffect, useCallback } from "react"
import { Briefcase, Calendar, MapPin, Search, Eye, GraduationCap, Filter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Type definition for internship data
interface InternshipData {
  id: string;
  title: string;
  location: string;
  companyName: string;
  salaryStipend: string;
  batch: string;
  companyLogo?: string;
  duration?: string;
  domain?: string;
  stipendCategory?: string;
  durationCategory?: string;
  isNew?: boolean;
  description?: string;
  skills?: string[];
  applicationLink?: string;
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
  exit: { opacity: 0, y: 20 }
}

export default function InternshipsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [duration, setDuration] = useState("all");
  const [location, setLocation] = useState("all");
  const [stipend, setStipend] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch internships from Supabase Edge Function
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/get-internships");
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch internships: ${res.status} ${res.statusText} - ${errorText}`);
        }
        
        const data: InternshipData[] = await res.json();
        
        const dataWithIds = data.map((item, index) => ({
          ...item,
          id: item.id || `${item.title.replace(/\s+/g, '-').toLowerCase()}-${index}`,
          isNew: index < 2
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
        internship.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = domain === "all" || internship.domain === domain;
      const matchesDuration = duration === "all" || internship.durationCategory === duration;
      const matchesLocation = location === "all" || internship.location?.includes(location);
      const matchesStipend = stipend === "all" || internship.stipendCategory === stipend;

      return matchesSearch && matchesDomain && matchesDuration && matchesLocation && matchesStipend;
    });

    // Apply sorting
    let sortedResults = [...filtered];
    switch(sortOption) {
      case "newest":
        // Newest first (assuming newer items have higher index)
        sortedResults = sortedResults.reverse();
        break;
      case "stipend_high":
        sortedResults.sort((a, b) => {
          const stipendA = parseStipendValue(a.salaryStipend);
          const stipendB = parseStipendValue(b.salaryStipend);
          return stipendB - stipendA;
        });
        break;
      case "stipend_low":
        sortedResults.sort((a, b) => {
          const stipendA = parseStipendValue(a.salaryStipend);
          const stipendB = parseStipendValue(b.salaryStipend);
          return stipendA - stipendB;
        });
        break;
      default:
        break;
    }

    setFilteredInternships(sortedResults);
  }, [searchQuery, domain, duration, location, stipend, internships, sortOption]);

  const parseStipendValue = (stipend: string): number => {
    if (!stipend) return 0;
    
    // Extract numbers from stipend string
    const numbers = stipend.match(/\d+/g);
    if (!numbers || numbers.length === 0) return 0;
    
    // Take the first number found
    const value = parseInt(numbers[0]);
    
    // Handle LPA (Lakhs Per Annum) conversion
    if (stipend.toLowerCase().includes("lpa")) {
      return value * 100000 / 12; // Convert to monthly equivalent
    }
    
    return value;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDomain("all");
    setDuration("all");
    setLocation("all");
    setStipend("all");
    setFilteredInternships(internships);
    toast({
      title: "Filters Cleared",
      description: "Showing all internships.",
    });
  };

  const handleApply = (title: string, company: string, applicationLink: string) => {
    sessionStorage.setItem('currentDownloadInfo', JSON.stringify({
      url: applicationLink,
      title: `${title} Application`,
      description: `Application form for ${title} at ${company}`,
      returnPath: "/internships",
    }));
    router.push("/download-page");
  };

  const activeFilterCount = [domain, duration, location, stipend].filter(
    filter => filter !== "all"
  ).length;

  // Loading skeleton
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <motion.div 
        key={index} 
        className="bg-card border border-border rounded-xl overflow-hidden shadow-md"
        variants={item}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-muted h-6 w-40 rounded-md animate-pulse" />
            <div className="bg-muted h-6 w-20 rounded-md animate-pulse" />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-muted rounded-full w-12 h-12 animate-pulse" />
            <div className="bg-muted h-5 w-32 rounded-md animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-muted h-4 w-4 rounded-full animate-pulse" />
                <div className="bg-muted h-4 w-24 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
          
          <div className="bg-muted h-4 w-full rounded-md mb-3 animate-pulse" />
          <div className="bg-muted h-4 w-3/4 rounded-md animate-pulse" />
          
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted h-6 w-16 rounded-md animate-pulse" />
            ))}
          </div>
          
          <div className="flex justify-end mt-6 gap-3">
            <div className="bg-muted h-10 w-24 rounded-md animate-pulse" />
            <div className="bg-muted h-10 w-32 rounded-md animate-pulse" />
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>
          <div className="container max-w-7xl px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Find Your Dream <span className="text-primary">Internship</span>
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover the latest opportunities tailored for engineering students
              </motion.p>
              
              <motion.div 
                className="mt-8 relative max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search internships, companies, or skills..."
                  className="pl-10 pr-4 py-5 text-base border-2 border-primary/20 focus:border-primary bg-background/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <motion.section
          className="container max-w-7xl px-4 py-8 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredInternships.length} Internship{filteredInternships.length !== 1 ? 's' : ''} Available
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[160px] border-2 border-primary/20 bg-background">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="stipend_high">Stipend: High to Low</SelectItem>
                    <SelectItem value="stipend_low">Stipend: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2 border-2 border-primary/20"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <motion.div
                className="space-y-6 p-6 rounded-xl bg-card border border-border shadow-sm sticky top-24"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
                
                <div className="space-y-5">
                  {/* Domain Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Domain
                    </h4>
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
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="content">Content Writing</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Duration Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Duration
                    </h4>
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
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location
                    </h4>
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
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                        <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                        <SelectItem value="Kochi">Kochi</SelectItem>
                        <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
                        <SelectItem value="Indore">Indore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Stipend Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Stipend
                    </h4>
                    <Select value={stipend} onValueChange={setStipend}>
                      <SelectTrigger className="w-full border border-input bg-background text-foreground">
                        <SelectValue placeholder="Select stipend range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ranges</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="0-5k">₹0 - ₹5,000</SelectItem>
                        <SelectItem value="5-10k">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="10-20k">₹10,000 - ₹20,000</SelectItem>
                        <SelectItem value="20k+">₹20,000+</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                        <SelectItem value="lpa">LPA (Annual Salary)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Internship Cards */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {domain !== "all" && (
                    <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
                      Domain: {domain}
                      <button onClick={() => setDomain("all")} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {duration !== "all" && (
                    <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
                      Duration: {duration}
                      <button onClick={() => setDuration("all")} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {location !== "all" && (
                    <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
                      Location: {location}
                      <button onClick={() => setLocation("all")} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {stipend !== "all" && (
                    <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
                      Stipend: {stipend}
                      <button onClick={() => setStipend("all")} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
              
              {loading ? (
                <div className="grid gap-6 grid-cols-1">
                  {renderSkeletons()}
                </div>
              ) : error ? (
                <div className="text-center text-destructive py-12">
                  <div className="text-xl font-medium mb-2">Error loading internships</div>
                  <p className="text-muted-foreground">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Try Again
                  </Button>
                </div>
              ) : filteredInternships.length > 0 ? (
                <motion.div 
                  className="grid gap-6 grid-cols-1" 
                  variants={container} 
                  initial="hidden" 
                  animate="show"
                >
                  <AnimatePresence>
                    {filteredInternships.map((internship: InternshipData) => (
                      <motion.div 
                        key={internship.id} 
                        variants={item}
                        exit="exit"
                        layout
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                      >
                        <Card className="border-0">
                          <CardHeader className="flex flex-row items-start justify-between pb-3">
                            <div className="flex items-start gap-4">
                              {internship.companyLogo && (
                                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-input bg-white p-1">
                                  <Image
                                    src={internship.companyLogo}
                                    alt={`${internship.companyName} logo`}
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              )}
                              <div>
                                <CardTitle className="text-xl font-bold text-foreground">
                                  {internship.title}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground text-base mt-1">
                                  {internship.companyName}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {internship.isNew && (
                                <Badge className="bg-primary text-primary-foreground text-xs py-1 px-2 animate-pulse">
                                  New
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-muted-foreground text-xs">
                                {internship.domain || "Tech"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>{internship.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>Duration: {internship.duration || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-2 font-medium text-foreground">
                                <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>Stipend: {internship.salaryStipend}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>Batch: {internship.batch}</span>
                              </div>
                            </div>
                            
                            {internship.description && (
                              <p className="text-sm text-foreground/90 mb-4">
                                {internship.description.length > 150 ? `${internship.description.substring(0, 150)}...` : internship.description}
                              </p>
                            )}
                            
                            {internship.skills && internship.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {internship.skills.slice(0, 5).map((skill: string, idx: number) => (
                                  <Badge 
                                    key={idx} 
                                    variant="secondary" 
                                    className="bg-secondary/30 text-secondary-foreground border border-border"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                                {internship.skills.length > 5 && (
                                  <Badge variant="outline" className="text-muted-foreground">
                                    +{internship.skills.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="pt-0 px-6 pb-6">
                            <div className="flex justify-end w-full gap-3">
                              <Button
                                asChild
                                variant="outline"
                                className="border border-input text-foreground hover:bg-muted"
                              >
                                <Link href={`/internships/${internship.id}`}>
                                  <div className="flex items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </div>
                                </Link>
                              </Button>
                              <Button
                                size="default"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                                onClick={() => handleApply(internship.title, internship.companyName, internship.applicationLink || "#")}
                              >
                                Apply Now
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto max-w-md">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-xl font-medium text-foreground">
                      No internships found
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Load More */}
              {filteredInternships.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="border border-input text-foreground hover:bg-muted">
                    Load More Internships
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
      
      {/* Mobile Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div 
              className="fixed right-0 top-0 h-full w-full max-w-xs bg-card border-l border-border shadow-lg z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-60px)]">
                <div className="space-y-5">
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
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="content">Content Writing</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
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
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                        <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                        <SelectItem value="Kochi">Kochi</SelectItem>
                        <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
                        <SelectItem value="Indore">Indore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Stipend</h4>
                    <Select value={stipend} onValueChange={setStipend}>
                      <SelectTrigger className="w-full border border-input bg-background text-foreground">
                        <SelectValue placeholder="Select stipend range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ranges</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="0-5k">₹0 - ₹5,000</SelectItem>
                        <SelectItem value="5-10k">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="10-20k">₹10,000 - ₹20,000</SelectItem>
                        <SelectItem value="20k+">₹20,000+</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                        <SelectItem value="lpa">LPA (Annual Salary)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex-1 border border-input text-foreground hover:bg-muted"
                  >
                    Clear Filters
                  </Button>
                  <Button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Show Results
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}