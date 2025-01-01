import { MessageSquare } from 'lucide-react';

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

export function QuickQuestions({ onSelect }: QuickQuestionsProps) {
  const questions = [
    "What should I wear today?",
    "Will it rain today?",
    "Is it good weather for outdoor activities?"
  ];

  return (
    <div className="mb-4 space-y-2">
      <p className="text-sm text-gray-600 mb-2">Quick Questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelect(question)}
            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700"
          >
            <MessageSquare className="w-4 h-4" />
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}