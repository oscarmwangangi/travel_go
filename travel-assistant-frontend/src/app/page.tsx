"use client";

import { useState, useEffect } from "react";
import { FiMessageSquare, FiMenu } from "react-icons/fi";
import { MobileSidebarToggle } from "./components/MobileSidebarToggle";
import { Sidebar } from "./components/Sidebar";
import { ChatBubble } from "./components/ChatBubble";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { ChatInput } from "./components/ChatInput";

interface ChatHistory {
  id?: string;
  question: string;
  answer: string;
  timestamp?: Date;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    fetchHistory();
  }, []);

  const askLLM = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    const userMessage = { type: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      
      const botMessage = { type: 'bot' as const, content: data.response };
      setMessages(prev => [...prev, botMessage]);
      
      const historyRes = await fetch("http://127.0.0.1:8000/api/v1/history");
      const historyData = await historyRes.json();
      setHistory(historyData);
      
      if (historyData.length > 0) {
        setCurrentChatId(historyData[0].id);
      }
    } catch (err) {
      const errorMessage = { type: 'bot' as const, content: "Something went wrong. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/v1/history", {
        method: "DELETE",
      });
      setHistory([]);
      setMessages([]);
      setCurrentChatId(null);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setMobileSidebarOpen(false);
  };

  const loadChat = (id: string) => {
    const chat = history.find(item => item.id === id);
    if (chat) {
      setMessages([
        { type: 'user', content: chat.question },
        { type: 'bot', content: chat.answer }
      ]);
      setCurrentChatId(id);
      setMobileSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <MobileSidebarToggle 
        isOpen={mobileSidebarOpen} 
        onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
      />

      <Sidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        history={history}
        currentChatId={currentChatId}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={startNewChat}
        onLoadChat={loadChat}
        onClearHistory={clearHistory}
      />

<div className={`flex-1 flex flex-col transition-all duration-300 h-full ${sidebarOpen ? "ml-0" : "ml-0"}`}>

        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-700 flex items-center">
              <FiMessageSquare className="mr-2" /> Travel Assistant
            </h1>
          </div>
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="hidden md:block text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <FiMenu size={20} />
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 && !loading && <WelcomeMessage />}

            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatBubble key={index} type={message.type} content={message.content} />
              ))}

              {loading && <LoadingIndicator />}
            </div>
          </div>
        </main>

        <footer className="bg-white border-t p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput 
              query={query}
              loading={loading}
              onQueryChange={setQuery}
              onSend={askLLM}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Travel Assistant may produce inaccurate information about people, places, or facts.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}