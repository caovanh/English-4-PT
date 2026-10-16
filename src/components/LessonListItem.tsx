import React from 'react';
import { Play } from 'lucide-react';
import { LessonData } from '../types';

interface LessonListItemProps {
  lesson: LessonData;
  onClick: (lesson: LessonData) => void;
  isAvailable?: boolean;
}

export const LessonListItem: React.FC<LessonListItemProps> = ({
  lesson,
  onClick,
}) => {
  const isLesson35 = lesson.id === '3.5';

  return (
    <button
      id={`lesson-item-${lesson.number.replace('.', '-')}`}
      type="button"
      onClick={() => onClick(lesson)}
      className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.99] flex items-center justify-between gap-3 group cursor-pointer shadow-sm ${
        isLesson35
          ? 'bg-indigo-50/60 border-indigo-200 hover:border-indigo-300'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <span
          className={`text-xs font-mono font-bold shrink-0 ${
            isLesson35 ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          {lesson.number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 leading-snug truncate group-hover:text-indigo-900 transition-colors">
            {lesson.title}
          </h3>
          {isLesson35 && (
            <span className="text-[10px] text-indigo-600 font-medium block mt-0.5">
              Interactive ESP Prototype
            </span>
          )}
        </div>
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
          isLesson35
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
        }`}
      >
        <Play size={13} className="fill-current ml-0.5" />
      </div>
    </button>
  );
};

