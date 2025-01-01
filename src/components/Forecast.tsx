import { format } from 'date-fns';
import type { ForecastData } from '../types/weather';

interface ForecastProps {
  forecast: ForecastData[];
  unit: 'C' | 'F';
}

export function Forecast({ forecast, unit }: ForecastProps) {
  const convertTemp = (temp: number) => unit === 'C' ? temp : (temp * 9/5) + 32;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="space-y-4">
        {forecast.map((day) => (
          <div key={day.date} className="flex items-center justify-between">
            <span className="text-gray-600">
              {format(new Date(day.date), 'EEE, MMM d')}
            </span>
            <div className="flex items-center">
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.condition}
                className="w-8 h-8"
              />
              <span className="ml-2">
                {Math.round(convertTemp(day.temperature.max))}°{unit} / 
                {Math.round(convertTemp(day.temperature.min))}°{unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}