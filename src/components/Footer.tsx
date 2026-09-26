import React from 'react';
import { Atom, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Atom className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Farhan Periodic Table Learner
              </span>
              <p className="text-xs text-slate-500">Explore. Understand. Master Chemistry.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            <a href="#feedback" className="hover:text-indigo-600 transition-colors">Feedback</a>
            <a href="#report" className="hover:text-indigo-600 transition-colors">Report an Error</a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Farhan Periodic Table Learner. Designed for NEET, JEE & CBSE aspirants.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with precision for chemistry education</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
