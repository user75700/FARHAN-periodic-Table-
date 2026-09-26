import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Award, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { NEET_QUESTIONS, NEETQuestion } from '../data/neetQuestions';

interface NeetPracticeProps {
  onAddXp: (amount: number) => void;
  onAddMistake: (question: NEETQuestion) => void;
}

export const NeetPractice: React.FC<NeetPracticeProps> = ({ onAddXp, onAddMistake }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const questions = NEET_QUESTIONS.filter(q => selectedCategory === 'all' || q.category === selectedCategory);
  const currentQ = questions[currentIndex] || questions[0];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore(s => s + 1);
      onAddXp(20);
    } else {
      onAddMistake(currentQ);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            NEET Chemistry Practice & Question Bank
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            High-yield NCERT and NEET inorganic chemistry questions with detailed explanations.
          </p>
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); restartQuiz(); }}
          className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          <option value="all">All Categories</option>
          <option value="Periodic Trends">Periodic Trends</option>
          <option value="Periodic Table">Periodic Table</option>
          <option value="p-Block">p-Block Elements</option>
          <option value="d-Block">d-Block Elements</option>
          <option value="f-Block">f-Block Elements</option>
          <option value="Chemical Bonding">Chemical Bonding</option>
        </select>
      </div>

      {quizFinished ? (
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto text-white shadow-lg">
            <Award className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Practice Session Completed!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold">{questions.length}</span> correct.
            </p>
          </div>
          <button
            onClick={restartQuiz}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Practice Again
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">{currentQ.category}</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">{currentQ.difficulty}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500";
              if (isAnswered) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === currentQ.correctAnswer && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 space-y-2 animate-fadeIn">
              <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">Concept Explanation:</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 pt-1">Core Concept: {currentQ.concept}</div>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={nextQuestion}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
