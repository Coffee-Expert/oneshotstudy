"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { blogPostsData } from "@/data/blog-data"

/**
 * Blog Post Details Page Component
 * Displays individual blog post content with enhanced styling and proper markdown rendering
 */
export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  // State management for blog post data
  const [blogData, setBlogData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch blog post details on component mount
  useEffect(() => {
    const fetchBlogDetails = async () => {
      // Simulate API call with loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find blog post data by slug
      const data = blogPostsData.find((item) => item.slug === slug)
      if (data) {
        setBlogData(data)
      }
      setLoading(false)
    }

    fetchBlogDetails()
  }, [slug])

  // Function to render markdown-like content with proper formatting
  const renderContent = (content: string) => {
    // Split content into lines for processing
    const lines = content.split("\n")
    const elements: JSX.Element[] = []
    let currentParagraph: string[] = []
    let listItems: string[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(" ").trim()
        if (paragraphText) {
          elements.push(
            <p key={elements.length} className="mb-6 text-stone-700 leading-relaxed text-lg">
              {paragraphText}
            </p>,
          )
        }
        currentParagraph = []
      }
    }

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="mb-6 space-y-3 text-stone-700">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-stone-500 mr-3 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>,
        )
        listItems = []
      }
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      // Handle code blocks
      if (trimmedLine.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre key={elements.length} className="mb-6 bg-stone-800 text-stone-100 p-4 rounded-lg overflow-x-auto">
              <code>{codeBlockContent.join("\n")}</code>
            </pre>,
          )
          codeBlockContent = []
          inCodeBlock = false
        } else {
          // Start code block
          flushParagraph()
          flushList()
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      // Handle headings
      if (trimmedLine.startsWith("# ")) {
        flushParagraph()
        flushList()
        elements.push(
          <h1 key={elements.length} className="text-4xl font-bold mb-8 mt-12 text-stone-800 leading-tight">
            {trimmedLine.substring(2)}
          </h1>,
        )
      } else if (trimmedLine.startsWith("## ")) {
        flushParagraph()
        flushList()
        elements.push(
          <h2 key={elements.length} className="text-3xl font-bold mb-6 mt-10 text-stone-800 leading-tight">
            {trimmedLine.substring(3)}
          </h2>,
        )
      } else if (trimmedLine.startsWith("### ")) {
        flushParagraph()
        flushList()
        elements.push(
          <h3 key={elements.length} className="text-2xl font-bold mb-4 mt-8 text-stone-800 leading-tight">
            {trimmedLine.substring(4)}
          </h3>,
        )
      } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        flushParagraph()
        flushList()
        elements.push(
          <h4 key={elements.length} className="text-xl font-bold mb-4 mt-6 text-stone-800">
            {trimmedLine.substring(2, trimmedLine.length - 2)}
          </h4>,
        )
      } else if (trimmedLine.startsWith("- ")) {
        flushParagraph()
        listItems.push(trimmedLine.substring(2))
      } else if (trimmedLine === "") {
        flushParagraph()
        flushList()
      } else {
        flushList()
        currentParagraph.push(trimmedLine)
      }
    })

    // Flush any remaining content
    flushParagraph()
    flushList()

    return elements
  }

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />
  }

  // Show error message if blog post not found
  if (!blogData) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-50">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-12 text-center px-4 md:px-6">
            <h1 className="text-2xl font-bold text-stone-800">Blog post not found</h1>
            <p className="text-stone-600 mt-2">The blog post you're looking for doesn't exist.</p>
            <Button asChild className="mt-6 bg-stone-700 hover:bg-stone-800 text-stone-100">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.article
          className="container py-12 px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back navigation button */}
          <Button variant="ghost" asChild className="mb-8 text-stone-600 hover:text-stone-800 hover:bg-stone-100">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Article header */}
          <header className="mx-auto max-w-4xl space-y-6">
            {/* Category and featured badge */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-stone-100 border-stone-300 text-stone-700 capitalize">
                {blogData.category.replace("-", " ")}
              </Badge>
              {blogData.featured && <Badge className="bg-stone-600 text-stone-100">Featured</Badge>}
            </div>

            {/* Title with decorative underline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight relative">
              {blogData.title}
              {/* Handmade underline */}
              <svg className="absolute -bottom-4 left-0 w-full max-w-2xl h-8" viewBox="0 0 600 30" fill="none">
                <path
                  d="M20 20 Q 150 8 300 15 Q 450 22 580 12"
                  stroke="#78716c"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M25 22 Q 160 10 310 17 Q 460 24 575 14"
                  stroke="#78716c"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-stone-600 leading-relaxed">{blogData.excerpt}</p>

            {/* Meta information */}
            <div className="flex flex-wrap gap-6 text-sm text-stone-600 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blogData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blogData.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-3 pt-4">
              <Tag className="h-4 w-4 text-stone-500" />
              <div className="flex flex-wrap gap-2">
                {blogData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-stone-50 border-stone-200 text-stone-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="mx-auto max-w-4xl my-12">
            <div
              className="aspect-video bg-cover bg-center rounded-xl shadow-lg border border-stone-200"
              style={{ backgroundImage: `url(${blogData.image})` }}
            />
          </div>

          {/* Article content */}
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg prose-stone max-w-none">{renderContent(blogData.content)}</div>
          </div>

          {/* Related posts section */}
          <div className="mx-auto max-w-4xl mt-16 pt-12 border-t border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800 mb-8">More from Our Blog</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {blogPostsData
                .filter((post) => post.id !== blogData.id)
                .slice(0, 2)
                .map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block p-6 bg-white rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all"
                  >
                    <div className="space-y-3">
                      <Badge variant="outline" className="bg-stone-100 border-stone-200 text-stone-700 capitalize">
                        {post.category.replace("-", " ")}
                      </Badge>
                      <h3 className="text-lg font-semibold text-stone-800 group-hover:text-stone-900 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-stone-600 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.article>
      </main>
      <SiteFooter />
    </div>
  )
}
