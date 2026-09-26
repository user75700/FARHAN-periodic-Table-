import React from 'react';
import { Award, CheckCircle, Lock, Trophy, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progressText: string;
}

interface AchievementsProps {
  xp: number;
  streak: number;
  bookmarkedCount: number;
}

export const Achievements: React.FC<AchievementsProps> = ({ xp, streak, bookmarkedCount }) => {
  const achievements: Achievement[] = [
    {
      id: 'first_10',
      title: 'First 10 Elements',
      description: 'Explore and bookmark your first 10 elements.',
      icon: '🧪',
      unlocked: bookmarkedCount >= 3,
      progressText: `${Math.min(bookmarkedCount, 3)}/3 Bookmarked`
    },
    {
      id: 'explorer',
      title: 'Periodic Table Explorer',
      description: 'Navigate through the interactive periodic table and trends.',
      icon: '🧭',
      unlocked: true,
      progressText: 'Completed'
    },
    {
      id: 'trend_master',
      title: 'Trend Master',
      description: 'Explore electronegativity and atomic radius heatmaps.',
      icon: '📈',
      unlocked: xp >= 100,
      progressText: xp >= 100 ? 'Unlocked' : `${xp}/100 XP`
    },
    {
      id: 'neet_pro',
      title: 'NEET Inorganic Pro',
      description: 'Practice high-yield NEET inorganic chemistry questions.',
      icon: '📚',
      unlocked: xp >= 250,
      progressText: xp >= 250 ? 'Unlocked' : `${xp}/250 XP`
    },
    {
      id: 'streak_master',
      title: '7-Day Chemistry Streak',
      description: 'Maintain a 7-day daily chemistry learning streak.',
      icon: '🔥',
      unlocked: streak >= 7,
      progressText: `${streak}/7 Days`
    },
    {
      id: 'master_118',
      title: '118 Elements Master',
      description: 'Master all 118 elements and achieve Level 10.',
      icon: '👑',
      unlocked: xp >= 1000,
      progressText: `${xp}/1000 XP`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Achievements & Badges
        </h3>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
          {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
              ach.unlocked
                ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/30 dark:border-indigo-500/30 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow flex items-center justify-center text-2xl shrink-0 border border-slate-200 dark:border-slate-700">
              {ach.icon}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {ach.title}
                </h4>
                {ach.unlocked ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ach.description}</p>
              <div className="pt-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  ach.unlocked 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {ach.progressText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
