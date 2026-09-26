import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, SlidersHorizontal, BookOpen, Layers } from 'lucide-react';
import { ElementData, getAllElements } from '../data/elementsData';

interface PeriodicTableProps {
  onSelectElement: (element: ElementData) => void;
  bookmarkedIds: string[];
}

type TableMode = 'standard' | 'groups' | 'blocks' | 'metals' | 'states' | 'electronegativity' | 'radius' | 'neet';

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  onSelectElement,
  bookmarkedIds
}) => {
  const allElements = useMemo(() => getAllElements(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tableMode, setTableMode] = useState<TableMode>('standard');

  // Filter elements
  const filteredElements = useMemo(() => {
    return allElements.filter(el => {
      const matchesSearch = 
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.atomicNumber.toString() === searchQuery;
      
      const matchesBlock = selectedBlock === 'all' || el.block === selectedBlock;
      const matchesCategory = selectedCategory === 'all' || el.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesBlock && matchesCategory;
    });
  }, [allElements, searchQuery, selectedBlock, selectedCategory]);

  // Helper to get grid position (period & group)
  // Standard periodic table coordinate mapping (periods 1-7, groups 1-18)
  const getCoordinates = (el: ElementData) => {
    let row = el.period;
    let col = el.group;

    // Lanthanides (57-71) placed at row 8
    if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
      row = 9;
      col = (el.atomicNumber - 57) + 3;
    }
    // Actinides (89-103) placed at row 9
    else if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
      row = 10;
      col = (el.atomicNumber - 89) + 3;
    }

    return { row, col: col || 1 };
  };

  const getTileColor = (el: ElementData) => {
    if (tableMode === 'blocks') {
      switch (el.block) {
        case 's': return 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-300';
        case 'p': return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-900 dark:text-cyan-300';
        case 'd': return 'bg-purple-500/15 border-purple-500/40 text-purple-900 dark:text-purple-300';
        case 'f': return 'bg-pink-500/15 border-pink-500/40 text-pink-900 dark:text-pink-300';
      }
    }
    if (tableMode === 'states') {
      switch (el.state) {
        case 'Gas': return 'bg-sky-500/15 border-sky-500/40 text-sky-900 dark:text-sky-300';
        case 'Liquid': return 'bg-indigo-500/15 border-indigo-500/40 text-indigo-900 dark:text-indigo-300';
        case 'Solid': return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-300';
        case 'Synthetic': return 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-300';
      }
    }
    if (tableMode === 'neet') {
      if (el.neetImportance.priority === 'HIGH PRIORITY') return 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30';
      if (el.neetImportance.priority === 'IMPORTANT') return 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/20';
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }

    // Default category colors
    if (el.category.includes('Alkali')) return 'bg-red-500/15 border-red-500/40 text-red-900 dark:text-red-300';
    if (el.category.includes('Noble')) return 'bg-violet-500/15 border-violet-500/40 text-violet-900 dark:text-violet-300';
    if (el.category.includes('Halogen')) return 'bg-blue-500/15 border-blue-500/40 text-blue-900 dark:text-blue-300';
    if (el.category.includes('Transition')) return 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-300';
    
    return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            Interactive Periodic Table
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore 118 elements with NEET focus, atomic animations, and property filters.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, symbol, atomic no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Mode Selectors & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* View Mode Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'standard', label: 'Standard' },
            { id: 'blocks', label: 'Blocks (s,p,d,f)' },
            { id: 'states', label: 'States of Matter' },
            { id: 'neet', label: 'NEET Priority' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setTableMode(m.id as TableMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tableMode === m.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Block / Category Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Blocks</option>
              <option value="s">s-Block</option>
              <option value="p">p-Block</option>
              <option value="d">d-Block</option>
              <option value="f">f-Block</option>
            </select>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="alkali">Alkali Metals</option>
            <option value="halogen">Halogens</option>
            <option value="noble">Noble Gases</option>
            <option value="transition">Transition Metals</option>
            <option value="lanthanide">Lanthanides</option>
            <option value="actinide">Actinides</option>
          </select>
        </div>

      </div>

      {/* Periodic Table Grid */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[1100px] grid grid-cols-18 gap-1.5 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          {allElements.map((el) => {
            const { row, col } = getCoordinates(el);
            const isMatched = filteredElements.some(f => f.atomicNumber === el.atomicNumber);
            const isBookmarked = bookmarkedIds.includes(el.id);
            const tileStyle = getTileColor(el);

            return (
              <div
                key={el.atomicNumber}
                onClick={() => onSelectElement(el)}
                style={{
                  gridRow: row,
                  gridColumn: col,
                }}
                className={`group relative p-1.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between h-20 sm:h-22 ${tileStyle} ${
                  !isMatched ? 'opacity-25 grayscale' : 'hover:scale-105 hover:z-20 hover:shadow-lg hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                  <span>{el.atomicNumber}</span>
                  {isBookmarked && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                </div>

                <div className="text-center">
                  <span className="text-lg sm:text-xl font-bold font-mono tracking-tight block group-hover:scale-110 transition-transform">
                    {el.symbol}
                  </span>
                  <span className="text-[9px] font-medium truncate block opacity-90">
                    {el.name}
                  </span>
                </div>

                <div className="text-[8px] text-center font-mono opacity-60 truncate">
                  {el.atomicMass.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
