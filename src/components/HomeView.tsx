import React from 'react';
import { UnitData } from '../types';
import { UnitCard } from './UnitCard';
import { Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import { InstallPrompt } from './InstallPrompt';

interface HomeViewProps {
  units: UnitData[];
  onSelectUnit: (unit: UnitData) => void;
  onOpenPhrasebook: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  units,
  onSelectUnit,
  onOpenPhrasebook,
}) => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col" id="home-screen">
      {/* Top Brand Bar */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-900">
              English for Personal Trainers
            </span>
          </div>
        </div>
      </header>

      {/* Main Home Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-8 sm:px-5 space-y-6">
        {/* Title & Subtitle */}
        <div className="space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            English for<br />Personal Trainers
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
            Practical English for working with international gym clients
          </p>
        </div>

        {/* Subtle PWA Install Prompt Banner */}
        <InstallPrompt />

        {/* Quick Floor Phrasebook Banner */}
        <button
          type="button"
          onClick={onOpenPhrasebook}
          className="w-full bg-slate-900 text-white rounded-2xl p-4 sm:p-5 text-left shadow-sm hover:bg-slate-800 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-between group"
          id="open-phrasebook-banner"
        >
          <div className="space-y-1 pr-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              <Bookmark size={12} className="text-indigo-400" />
              <span>Floor Quick Reference</span>
            </div>
            <div className="text-base font-bold text-white tracking-tight">
              Coaching Phrasebook
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Searchable cues, form fixes, and client phrases with audio pronunciation.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
            <ChevronRight size={18} className="text-white" />
          </div>
        </button>

        {/* Units List */}
        <div className="space-y-2.5 pb-8" id="units-list">
          <div className="flex items-center justify-between px-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              8 Learning Units • 39 Lessons
            </div>
          </div>
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} onClick={onSelectUnit} />
          ))}
        </div>
      </main>
    </div>
  );
};
