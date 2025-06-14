interface AdContainerProps {
  position: "top" | "middle-left" | "sidebar-top" | "sidebar-bottom"
}

export function AdContainer({ position }: AdContainerProps) {
  const getAdContent = () => {
    switch (position) {
      case "top":
        return {
          title: "Boost Your Career",
          description: "Upgrade your skills with our premium courses",
          cta: "Learn More",
        }
      case "middle-left":
        return {
          title: "GATE 2025 Preparation",
          description: "Complete study material and mock tests",
          cta: "Start Preparing",
        }
      case "sidebar-top":
        return {
          title: "Free Study Notes",
          description: "Download comprehensive notes for all subjects",
          cta: "Download Now",
        }
      case "sidebar-bottom":
        return {
          title: "Join WhatsApp Group",
          description: "Connect with 10,000+ engineering students",
          cta: "Join Now",
        }
      default:
        return {
          title: "Advertisement",
          description: "Your ad could be here",
          cta: "Contact Us",
        }
    }
  }

  const ad = getAdContent()

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{ad.title}</h3>
      <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">{ad.description}</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
        {ad.cta}
      </button>
    </div>
  )
}
