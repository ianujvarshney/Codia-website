import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — Multimodal Vision, Dual Speech & HUD Transforms',
  description:
    "Explore Codia's modular AI engine: dual speech audio pipelines, direct multimodal vision analysis, and 8 one-tap adaptive answer transforms.",
  alternates: {
    canonical: '/features',
  },
  openGraph: {
    title: 'Features — Multimodal Vision, Dual Speech & HUD Transforms | Codia AI',
    description:
      "Explore Codia's modular AI engine: dual speech audio pipelines, direct multimodal vision analysis, and 8 one-tap adaptive answer transforms.",
    url: 'https://codia.ai/features',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia Features — Desktop Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features — Multimodal Vision, Dual Speech & HUD Transforms | Codia AI',
    description:
      "Explore Codia's modular AI engine: dual speech audio pipelines, direct multimodal vision analysis, and 8 one-tap adaptive answer transforms.",
    images: ['/app-icon.png'],
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
