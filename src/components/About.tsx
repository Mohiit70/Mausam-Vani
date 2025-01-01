import { Github } from 'lucide-react';
import { GITHUB_REPO } from '../config/api';

export function About() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About MausamVani</h2>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-4">
            MausamVani is your comprehensive weather companion for India, providing accurate
            weather forecasts and insights for cities, towns, and villages across the country.
          </p>
          <p className="text-gray-600 mb-6">
            Powered by OpenWeatherMap API, we deliver reliable weather data enhanced with
            location-specific recommendations and an interactive chatbot assistant.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}