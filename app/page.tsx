"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Terminal from "@/components/terminal"
import Navigation from "@/components/navigation"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import About from "@/components/about"
import MatrixRain from "@/components/matrix-rain"
import GridLines from "@/components/grid-lines"
import PulseWave from "@/components/pulse-wave"
import { useGlitch } from "@/hooks/use-glitch"

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>("intro")
  const [introComplete, setIntroComplete] = useState<boolean>(false)
  const [easterEggActivated, setEasterEggActivated] = useState<boolean>(false)
  const { applyGlitchEffect } = useGlitch()

  const handleNavigation = (section: string) => {
    applyGlitchEffect()
    setTimeout(() => {
      setCurrentSection(section)
    }, 500)
  }

  const activateEasterEgg = () => {
    applyGlitchEffect()
    setTimeout(() => {
      setEasterEggActivated(true)
    }, 1000)
  }

  useEffect(() => {
    // Auto-transition from intro to home after terminal sequence
    if (currentSection === "intro") {
      const timer = setTimeout(() => {
        setIntroComplete(true)
        setTimeout(() => {
          setCurrentSection("home")
        }, 500)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [currentSection])

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-electric-blue">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <MatrixRain />
      </div>
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <GridLines />
      </div>
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <PulseWave />
      </div>

      {/* Navigation */}
      {introComplete && (
        <Navigation
          currentSection={currentSection}
          onNavigate={handleNavigation}
          easterEggActivated={easterEggActivated}
        />
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentSection === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-screen"
          >
            <Terminal
              lines={[
                { text: "Initializing system...", delay: 500 },
                { text: "Establishing secure connection...", delay: 1000 },
                { text: "Access granted.", delay: 1500 },
                { text: "Welcome to the portfolio of Ibrahim", delay: 2000 },
                { text: "Loading interface...", delay: 3000 },
              ]}
            />
          </motion.div>
        )}

        {currentSection === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-4"
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-center mb-6 text-neon-magenta glow-magenta">
              <span className="glitch-text">IBRAHIM</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-share-tech-mono text-center mb-12 text-electric-blue">
              FULL-STACK DEVELOPER // DIGITAL ARCHITECT
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => handleNavigation("projects")}
                className="cyber-button text-cyber-green border border-cyber-green hover:bg-cyber-green/10 px-6 py-3 font-share-tech-mono transition-all duration-300 glow-green"
              >
                VIEW PROJECTS
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="cyber-button text-neon-magenta border border-neon-magenta hover:bg-neon-magenta/10 px-6 py-3 font-share-tech-mono transition-all duration-300 glow-magenta"
              >
                ESTABLISH CONNECTION
              </button>
            </div>
          </motion.div>
        )}

        {currentSection === "about" && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <About />
          </motion.div>
        )}

        {currentSection === "projects" && (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Projects />
          </motion.div>
        )}

        {currentSection === "contact" && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Contact onEasterEgg={activateEasterEgg} />
          </motion.div>
        )}

        {easterEggActivated && (
          <motion.div
            key="easter-egg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <div className="max-w-2xl p-6 border border-cyber-green rounded-lg bg-black/80 glow-green">
              <h2 className="text-2xl font-orbitron text-cyber-green mb-4">HACKER MODE ACTIVATED</h2>
              <p className="font-share-tech-mono text-electric-blue mb-6">
                You've discovered the hidden terminal. Welcome to the underground network.
              </p>
              <div className="bg-black/60 p-4 rounded border border-cyber-green/50 font-share-tech-mono text-cyber-green">
                <p>// Secret projects and experimental tech</p>
                <p>// Access level: MAXIMUM</p>
                <ul className="mt-4 space-y-2">
                  <li>» Quantum Encryption Algorithm</li>
                  <li>» Neural Interface Prototype</li>
                  <li>» Darkweb Crawler Engine</li>
                </ul>
              </div>
              <button
                onClick={() => setEasterEggActivated(false)}
                className="mt-6 cyber-button text-neon-magenta border border-neon-magenta hover:bg-neon-magenta/10 px-4 py-2 font-share-tech-mono transition-all duration-300 glow-magenta"
              >
                RETURN TO MAIN SYSTEM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

