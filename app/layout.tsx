import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'NEOTODAK AI Labs - AI Systems Builder',
  description: 'Building systems where AI isn\'t just a tool — it\'s a teammate. Creative technologist and founder of Todak Studios.',
  keywords: 'Neo Todak, AI Systems, Todak Studios, THR Intelligence, FlowState AI, Claude Tools Kit, Machine Learning, Automation',
  authors: [{ name: 'Neo Todak' }],
  openGraph: {
    title: 'NEOTODAK AI Labs',
    description: 'Building systems where AI isn\'t just a tool — it\'s a teammate.',
    url: 'https://neotodak.com',
    siteName: 'NEOTODAK AI Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEOTODAK AI Labs',
    description: 'Building systems where AI isn\'t just a tool — it\'s a teammate.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-gray-900`} suppressHydrationWarning>
        <GoogleAnalytics />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
