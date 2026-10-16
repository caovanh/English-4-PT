import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UnitData } from '../types';

interface UnitCardProps {
  unit: UnitData;
  onClick: (unit: UnitData) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onClick }) => {
  const isUnit3 = unit.id === 3;

  return (
    <button
      id={`unit-card-${unit.number}`}
      type="button"
      onClick={() => onClick(unit)}
      className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.99] flex items-center justify-between gap-3.5 group cursor-pointer shadow-sm ${
        isUnit3
          ? 'bg-indigo-50/70 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Two-digit number indicator */}
        <span
          className={`text-xs font-mono font-bold shrink-0 ${
            isUnit3 ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          {unit.number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2
              className={`text-sm font-bold truncate ${
                isUnit3 ? 'text-indigo-950 font-bold' : 'text-slate-900'
              }`}
            >
              {unit.title}
            </h2>
            {isUnit3 && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-tight">
                Active Demo
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[11px] font-medium ${
                isUnit3 ? 'text-indigo-600/90' : 'text-slate-400'
              }`}
            >
              {unit.lessonCount} Lessons
            </span>
          </div>
        </div>
      </div>

      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isUnit3
            ? 'text-indigo-600 group-hover:bg-indigo-100/70'
            : 'text-slate-300 group-hover:text-slate-600 group-hover:bg-slate-100'
        }`}
      >
        <ChevronRight size={18} />
      </div>
    </button>
  );
};

