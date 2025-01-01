import React, { useState } from 'react';
import { Send, Bot,} from 'lucide-react';
import { QuickQuestions } from './QuickQuestions';
import { getChatResponse } from '../services/chatService';
import type { ChatMessage } from '../types/weather';

interface ChatbotProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  weather?: {
    temperature: number;
    condition: string;
  };
  city?: string;
}

export function Chatbot({ onSendMessage, messages, weather, city }: ChatbotProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || !isLoading) {
      setIsLoading(true);
      const response = await getChatResponse(input, city, weather);
      onSendMessage(input);
      setInput('');
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-2 border-b">
        <Bot className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Weather Assistant</h2>
      </div>
      
      <QuickQuestions onSelect={handleQuickQuestion} />
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about weather..."
          className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}