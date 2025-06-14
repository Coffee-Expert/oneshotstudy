"use client"

import { useState, useEffect } from "react"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface DownloadTimerProps {
  title: string
  description: string
  downloadLink: string
}

export function DownloadTimer({ title, description, downloadLink }: DownloadTimerProps) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [showLink, setShowLink] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setShowLink(true)
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startTimer = () => {
    setIsActive(true)
  }

  const resetTimer = () => {
    setTimeLeft(10)
    setIsActive(false)
    setShowLink(false)
  }

  const progress = ((10 - timeLeft) / 10) * 100

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {!showLink ? (
        <div className="space-y-3">
          {!isActive ? (
            <Button onClick={startTimer} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Start Download Timer
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Preparing download...</span>
                <span>{timeLeft}s</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Button asChild className="w-full">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Download Now
            </a>
          </Button>
          <Button onClick={resetTimer} variant="ghost" size="sm" className="w-full">
            Reset Timer
          </Button>
        </div>
      )}
    </div>
  )
}
