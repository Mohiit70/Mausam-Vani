import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { WeatherDashboard } from './components/WeatherDashboard';
import { getCurrentWeather, getForecast } from './services/weatherApi';
import type { WeatherData, ForecastData, ChatMessage } from './types/weather';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I can help you with weather information and recommendations. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    async function fetchWeatherData() {
      if (!selectedCity) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(selectedCity),
          getForecast(selectedCity)
        ]);
        
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again.');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, [selectedCity]);

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: `Currently in ${selectedCity}, it's ${weather?.condition?.toLowerCase()} with a temperature of ${weather?.temperature}°C. How else can I help you?`,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botResponse]);
  };

  if (!selectedCity) {
    return <LandingPage onCitySelect={setSelectedCity} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => setSelectedCity(null)}
            className="text-blue-500 hover:text-blue-600"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <WeatherDashboard
      weather={weather}
      forecast={forecast}
      unit={unit}
      messages={messages}
      onUnitChange={() => setUnit(unit === 'C' ? 'F' : 'C')}
      onSendMessage={handleSendMessage}
      onBack={() => setSelectedCity(null)}
    />
  );
}