import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — Technical Interview Specialization Pipeline',
  description:
    'Understand how Codia structures live technical interview assistance across algorithmic DSA, system design architectures, and behavioral rounds.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How It Works — Technical Interview Specialization Pipeline | Codia AI',
    description:
      'Understand how Codia structures live technical interview assistance across algorithmic DSA, system design architectures, and behavioral rounds.',
    url: 'https://codia.ai/how-it-works',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'How Codia Works — Technical Interview Assistance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works — Technical Interview Specialization Pipeline | Codia AI',
    description:
      'Understand how Codia structures live technical interview assistance across algorithmic DSA, system design architectures, and behavioral rounds.',
    images: ['/app-icon.png'],
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
