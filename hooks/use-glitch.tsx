"use client"

import { useState, useEffect } from "react"

export function useGlitch() {
  const [isGlitching, setIsGlitching] = useState(false)

  const applyGlitchEffect = () => {
    setIsGlitching(true)

    // Add glitch class to body
    document.body.classList.add("glitching")

    // Remove glitch class after animation completes
    setTimeout(() => {
      setIsGlitching(false)
      document.body.classList.remove("glitching")
    }, 500)
  }

  useEffect(() => {
    // Clean up on unmount
    return () => {
      document.body.classList.remove("glitching")
    }
  }, [])

  return { isGlitching, applyGlitchEffect }
}

