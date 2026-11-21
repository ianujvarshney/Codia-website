import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';

export const metadata: Metadata = {
  metadataBase: new URL('https://codia.ai'),
  title: {
    default: 'Codia — AI Desktop Assistant for Technical Interviews & Focus',
    template: '%s | Codia AI',
  },
  description:
    'Codia is a private AI desktop assistant engineered for live technical interviews, algorithmic problem-solving, and engineering meetings. Powered by four synchronized floating interfaces, local Whisper transcription, and platform content protection.',
  applicationName: 'Codia',
  authors: [{ name: 'Codia Engineering Team', url: 'https://codia.ai' }],
  creator: 'Codia Technologies',
  publisher: 'Codia Technologies',
  keywords: [
    'AI Desktop Assistant',
    'Technical Interview Copilot',
    'Coding Interview Assistant',
    'Live Meeting Copilot',
    'LeetCode Assistant',
    'System Design Interview',
    'Desktop HUD',
    'Real-time Audio Transcription',
    'Window Content Protection',
    'Whisper Speech Recognition',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codia.ai',
    siteName: 'Codia AI',
    title: 'Codia — AI Desktop Assistant for Technical Interviews & Focus',
    description:
      'Four native floating interfaces seamlessly synchronized across your desktop workflow with local audio processing, multimodal screen analysis, and OS window content protection.',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia - AI Desktop Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codia — AI Desktop Assistant for Technical Interviews & Focus',
    description:
      'Private AI desktop copilot for technical interviews and engineering meetings with local Whisper speech processing and direct cloud API integration.',
    creator: '@codia_ai',
    images: ['/app-icon.png'],
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
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

// Structured Schema for an AI Desktop Application (schema.org)
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Codia',
  alternateName: 'Codia AI Desktop Assistant',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Windows 10/11 (64-bit), macOS 12.0+',
  description:
    'Private AI desktop assistant engineered for technical interviews, algorithmic problem-solving, and live meetings with real-time speech transcription and floating HUD overlays.',
  url: 'https://codia.ai',
  softwareVersion: '1.0.0',
  featureList: [
    'Four synchronized native floating windows (Island dock, Solution HUD, Chat, and Preferences)',
    'Optional local speech-to-text transcription via whisper.cpp',
    'Direct in-memory screen analysis with multimodal models (Gemini & Claude)',
    'Operating system window content protection (SetWindowDisplayAffinity / NSWindowSharingNone)',
    'Global keyboard shortcuts and transparent click-through mouse mode',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth font-sans" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
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
      <body className="min-h-screen bg-[#0D0F1B] text-[#FEFEFF] font-sans antialiased selection:bg-[#968BFF]/30 selection:text-[#FEFEFF]">
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col bg-[#0D0F1B]">
            {/* Codia Logo Atmospheric Ambient Glow Mesh */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(150,139,255,0.22)_0%,rgba(95,132,255,0.10)_50%,transparent_70%)]"
            />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
