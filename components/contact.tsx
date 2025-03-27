"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Terminal from "@/components/terminal"
import { useGlitch } from "@/hooks/use-glitch"

interface ContactProps {
  onEasterEgg: () => void
}

export default function Contact({ onEasterEgg }: ContactProps) {
  const [step, setStep] = useState<"name" | "email" | "message" | "complete">("name")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [terminalLines, setTerminalLines] = useState<Array<{ text: string; delay: number }>>([
    { text: "Initializing secure communication channel...", delay: 0 },
    { text: "Connection established.", delay: 500 },
    { text: "Enter your identification to proceed:", delay: 1000 },
  ])
  const { applyGlitchEffect } = useGlitch()

  const handleCommand = (command: string) => {
    // Check for easter egg
    if (command.toLowerCase() === "sudo access" || command.toLowerCase() === "sudo hack") {
      setTerminalLines([
        { text: `> ${command}`, delay: 0 },
        { text: "UNAUTHORIZED ACCESS ATTEMPT DETECTED", delay: 300 },
        { text: "BYPASSING SECURITY PROTOCOLS...", delay: 600 },
        { text: "HACKER MODE ACTIVATED", delay: 1200 },
      ])

      setTimeout(() => {
        applyGlitchEffect()
        setTimeout(() => {
          onEasterEgg()
        }, 1000)
      }, 2000)

      return
    }

    // Normal form flow
    if (step === "name") {
      setFormData((prev) => ({ ...prev, name: command }))

      setTerminalLines([
        { text: `> ${command}`, delay: 0 },
        { text: `Name registered: ${command}`, delay: 300 },
        { text: "Please enter your contact email:", delay: 600 },
      ])
      setStep("email")
    } else if (step === "email") {
      setFormData((prev) => ({ ...prev, email: command }))

      setTerminalLines([
        { text: `> ${command}`, delay: 0 },
        { text: `Email registered: ${command}`, delay: 300 },
        { text: "Please enter your message:", delay: 600 },
      ])
      setStep("message")
    } else if (step === "message") {
      setFormData((prev) => ({ ...prev, message: command }))

      setTerminalLines([
        { text: `> ${command}`, delay: 0 },
        { text: "Encrypting message...", delay: 300 },
        { text: "Establishing secure connection...", delay: 600 },
        { text: "Transmission complete.", delay: 1000 },
        { text: "Thank you for your message. We will respond shortly.", delay: 1500 },
      ])
      setStep("complete")

      // Here you would normally send the form data to your backend
      console.log("Form submitted:", formData)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl md:text-5xl font-orbitron text-center mb-12 text-neon-magenta glow-magenta"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ESTABLISH CONNECTION
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Terminal
          lines={terminalLines}
          interactive={step !== "complete"}
          onCommand={handleCommand}
          placeholder={
            step === "name" ? "Enter your name..." : step === "email" ? "Enter your email..." : "Enter your message..."
          }
        />

        {step === "complete" && (
          <motion.div
            className="mt-6 text-center text-electric-blue font-share-tech-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="mb-4">Message transmission successful.</p>
            <button
              onClick={() => {
                setStep("name")
                setFormData({ name: "", email: "", message: "" }) // Reset form data
                setTerminalLines([
                  { text: "Initializing new communication channel...", delay: 0 },
                  { text: "Connection established.", delay: 500 },
                  { text: "Enter your identification to proceed:", delay: 1000 },
                ])
              }}
              className="cyber-button text-cyber-green border border-cyber-green hover:bg-cyber-green/10 px-4 py-2 font-share-tech-mono transition-all duration-300 glow-green"
            >
              NEW TRANSMISSION
            </button>
          </motion.div>
        )}

        <motion.div
          className="mt-8 text-xs text-electric-blue/70 font-share-tech-mono text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>// Hint: Try entering "sudo access" for a surprise</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

