import React from 'react';
import { BarChart2, Award, Flame, Zap, CheckCircle, Bookmark, Shield } from 'lucide-react';
import { ElementData } from '../data/elementsData';
import { Achievements } from './Achievements';

interface DashboardProps {
  streak: number;
  xp: number;
  bookmarkedElements: ElementData[];
  onSelectElement: (element: ElementData) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  streak,
  xp,
  bookmarkedElements,
  onSelectElement
}) => {
  const level = Math.floor(xp / 100) + 1;
  const progressToNextLevel = xp % 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-indigo-600" />
            Student Learning Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your NEET inorganic chemistry mastery, XP, streaks, and bookmarks.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4" />
            <span>{streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Zap className="w-4 h-4" />
            <span>{xp} Total XP</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Level</span>
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">Level {level}</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Progress to Level {level + 1}</span>
              <span>{progressToNextLevel}/100 XP</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: `${progressToNextLevel}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bookmarked Elements</span>
            <Bookmark className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{bookmarkedElements.length}</div>
          <p className="text-xs text-slate-500">Saved for quick NEET revision sessions.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">NEET Readiness</span>
            <Shield className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">Good 🚀</div>
          <p className="text-xs text-slate-500">Keep practicing periodic trends and s/p-block compounds.</p>
        </div>

      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <Achievements xp={xp} streak={streak} bookmarkedCount={bookmarkedElements.length} />
      </div>

      {/* Bookmarked Elements List */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500" />
          Your Bookmarked Elements
        </h3>

        {bookmarkedElements.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No elements bookmarked yet. Click the bookmark icon on any element card to save it here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {bookmarkedElements.map(el => (
              <div
                key={el.id}
                onClick={() => onSelectElement(el)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 cursor-pointer transition-all flex flex-col items-center text-center space-y-1 shadow-sm"
              >
                <span className="text-[10px] font-mono text-slate-400">{el.atomicNumber}</span>
                <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{el.symbol}</span>
                <span className="text-xs font-semibold truncate w-full">{el.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

