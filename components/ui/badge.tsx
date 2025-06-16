import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * `badgeVariants` defines different visual styles for badges
 * Uses Tailwind semantic colors (bg-primary, text-foreground, etc.) 
 * to align with custom themes and dark mode
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // ✅ Primary badge (e.g. status labels, highlights)
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",

        // ✅ Secondary badge (e.g. subtler info like categories)
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // ✅ Destructive badge (e.g. warning, error state)
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",

        // ✅ Outline badge (no background)
        outline:
          "border border-border text-foreground bg-transparent hover:bg-muted/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * `Badge` component for displaying labeled information
 * Supports variant styling with consistent semantic theming
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
