"use client"

import { useState, useEffect } from "react"
import { Download, FileText, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { notesData } from "@/data/notes-data"
import { redirect } from "next/dist/server/api-utils"

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

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("cse")
  const [filteredNotes, setFilteredNotes] = useState(notesData)

  useEffect(() => {
    const filtered = notesData.filter((note) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by branch
      const matchesBranch = selectedBranch === "all" || note.branch === selectedBranch

      return matchesSearch && matchesBranch
    })

    setFilteredNotes(filtered)
  }, [searchQuery, selectedBranch])

  

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
                Notes
                {/* Handwritten underline */}
                <svg className="absolute -bottom-3 left-0 w-24 h-5" viewBox="0 0 150 20" fill="none">
                  <path
                    d="M10 15 Q 75 5 140 12"
                    stroke="#78716c"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </h1>
              <p className="text-muted-foreground mt-2">Download comprehensive notes for all subjects.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="w-full pl-10 md:w-[200px] lg:w-[300px] border-2 border-stone-200 focus:border-stone-400 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Tabs defaultValue="cse" className="mt-12" value={selectedBranch} onValueChange={setSelectedBranch}>
            <div className="flex justify-between items-center">
              <TabsList className="bg-stone-200 border-2 border-stone-200">
                <TabsTrigger
                  value="cse"
                  className="data-[state=active]:bg-stone-600 data-[state=active]:text-stone-100"
                >
                  CSE
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="cse" className="mt-8">
              <motion.div
                className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <motion.div key={note.id} variants={item}>
                     <Card className="flex flex-col h-full shadow-lg border bg-card hover:border-border transition-all backdrop-blur-sm">
  <CardHeader className="pb-4">
    <div className="flex items-center gap-3">
      <FileText className="h-6 w-6 text-muted-foreground" />
      <div className="flex-1">
        <CardTitle className="line-clamp-2 text-foreground text-lg leading-tight">
          {note.title}
        </CardTitle>
        <div className="mt-1">
          <Badge variant="outline">{note.subjectCode}</Badge>
        </div>
      </div>
    </div>
    <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed">
      {note.description}
    </CardDescription>
  </CardHeader>

  <CardContent className="flex-1 pt-0">
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">{note.format}</Badge>
      <Badge variant="outline">{note.pages} Pages</Badge>
    </div>
  </CardContent>

  <CardFooter className="border-t border-border pt-4">
    <Button
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2"
      size="sm"
      onClick={() => window.open(note.link, "_blank")}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Notes
    </Button>
  </CardFooter>
</Card>

                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-lg font-medium text-stone-800">No notes found</h3>
                    <p className="text-stone-600 mt-2">Try adjusting your search query</p>
                    <Button
                      onClick={() => setSearchQuery("")}
                      className="mt-6 bg-stone-700 hover:bg-stone-800 text-stone-100"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  )
}
