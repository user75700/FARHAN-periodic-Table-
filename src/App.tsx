import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementModal } from './components/ElementModal';
import { TrendVisualizer } from './components/TrendVisualizer';
import { ComparisonPanel } from './components/ComparisonPanel';
import { NeetPractice } from './components/NeetPractice';
import { GamesHub } from './components/GamesHub';
import { Dashboard } from './components/Dashboard';
import { AiTutor } from './components/AiTutor';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { getAllElements, ElementData } from './data/elementsData';
import { NEETQuestion } from './data/neetQuestions';

export default function App() {
  const allElements = getAllElements();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['hydrogen', 'sodium', 'chlorine', 'iron']);
  const [streak, setStreak] = useState<number>(7);
  const [xp, setXp] = useState<number>(340);
  const [mistakes, setMistakes] = useState<NEETQuestion[]>([]);

  // Apply dark mode class to html/body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleBookmark = (elementId: string) => {
    if (bookmarkedIds.includes(elementId)) {
      setBookmarkedIds(bookmarkedIds.filter(id => id !== elementId));
    } else {
      setBookmarkedIds([...bookmarkedIds, elementId]);
    }
  };

  const handleAddXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const handleAddMistake = (question: NEETQuestion) => {
    if (!mistakes.some(m => m.id === question.id)) {
      setMistakes(prev => [...prev, question]);
    }
  };

  const elementOfTheDay = allElements[10]; // Sodium (atomic no 11)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        bookmarksCount={bookmarkedIds.length}
        openBookmarks={() => setCurrentTab('dashboard')}
        streak={streak}
        xp={xp}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <Hero
              onExplore={() => setCurrentTab('table')}
              onStartNeet={() => setCurrentTab('neet')}
              onElementOfTheDay={() => setSelectedElement(elementOfTheDay)}
              elementOfTheDay={elementOfTheDay}
            />
            {/* Quick Overview Section */}
            <PeriodicTable
              onSelectElement={(el) => setSelectedElement(el)}
              bookmarkedIds={bookmarkedIds}
            />
          </div>
        )}

        {currentTab === 'table' && (
          <PeriodicTable
            onSelectElement={(el) => setSelectedElement(el)}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {currentTab === 'trends' && (
          <TrendVisualizer
            onSelectElement={(el) => setSelectedElement(el)}
          />
        )}

        {currentTab === 'compare' && (
          <ComparisonPanel
            onSelectElement={(el) => setSelectedElement(el)}
          />
        )}

        {currentTab === 'neet' && (
          <NeetPractice
            onAddXp={handleAddXp}
            onAddMistake={handleAddMistake}
          />
        )}

        {currentTab === 'games' && (
          <GamesHub
            onAddXp={handleAddXp}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            streak={streak}
            xp={xp}
            bookmarkedElements={allElements.filter(e => bookmarkedIds.includes(e.id))}
            onSelectElement={(el) => setSelectedElement(el)}
          />
        )}

        {currentTab === 'tutor' && (
          <AiTutor />
        )}

        {currentTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      <Footer />

      {/* Element Detail Modal */}
      <ElementModal
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
        isBookmarked={selectedElement ? bookmarkedIds.includes(selectedElement.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

    </div>
  );
}
