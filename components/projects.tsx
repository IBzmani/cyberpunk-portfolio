"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useGlitch } from "@/hooks/use-glitch"
import Terminal from "@/components/terminal"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  github?: string
  demo?: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { applyGlitchEffect } = useGlitch()

  const projects: Project[] = [
    {
      id: "neo-corp",
      title: "Neo Corp Dashboard",
      description:
        "A cybersecurity dashboard for monitoring network threats and vulnerabilities in real-time. Features include threat visualization, intrusion detection, and automated response systems.",
      tags: ["React", "Node.js", "WebSockets", "D3.js"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: "neural-interface",
      title: "Neural Interface",
      description:
        "An experimental brain-computer interface that translates neural signals into digital commands. This project explores the boundaries between human cognition and machine learning.",
      tags: ["Python", "TensorFlow", "WebGL", "C++"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
    },
    {
      id: "crypto-vault",
      title: "Crypto Vault",
      description:
        "A secure digital asset management system with advanced encryption and multi-factor authentication. Designed for high-value transactions in unstable digital environments.",
      tags: ["Blockchain", "Solidity", "React", "Firebase"],
      image: "/placeholder.svg?height=400&width=600",
      demo: "https://example.com",
    },
    {
      id: "shadow-net",
      title: "Shadow Net",
      description:
        "A decentralized communication platform designed for privacy-focused users. Features end-to-end encryption, self-destructing messages, and anonymous routing.",
      tags: ["P2P", "Encryption", "WebRTC", "Rust"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  const handleProjectClick = (project: Project) => {
    applyGlitchEffect()
    setIsDecrypting(true)
    setTimeout(() => {
    setSelectedProject(project)
    setIsDecrypting(false)
    }, 2000)
  }

  const handleBack = () => {
    applyGlitchEffect()
    setTimeout(() => {
    setSelectedProject(null)
    }, 500)
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8" ref={containerRef}>
      <motion.h1
        className="text-4xl md:text-5xl font-orbitron text-center mb-12 text-neon-magenta glow-magenta"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PROJECT DATABASE
      </motion.h1>

      {isDecrypting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <Terminal
            lines={[
              { text: "Accessing secure database...", delay: 300 },
              { text: "Decrypting project data...", delay: 800 },
              { text: "Rendering holographic interface...", delay: 1300 },
            ]}
          />
        </div>
      )}

      {selectedProject ? (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={handleBack}
            className="mb-6 text-electric-blue font-share-tech-mono hover:text-neon-magenta transition-colors flex items-center"
          >
            <span className="mr-2">←</span> Return to projects
          </button>

          <div className="grid md:grid-cols-2 gap-8 bg-black/40 border border-electric-blue rounded-lg p-6 backdrop-blur-sm glow-blue">
            <div>
              <motion.div
                className="relative overflow-hidden rounded-md border border-electric-blue/50 h-[300px]"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </motion.div>

              <div className="flex mt-4 space-x-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-electric-blue hover:text-cyber-green transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-electric-blue hover:text-neon-magenta transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-orbitron text-neon-magenta mb-4">{selectedProject.title}</h2>
              <p className="font-share-tech-mono text-electric-blue mb-6">{selectedProject.description}</p>

              <div className="mb-4">
                <h3 className="text-sm uppercase text-electric-blue/70 mb-2 font-orbitron">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-cyber-green text-cyber-green font-share-tech-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="font-share-tech-mono text-electric-blue/70 text-sm">
                <div className="mb-1">// Project ID: {selectedProject.id}</div>
                <div>// Status: OPERATIONAL</div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border border-electric-blue bg-black/40 backdrop-blur-sm hover:border-neon-magenta transition-colors duration-300 cursor-pointer"
              onClick={() => handleProjectClick(project)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-orbitron text-neon-magenta mb-2 group-hover:glow-magenta transition-all">
                  {project.title}
                </h3>
                <p className="font-share-tech-mono text-electric-blue text-sm line-clamp-2 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full border border-cyber-green text-cyber-green font-share-tech-mono"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full border border-electric-blue text-electric-blue font-share-tech-mono">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute top-3 right-3 bg-black/70 text-xs px-2 py-1 rounded font-share-tech-mono text-electric-blue border border-electric-blue/50">
                ID: {project.id}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-neon-magenta to-cyber-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

