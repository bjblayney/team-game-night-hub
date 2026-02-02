import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BuiltInGamePage } from './pages/BuiltInGame';
import { ExternalLinks } from './pages/ExternalLinks';
import { Admin } from './pages/Admin';
import { AppData, GameType } from './types';
import { INITIAL_DATA } from './constants';
import { generateFreshPrompts, isApiConfigured } from './services/geminiService';
import { SetupModal, getApiConfig } from './components/SetupModal';

const STORAGE_KEY = 'team-game-night-data';
const SETUP_COMPLETED_KEY = 'setup-completed';

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSetup, setShowSetup] = useState(() => {
    return !localStorage.getItem(SETUP_COMPLETED_KEY);
  });

  const updateData = (newData: AppData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const handleSetupComplete = (config: { apiKey: string; model: string } | null) => {
    localStorage.setItem(SETUP_COMPLETED_KEY, 'true');
    setShowSetup(false);

    if (config && config.apiKey) {
      refreshAllGames();
    }
  };

  const refreshAllGames = async () => {
    if (!isApiConfigured()) return;

    setIsRefreshing(true);
    try {
      const refreshPromises = data.builtInGames.map(async (game) => {
        const fresh = await generateFreshPrompts(game.type, 15);
        if (fresh && fresh.length > 0) {
          return {
            ...game,
            prompts: fresh.map((f: any, i: number) => ({
              id: `ai-${Date.now()}-${game.type}-${i}`,
              ...f
            }))
          };
        }
        return game;
      });

      const updatedGames = await Promise.all(refreshPromises);
      updateData({
        ...data,
        builtInGames: updatedGames
      });
    } catch (error) {
      console.error("Failed to auto-refresh games:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!showSetup && isApiConfigured()) {
      refreshAllGames();
    }
  }, []); // Run once on mount if setup is complete

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <HashRouter>
      <Layout>
        {isRefreshing && (
          <div className="fixed top-20 right-4 z-50 animate-bounce">
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
              <span className="animate-spin">✨</span> Refreshing fresh questions...
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home games={data.builtInGames} />} />
          <Route path="/game/:id" element={<BuiltInGamePage games={data.builtInGames} />} />
          <Route path="/external" element={<ExternalLinks links={data.externalGames} />} />
          <Route path="/admin" element={<Admin data={data} onUpdate={updateData} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
