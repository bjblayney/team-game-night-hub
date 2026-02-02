
import React from 'react';
import { ExternalGame } from '../types';

interface ExternalLinksProps {
  links: ExternalGame[];
}

export const ExternalLinks: React.FC<ExternalLinksProps> = ({ links }) => {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900">External Favorites</h2>
        <p className="text-lg text-slate-600">
          The best web-based multiplayer games for remote teams, curated just for you.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:border-indigo-100 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{link.emoji}</span>
              <div className="flex gap-2">
                {link.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
              {link.name}
            </h3>
            <p className="text-slate-600 mb-6">{link.description}</p>
            <div className="text-sm font-bold text-slate-400 flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
              Visit Website <span className="text-lg">↗</span>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-amber-50 rounded-3xl p-8 text-center border border-amber-100">
        <p className="text-amber-800 font-medium">
          Note: These links will open in a new tab. Some games may require one person to host a room and share a join code.
        </p>
      </div>
    </div>
  );
};
