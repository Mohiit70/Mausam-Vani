import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  const temperature = unit === 'C' ? weather.temperature : (weather.temperature * 9/5) + 32;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="w-16 h-16"
        />
      </div>
      
      <div className="text-4xl font-bold text-gray-900 mb-4">
        {Math.round(temperature)}°{unit}
      </div>
      
      <div className="text-gray-600 mb-4">{weather.condition}</div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <Droplets className="w-5 h-5 text-blue-500 mr-2" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 text-blue-500 mr-2" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center">
          <Cloud className="w-5 h-5 text-blue-500 mr-2" />
          <span>{weather.condition}</span>
        </div>
      </div>
    </div>
  );
}