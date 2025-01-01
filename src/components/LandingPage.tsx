import { useState } from 'react';
import { CityCard } from './CityCard';
import { SearchBar } from './SearchBar';
import { Navbar } from './Navbar';
import { About } from './About';
import { Chatbot } from './Chatbot';
import { popularCities } from '../utils/cities';
import type { ChatMessage } from '../types/weather';

interface LandingPageProps {
  onCitySelect: (city: string) => void;
}

export function LandingPage({ onCitySelect }: LandingPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I can help you find weather information for any city in India. Which city would you like to know about?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: `You can search for any Indian city using the search bar above or select from our popular cities. Would you like to know more about a specific city?`,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botResponse]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              MausamVani
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              Your trusted companion for weather updates across India
            </p>
            <SearchBar onSearch={onCitySelect} />
          </div>
          
          <section id="popular" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularCities.map((city) => (
                <CityCard
                  key={city.name}
                  name={city.name}
                  image={city.image}
                  onClick={() => onCitySelect(city.name)}
                />
              ))}
            </div>
          </section>

          <section id="states" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by State</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 
                'Uttar Pradesh', 'West Bengal', 'Kerala'].map((state) => (
                <button
                  key={state}
                  onClick={() => onCitySelect(state)}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                >
                  {state}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 flex flex-col">
          <div className="sticky top-6">
            <Chatbot
              onSendMessage={handleSendMessage}
              messages={messages}
            />
          </div>
        </div>
      </div>
      
      <About />
    </div>
  );
}