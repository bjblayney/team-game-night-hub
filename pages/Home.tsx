
import React from 'react';
import { Link } from 'react-router-dom';
import { BuiltInGame } from '../types';

interface HomeProps {
  games: BuiltInGame[];
}

export const Home: React.FC<HomeProps> = ({ games }) => {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Ready for some fun?
        </h2>
        <p className="text-lg text-slate-600">
          Choose a built-in game to start playing immediately. Fresh questions are generated every time you visit!
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:-translate-y-1"
          >
            <div className={`h-40 ${game.color} flex items-center justify-center text-6xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
              <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{game.icon}</span>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                {game.prompts.length} Prompts
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
              <p className="text-slate-600 mb-6 flex-1 line-clamp-2">{game.description}</p>
              <div className="flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
                Start Game <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-indigo-50 rounded-3xl p-8 sm:p-12 text-center border border-indigo-100 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">Want something different?</h3>
          <p className="text-indigo-700 mb-8 max-w-xl mx-auto">
            Explore our hand-picked collection of external multiplayer games that are perfect for teams.
          </p>
          <Link
            to="/external"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            View External Games
          </Link>
        </div>
      </section>
    </div>
  );
};
