import React from 'react';
import { Check } from 'lucide-react';

interface LessonCompleteProps {
  lessonTitle: string;
  completionMessage?: {
    text: string;
    vietnamese: string;
  };
  onNextLesson: () => void;
  onBackToUnit: () => void;
  hasNextLesson: boolean;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({
  lessonTitle,
  completionMessage,
  onNextLesson,
  onBackToUnit,
  hasNextLesson,
}) => {
  return (
    <div
      id="lesson-complete-view"
      className="flex flex-col min-h-[72vh] justify-between py-6 animate-in fade-in duration-300"
    >
      <div className="space-y-6 text-center pt-8">
        {/* Editorial Completion Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
            <Check size={36} className="text-white stroke-[2.5]" />
          </div>
        </div>

        <div className="space-y-2.5 max-w-sm mx-auto px-4">
          <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
            Milestone Reached
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lesson Complete
          </h2>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            {completionMessage?.text ||
              `Great job! You've practised key English for ${lessonTitle.toLowerCase()}.`}
          </p>
          {completionMessage?.vietnamese && (
            <p className="text-xs text-slate-400 italic leading-relaxed">
              {completionMessage.vietnamese}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2.5 w-full max-w-sm mx-auto px-2">
        {hasNextLesson && (
          <button
            id="next-lesson-btn"
            type="button"
            onClick={onNextLesson}
            className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-lg shadow-slate-200 transition-all duration-150 active:scale-[0.99] cursor-pointer"
          >
            Next Lesson
          </button>
        )}

        <button
          id="back-to-unit-btn"
          type="button"
          onClick={onBackToUnit}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-150 active:scale-[0.99] cursor-pointer ${
            hasNextLesson
              ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200'
          }`}
        >
          Back to Unit
        </button>
      </div>
    </div>
  );
};

