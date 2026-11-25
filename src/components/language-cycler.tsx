'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export type SupportedCodeLang = 'python' | 'javascript' | 'typescript' | 'java';

export interface CodeToken {
  type: 'keyword' | 'type' | 'func' | 'number' | 'operator' | 'comment' | 'string' | 'ident' | 'whitespace';
  text: string;
}

/**
 * Tokenize a single line of code into syntax elements.
 * Unifies syntax highlighting across Python, JavaScript, TypeScript, and Java.
 */
export function tokenizeLine(line: string, lang: SupportedCodeLang): CodeToken[] {
  const trimmed = line.trim();
  const isFullComment =
    trimmed.startsWith('#') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('*/');

  if (isFullComment) {
    return [{ type: 'comment', text: line }];
  }

  let codePart = line;
  let commentPart = '';
  const commentIdx = lang === 'python' ? line.indexOf('#') : line.indexOf('//');
  if (commentIdx !== -1) {
    codePart = line.substring(0, commentIdx);
    commentPart = line.substring(commentIdx);
  }

  // Regex token categories: keywords, types, function names, numbers, operators, whitespace, identifiers
  const tokenRegex =
    /(\b(?:def|from|import|while|and|for|in|if|return|as|elif|else|function|const|let|var|new|type|interface|public|class|package|null|void)\b)|(\b(?:List|int|str|float|bool|number|string|boolean|any|never|unknown|Deque|ArrayDeque|Solution|Integer)\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(\b\d+\b)|(->|=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*\/=<>!&|?:;,.()[\]{}])|(\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  const tokens: CodeToken[] = [];
  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(codePart)) !== null) {
    const [, keyword, typeName, funcName, number, operator, whitespace, ident] = match;
    if (keyword) tokens.push({ type: 'keyword', text: keyword });
    else if (typeName) tokens.push({ type: 'type', text: typeName });
    else if (funcName) tokens.push({ type: 'func', text: funcName });
    else if (number) tokens.push({ type: 'number', text: number });
    else if (operator) tokens.push({ type: 'operator', text: operator });
    else if (whitespace) tokens.push({ type: 'whitespace', text: whitespace });
    else if (ident) tokens.push({ type: 'ident', text: ident });
  }

  if (commentPart) {
    tokens.push({ type: 'comment', text: commentPart });
  }

  return tokens;
}

/**
 * Render an individual code token with the unified RGB syntax palette
 */
export function renderToken(token: CodeToken, idx: number) {
  switch (token.type) {
    case 'keyword':
      return (
        <span key={idx} className="text-[#968BFF] font-semibold">
          {token.text}
        </span>
      );
    case 'func':
      return (
        <span key={idx} className="text-[#5F84FF] font-medium">
          {token.text}
        </span>
      );
    case 'type':
      return (
        <span key={idx} className="text-[#4EC9B0]">
          {token.text}
        </span>
      );
    case 'number':
      return (
        <span key={idx} className="text-[#FF9E64]">
          {token.text}
        </span>
      );
    case 'comment':
      return (
        <span key={idx} className="text-[#7E84A3] italic">
          {token.text}
        </span>
      );
    case 'string':
      return (
        <span key={idx} className="text-[#98C379]">
          {token.text}
        </span>
      );
    case 'operator':
      return (
        <span key={idx} className="text-[#89DDFF]">
          {token.text}
        </span>
      );
    case 'ident':
      return (
        <span key={idx} className="text-[#FEFEFF]">
          {token.text}
        </span>
      );
    case 'whitespace':
    default:
      return <span key={idx}>{token.text}</span>;
  }
}

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
  javascript: {
    lang: 'javascript',
    label: 'JavaScript',
    badge: 'ES6+ Deque Queue',
    fileName: 'slidingWindowMax.js',
    highlightNote: 'Zero-overhead array pointer queue with amortized O(1) sliding window push and shift.',
    code: `function maxSlidingWindow(nums, k) {
  // Store indices in descending value order
  const deque = [];
  const result = [];

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
        // Monotonic deque storing indices of elements in descending order
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
    <div className={`rounded-3xl bg-[#141727]/95 border border-[#968BFF]/25 overflow-hidden shadow-2xl transition-all ${className}`}>
      {/* Code Editor Header Bar */}
      <div className="bg-[#0D0F1B]/95 border-b border-[#968BFF]/20 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090B14] border border-[#968BFF]/20 shadow-inner">
          {(Object.keys(SNIPPETS) as SupportedCodeLang[]).map((lang) => {
            const snippet = SNIPPETS[lang];
            const isActive = selectedLang === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_2px_12px_rgba(150,139,255,0.4)] font-bold'
                    : 'text-[#A5A9C5] hover:text-[#FEFEFF] hover:bg-[#141727]'
                }`}
              >
                <span>{snippet.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Info & Copy Action */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex text-[11px] font-mono text-[#968BFF] bg-[#968BFF]/15 px-3 py-1 rounded-full border border-[#968BFF]/30 font-semibold">
            {activeSnippet.badge}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#141727] hover:bg-[#968BFF]/20 border border-[#968BFF]/25 text-xs font-mono text-[#DFD9FF] hover:text-[#FEFEFF] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            title="Copy Solution Code"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#968BFF]" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Sub-Header: File Name & Complexity SLA */}
      <div className="px-4 py-2 bg-[#0D0F1B]/70 border-b border-[#968BFF]/15 flex items-center justify-between text-[11px] font-mono text-[#A5A9C5]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#968BFF]" />
          <span className="text-[#FEFEFF] font-semibold">{activeSnippet.fileName}</span>
          <span className="text-[#968BFF]/40">•</span>
          <span className="text-[#A5A9C5]">{problemTitle}</span>
        </div>
        <div className="flex items-center gap-2 text-[#968BFF] font-semibold">
          <span>Time: O(N)</span>
          <span className="text-[#968BFF]/40">|</span>
          <span className="text-[#5F84FF]">Space: O(k)</span>
        </div>
      </div>

      {/* Code Text Container: Real RGB Syntax Highlighting (No Flat Monochrome Green) */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed bg-[#0B0E18]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={selectedLang}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="font-mono text-left"
          >
            <code>
              {activeSnippet.code.split('\n').map((line, lineIdx) => {
                const tokens = tokenizeLine(line, selectedLang);
                return (
                  <div key={lineIdx} className="table-row">
                    <span className="table-cell select-none pr-4 text-right text-[#4B506D] text-[11px] font-mono w-8">
                      {lineIdx + 1}
                    </span>
                    <span className="table-cell">
                      {tokens.map((token, tokenIdx) => renderToken(token, tokenIdx))}
                    </span>
                  </div>
                );
              })}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Footer Pro-Tip Callout */}
      <div className="p-3 bg-[#0D0F1B]/90 border-t border-[#968BFF]/15 text-[11px] text-[#A5A9C5] font-mono flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#968BFF] shrink-0" />
        <span>
          <strong className="text-[#FEFEFF]">Senior Interview Note: </strong>
          {activeSnippet.highlightNote}
        </span>
      </div>
    </div>
  );
}
