import { Cloud, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onBack?: () => void;
  showBack?: boolean;
}

export function Navbar({ onBack, showBack }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">MausamVani</span>
          </div>
        </div>
        <div className="flex gap-4">
          <a href="#popular" className="text-gray-600 hover:text-blue-500">Popular Cities</a>
          <a href="#states" className="text-gray-600 hover:text-blue-500">States</a>
          <a href="#about" className="text-gray-600 hover:text-blue-500">About</a>
        </div>
      </div>
    </nav>
  );
}