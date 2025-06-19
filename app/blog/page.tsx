"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Calendar, User, ArrowRight, Filter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { blogPostsData } from "@/data/blog-data"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredPosts, setFilteredPosts] = useState(blogPostsData)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const filtered = blogPostsData.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory])

  const categories = ["all", "announcements", "study-tips", "career", "technology", "updates"]

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    if (searchRef.current) searchRef.current.value = ""
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-blue-950/10">
      <SiteHeader />
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          <div className="container relative z-10 text-center px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insights & Resources
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Expert knowledge, study tips, and industry updates for engineering students
            </motion.p>
            
            {/* Animated search in hero */}
            <motion.div 
              className="mt-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-blue-400" />
                <Input
                  ref={searchRef}
                  type="search"
                  placeholder="Search articles, topics, keywords..."
                  className="w-full pl-12 pr-10 py-6 rounded-xl border-0 shadow-lg text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <X 
                    className="absolute right-4 top-3.5 h-5 w-5 text-blue-400 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section
          className="container py-10 md:py-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Featured Post Section */}
              {filteredPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Featured Content</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <select className="bg-transparent text-sm border-0 focus:ring-0">
                        <option>Latest</option>
                        <option>Popular</option>
                        <option>Most Viewed</option>
                      </select>
                    </div>
                  </div>
                  
                  <Card className="overflow-hidden group">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                       
                          <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${filteredPosts[0].image})` }}
                          />
                        
                      </div>
                      <div className="md:w-1/2 p-6 flex flex-col">
                        <div className="flex gap-2 mb-4">
                          <Badge className="capitalize bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                            {filteredPosts[0].category.replace("-", " ")}
                          </Badge>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300">
                            Featured
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-3">{filteredPosts[0].title}</CardTitle>
                        <CardDescription className="mb-4 line-clamp-3">
                          {filteredPosts[0].excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <User className="mr-1 h-4 w-4" />
                              <span>{ "Admin"}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{filteredPosts[0].date}</span>
                            </div>
                          </div>
                          <Button asChild variant="outline" className="rounded-full">
                            <Link href={`/blog/${filteredPosts[0].slug}`}>
                              Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Mobile Filters */}
              <div className="lg:hidden flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">All Articles</h2>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </div>

              <AnimatePresence>
                {mobileFiltersOpen && (
                  <motion.div 
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <motion.div 
                      className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-xl"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Filters</h3>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Badge
                              key={category}
                              variant={selectedCategory === category ? "default" : "outline"}
                              className="cursor-pointer capitalize px-3 py-1.5"
                              onClick={() => {
                                setSelectedCategory(category)
                                setMobileFiltersOpen(false)
                              }}
                            >
                              {category.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            variant="secondary" 
                            className="w-full"
                            onClick={handleClearFilters}
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Blog Posts Grid */}
              <motion.div
                className="grid gap-8 md:grid-cols-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.div 
                      key={post.id} 
                      variants={item}
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full flex flex-col overflow-hidden group border-0 shadow-md hover:shadow-xl transition-all">
                        <div className="relative overflow-hidden">
                         
                            <div 
                              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                              style={{ backgroundImage: `url(${post.image})` }}
                            />
                          
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className="capitalize bg-background/80 backdrop-blur-sm">
                              {post.category.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="flex-1">
                          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3 mt-2">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <User className="mr-1 h-4 w-4" />
                              <span>{"Admin"}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Button asChild variant="outline" className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-12 w-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No posts found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                    <Button
                      onClick={handleClearFilters}
                      className="rounded-full px-6"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Load More Button */}
              {filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" className="rounded-full px-8 py-5 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.filter(cat => cat !== "all").map((category) => (
                        <div 
                          key={category}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedCategory === category ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-muted'}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          <span className="capitalize">{category.replace("-", " ")}</span>
                          <Badge variant="secondary">12</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Posts */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Popular Reads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPostsData.slice(0, 3).map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
                            <div>
                              <h4 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h4>
                              <p className="text-sm text-muted-foreground">{post.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter */}
                <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardHeader>
                    <CardTitle>Stay Updated</CardTitle>
                    <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input placeholder="Your email" className="bg-background" />
                      <Button className="w-full">Subscribe</Button>
                      <p className="text-xs text-muted-foreground">No spam, just quality content</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}