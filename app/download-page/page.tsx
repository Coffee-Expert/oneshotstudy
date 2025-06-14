"use client"

import { useSearchParams } from "next/navigation"
import TimerDownloadPage from "@/components/timer-download-page"
import { useEffect, useState } from "react"

export default function TimerDownloadRoute() {
  const searchParams = useSearchParams()
  const urlParam = searchParams.get("url")

  const [link, setLink] = useState<string | null>(null)

  useEffect(() => {
    if (urlParam) {
      setLink(decodeURIComponent(urlParam))
    }
  }, [urlParam])

  if (!link) {
    return <p className="text-center text-red-500 mt-10">Invalid or missing download URL</p>
  }

  return <TimerDownloadPage link={link} />
}
