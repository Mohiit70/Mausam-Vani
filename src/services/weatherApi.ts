import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '../config/api';
import type { WeatherData, ForecastData } from '../types/weather';

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${OPENWEATHER_BASE_URL}/weather?q=${city},in&units=metric&appid=${OPENWEATHER_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = await response.json();
  
  return {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0].main,
    icon: data.weather[0].icon
  };
}

export async function getForecast(city: string): Promise<ForecastData[]> {
  const response = await fetch(
    `${OPENWEATHER_BASE_URL}/forecast?q=${city},in&units=metric&appid=${OPENWEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Forecast not available');
  }

  const data = await response.json();
  
  const dailyData = data.list.reduce((acc: any, item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = {
        min: item.main.temp,
        max: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon
      };
    } else {
      acc[date].min = Math.min(acc[date].min, item.main.temp);
      acc[date].max = Math.max(acc[date].max, item.main.temp);
    }
    return acc;
  }, {});

  return Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, data]: [string, any]) => ({
      date,
      temperature: {
        min: data.min,
        max: data.max
      },
      condition: data.condition,
      icon: data.icon
    }));
}