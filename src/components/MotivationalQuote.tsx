
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const motivationalQuotes = [
  "Every great achievement was once considered impossible. Keep going! 🌟",
  "Small progress is still progress. You're doing amazing! 💪",
  "Your future self will thank you for the work you do today. 🚀",
  "The only way to do great work is to love what you do. ❤️",
  "Success is the sum of small efforts repeated day in and day out. 🎯",
  "You are capable of amazing things. Believe in yourself! ✨",
  "Every task completed is a step closer to your dreams. 🌈",
  "Today is a perfect day to accomplish something great! 🌅",
  "Your potential is endless. Keep pushing forward! 🏆",
  "Great things never come from comfort zones. You've got this! 💎"
];

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="motivational-gradient text-white p-6 rounded-lg shadow-lg mb-6 animate-fade-in">
      <div className="flex items-start space-x-3">
        <Sparkles className="h-6 w-6 mt-1 animate-bounce-subtle" />
        <div>
          <h3 className="text-xl font-semibold mb-2">Daily Motivation</h3>
          <p className="text-lg opacity-95 leading-relaxed">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;
