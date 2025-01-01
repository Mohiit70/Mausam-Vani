export interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  }
  
  export interface ForecastData {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
  }
  
  export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }