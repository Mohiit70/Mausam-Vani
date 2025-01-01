import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  unit: 'C' | 'F';
  onUnitChange: () => void;
}

export function Header({ unit, onUnitChange }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        India Weather Dashboard
      </h1>
      <button
        onClick={onUnitChange}
        className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md hover:bg-gray-50"
      >
        {unit === 'C' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        °{unit}
      </button>
    </header>
  );
}