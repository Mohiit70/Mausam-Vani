# Mausam-Vani - Weather Web App for India

**Mausam-Vani** is a weather web app designed to provide weather updates for cities across India. Using the **OpenWeather API** for real-time weather data and **Gemini API** for additional functionalities, Mausam-Vani helps you get accurate weather information through a user-friendly interface.

## Features

- **Current Weather Information**: Get the current temperature, humidity, wind speed, and weather condition of any city in India.
- **Weather Forecast**: Receive weather forecasts for the next 5 days, with min and max temperature, weather condition, and an icon representing the weather.
- **Interactive Bot**: Provides an easy-to-use conversational interface for weather queries.

## Tech Stack

- **Frontend**: 
  - **React**: For building a dynamic, responsive interface.
  - **Vite**: A fast, modern build tool for faster development and bundling.
  - **TypeScript**: For static type checking and better code quality.
  
- **APIs**: 
  - **OpenWeather API**: To fetch current weather and forecast data.
  - **Gemini API**: For additional data or functionalities.
  
- **Other**:
  - **Node.js**: Backend for handling API requests and bot interactions.
  
## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mohiit70/Mausam-Vani.git
   cd Mausam-Vani
```

2. **Install Dependencies**:

```shellscript
npm install
```


3. **Set up Environment Variables**:

Create a `.env` file in the root of your project and add your API keys:

```plaintext
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```


4. **Run the Development Server**:

```shellscript
npm run dev
```

Your web app will now be running at `http://localhost:3000`.

## Demo

You can try the demo of the Mausam-Vani web app by visiting the following link:

[Mausam-Vani Demo](https://youtu.be/D0a7f3dKmiI)

## Screenshots

![Mausam-Vani Screenshot 1](public/Screenshots/Screenshot%202025-01-15%20232914.png)

![Mausam-Vani Screenshot 2](public/Screenshots/Screenshot%202025-01-15%20232937.png)

![Mausam-Vani Screenshot 3](public/Screenshots/Screenshot%202025-01-15%20233033.png)

![Mausam-Vani Screenshot 4](public/Screenshots/Screenshot%202025-01-15%20232949.png)

## Usage

1. Open the web app and type the name of the city you want to get weather information for.
2. The bot will return current weather details like temperature, humidity, wind speed, and weather condition.
3. You can also get a 5-day weather forecast.