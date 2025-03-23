"use client"

import { useEffect, useRef } from "react"

export default function PulseWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave properties
    const waves = 3
    const waveHeight = 50
    const waveWidth = 200
    let phase = 0
    const speed = 0.03

    // Drawing the waves
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update phase for animation
      phase = (phase + speed) % (Math.PI * 2)

      for (let w = 0; w < waves; w++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.2)") // Electric blue
        gradient.addColorStop(0.5, "rgba(255, 0, 255, 0.2)") // Neon magenta
        gradient.addColorStop(1, "rgba(0, 255, 255, 0.2)") // Electric blue

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()

        // Draw wave
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x / waveWidth + phase + (w * Math.PI) / 4) * waveHeight + canvas.height / 2 + w * 50

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }
    }

    const interval = setInterval(draw, 30)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

