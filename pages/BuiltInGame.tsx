import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BuiltInGame, GameType } from '../types';
import { generateFreshPrompts, isApiConfigured } from '../services/geminiService';

interface BuiltInGameProps {
  games: BuiltInGame[];
}

export const BuiltInGamePage: React.FC<BuiltInGameProps> = ({ games }) => {
  const { id } = useParams<{ id: string }>();
  const game = games.find((g) => g.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prompts, setPrompts] = useState(game?.prompts || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const apiConfigured = isApiConfigured();

  useEffect(() => {
    if (game) setPrompts(game.prompts);
  }, [game]);

  if (!game) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Game not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  const currentPrompt = prompts[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    if (currentIndex < prompts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back or stay? Let's shuffle maybe.
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : prompts.length - 1);
  };

  const handleShuffle = () => {
    const shuffled = [...prompts].sort(() => Math.random() - 0.5);
    setPrompts(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleGenerateFresh = async () => {
    setIsGenerating(true);
    const fresh = await generateFreshPrompts(game.type, 10);
    if (fresh.length > 0) {
      const formatted = fresh.map((f: any, i: number) => ({
        id: `fresh-${Date.now()}-${i}`,
        ...f
      }));
      setPrompts([...prompts, ...formatted]);
      setCurrentIndex(prompts.length);
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-semibold">
          <span>←</span> Back to Hub
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShuffle}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all text-sm"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={handleGenerateFresh}
            disabled={isGenerating || !apiConfigured}
            className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 hover:bg-indigo-100 font-bold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title={!apiConfigured ? 'Configure API in Admin to enable' : ''}
          >
            {isGenerating ? '✨ Generating...' : apiConfigured ? '✨ Get Fresh Questions (AI)' : '✨ AI Disabled'}
          </button>
        </div>
      </div>

      <div className={`rounded-3xl p-12 shadow-2xl min-h-[400px] flex flex-col justify-center text-center ${game.color} text-white transition-all`}>
        <div className="mb-6 opacity-80 font-bold uppercase tracking-widest text-sm">
          {game.title} • {currentIndex + 1} of {prompts.length}
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-8">
          {currentPrompt?.question || "No more prompts!"}
        </h2>

        {game.type === GameType.TRIVIA && currentPrompt?.answer && (
          <div className="mt-8">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-2xl font-bold backdrop-blur-sm transition-all border border-white/30"
              >
                Reveal Answer
              </button>
            ) : (
              <div className="bg-white text-slate-900 p-8 rounded-3xl animate-bounce-short">
                <span className="block text-indigo-600 font-bold uppercase tracking-wider text-xs mb-2">Answer</span>
                <p className="text-3xl font-extrabold">{currentPrompt.answer}</p>
              </div>
            )}
          </div>
        )}

        {game.type === GameType.THIS_OR_THAT && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="px-6 py-3 bg-white/20 rounded-2xl font-bold border border-white/20">Option A</div>
            <div className="px-6 py-3 bg-white/20 rounded-2xl font-bold border border-white/20">Option B</div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <button
          onClick={handlePrev}
          className="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-700 font-bold transition-all flex items-center gap-2"
        >
          <span>←</span> Previous
        </button>
        <button
          onClick={handleNext}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
        >
          Next Prompt <span>→</span>
        </button>
      </div>

      <div className="mt-12 text-center text-slate-400 text-sm">
        Pro tip: Share your tab and go full screen for the best experience.
      </div>
    </div>
  );
};
