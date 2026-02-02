import React, { useState } from 'react';
import { AppData, BuiltInGame, ExternalGame, GameType } from '../types';
import { getApiConfig, saveApiConfig, clearApiConfig } from '../components/SetupModal';

interface AdminProps {
  data: AppData;
  onUpdate: (newData: AppData) => void;
}

export const Admin: React.FC<AdminProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'built-in' | 'external' | 'api'>('built-in');
  const [editingExternal, setEditingExternal] = useState<Partial<ExternalGame> | null>(null);
  const [apiConfig, setApiConfigState] = useState(getApiConfig);
  const [editApiKey, setEditApiKey] = useState(apiConfig?.apiKey || '');
  const [editModel, setEditModel] = useState(apiConfig?.model || 'gemini-2.5-flash');
  const [apiSaved, setApiSaved] = useState(false);

  const handleSaveApiConfig = () => {
    const config = { apiKey: editApiKey.trim(), model: editModel };
    saveApiConfig(config);
    setApiConfigState(config);
    setApiSaved(true);
    setTimeout(() => setApiSaved(false), 2000);
  };

  const handleClearApiConfig = () => {
    clearApiConfig();
    setApiConfigState(null);
    setEditApiKey('');
    setEditModel('gemini-2.0-flash');
  };

  const handleAddExternal = () => {
    const newGame: ExternalGame = {
      id: `ext-${Date.now()}`,
      name: 'New Game',
      description: 'Description here',
      url: 'https://example.com',
      tags: ['fun'],
      emoji: '🎮'
    };
    onUpdate({
      ...data,
      externalGames: [...data.externalGames, newGame]
    });
  };

  const handleDeleteExternal = (id: string) => {
    onUpdate({
      ...data,
      externalGames: data.externalGames.filter(g => g.id !== id)
    });
  };

  const handleUpdateExternal = (id: string, updates: Partial<ExternalGame>) => {
    onUpdate({
      ...data,
      externalGames: data.externalGames.map(g => g.id === id ? { ...g, ...updates } : g)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Platform Settings</h2>
        <p className="text-slate-600">Modify the game list. Data is persisted in your browser's local storage.</p>
      </section>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('built-in')}
          className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'built-in' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          Built-in Games
        </button>
        <button
          onClick={() => setActiveTab('external')}
          className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'external' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          External Links
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'api' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          API Settings
        </button>
      </div>

      {activeTab === 'built-in' && (
        <div className="space-y-4">
          {data.builtInGames.map((game) => (
            <div key={game.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{game.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900">{game.title}</h4>
                  <p className="text-sm text-slate-500">{game.prompts.length} prompts</p>
                </div>
              </div>
              <div className="text-xs font-bold uppercase text-slate-400">{game.type}</div>
            </div>
          ))}
          <p className="text-center text-slate-400 text-sm italic">
            Built-in game types are currently hardcoded, but you can add questions using the "✨ Get Fresh Questions" button inside each game.
          </p>
        </div>
      )}

      {activeTab === 'external' && (
        <div className="space-y-6">
          <button
            onClick={handleAddExternal}
            className="w-full py-4 bg-indigo-50 text-indigo-600 border-2 border-dashed border-indigo-200 rounded-2xl font-bold hover:bg-indigo-100 transition-all"
          >
            + Add New External Link
          </button>

          <div className="space-y-4">
            {data.externalGames.map((game) => (
              <div key={game.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
                        <input
                          type="text"
                          value={game.name}
                          onChange={(e) => handleUpdateExternal(game.id, { name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">URL</label>
                        <input
                          type="text"
                          value={game.url}
                          onChange={(e) => handleUpdateExternal(game.id, { url: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
                      <input
                        type="text"
                        value={game.description}
                        onChange={(e) => handleUpdateExternal(game.id, { description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteExternal(game.id)}
                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Gemini API Configuration</h3>
                {apiConfig?.apiKey ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Configured</span>
                ) : (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Not Configured</span>
                )}
              </div>
              <p className="text-sm text-slate-500">
                Configure your Gemini API key to enable AI-generated game prompts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">API Key</label>
                <input
                  type="password"
                  value={editApiKey}
                  onChange={(e) => setEditApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Model</label>
                <select
                  value={editModel}
                  onChange={(e) => setEditModel(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <optgroup label="Recommended for Free Tier">
                    <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended)</option>
                    <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Fastest, highest quota)</option>
                    <option value="gemini-2.5-pro">gemini-2.5-pro (Best quality)</option>
                  </optgroup>
                  <optgroup label="Preview Models">
                    <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                  </optgroup>
                </select>
              </div>

              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
              >
                Get a free API key from Google AI Studio →
              </a>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveApiConfig}
                disabled={!editApiKey.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {apiSaved ? 'Saved!' : 'Save Configuration'}
              </button>
              {apiConfig?.apiKey && (
                <button
                  onClick={handleClearApiConfig}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold transition-all"
                >
                  Clear Configuration
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      )}
    </div>
  );
};
