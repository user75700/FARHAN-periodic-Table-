import React, { useState } from 'react';
import { ArrowLeftRight, Plus, X, Shield, Sparkles } from 'lucide-react';
import { ElementData, getAllElements } from '../data/elementsData';

interface ComparisonPanelProps {
  onSelectElement: (element: ElementData) => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ onSelectElement }) => {
  const allElements = getAllElements();
  const [selectedIds, setSelectedIds] = useState<string[]>(['hydrogen', 'sodium', 'chlorine']);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedElements = selectedIds.map(id => allElements.find(e => e.id === id)).filter(Boolean) as ElementData[];

  const addElement = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeElement = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const searchResults = allElements.filter(e => 
    !selectedIds.includes(e.id) && (
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-indigo-600" />
            Element Comparison Tool
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare up to 4 elements side-by-side across atomic properties, trends, and NEET importance.
          </p>
        </div>

        {/* Add element search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search to add element..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-30 overflow-hidden">
              {searchResults.map(el => (
                <button
                  key={el.id}
                  onClick={() => { addElement(el.id); setSearchQuery(''); }}
                  className="w-full px-4 py-2 text-left text-xs hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span className="font-bold">{el.symbol} - {el.name}</span>
                  <span className="text-[10px] text-slate-400">Atomic No: {el.atomicNumber}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table / Cards */}
      {selectedElements.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">No elements selected for comparison. Search and add above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedElements.map((el) => (
            <div key={el.id} className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              
              <button
                onClick={() => removeElement(el.id)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition-colors text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-md">
                  <span className="text-[10px] font-mono opacity-80">{el.atomicNumber}</span>
                  <span className="text-2xl font-bold font-mono">{el.symbol}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{el.name}</h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{el.category}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Atomic Mass</span>
                  <span className="font-mono font-bold">{el.atomicMass} u</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Group / Period</span>
                  <span className="font-mono font-bold">G{el.group || 'f'} / P{el.period} ({el.block}-block)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Electronegativity</span>
                  <span className="font-mono font-bold">{el.electronegativity || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Atomic Radius</span>
                  <span className="font-mono font-bold">{el.atomicRadius ? `${el.atomicRadius} pm` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">State</span>
                  <span className="font-semibold">{el.state}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">NEET Priority</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{el.neetImportance.priority}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectElement(el)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
              >
                View Full Profile
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
