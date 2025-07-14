import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Neo Todak - Creative Technologist & AI Systems Builder',
  description: 'Founder of Todak Studios. Creative technologist and builder of systems where AI isn\'t just a tool — it\'s a teammate. Pioneering the edge between creativity and computation.',
  keywords: 'Neo Todak, Creative Technologist, AI Systems Builder, Todak Studios, Firasah AI, AutoRecruit, Claude Tools Kit, FlowState, LangChain, Machine Learning',
  authors: [{ name: 'Neo Todak' }],
  openGraph: {
    title: 'Neo Todak - Creative Technologist & AI Systems Builder',
    description: 'Building things fast, smart, and with soul. Where AI meets creativity.',
    url: 'https://neotodak.com',
    siteName: 'NEOTODAK AI Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neo Todak - AI Systems Builder',
    description: 'Founder of Todak Studios. Building systems where AI isn\'t just a tool — it\'s a teammate.',
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