"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TypewriterHero } from "@/components/typewriter-hero"
import { AdContainer } from "@/components/ad-container"
import { blogPostsData } from "@/data/blog-data"

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredPosts, setFilteredPosts] = useState(blogPostsData)

  useEffect(() => {
    const filtered = blogPostsData.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) 

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory])

  const categories = ["all", "announcements", "study-tips", "career", "technology", "updates"]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background py-16">
          <div className="container text-center">
           
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest announcements, study tips, and insights from the engineering education world.
            </p>
          </div>
        </section>

        <motion.section
          className="container py-8 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.replace("-", " ")}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ad Container */}
          <div className="mb-8">
            <AdContainer position="top" />
          </div>

          {/* Blog Posts Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div key={post.id} variants={item}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div
                      className="h-48 bg-cover bg-center rounded-t-lg"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {post.category.replace("-", " ")}
                        </Badge>
                        {post.featured && <Badge>Featured</Badge>}
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">Load More Posts</Button>
            </div>
          )}
        </motion.section>
      </main>
      <SiteFooter />
     
    </div>
  )
}
