import React from 'react';
import { Atom, BookOpen, Compass, Award, BarChart2, MessageSquare, Shield, Bookmark, Search, Moon, Sun, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  bookmarksCount: number;
  openBookmarks: () => void;
  streak: number;
  xp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  bookmarksCount,
  openBookmarks,
  streak,
  xp
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${
      darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/30 border-2 border-indigo-500/40 shrink-0">
            <img
              src="/IMG_20260528_040439_360.jpeg"
              alt="Farhan"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Farhan Periodic Table Learner
            </span>
            <span className="block text-[10px] font-medium text-slate-400 tracking-wider uppercase">
              Curated by Farhan · NEET Chemistry Master
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (4-6 nav items) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setCurrentTab('table')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'table' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            Periodic Table
          </button>
          
          <button
            onClick={() => setCurrentTab('trends')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'trends' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Trends & Heatmap
          </button>

          <button
            onClick={() => setCurrentTab('neet')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'neet' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            NEET Practice
          </button>

          <button
            onClick={() => setCurrentTab('games')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'games' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            Games & Trainer
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'dashboard' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => setCurrentTab('tutor')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'tutor' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            AI Tutor
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'admin' ? 'bg-indigo-500/10 text-indigo-600 font-semibold' : 'hover:bg-slate-500/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            Admin
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Bookmarks, Streak, Theme, Profile) */}
        <div className="flex items-center gap-3">
          {/* Streak & XP Badges */}
          <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-600 dark:text-amber-400">
            <span>🔥 {streak} Days</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>⚡ {xp} XP</span>
          </div>

          {/* Bookmarks */}
          <button
            onClick={openBookmarks}
            className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Bookmarked Elements"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
