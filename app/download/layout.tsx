import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Codia Desktop Client — Windows & macOS',
  description:
    'Download the Codia desktop assistant for Windows and macOS. Track official release package availability or build directly from the source repository.',
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download Codia Desktop Client — Windows & macOS | Codia AI',
    description:
      'Download the Codia desktop assistant for Windows and macOS. Track official release package availability or build directly from the source repository.',
    url: 'https://codia.ai/download',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Download Codia Desktop Client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Codia Desktop Client — Windows & macOS | Codia AI',
    description:
      'Download the Codia desktop assistant for Windows and macOS. Track official release package availability or build directly from the source repository.',
    images: ['/app-icon.png'],
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
