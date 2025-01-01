import { Header } from './Header';
import { WeatherCard } from './WeatherCard';
import { Forecast } from './Forecast';
import { Chatbot } from './Chatbot';
import { Navbar } from './Navbar';
import type { WeatherData, ForecastData, ChatMessage } from '../types/weather';

interface WeatherDashboardProps {
  weather: WeatherData;
  forecast: ForecastData[];
  unit: 'C' | 'F';
  messages: ChatMessage[];
  onUnitChange: () => void;
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

export function WeatherDashboard({
  weather,
  forecast,
  unit,
  messages,
  onUnitChange,
  onSendMessage,
  onBack
}: WeatherDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar showBack onBack={onBack} />
      <div className="max-w-4xl mx-auto p-6">
        <Header unit={unit} onUnitChange={onUnitChange} />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <WeatherCard weather={weather} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
          </div>
          <Chatbot onSendMessage={onSendMessage} messages={messages} />
        </div>
      </div>
    </div>
  );
}