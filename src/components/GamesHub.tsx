import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle, RefreshCw, Trophy, HelpCircle } from 'lucide-react';
import { getAllElements, ElementData } from '../data/elementsData';

interface GamesHubProps {
  onAddXp: (amount: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onAddXp }) => {
  const allElements = getAllElements();
  const [activeGame, setActiveGame] = useState<'guess' | 'whoAmI'>('guess');

  // Guess the Element State
  const [targetElement, setTargetElement] = useState<ElementData>(() => allElements[16]); // Chlorine
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);

  const checkGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (guessInput.trim().toLowerCase() === targetElement.name.toLowerCase() || guessInput.trim().toUpperCase() === targetElement.symbol) {
      setGuessFeedback("Correct! Amazing chemistry knowledge.");
      onAddXp(50);
    } else {
      setGuessFeedback(`Incorrect. Try again! Hint: Group ${targetElement.group}, Period ${targetElement.period}`);
    }
  };

  const nextGuessElement = () => {
    const randomEl = allElements[Math.floor(Math.random() * 30)];
    setTargetElement(randomEl);
    setGuessInput('');
    setGuessFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" />
            Chemistry Games & Memory Trainer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test your element identification skills and earn XP points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveGame('guess')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeGame === 'guess' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Guess the Element
          </button>
        </div>
      </div>

      {activeGame === 'guess' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center mx-auto text-white shadow-lg text-3xl font-mono font-bold">
            ?
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Guess the Element from Clues</h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-left bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div><span className="text-slate-400">Atomic Number:</span> <strong className="font-mono">{targetElement.atomicNumber}</strong></div>
              <div><span className="text-slate-400">Group:</span> <strong className="font-mono">{targetElement.group}</strong></div>
              <div><span className="text-slate-400">Period:</span> <strong className="font-mono">{targetElement.period}</strong></div>
              <div><span className="text-slate-400">State:</span> <strong>{targetElement.state}</strong></div>
            </div>
          </div>

          <form onSubmit={checkGuess} className="max-w-md mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Enter element name or symbol..."
              value={guessInput}
              onChange={(e) => setGuessInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-sm"
            >
              Guess
            </button>
          </form>

          {guessFeedback && (
            <div className={`p-4 rounded-xl text-xs font-medium max-w-md mx-auto ${
              guessFeedback.startsWith('Correct') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {guessFeedback}
              {guessFeedback.startsWith('Correct') && (
                <button
                  onClick={nextGuessElement}
                  className="block mt-3 mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs"
                >
                  Next Element
                </button>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
