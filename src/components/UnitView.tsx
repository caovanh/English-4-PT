import React from 'react';
import { ArrowLeft } from 'lucide-react';
 import { UnitData, LessonData } from '../types';
import { LessonListItem } from './LessonListItem';

interface UnitViewProps {
  unit: UnitData;
  onBack: () => void;
  onSelectLesson: (lesson: LessonData) => void;
}

export const UnitView: React.FC<UnitViewProps> = ({
  unit,
  onBack,
  onSelectLesson,
}) => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col" id="unit-screen">
      {/* Top App Header with back arrow */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            id="unit-back-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="Back to units"
          >
            <ArrowLeft size={20} className="text-slate-800" />
          </button>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
            UNIT {unit.number}
          </span>
          <div className="w-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 sm:px-5 space-y-6">
        {/* Unit Info Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1 w-6 bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
              UNIT {unit.number} • {unit.lessonCount} LESSONS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {unit.title}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
            {unit.goal}
          </p>
        </div>

        {/* Vertical List of Lessons */}
        <div className="space-y-2.5 pt-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            Curriculum Lessons
          </div>
          {unit.lessons.map((lesson) => (
            <LessonListItem
              key={lesson.id}
              lesson={lesson}
              onClick={onSelectLesson}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

