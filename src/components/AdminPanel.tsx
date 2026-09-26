import React, { useState } from 'react';
import { Shield, Database, Plus, Edit, Trash2, CheckCircle, Activity } from 'lucide-react';
import { getAllElements, ElementData } from '../data/elementsData';

export const AdminPanel: React.FC = () => {
  const [elements] = useState<ElementData[]>(() => getAllElements().slice(0, 10));
  const [activeTab, setActiveTab] = useState<'elements' | 'questions' | 'logs'>('elements');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            Admin Dashboard & Content Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage elements, NEET question bank, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('elements')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'elements' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Elements Database
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'logs' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {activeTab === 'elements' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-500" />
              Manage Elements
            </h3>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Add Element
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Atomic No</th>
                  <th className="py-3 px-4">Symbol</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">NEET Priority</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {elements.map(el => (
                  <tr key={el.atomicNumber} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono">{el.atomicNumber}</td>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">{el.symbol}</td>
                    <td className="py-3 px-4 font-semibold">{el.name}</td>
                    <td className="py-3 px-4">{el.category}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium text-[10px]">
                        {el.neetImportance.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-indigo-600" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            System Audit Logs
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between">
              <span>[INFO] Element database synchronized successfully (118 items loaded)</span>
              <span className="text-slate-400">2026-09-25 23:14:50</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between">
              <span>[INFO] AI Tutor connection established with Gemini 3.8 Flash</span>
              <span className="text-slate-400">2026-09-25 23:14:51</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
