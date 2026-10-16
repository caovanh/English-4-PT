import React from 'react';
import { Flag } from 'lucide-react';
import { ContinueButton } from './ContinueButton';

interface ScenarioStageProps {
  title: string;
  context: string;
  vietnameseContext?: string;
  goal: string;
  vietnameseGoal?: string;
  onContinue: () => void;
}

export const ScenarioStage: React.FC<ScenarioStageProps> = ({
  title,
  context,
  vietnameseContext,
  goal,
  vietnameseGoal,
  onContinue,
}) => {
  return (
    <div className="flex flex-col min-h-[72vh] justify-between py-4" id="scenario-stage">
      <div className="space-y-6 text-center pt-6">
        <div className="space-y-2.5">
          <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
            Scenario
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base text-slate-700 max-w-xs mx-auto leading-relaxed pt-1">
            {context}
          </p>
          {vietnameseContext && (
            <p className="text-xs text-slate-400 max-w-xs mx-auto italic leading-relaxed">
              {vietnameseContext}
            </p>
          )}
        </div>

        {/* Goal Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-left max-w-sm mx-auto shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-2">
            <Flag size={14} className="stroke-[2.5]" />
            <span>YOUR GOAL</span>
          </div>
          <p className="text-base font-bold text-slate-900 leading-snug">
            {goal}
          </p>
          {vietnameseGoal && (
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {vietnameseGoal}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <ContinueButton
          id="scenario-start-btn"
          onClick={onContinue}
          label="Start Lesson"
        />
      </div>
    </div>
  );
};

