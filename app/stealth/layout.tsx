import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Window Content Protection & Display Affinity Guide',
  description:
    "Technical guide to Codia's window display affinity implementation. Learn how WDA_EXCLUDE and NSWindowSharingNone prevent assistive overlays from appearing in screen shares.",
  alternates: {
    canonical: '/stealth',
  },
  openGraph: {
    title: 'Window Content Protection & Display Affinity Guide | Codia AI',
    description:
      "Technical guide to Codia's window display affinity implementation. Learn how WDA_EXCLUDE and NSWindowSharingNone prevent assistive overlays from appearing in screen shares.",
    url: 'https://codia.ai/stealth',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia Platform Window Content Protection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Window Content Protection & Display Affinity Guide | Codia AI',
    description:
      "Technical guide to Codia's window display affinity implementation. Learn how WDA_EXCLUDE and NSWindowSharingNone prevent assistive overlays from appearing in screen shares.",
    images: ['/app-icon.png'],
  },
};

export default function StealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
