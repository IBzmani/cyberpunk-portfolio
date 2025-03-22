import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Orbitron } from "next/font/google"
import localFont from "next/font/local"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const shareTechMono = localFont({
  src: "../public/fonts/ShareTechMono-Regular.ttf",
  variable: "--font-share-tech-mono",
})

export const metadata = {
  title: "Ibrahim | Portfolio",
  description: "Expert full-stack developer specializing in Next.js, React, Node.js, and scalable web applications. Crafting high-performance, SEO-friendly websites with modern technologies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${shareTechMono.variable} font-mono bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'