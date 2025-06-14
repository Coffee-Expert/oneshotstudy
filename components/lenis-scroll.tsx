"use client"

import { useEffect } from "react"

export function LenisScroll() {
  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    let lenis: any

    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return null
}
