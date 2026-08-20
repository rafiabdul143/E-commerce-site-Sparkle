import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, ShoppingBag } from 'lucide-react';
import { sendAiChatMessageApi } from '../services/api';

const AiBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am your Sparkle AI Assistant. Ask me anything about our clothing collections, size guides, or order updates! ✨',
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await sendAiChatMessageApi(query, sessionId);
      if (res.success) {
        if (res.sessionId) setSessionId(res.sessionId);
        setMessages((prev) => [
          ...prev,
          { sender: 'assistant', text: res.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'assistant', text: 'Sorry, I ran into an error answering that!' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Unable to connect to AI server right now.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    '👕 Show me casual shirts',
    '📦 Check my order status',
    '📏 Size advisor for dresses',
  ];

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 font-sans">
      {/* Floating Toggle Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Sparkle AI assistant"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 group"
        >
          <Sparkles className="h-5 w-5 animate-pulse text-yellow-300" />
          <span className="font-semibold text-sm">Ask Sparkle AI</span>
        </button>
      )}

      {/* Slide-Up AI Chat Container */}
      {isOpen && (
        <div role="dialog" aria-label="Sparkle AI assistant" className="h-[min(520px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-950 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none text-white">Sparkle AI Assistant</h3>
                <span className="text-[11px] text-purple-200 flex items-center gap-1 mt-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Online & Ready
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Sparkle AI assistant"
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-gray-50/80 border-b border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap text-xs bg-white text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="h-7 w-7 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-gray-500 text-xs p-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                Sparkle AI is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, orders, sizes..."
              className="flex-1 text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiBotWidget;
