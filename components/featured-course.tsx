import Link from "next/link"
import {
  Code,
  Database,
  Globe,
  Server,
  Network,
  Cpu,
  Zap,
  Activity,
  Thermometer,
  Droplet,
  PenToolIcon as Tool,
  Home,
  Layers,
  Truck,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FeaturedCourseProps {
  title: string
  description: string
  slug: string
  icon: string
  level: "Beginner" | "Intermediate" | "Advanced"
  videos: number
  hours: number
}

/**
 * Featured Course Card Component
 * Displays course information in a card format with icon, title, description, and metadata
 * Now fully clickable from homepage
 */
export function FeaturedCourse({ title, description, slug, icon, level, videos, hours }: FeaturedCourseProps) {
  // Function to get the appropriate icon component based on icon name
  const getIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
      code: Code,
      database: Database,
      globe: Globe,
      server: Server,
      network: Network,
      cpu: Cpu,
      zap: Zap,
      activity: Activity,
      thermometer: Thermometer,
      droplet: Droplet,
      tool: Tool,
      home: Home,
      layers: Layers,
      truck: Truck,
    }

    const IconComponent = icons[iconName] || Code
    return <IconComponent className="h-5 w-5" />
  }

  // Function to get level-specific styling with soft gray theme
  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: "bg-slate-100 text-slate-700 hover:bg-slate-200",
      Intermediate: "bg-slate-200 text-slate-800 hover:bg-slate-300",
      Advanced: "bg-slate-300 text-slate-900 hover:bg-slate-400",
    }

    return colors[level] || ""
  }

  return (
    <Card className="flex flex-col overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300 bg-white cursor-pointer group">
      {/* Link wrapper for entire card - now properly clickable */}
      <Link href={slug} className="flex flex-col h-full">
        <CardHeader className="group-hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2">
            <div className="text-slate-600 group-hover:text-slate-800 transition-colors">{getIcon(icon)}</div>
            <CardTitle className="line-clamp-1 text-slate-800 group-hover:text-slate-900 transition-colors">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-2 text-slate-600">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <Badge variant="outline" className={getLevelColor(level)}>
            {level}
          </Badge>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-slate-50 p-4 group-hover:bg-slate-100 transition-colors">
          <div className="text-sm text-slate-600">{videos} videos</div>
          <div className="text-sm text-slate-600">{hours} hours</div>
        </CardFooter>
      </Link>
    </Card>
  )
}
