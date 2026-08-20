import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import './globals.css'

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-grotesk' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Neo Todak Labs — My AI works while I sleep',
  description:
    'Ahmad Fadli "Neo Todak" — CEO of Todak Studios and builder of an autonomous AI workforce: agents that answer, remember, trade, train and ship code around the clock.',
  keywords: 'Neo Todak, AI agents, autonomous fleet, Todak Studios, digital twin, AI systems, Malaysia',
  authors: [{ name: 'Neo Todak' }],
  metadataBase: new URL('https://neotodak.com'),
  openGraph: {
    title: 'Neo Todak Labs',
    description: 'CEO by day. An autonomous AI workforce around the clock.',
    url: 'https://neotodak.com',
    siteName: 'Neo Todak Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neo Todak Labs',
    description: 'CEO by day. An autonomous AI workforce around the clock.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafaf8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${jetbrainsMono.variable} v3`}>
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
