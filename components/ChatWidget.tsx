'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_CHIPS = [
  'Walk me through a project that broke',
  "What's he like to work with?",
  'Where does he think AI actually belongs?',
  'Show me the non-code Abheesht',
];


const STORAGE_KEY = 'chat-messages';


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);


  // Restore messages from sessionStorage
  const restoredMessages = (() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : undefined;
    } catch { return undefined; }
  })();

  const { messages, sendMessage, status, stop } = useChat({
    id: 'portfolio-chat',
    messages: restoredMessages,
    onError: (error: Error) => {
      if (error.message?.includes('429') || error.message?.includes('message cap')) {
        setRateLimitMsg(
          "That's my message cap for now — gotta keep Abheesht's API bill sane. But his inbox is always open → scroll down to the contact form or email abheeshtr11@gmail.com"
        );
      }
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, rateLimitMsg]);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    }
  }, [messages]);



  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Listen for open-chat events from other components
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setIsOpen(true);
      if (detail?.message) {
        setTimeout(() => handleSend(detail.message), 400);
      }
    };
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  const handleSend = async (text?: string) => {
    const msg = text || inputValue.trim();
    if (!msg) return;
    setInputValue('');
    setRateLimitMsg(null);
    await sendMessage({ parts: [{ type: 'text' as const, text: msg }] });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isStreaming = status === 'streaming';
  const isWaiting = status === 'submitted';
  const isBusy = isStreaming || isWaiting;
  const hasMessages = messages.length > 0;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5
              rounded-full font-mono text-sm cursor-pointer
              bg-[rgba(26,26,40,0.85)] backdrop-blur-xl
              border border-[rgba(99,102,241,0.4)]
              text-[#a5b4fc] hover:text-white hover:border-[rgba(99,102,241,0.7)]
              shadow-[0_0_24px_rgba(99,102,241,0.18),0_0_48px_rgba(34,211,238,0.08)]
              hover:shadow-[0_0_32px_rgba(99,102,241,0.3),0_0_64px_rgba(34,211,238,0.12)]
              transition-all duration-300"
            aria-label="Open AI chat"
          >
            <span className="text-[#22d3ee]">&gt;_</span>
            <span>ask my AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              role="dialog"
              aria-label="AI Chat"
              className="fixed z-50
                bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl
                sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto
                sm:w-[380px] sm:h-[560px] sm:rounded-2xl
                flex flex-col overflow-hidden
                bg-[rgba(26,26,40,0.72)] backdrop-blur-2xl
                border border-[rgba(129,140,248,0.35)]"
              style={{ transformOrigin: 'bottom right' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.6), rgba(34,211,238,0.6))' }} />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[rgba(99,102,241,0.1)] blur-3xl pointer-events-none" />

              <div className="relative flex items-center justify-between px-4 py-3 border-b border-[rgba(129,140,248,0.15)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[#c7d2fe] tracking-tight">ask my AI</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-[#4b5563] mt-0.5">Not as funny as him, but I've got the receipts</p>
                </div>

                <button onClick={() => setIsOpen(false)}
                  className="text-[#4b5563] hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Close chat">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}>
                {!hasMessages && !rateLimitMsg && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }} className="space-y-4">
                    <div className="flex gap-2.5">
                      <span className="shrink-0 mt-0.5 font-mono text-xs text-[#22d3ee]">&gt;_</span>
                      <p className="text-sm text-[#c7d2fe] leading-relaxed">
                        Hey — I&apos;m Abheesht&apos;s AI. Ask me anything about his work, how he thinks, or why he won&apos;t shut up about Football.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_CHIPS.map((chip, i) => (
                        <motion.button key={chip}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.08 }}
                          onClick={() => handleSend(chip)}
                          className="text-xs font-mono px-3 py-1.5 rounded-full cursor-pointer
                            border border-[rgba(34,211,238,0.3)] text-[#67e8f9]
                            hover:bg-[rgba(34,211,238,0.1)] hover:border-[rgba(34,211,238,0.55)]
                            transition-all duration-200">
                          {chip}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <span className="shrink-0 mt-1.5 font-mono text-xs text-[#22d3ee]">&gt;_</span>
                    )}
                    <div className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[rgba(99,102,241,0.2)] text-[#e0e7ff] rounded-2xl rounded-br-sm'
                        : 'bg-[rgba(255,255,255,0.04)] text-[#c7d2fe] rounded-2xl rounded-bl-sm'
                    }`}>
                      {msg.parts
                        ? msg.parts
                            .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                            .map((p, i) => <span key={i}>{p.text}</span>)
                        : null}
                    </div>
                  </motion.div>
                ))}

                {isWaiting && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0 mt-1.5 font-mono text-xs text-[#22d3ee]">&gt;_</span>
                    <div className="flex items-center gap-1 px-3 py-2">
                      <span className="w-1.5 h-4 bg-[#22d3ee] rounded-sm animate-pulse" />
                    </div>
                  </div>
                )}

                {rateLimitMsg && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                    <span className="shrink-0 mt-1.5 font-mono text-xs text-[#22d3ee]">&gt;_</span>
                    <p className="text-sm text-[#fbbf24] leading-relaxed">{rateLimitMsg}</p>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="px-4 py-3 border-t border-[rgba(129,140,248,0.15)]">
                <div className="flex items-end gap-2">
                  <textarea ref={inputRef} value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about Abheesht…"
                    rows={1} disabled={isBusy}
                    className="flex-1 resize-none bg-[rgba(20,20,32,0.6)] text-sm text-[#e0e7ff]
                      placeholder:text-[#4b5563] rounded-lg px-3 py-2
                      border border-[rgba(129,140,248,0.2)]
                      focus:border-[rgba(99,102,241,0.5)]
                      focus:outline-none focus:ring-1 focus:ring-[rgba(99,102,241,0.25)]
                      transition-colors disabled:opacity-40"
                    style={{ maxHeight: '80px' }} />
                  {isStreaming ? (
                    <button onClick={stop}
                      className="shrink-0 p-2 rounded-lg cursor-pointer
                        bg-[rgba(239,68,68,0.15)] text-red-400
                        hover:bg-[rgba(239,68,68,0.25)] transition-colors"
                      aria-label="Stop generating">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <rect x="2" y="2" width="10" height="10" rx="1.5" />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={() => handleSend()}
                      disabled={!inputValue.trim() || isBusy}
                      className="shrink-0 p-2 rounded-lg cursor-pointer
                        bg-[rgba(99,102,241,0.2)] text-[#a5b4fc]
                        hover:bg-[rgba(99,102,241,0.35)]
                        disabled:opacity-25 disabled:cursor-not-allowed
                        transition-colors"
                      aria-label="Send message">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 7h12M8 2l5 5-5 5" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-mono text-[#2d2d42] mt-2 text-center select-none">
                  Claude Haiku · streamed · rate-limited via Upstash
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
