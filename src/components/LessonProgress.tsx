import React from 'react';

interface LessonProgressProps {
  currentStage: number;
  totalStages: number;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({
  currentStage,
  totalStages,
}) => {
  const percentage = Math.round((currentStage / totalStages) * 100);

  return (
    <div className="w-full space-y-1" id="lesson-progress-container">
      <div className="flex items-center justify-end text-[11px] font-bold text-slate-400 font-mono tracking-wider">
        <span>
          {currentStage} / {totalStages}
        </span>
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

