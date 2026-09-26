import React, { useState, useEffect } from 'react';
import { X, Bookmark, Share2, Play, Pause, RotateCcw, Shield, Zap, BookOpen, Layers, Activity, Cpu, CheckCircle } from 'lucide-react';
import { ElementData } from '../data/elementsData';

interface ElementModalProps {
  element: ElementData | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (elementId: string) => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({
  element,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!element) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'atomic' | 'physical' | 'chemical' | 'neet' | 'animation'>('overview');
  const [isPlaying, setIsPlaying] = useState(true);
  const [animSpeed, setAnimSpeed] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setRotationAngle(prev => (prev + 2 * animSpeed) % 360);
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isPlaying, animSpeed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-[10px] font-mono opacity-80">{element.atomicNumber}</span>
              <span className="text-2xl font-bold font-mono">{element.symbol}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {element.name}
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {element.category}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atomic Mass: {element.atomicMass} u · Group {element.group || 'f-block'} · Period {element.period} · Block {element.block}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(element.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title="Bookmark Element"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50 px-6 shrink-0">
          {[
            { id: 'overview', label: 'Overview & Properties' },
            { id: 'atomic', label: 'Atomic Structure' },
            { id: 'physical', label: 'Physical & Chemical' },
            { id: 'neet', label: 'NEET Focus & NCERT' },
            { id: 'animation', label: 'Atom & Electron Animation' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 block mb-1">State at Room Temp</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">{element.state}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 block mb-1">Electronegativity</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{element.electronegativity || 'N/A'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 block mb-1">Atomic Radius</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{element.atomicRadius ? `${element.atomicRadius} pm` : 'N/A'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 block mb-1">Discovery Year</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">{element.discoveryYear}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Real-World Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {element.applications.map((app, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Important Compounds</h3>
                <div className="flex flex-wrap gap-2">
                  {element.compounds.map((comp, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATOMIC STRUCTURE */}
          {activeTab === 'atomic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                    Electron Configuration
                  </h3>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {element.electronConfiguration}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Shell Distribution</span>
                      <span className="font-mono font-bold">{element.shellConfiguration.join(', ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Valence Electrons</span>
                      <span className="font-mono font-bold">{element.valenceElectrons}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Oxidation States</span>
                      <span className="font-mono font-bold">{element.oxidationStates.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-500" />
                    Isotopes & Discoverer
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="py-1 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500 block mb-1">Discoverer</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{element.discoverer} ({element.discoveryYear})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Key Isotopes</span>
                      <div className="space-y-1">
                        {element.isotopes.map((iso, i) => (
                          <div key={i} className="font-mono text-xs bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                            {iso}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHYSICAL & CHEMICAL */}
          {activeTab === 'physical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 block mb-1">Melting Point</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">{element.meltingPoint ? `${element.meltingPoint} K` : 'N/A'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 block mb-1">Boiling Point</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">{element.boilingPoint ? `${element.boilingPoint} K` : 'N/A'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 block mb-1">Density</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">{element.density ? `${element.density} g/cm³` : 'N/A'}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Important Chemical Reactions</h3>
                <div className="space-y-2">
                  {element.reactions.map((rxn, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 font-mono text-xs text-indigo-900 dark:text-indigo-300">
                      {rxn}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <strong>Safety & Handling Note:</strong>
                <p>{element.safetyNotes}</p>
              </div>
            </div>
          )}

          {/* TAB 4: NEET FOCUS & NCERT */}
          {activeTab === 'neet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600 text-white">
                <div>
                  <span className="text-xs uppercase tracking-wider opacity-80 block">NEET Priority Classification</span>
                  <span className="text-xl font-extrabold">{element.neetImportance.priority}</span>
                </div>
                <Shield className="w-8 h-8 opacity-80" />
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  NCERT Relevance
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{element.neetImportance.ncertRelevance}</p>
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">Chapter: {element.ncertConnections.chapter} ({element.ncertConnections.topic})</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Frequently Tested Facts</h3>
                <div className="space-y-2">
                  {element.neetImportance.frequentlyTestedFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 dark:bg-slate-800 border border-emerald-200/50 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Common NEET Traps</h4>
                  <ul className="list-disc list-inside text-xs text-rose-800 dark:text-rose-300 space-y-1">
                    {element.neetImportance.commonTraps.map((trap, idx) => (
                      <li key={idx}>{trap}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Memory Trick / Mnemonic</h4>
                  <p className="text-xs text-amber-900 dark:text-amber-300 italic">"{element.neetImportance.memoryTricks}"</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ATOM & ELECTRON ANIMATION */}
          {activeTab === 'animation' && (
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                <span className="text-xs font-medium">Interactive Orbital & Electron Configuration Animation</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setRotationAngle(0)}
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 transition-colors"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <select
                    value={animSpeed}
                    onChange={(e) => setAnimSpeed(parseFloat(e.target.value))}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs"
                  >
                    <option value={0.5}>0.5x Slow</option>
                    <option value={1}>1.0x Normal</option>
                    <option value={2}>2.0x Fast</option>
                  </select>
                </div>
              </div>

              {/* Animated Atom Viewport */}
              <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 to-slate-900 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
                {/* Nucleus */}
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex flex-col items-center justify-center text-white font-mono shadow-lg z-10 animate-pulse">
                  <span className="text-xs font-bold">{element.symbol}</span>
                  <span className="text-[10px] opacity-80">{element.atomicNumber}p</span>
                </div>

                {/* Electron Shell 1 */}
                <div className="absolute w-36 h-36 rounded-full border border-indigo-500/30 flex items-center justify-center">
                  <div
                    className="absolute w-full h-full"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"></div>
                  </div>
                </div>

                {/* Electron Shell 2 */}
                {element.atomicNumber > 2 && (
                  <div className="absolute w-60 h-60 rounded-full border border-purple-500/30 flex items-center justify-center">
                    <div
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(-${rotationAngle * 1.5}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-pink-400 shadow-[0_0_12px_#f472b6]"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-pink-400 shadow-[0_0_12px_#f472b6]"></div>
                    </div>
                  </div>
                )}

                {/* Electron Shell 3 */}
                {element.atomicNumber > 10 && (
                  <div className="absolute w-84 h-84 rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <div
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${rotationAngle * 0.8}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"></div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-400">
                  Shell Distribution: {element.shellConfiguration.join(', ')}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <span className="text-xs text-slate-500">Farhan Periodic Table Learner · NEET Inorganic Chemistry</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
