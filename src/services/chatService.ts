import { GEMINI_API_KEY } from '../config/api';

export async function getChatResponse(
  message: string,
  city?: string,
  weather?: { temperature: number; condition: string }
) {
  // Handle fixed questions first
  const fixedResponses: Record<string, string> = {
    "What should I wear today?": getClothingRecommendation(weather?.temperature, weather?.condition),
    "Will it rain today?": getRainPrediction(weather?.condition),
    "Is it good weather for outdoor activities?": getOutdoorRecommendation(weather?.temperature, weather?.condition)
  };

  if (message in fixedResponses) {
    return fixedResponses[message];
  }

  // For other questions, use Gemini API
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Context: The current weather in ${city} is ${weather?.temperature}°C and ${weather?.condition}.
                   User question: ${message}`
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm sorry, I couldn't process your question. Please try again.";
  }
}

function getClothingRecommendation(temperature?: number, condition?: string): string {
  if (!temperature) return "I need current weather information to make a recommendation.";
  
  if (temperature > 30) {
    return "It's quite hot! Wear light, breathable clothes like cotton shirts and shorts. Don't forget sunscreen!";
  } else if (temperature > 20) {
    return "The weather is pleasant. A light shirt and pants would be comfortable.";
  } else {
    return "It's a bit cool. Consider wearing a light jacket or sweater.";
  }
}

function getRainPrediction(condition?: string): string {
  if (!condition) return "I need current weather information to predict rain.";
  
  const rainyConditions = ['Rain', 'Drizzle', 'Thunderstorm'];
  return rainyConditions.includes(condition)
    ? "Yes, it's currently raining. Don't forget your umbrella!"
    : "No rain is expected at the moment, but it's always good to be prepared!";
}

function getOutdoorRecommendation(temperature?: number, condition?: string): string {
  if (!temperature || !condition) return "I need current weather information to make a recommendation.";
  
  const badConditions = ['Rain', 'Thunderstorm', 'Snow'];
  if (badConditions.includes(condition)) {
    return "It's not ideal for outdoor activities due to the weather. Consider indoor alternatives.";
  }
  
  if (temperature > 35) {
    return "It's very hot! If you plan outdoor activities, do them early morning or evening. Stay hydrated!";
  }
  
  return "The weather is good for outdoor activities. Enjoy!";
}