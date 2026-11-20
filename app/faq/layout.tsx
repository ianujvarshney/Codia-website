import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ & Global Hotkeys — Technical Interview Questions',
  description:
    'Frequently asked questions about Codia: screen share visibility, cursor behavior, mouse click-through mode, resume grounding, and global keyboard shortcuts.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ & Global Hotkeys — Technical Interview Questions | Codia AI',
    description:
      'Frequently asked questions about Codia: screen share visibility, cursor behavior, mouse click-through mode, resume grounding, and global keyboard shortcuts.',
    url: 'https://codia.ai/faq',
    images: [
      {
        url: '/app-icon.png',
        width: 512,
        height: 512,
        alt: 'Codia Frequently Asked Questions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ & Global Hotkeys — Technical Interview Questions | Codia AI',
    description:
      'Frequently asked questions about Codia: screen share visibility, cursor behavior, mouse click-through mode, resume grounding, and global keyboard shortcuts.',
    images: ['/app-icon.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Will the interviewer see Codia if I share my screen on Zoom, Google Meet, or Teams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Codia configures native operating system window display affinity (SetWindowDisplayAffinity with WDA_EXCLUDE on Windows, and NSWindow.sharingType = .none on macOS via Electron). When standard desktop video conferencing software (Zoom, Google Meet, Microsoft Teams) captures the screen, the operating system compositor omits Codia’s window layer. Note: protection is platform-dependent and does not apply to external HDMI capture cards, hypervisors, or physical cameras pointed at your display.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Codia change my mouse cursor or show hover indicators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. In conventional web apps or overlay tools, hovering over buttons morphs your cursor from the standard arrow into a pointing hand or I-beam text cursor—which can be noticeable during live screen sharing. Codia enforces the standard default arrow cursor across all HUD controls, interactive pills, and buttons to maintain visual consistency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I type in my code editor while Codia is on top of my screen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pressing Alt+A (or Ctrl/Cmd+Shift+I) toggles interaction mode using Electron setIgnoreMouseEvents with forward: true. In click-through mode, mouse events pass through Codia’s overlay to underlying applications so you can interact with your code editor without hiding the HUD. Keyboard events continue to follow standard operating system window focus.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Codia know about my personal background and past projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In settings, you can attach your resume (PDF or DOCX). Codia’s local parser extracts your genuine career roles, past projects, and technical stack (e.g., Kubernetes, Kafka, Go, React) into session memory. When you ask behavioral or technical questions, Codia grounds responses in your actual work experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'What shortcuts control Codia during the interview?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Codia is built with low-level global hotkeys so you never have to click buttons or leave your IDE during live rounds: Ctrl/Cmd + Enter (Send Question / Quick Assist), Ctrl/Cmd + Space (Toggle Voice Listening), Ctrl/Cmd + Shift + S (Capture Screen & OCR), Ctrl/Cmd + Shift + C (Toggle HUD), Alt + A (Toggle Click-Through Mode), and Arrow Keys (Cycle History).',
      },
    },
  ],
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
