import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Neo Todak - AI Engineer & Full Stack Developer',
  description: 'Personal portfolio of Neo Todak - AI Engineer, Full Stack Developer, and technology enthusiast specializing in artificial intelligence, machine learning, and modern web development.',
  keywords: 'Neo Todak, AI Engineer, Full Stack Developer, Machine Learning, Artificial Intelligence, React, Next.js, Python, Portfolio',
  authors: [{ name: 'Neo Todak' }],
  openGraph: {
    title: 'Neo Todak - AI Engineer & Developer Portfolio',
    description: 'Personal portfolio showcasing AI engineering projects, full stack development work, and innovative technology solutions.',
    url: 'https://neotodak.com',
    siteName: 'Neo Todak Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neo Todak - AI Engineer & Developer',
    description: 'AI Engineer and Full Stack Developer passionate about creating innovative technology solutions.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00d4ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
} 