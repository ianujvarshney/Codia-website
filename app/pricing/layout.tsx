import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & AI Usage Economics — Bring Your Own Key',
  description:
    'Codia desktop client is free to use with your own API credentials. Transparent usage economics with direct Gemini and Claude cloud API billing and optional local Whisper compute.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing & AI Usage Economics — Bring Your Own Key | Codia AI',
    description:
      'Codia desktop client is free to use with your own API credentials. Transparent usage economics with direct Gemini and Claude cloud API billing and optional local Whisper compute.',
    url: 'https://codia.ai/pricing',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia Pricing & BYOK Economics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & AI Usage Economics — Bring Your Own Key | Codia AI',
    description:
      'Codia desktop client is free to use with your own API credentials. Transparent usage economics with direct Gemini and Claude cloud API billing and optional local Whisper compute.',
    images: ['/app-icon.png'],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
