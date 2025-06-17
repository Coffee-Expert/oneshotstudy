"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Calendar,
  ExternalLink,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch alerts from Supabase Edge Function
  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = selectedFilter === "all"
          ? `https://gtxhtlpbwgmvljzsezfm.functions.supabase.co/get-alerts`
          : `https://gtxhtlpbwgmvljzsezfm.functions.supabase.co/get-alerts?type=${selectedFilter}`

        const res = await fetch(url)
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || "Failed to fetch alerts")

        // Optional: Sort by end_date or start_date if not sorted from backend
        setAlerts(data)
      } catch (err: any) {
        console.error("Error fetching alerts:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [selectedFilter])

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      exam: "bg-blue-100 text-blue-800 border-blue-200",
      form: "bg-orange-100 text-orange-800 border-orange-200",
      result: "bg-green-100 text-green-800 border-green-200",
      campaign: "bg-purple-100 text-purple-800 border-purple-200",
    }

    const labels: Record<string, string> = {
      exam: "Exam",
      form: "Form Deadline",
      result: "Result",
      campaign: "Campaign",
    }

    return (
      <Badge variant="outline" className={styles[type] || "bg-gray-100 text-gray-800"}>
        {labels[type] || type}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bell className="h-8 w-8 text-stone-700" />
              <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Important Alerts</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with exam dates, form deadlines, results, and other important announcements
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            {["all", "exam", "form", "result", "campaign"].map((type) => (
              <Button
                key={type}
                variant={selectedFilter === type ? "default" : "outline"}
                onClick={() => setSelectedFilter(type)}
                className={selectedFilter === type ? "bg-stone-700 text-white" : ""}
              >
                {type === "all" ? "All Alerts" : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </motion.div>

          {/* Alerts grid */}
          {loading ? (
            <div className="text-center py-12 text-stone-500 text-lg">Loading alerts...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">Error: {error}</div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-600 mb-2">No alerts found</h3>
              <p className="text-muted-foreground ">
                No alerts match your current filter. Try selecting a different category.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-stone-400">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        {getTypeBadge(alert.type)}
                        {getUrgencyIcon(alert.urgency)}
                      </div>
                      <CardTitle className="text-lg leading-tight">{alert.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground  leading-relaxed">{alert.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground ">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {formatDate(alert.start_date || alert.date)}</span>
                      </div>
                      <Button asChild className="w-full bg-stone-700 hover:bg-stone-800">
                        <a
                          href={alert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Details
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
