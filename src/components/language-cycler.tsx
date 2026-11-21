'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export type SupportedCodeLang = 'python' | 'typescript' | 'java';

interface LanguageCodeSnippet {
  lang: SupportedCodeLang;
  label: string;
  badge: string;
  fileName: string;
  code: string;
  highlightNote: string;
}

const SNIPPETS: Record<SupportedCodeLang, LanguageCodeSnippet> = {
  python: {
    lang: 'python',
    label: 'Python 3',
    badge: 'O(N) Monotonic Queue',
    fileName: 'sliding_window_max.py',
    highlightNote: 'Uses collections.deque to maintain indices of decreasing elements.',
    code: `from collections import deque
from typing import List

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    # Monotonic deque storing indices of elements in descending order
    dq = deque()
    res = []
    
    for i, num in enumerate(nums):
        # 1. Pop indices that fall outside the current sliding window [i-k+1, i]
        while dq and dq[0] < i - k + 1:
            dq.popleft()
            
        # 2. Maintain monotonic property: pop smaller elements from right
        while dq and nums[dq[-1]] < num:
            dq.pop()
            
        dq.append(i)
        
        # 3. Window of size k reached; first element is maximum
        if i >= k - 1:
            res.append(nums[dq[0]])
            
    return res`,
  },
  typescript: {
    lang: 'typescript',
    label: 'TypeScript',
    badge: 'Strictly Typed',
    fileName: 'slidingWindowMax.ts',
    highlightNote: 'High-performance index pointer array with O(1) amortized operations.',
    code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  // Store indices in descending value order
  const deque: number[] = [];
  const result: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    // 1. Remove elements outside the window boundaries
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // 2. Discard elements smaller than current value from the rear
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // 3. Record current window maximum
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}`,
  },
  java: {
    lang: 'java',
    label: 'Java 17+',
    badge: 'ArrayDeque Optimized',
    fileName: 'SlidingWindowMax.java',
    highlightNote: 'Utilizes java.util.ArrayDeque for minimal memory allocation overhead.',
    code: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // 1. Evict elements outside sliding window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            
            // 2. Remove smaller elements from the tail
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            
            deque.offerLast(i);
            
            // 3. Append current maximum to result
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
}`,
  },
};

interface LanguageCyclerProps {
  className?: string;
  problemTitle?: string;
}

export function LanguageCycler({
  className = '',
  problemTitle = '239. Sliding Window Maximum in Strict O(N)',
}: LanguageCyclerProps) {
  const [selectedLang, setSelectedLang] = useState<SupportedCodeLang>('python');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeSnippet = SNIPPETS[selectedLang];

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(activeSnippet.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`rounded-3xl bg-white dark:bg-slate-950 border border-royal-border dark:border-slate-800 overflow-hidden shadow-royal-md dark:shadow-2xl transition-all ${className}`}>
      {/* Code Editor Header Bar */}
      <div className="bg-royal-bg-secondary dark:bg-slate-900/90 border-b border-royal-border dark:border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800/80 border border-royal-border dark:border-slate-700 shadow-sm">
          {(Object.keys(SNIPPETS) as SupportedCodeLang[]).map((lang) => {
            const snippet = SNIPPETS[lang];
            const isActive = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'btn-royal-primary text-white shadow-royal-indigo font-bold dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950'
                    : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
                }`}
              >
                <span>{snippet.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Info & Copy Action */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40 font-semibold">
            {activeSnippet.badge}
          </span>
          <button
            onClick={handleCopy}
            className="btn-royal-secondary text-xs px-3 py-1.5 text-royal-indigo dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:bg-royal-highlight transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Copy Solution Code"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-royal-text-secondary dark:text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Sub-Header: File Name & Complexity SLA */}
      <div className="px-4 py-2 bg-royal-highlight/60 dark:bg-[#0c0f16] border-b border-royal-border dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-royal-text-secondary dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span className="text-royal-text-primary dark:text-slate-300 font-semibold">{activeSnippet.fileName}</span>
          <span className="text-royal-border dark:text-slate-600">•</span>
          <span className="text-royal-text-secondary dark:text-slate-500">{problemTitle}</span>
        </div>
        <div className="flex items-center gap-2 text-royal-indigo dark:text-codia-cyan font-semibold">
          <span>Time: O(N)</span>
          <span className="text-royal-border dark:text-slate-600">|</span>
          <span className="text-emerald-600 dark:text-emerald-400">Space: O(k)</span>
        </div>
      </div>

      {/* Code Text Container */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-emerald-400 bg-[#080a0f]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={selectedLang}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-emerald-400"
          >
            <code>{activeSnippet.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Footer Pro-Tip Callout */}
      <div className="p-3 bg-royal-bg-secondary dark:bg-slate-900/70 border-t border-royal-border dark:border-slate-800 text-[11px] text-royal-text-secondary dark:text-slate-400 font-mono flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan shrink-0" />
        <span>
          <strong className="text-royal-text-primary dark:text-white">Senior Interview Note: </strong>
          {activeSnippet.highlightNote}
        </span>
      </div>
    </div>
  );
}
