"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Mail, Code } from "lucide-react"

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
  easterEggActivated: boolean
}

export default function Navigation({ currentSection, onNavigate, easterEggActivated }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "HOME", icon: Home },
    { id: "about", label: "ABOUT", icon: User },
    { id: "projects", label: "PROJECTS", icon: Briefcase },
    { id: "contact", label: "CONTACT", icon: Mail },
  ]

  if (easterEggActivated) {
    menuItems.push({ id: "hacker", label: "HACKER MODE", icon: Code })
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavClick = (section: string) => {
    onNavigate(section)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-sm border border-electric-blue rounded-full md:hidden glow-blue"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6 text-electric-blue" /> : <Menu className="w-6 h-6 text-electric-blue" />}
      </motion.button>

      {/* Desktop Floating Menu */}
      <div className="fixed top-6 right-6 z-40 hidden md:block">
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <motion.div
            className="flex items-center space-x-1 p-1 bg-black/50 backdrop-blur-sm border border-electric-blue rounded-full glow-blue"
            whileHover={{ scale: 1.05 }}
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                className={`relative px-4 py-2 rounded-full font-share-tech-mono text-sm transition-colors ${
                  currentSection === item.id
                    ? "text-black bg-electric-blue"
                    : "text-electric-blue hover:bg-electric-blue/10"
                }`}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item.label}</span>
                {currentSection === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-electric-blue"
                    layoutId="activeSection"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-6">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-md font-orbitron text-lg ${
                      currentSection === item.id
                        ? "text-black bg-electric-blue glow-blue"
                        : "text-electric-blue border border-electric-blue"
                    }`}
                    onClick={() => handleNavClick(item.id)}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

