import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Architecture — Local Key Vault & Privacy Boundaries',
  description:
    "Review Codia's security architecture: local API key vault, encrypted HTTPS cloud connections, memory-only screen captures, and operating system display affinity protection.",
  alternates: {
    canonical: '/security',
  },
  openGraph: {
    title: 'Security Architecture — Local Key Vault & Privacy Boundaries | Codia AI',
    description:
      "Review Codia's security architecture: local API key vault, encrypted HTTPS cloud connections, memory-only screen captures, and operating system display affinity protection.",
    url: 'https://codia.ai/security',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia Security Architecture & Local Key Vault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Architecture — Local Key Vault & Privacy Boundaries | Codia AI',
    description:
      "Review Codia's security architecture: local API key vault, encrypted HTTPS cloud connections, memory-only screen captures, and operating system display affinity protection.",
    images: ['/app-icon.png'],
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
