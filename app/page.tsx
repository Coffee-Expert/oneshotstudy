"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  PlayCircle,
  Users,
  Calendar, // Added Calendar for internship card
  MapPin,   // Added MapPin for internship card
  Eye       // Added Eye for internship card
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; // Added CardDescription
import { FeaturedCourse } from "@/components/featured-course";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TypewriterHero } from "@/components/typewriter-hero";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Badge } from "@/components/ui/badge"; // Added Badge

// Reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const FEATURES = [
  {
    title: "Structured Courses",
    description: "Access video lectures and comprehensive notes, organized by AKTU syllabus for focused learning.",
    icon: PlayCircle,
  },
  {
    title: "Downloadable Resources",
    description: "Get essential study materials, including AKTU Quantum PDFs and handwritten notes, available offline.",
    icon: BookOpen,
  },
  {
    title: "Internship Alerts",
    description: "Stay ahead with curated internship opportunities, specifically for engineering students.",
    icon: Briefcase,
  },
  {
    title: "YouTube Tutorials",
    description: "Deepen your understanding with detailed explanations on our dedicated YouTube channel.",
    icon: PlayCircle,
  },
  {
    title: "AKTU Exam Prep",
    description: "Find previous year question papers, exam updates, and strategic tips to ace your AKTU exams.",
    icon: GraduationCap,
  },
  {
    title: "Vibrant Community",
    description: "Connect with peers, share knowledge, and collaborate on projects in our active student groups.",
    icon: Users,
  },
];

const COURSES = [
  {
    title: "Design Thinking",
    description: "Learn design thinking methodology and human-centered design principles.",
    slug: "/courses/design-thinking",
    icon: "code",
    level: "Beginner" as const,
    videos: 6,
    hours: 8,
  },
  {
    title: "Cloud Computing",
    description: "Master cloud computing concepts, services, and deployment models.",
    slug: "/courses/cloud-computing",
    icon: "server",
    level: "Intermediate" as const,
    videos: 5,
    hours: 7,
  },
  {
    title: "Software Testing",
    description: "Learn software testing methodologies, tools, and best practices.",
    slug: "/courses/software-testing",
    icon: "code",
    level: "Intermediate" as const,
    videos: 6,
    hours: 6,
  },
  {
    title: "Social Media & Digital Marketing",
    description: "Understand social media strategies and digital marketing techniques.",
    slug: "/courses/social-media-digital-marketing",
    icon: "globe",
    level: "Beginner" as const,
    videos: 5,
    hours: 5,
  },
];

export default function Home() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const [latestInternships, setLatestInternships] = useState<any[]>([]);
  const [internshipLoading, setInternshipLoading] = useState(true);
  const [internshipError, setInternshipError] = useState<string | null>(null);

  // Fetch latest internships on component mount
  useEffect(() => {
    const fetchLatestInternships = async () => {
      try {
        setInternshipLoading(true);
        const res = await fetch("https://gtxhtlpbwgmvljzsezfm.supabase.co/functions/v1/get-internships");
        if (!res.ok) {
          throw new Error(`Failed to fetch internships: ${res.statusText}`);
        }
        const data = await res.json();
        // Take up to 4 latest internships
        setLatestInternships(data.slice(0, 4));
      } catch (err: any) {
        console.error("Error fetching internships:", err);
        setInternshipError(err.message || "Could not load internships.");
      } finally {
        setInternshipLoading(false);
      }
    };
    fetchLatestInternships();
  }, []);

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    setTimeout(() => router.push(href), 500); // uses Next.js SPA routing
  };

  if (isNavigating) return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="space-y-8 pb-12 pt-8 md:pb-16 md:pt-12 lg:py-40"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center px-6">
            <motion.div variants={fadeInUp}>
              <Link
                href="https://www.youtube.com/@OneShotEngineer"
                className="rounded-2xl bg-muted-foreground/10 px-6 py-2 text-sm font-medium text-foreground hover:bg-muted-foreground/20 transition-all shadow-sm"
                target="_blank"
              >
                <span>Visit our YouTube Channel</span>
              </Link>
            </motion.div>

            <motion.h1
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl relative text-foreground leading-tight"
              variants={fadeInUp}
            >
              <TypewriterHero />
              <svg
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md h-8"
                viewBox="0 0 400 30"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 20 Q 100 8 200 15 Q 300 22 380 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.6"
                />
                <path
                  d="M25 22 Q 120 10 220 17 Q 320 24 375 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.4"
                />
              </svg>
            </motion.h1>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="container space-y-8 rounded-3xl bg-muted/60 backdrop-blur-sm py-12 md:py-16 lg:py-32 mx-auto my-12 transition-colors"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mx-auto max-w-[58rem] text-center space-y-6 px-6">
            <h2 className="font-heading text-3xl md:text-6xl relative text-foreground">
              Core Offerings
              <svg
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-6"
                viewBox="0 0 200 25"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 18 Q 60 8 100 15 Q 140 22 185 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-30 text-muted-foreground"
                />
              </svg>
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Empowering your engineering journey with comprehensive resources and community support.
            </p>
          </div>

          {/* Features Grid */}
          <motion.div
            className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {FEATURES.map(({ title, description, icon: Icon }, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border border-border bg-card/80 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardHeader className="flex items-center justify-between pb-3">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {title}
                    </CardTitle>
                    <Icon className="h-6 w-6 text-primary" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Latest Internships Section */}
        <motion.section
          id="internships"
          className="container py-12 md:py-16 lg:py-32 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-6 max-w-[58rem] mx-auto">
            <h2 className="font-heading text-3xl md:text-6xl relative text-foreground">
              Latest Internship Alerts
              <svg
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-6"
                viewBox="0 0 300 25"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 18 Q 80 8 150 15 Q 220 22 280 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-50 text-muted-foreground"
                />
              </svg>
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Don't miss out on valuable experience. Browse the latest opportunities!
            </p>
          </div>

          {internshipLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading latest internships...</div>
          ) : internshipError ? (
            <div className="text-center text-destructive py-12">Error: {internshipError}</div>
          ) : latestInternships.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {latestInternships.map((internship: any) => (
                <Card key={internship.id} className="shadow-sm border border-border hover:shadow-md transition-all bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-foreground">{internship.title}</CardTitle>
                      {internship.isNew && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {internship.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex gap-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          {internship.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          {internship.duration}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 font-semibold bg-muted px-3 py-1 rounded-full text-foreground border border-input">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {internship.stipend}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills?.slice(0, 3).map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-secondary text-secondary-foreground border border-input"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {internship.skills?.length > 3 && (
                        <Badge variant="outline" className="bg-secondary text-secondary-foreground border border-input">
                          +{internship.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <div className="flex justify-end w-full">
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2"
                      >
                        <Link href={`/internships/${internship.id}`} className="flex items-center">
                          <div className="flex items-center"> {/* Changed span to div here */}
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground">No recent internships available</h3>
              <p className="text-muted-foreground">Check back soon or explore our full internships page.</p>
            </div>
          )}

          {latestInternships.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg shadow-lg hover:shadow-xl"
                onClick={() => handleNavigation("/internships")}
              >
                View All Internships <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </motion.section>

        {/* Courses Section */}
        <motion.section
          id="courses"
          className="container py-12 md:py-16 lg:py-32 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-6 max-w-[58rem] mx-auto">
            <h2 className="font-heading text-3xl md:text-6xl relative text-foreground">
              Available Courses
              <svg
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-6"
                viewBox="0 0 300 25"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 18 Q 80 8 150 15 Q 220 22 280 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-50 text-muted-foreground"
                />
              </svg>
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Explore our curated courses with YouTube integration and notes.
            </p>
          </div>

          {/* Course Cards */}
          <div className="mt-12">
            <motion.div
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {COURSES.map((course, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <FeaturedCourse {...course} />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-12">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg shadow-lg hover:shadow-xl"
                onClick={() => handleNavigation("/courses")}
              >
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Community */}
        <motion.section
          id="community"
          className="container py-12 md:py-16 lg:py-32 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-6 max-w-[58rem] mx-auto">
            <h2 className="font-heading text-3xl md:text-6xl text-foreground relative">
              Join Our Community
              <svg
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-6"
                viewBox="0 0 280 25"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 18 Q 70 8 140 15 Q 210 22 260 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-50 text-muted-foreground"
                />
              </svg>
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Connect with fellow students, ask questions, collaborate on projects.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-input text-foreground hover:bg-muted"
              >
                <Link
                  href="https://chat.whatsapp.com/DOifOx5wRGa66ZCmi9xakz"
                  target="_blank"
                >
                  <div className="flex items-center"> {/* Changed span to div here */}
                    Join WhatsApp Group <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link
                  href="https://www.youtube.com/@OneShotEngineer"
                  target="_blank"
                >
                  <div className="flex items-center"> {/* Changed span to div here */}
                    Subscribe on YouTube <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
