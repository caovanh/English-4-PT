import React, { useState, useMemo } from 'react';
import { PHRASEBOOK_DATA, PHRASEBOOK_CATEGORIES, PhrasebookItem } from '../data/phrasebookData';
import { speakEnglish } from '../utils/speech';
import { ArrowLeft, Search, Volume2, Sparkles, Filter } from 'lucide-react';

interface PhrasebookViewProps {
  onBack: () => void;
}

export const PhrasebookView: React.FC<PhrasebookViewProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string, text: string) => {
    setPlayingId(id);
    speakEnglish(text, () => {
      setPlayingId(null);
    });
  };

  const filteredPhrases = useMemo(() => {
    return PHRASEBOOK_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col" id="phrasebook-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            id="phrasebook-back-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft size={20} className="text-slate-800" />
          </button>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
            Gym Floor Quick Reference
          </span>
          <div className="w-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 sm:px-5 space-y-5">
        {/* Title & Introduction */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-1 w-6 bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
              Floor Phrasebook
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Coaching Phrasebook
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instant verbal cues, corrections, and customer service phrases for live gym floor situations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrases (e.g. chest up, knees, pain, cancel)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full px-2 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 px-0.5">
            <Filter size={12} />
            <span>Filter Categories</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {PHRASEBOOK_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Phrases List */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Showing {filteredPhrases.length} Phrases
            </span>
          </div>

          {filteredPhrases.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-xs">
              <p className="text-sm font-bold text-slate-700">No matching phrases found</p>
              <p className="text-xs text-slate-400">Try searching for different keywords or select &quot;All&quot; categories.</p>
            </div>
          ) : (
            filteredPhrases.map((item) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-indigo-300 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                        {item.category}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          • {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 pt-0.5">
                      {item.english}
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-relaxed">
                      {item.vietnamese}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlay(item.id, item.english)}
                    className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-indigo-600 text-white scale-105 shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/80'
                    }`}
                    aria-label={`Listen to ${item.english}`}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};
