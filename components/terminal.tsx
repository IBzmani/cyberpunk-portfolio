"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TerminalLine {
  text: string
  delay: number
}

interface TerminalProps {
  lines: TerminalLine[]
  interactive?: boolean
  onCommand?: (command: string) => void
  placeholder?: string
}

export default function Terminal({
  lines,
  interactive = false,
  onCommand,
  placeholder = "Enter command...",
}: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Display lines with delays
    let timeoutId: NodeJS.Timeout

    lines.forEach((line, index) => {
      timeoutId = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text])
      }, line.delay)
    })

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(cursorInterval)
    }
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() && onCommand) {
      onCommand(currentInput.trim())
      setVisibleLines((prev) => [...prev, `> ${currentInput}`])
      setCurrentInput("")
    }
  }

  return (
    <motion.div
      className="w-full max-w-2xl p-6 bg-black/80 border border-electric-blue rounded-md font-share-tech-mono text-electric-blue glow-blue"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => interactive && inputRef.current?.focus()}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs opacity-70">terminal@ibrahim:~</div>
      </div>

      <div className="min-h-[200px] mb-4">
        {visibleLines.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
      </div>

      {interactive && (
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none"
            placeholder={placeholder}
            autoFocus
          />
          <span className={`w-2 h-5 bg-electric-blue ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
        </form>
      )}
    </motion.div>
  )
}

