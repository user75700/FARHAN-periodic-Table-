import React from 'react';
import { Compass, BookOpen, Sparkles, Atom, Flame, ArrowRight, ShieldCheck, Trophy, Zap } from 'lucide-react';
import { ElementData } from '../data/elementsData';

interface HeroProps {
  onExplore: () => void;
  onStartNeet: () => void;
  onElementOfTheDay: () => void;
  elementOfTheDay: ElementData;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onStartNeet,
  onElementOfTheDay,
  elementOfTheDay
}) => {
  return (
    <div className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Glow & Atom Decor */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/5 to-transparent dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-900"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>NCERT Aligned · NEET 2026 Ready</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Master Every Element. <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Understand Every Trend.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              An interactive periodic table and comprehensive inorganic chemistry learning platform designed specifically for NEET, JEE, CBSE aspirants, and chemistry enthusiasts.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 group"
              >
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                Explore Periodic Table
              </button>

              <button
                onClick={onStartNeet}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold transition-all flex items-center gap-2 border border-slate-700/50"
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Start NEET Practice
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 text-left">
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">118</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Complete Elements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">30+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Advanced Features</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">NCERT & NEET Focused</div>
              </div>
            </div>

          </div>

          {/* Right Column: Element of the Day Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                Element of the Day
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/20 border-2 border-indigo-500/30">
                  <img
                    src="/IMG_20260528_040439_360.jpeg"
                    alt="Farhan - Founder & Creator"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image path differs
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-1">
                    <span className="text-[9px] font-bold text-white">Farhan</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{elementOfTheDay.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Curated by Farhan · {elementOfTheDay.category}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    Group {elementOfTheDay.group} · Period {elementOfTheDay.period} · {elementOfTheDay.state}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6 bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>NEET Priority:</strong> {elementOfTheDay.neetImportance.priority}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Key Fact:</strong> {elementOfTheDay.neetImportance.frequentlyTestedFacts[0]}</span>
                </div>
              </div>

              <button
                onClick={onElementOfTheDay}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white font-semibold transition-colors flex items-center justify-center gap-2 group text-sm"
              >
                <span>View Full Element Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
