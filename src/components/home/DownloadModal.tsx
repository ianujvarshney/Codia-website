'use client';

import React, { useEffect, useRef } from 'react';
import { Download, Monitor, Apple, Terminal, X, ShieldCheck, Clock } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Save currently focused element to restore focus on close
    previousActiveElement.current = document.activeElement as HTMLElement;

    // 2. Prevent background scroll while dialog is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Move focus to the close button inside modal
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 4. Keyboard trap: Escape to close, Tab / Shift+Tab cycling
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the trigger button that opened the modal
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      aria-describedby="download-modal-description"
      onClick={(e) => {
        // Close when clicking the backdrop outside the dialog box
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-950 border border-royal-border dark:border-slate-800 p-6 sm:p-8 shadow-royal-lg dark:shadow-2xl text-royal-text-primary dark:text-white transition-colors duration-300"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-royal-text-secondary hover:text-royal-text-primary dark:text-slate-400 dark:hover:text-white bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-slate-800 hover:bg-royal-border/40 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-indigo dark:focus:ring-codia-cyan shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-3 shadow-royal-sm">
            <Download className="w-3.5 h-3.5" />
            Download Codia Desktop
          </div>
          <h3 id="download-modal-title" className="text-xl sm:text-2xl font-bold text-royal-text-primary dark:text-slate-100">
            Select Your Operating System
          </h3>
          <p id="download-modal-description" className="mt-1.5 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400">
            Native 64-bit Electron client with local speech recognition and floating HUD windows.
          </p>
        </div>

        {/* Download Targets */}
        <div className="space-y-3">
          {/* Windows Installer */}
          <div className="p-4 rounded-2xl bg-royal-bg-secondary dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-indigo dark:bg-blue-950/60 dark:border-blue-800/60 dark:text-blue-400 shadow-sm">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-royal-text-primary dark:text-slate-100">Windows (x64 Installer)</h4>
                <p className="text-xs text-royal-text-secondary dark:text-slate-400">Windows 10 / 11 · 64-bit Setup</p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-text-secondary dark:text-slate-500 text-xs font-mono select-none cursor-not-allowed shadow-sm"
              aria-disabled="true"
            >
              <Clock className="w-3 h-3 text-royal-text-secondary dark:text-slate-500" />
              Coming Soon
            </span>
          </div>

          {/* Windows Portable */}
          <div className="p-4 rounded-2xl bg-royal-bg-secondary dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-sapphire dark:bg-cyan-950/60 dark:border-cyan-800/60 dark:text-codia-cyan shadow-sm">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-royal-text-primary dark:text-slate-100">Windows Portable</h4>
                <p className="text-xs text-royal-text-secondary dark:text-slate-400">Standalone single-executable</p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-text-secondary dark:text-slate-500 text-xs font-mono select-none cursor-not-allowed shadow-sm"
              aria-disabled="true"
            >
              <Clock className="w-3 h-3 text-royal-text-secondary dark:text-slate-500" />
              Coming Soon
            </span>
          </div>

          {/* macOS Universal */}
          <div className="p-4 rounded-2xl bg-royal-bg-secondary dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-lavender dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shadow-sm">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-royal-text-primary dark:text-slate-100">macOS (Apple Silicon & Intel)</h4>
                <p className="text-xs text-royal-text-secondary dark:text-slate-400">macOS 12.0+ Monterey or later (.dmg)</p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-text-secondary dark:text-slate-500 text-xs font-mono select-none cursor-not-allowed shadow-sm"
              aria-disabled="true"
            >
              <Clock className="w-3 h-3 text-royal-text-secondary dark:text-slate-500" />
              Coming Soon
            </span>
          </div>
        </div>

        {/* Modal Footnote */}
        <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 flex items-center justify-between text-[11px] font-mono text-royal-text-secondary dark:text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            Verified Clean Binary
          </span>
          <span>Official Release Pending</span>
        </div>
      </div>
    </div>
  );
}
