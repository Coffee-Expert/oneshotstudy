"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
  label?: string
  className?: string
}

/**
 * Reusable Back Button Component
 * Consistent back navigation across the application
 */
export function BackButton({ href, label = "Go Back", className = "" }: BackButtonProps) {
  return (
    <Button variant="ghost" asChild className={`text-muted-foreground hover:text-stone-800 hover:bg-stone-100 ${className}`}>
      <Link href={href}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  )
}
