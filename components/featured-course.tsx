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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

// Icon map: Maps icon string to actual Lucide icon
const iconMap: Record<string, LucideIcon> = {
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

// Utility: Get icon JSX
function getIcon(icon: string) {
  const Icon = iconMap[icon] || Code
  return <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
}

// Utility: Get level color using theme-friendly badges
function getLevelBadge(level: "Beginner" | "Intermediate" | "Advanced") {
  const badgeStyles: Record<typeof level, string> = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }
  return badgeStyles[level]
}

export function FeaturedCourse({
  title,
  description,
  slug,
  icon,
  level,
  videos,
  hours,
}: FeaturedCourseProps) {
  return (
    <Card className="flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-muted cursor-pointer bg-card text-foreground">
      <Link href={slug} className="flex flex-col h-full" aria-label={`View course: ${title}`}>
        <CardHeader className="group-hover:bg-muted transition-colors">
          <div className="flex items-center gap-2">
            <div>{getIcon(icon)}</div>
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 mt-2">
          <Badge variant="outline" className={getLevelBadge(level)}>
            {level}
          </Badge>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted p-4 group-hover:bg-muted/70 transition-colors">
          <div className="text-sm text-muted-foreground">{videos} videos</div>
          <div className="text-sm text-muted-foreground">{hours} hours</div>
        </CardFooter>
      </Link>
    </Card>
  )
}
