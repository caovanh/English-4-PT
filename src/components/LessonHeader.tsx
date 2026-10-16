import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LessonProgress } from './LessonProgress';

interface LessonHeaderProps {
  onBack: () => void;
  title?: string;
  subtitle?: string;
  currentStage?: number;
  totalStages?: number;
  id?: string;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  onBack,
  title,
  subtitle,
  currentStage,
  totalStages,
  id = 'lesson-header',
}) => {
  return (
    <header
      id={id}
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-5 py-3.5"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <button
          id="lesson-back-btn"
          type="button"
          onClick={onBack}
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-slate-800" />
        </button>

        {title ? (
          <div className="flex-1 text-center truncate">
            {subtitle && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate">
                {subtitle}
              </p>
            )}
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {title}
            </h1>
          </div>
        ) : (
          <div className="flex-1 text-center">
            {subtitle && (
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {currentStage && totalStages ? (
          <div className="w-20">
            <LessonProgress
              currentStage={currentStage}
              totalStages={totalStages}
            />
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>
    </header>
  );
};

