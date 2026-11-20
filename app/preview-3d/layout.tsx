import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Viewport Rig Preview',
  description: 'Internal development preview viewport for Codia 3D spatial window rig.',
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
    canonical: '/preview-3d',
  },
};

export default function Preview3DLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
