import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://codia.ai'),
  title: {
    default: 'Codia — Undetectable AI Copilot for Live Technical Interviews & Meetings',
    template: '%s | Codia AI Copilot',
  },
  description:
    'Codia is an undetectable AI desktop assistant engineered for live technical interviews, coding challenges, and high-stakes meetings. Invisible to screen-share software with sub-300ms speech-to-code synthesis.',
  applicationName: 'Codia',
  authors: [{ name: 'Codia AI Engineering Team', url: 'https://codia.ai' }],
  creator: 'Codia Technologies',
  publisher: 'Codia Technologies Inc.',
  keywords: [
    'AI Copilot',
    'Undetectable Interview AI',
    'Coding Interview Assistant',
    'Live Meeting Copilot',
    'LeetCode Assistant',
    'System Design Interview',
    'Stealth Desktop HUD',
    'Real-time Audio Transcription',
    'Bypass Screen Share Detection',
    'CoderPad Assistant',
    'HackerRank Copilot',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codia.ai',
    siteName: 'Codia AI',
    title: 'Codia — Undetectable AI Copilot for Live Technical Interviews & Meetings',
    description:
      'Pass any technical interview in real time. Invisible HUD overlay, zero-latency speech-to-code generation, and automated system design synthesis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Codia - Undetectable Live Interview AI Copilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codia — Undetectable AI Copilot for Live Technical Interviews',
    description:
      'Stealth desktop AI assistant for live coding rounds and engineering meetings. Zero screen-share capture, sub-300ms voice transcription.',
    creator: '@codia_ai',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codia.ai',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// Structured Schema for an AI Desktop Application (schema.org)
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Codia',
  alternateName: 'Codia Undetectable AI Copilot',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS 12.0+, Windows 10/11, Ubuntu 22.04+',
  description:
    'Undetectable AI Copilot desktop application engineered for live technical interviews, system design rounds, and high-stakes engineering meetings with real-time audio transcription and invisible HUD overlays.',
  url: 'https://codia.ai',
  softwareVersion: '2.4.0',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '29',
    highPrice: '99',
    offerCount: '3',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.97',
    ratingCount: '1840',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Invisible Dynamic HUD overlay undetectable on Zoom, Google Meet, Microsoft Teams, HackerRank, and CoderPad screen-sharing',
    'Sub-300ms Whisper-based Real-time Interview Speech Recognition',
    'Instant algorithmic solutions with optimal Time & Space complexity analysis',
    'Live system design diagrams and architectural tradeoff reasoning',
    'Global hardware stealth hotkeys and eye-tracking gaze alignment',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-codia-bg text-slate-100 font-sans antialiased selection:bg-codia-cyan/25 selection:text-codia-cyan">
        <div className="relative min-h-screen flex flex-col bg-codia-bg">
          {/* Global Ambient Glow Gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 bg-glass-glow opacity-80"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
