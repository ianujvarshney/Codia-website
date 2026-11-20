import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hero Staging Preview',
  description: 'Internal staging preview for Codia cinematic hero scene.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: '/preview-hero',
  },
};

export default function PreviewHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
