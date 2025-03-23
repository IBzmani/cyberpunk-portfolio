"use client"

import { motion } from "framer-motion"

export default function About() {
  const skills = [
    { name: "Frontend Development", level: 90 },
    { name: "Backend Systems", level: 85 },
    // { name: "Cybersecurity", level: 75 },
    { name: "AI Integration", level: 80 },
    { name: "Blockchain", level: 70 },
  ]

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <motion.h1
        className="text-4xl md:text-5xl font-orbitron text-center mb-12 text-neon-magenta glow-magenta"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        SYSTEM PROFILE
      </motion.h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-black/40 backdrop-blur-sm border border-electric-blue rounded-lg p-6 glow-blue"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-orbitron text-electric-blue mb-4">IDENTITY</h2>
          <div className="font-share-tech-mono text-electric-blue space-y-4">
            <p>
              Digital architect and code specialist operating in the liminal spaces between hardware and wetware.
              Specializing in creating immersive digital experiences and secure systems.
            </p>
            <p>
              With over 4 years of experience navigating the digital frontier, I've developed a unique approach to
              solving complex problems through creative coding and innovative design thinking.
            </p>
            <p>
              My mission is to bridge the gap between cutting-edge technology and human experience, creating digital
              solutions that feel intuitive yet futuristic.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-electric-blue/30">
            <h3 className="text-lg font-orbitron text-electric-blue mb-3">CORE DIRECTIVES</h3>
            <ul className="font-share-tech-mono text-electric-blue space-y-2">
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">»</span>
                Create immersive digital experiences
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">»</span>
                Build secure, scalable systems
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">»</span>
                Push the boundaries of interactive design
              </li>
              <li className="flex items-center">
                <span className="text-cyber-green mr-2">»</span>
                Optimize for both humans and machines
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="bg-black/40 backdrop-blur-sm border border-electric-blue rounded-lg p-6 glow-blue"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-orbitron text-electric-blue mb-4">SKILL MATRIX</h2>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between font-share-tech-mono text-electric-blue mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-electric-blue/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-electric-blue to-neon-magenta"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-electric-blue/30">
            <h3 className="text-lg font-orbitron text-electric-blue mb-3">TECH STACK</h3>
            <div className="grid grid-cols-2 gap-3 font-share-tech-mono">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-neon-magenta rounded-full mr-2"></div>
                <span>React / Next.js</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
                <span>Node.js / Express</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-electric-blue rounded-full mr-2"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-neon-magenta rounded-full mr-2"></div>
                <span>Three.js / WebGL</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
                <span>Python / TensorFlow</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-electric-blue rounded-full mr-2"></div>
                <span>Blockchain / Web3</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

