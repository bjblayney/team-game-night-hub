import React, { useState } from 'react';

interface SetupModalProps {
  onComplete: (config: { apiKey: string; model: string } | null) => void;
}

const STORAGE_KEY = 'gemini-api-config';

export const getApiConfig = (): { apiKey: string; model: string } | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveApiConfig = (config: { apiKey: string; model: string }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

export const clearApiConfig = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const SetupModal: React.FC<SetupModalProps> = ({ onComplete }) => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }
    const config = { apiKey: apiKey.trim(), model };
    saveApiConfig(config);
    onComplete(config);
  };

  const handleSkip = () => {
    onComplete(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-4">🎮</div>
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome to Team Game Night!</h2>
          <p className="text-slate-600">
            Configure your Gemini API key to enable AI-generated game prompts, or skip to use offline mode.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Gemini API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              placeholder="Enter your API key"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
            className="block text-center text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
          >
            Get a free API key from Google AI Studio →
          </a>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all"
          >
            Save & Continue
          </button>
          <button
            onClick={handleSkip}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-semibold transition-all"
          >
            Skip / Use Offline Mode
          </button>
        </div>

        <p className="text-center text-slate-400 text-xs">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
      </div>
    </div>
  );
};
