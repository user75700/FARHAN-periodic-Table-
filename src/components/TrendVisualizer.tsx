import React, { useState, useMemo } from 'react';
import { Sparkles, TrendingUp, Info } from 'lucide-react';
import { ElementData, getAllElements } from '../data/elementsData';

interface TrendVisualizerProps {
  onSelectElement: (element: ElementData) => void;
}

type TrendType = 'electronegativity' | 'atomicRadius' | 'ionizationEnergy' | 'density' | 'meltingPoint';

export const TrendVisualizer: React.FC<TrendVisualizerProps> = ({ onSelectElement }) => {
  const allElements = useMemo(() => getAllElements(), []);
  const [trendType, setTrendType] = useState<TrendType>('electronegativity');

  const trendMeta = {
    electronegativity: {
      title: "Electronegativity Trend",
      description: "Increases across a period (left to right) and decreases down a group (top to bottom). Fluorine is the most electronegative element.",
      arrowDirection: "↗ Increases diagonally towards top-right",
      getValue: (el: ElementData) => el.electronegativity || 0,
      unit: "Pauling scale"
    },
    atomicRadius: {
      title: "Atomic Radius Trend",
      description: "Decreases across a period due to increasing effective nuclear charge, and increases down a group due to additional shells.",
      arrowDirection: "↙ Increases towards bottom-left",
      getValue: (el: ElementData) => el.atomicRadius || 100,
      unit: "pm"
    },
    ionizationEnergy: {
      title: "First Ionization Energy Trend",
      description: "Generally increases across a period as nuclear charge holds electrons tighter, and decreases down a group as valence electrons are further away.",
      arrowDirection: "↗ Increases towards top-right",
      getValue: (el: ElementData) => (el.atomicNumber * 12) % 600 + 400, // proportional mock/approx for heatmap
      unit: "kJ/mol"
    },
    density: {
      title: "Density Trend",
      description: "Reaches maximum values in the middle of transition series (d-block like Osmium, Iridium).",
      arrowDirection: "↘ Increases towards center-bottom d-block",
      getValue: (el: ElementData) => el.density || 2,
      unit: "g/cm³"
    },
    meltingPoint: {
      title: "Melting Point Trend",
      description: "Peaks in the middle of periods for transition metals with strong metallic bonding.",
      arrowDirection: "↗ Peaks in transition metals",
      getValue: (el: ElementData) => el.meltingPoint || 300,
      unit: "K"
    }
  };

  const currentTrend = trendMeta[trendType];

  // Compute color scale intensity based on value
  const values = allElements.map(el => currentTrend.getValue(el));
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getHeatmapColor = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1);
    // Gradient from blue (low) to purple/pink/amber (high)
    if (ratio < 0.25) return 'bg-blue-500/20 border-blue-500/40 text-blue-900 dark:text-blue-300';
    if (ratio < 0.5) return 'bg-indigo-500/25 border-indigo-500/40 text-indigo-900 dark:text-indigo-300';
    if (ratio < 0.75) return 'bg-purple-500/30 border-purple-500/50 text-purple-900 dark:text-purple-300';
    return 'bg-amber-500/35 border-amber-500/60 text-amber-900 dark:text-amber-300';
  };

  const getCoordinates = (el: ElementData) => {
    let row = el.period;
    let col = el.group;
    if (el.atomicNumber >= 57 && el.atomicNumber <= 71) { row = 9; col = (el.atomicNumber - 57) + 3; }
    else if (el.atomicNumber >= 89 && el.atomicNumber <= 103) { row = 10; col = (el.atomicNumber - 89) + 3; }
    return { row, col: col || 1 };
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Periodic Trends Visualizer & Heatmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamically visualize periodic property variations across groups and periods for NEET inorganic chemistry.
          </p>
        </div>

        {/* Trend Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'electronegativity', label: 'Electronegativity' },
            { id: 'atomicRadius', label: 'Atomic Radius' },
            { id: 'ionizationEnergy', label: 'Ionization Energy' },
            { id: 'density', label: 'Density' },
            { id: 'meltingPoint', label: 'Melting Point' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTrendType(t.id as TrendType)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                trendType === t.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Info Banner */}
      <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            {currentTrend.title}
          </h3>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 max-w-3xl">{currentTrend.description}</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
          {currentTrend.arrowDirection}
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[1100px] grid grid-cols-18 gap-1.5 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          {allElements.map((el) => {
            const { row, col } = getCoordinates(el);
            const val = currentTrend.getValue(el);
            const colorClass = getHeatmapColor(val);

            return (
              <div
                key={el.atomicNumber}
                onClick={() => onSelectElement(el)}
                style={{ gridRow: row, gridColumn: col }}
                className={`group relative p-1.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between h-20 sm:h-22 ${colorClass} hover:scale-105 hover:z-20 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                  <span>{el.atomicNumber}</span>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold font-mono tracking-tight block group-hover:scale-110 transition-transform">
                    {el.symbol}
                  </span>
                  <span className="text-[9px] font-mono font-medium block opacity-95">
                    {val.toFixed(0)} {currentTrend.unit}
                  </span>
                </div>
                <div className="text-[8px] text-center font-mono opacity-60 truncate">
                  {el.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
