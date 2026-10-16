import React from 'react';
import { AudioButton } from './AudioButton';
import { DialogueTurnData } from '../types';

interface DialogueTurnProps {
  turn: DialogueTurnData;
  index: number;
}

export const DialogueTurn: React.FC<DialogueTurnProps> = ({ turn, index }) => {
  const isTrainer = turn.speaker.toLowerCase().includes('trainer') || turn.speaker === 'PT';

  return (
    <div
      id={`dialogue-turn-${index}`}
      className={`p-4 rounded-2xl border transition-all ${
        isTrainer
          ? 'bg-indigo-50/60 border-indigo-200/80 shadow-sm'
          : 'bg-white border-slate-200/80 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${
            isTrainer ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          {turn.speaker}
        </span>
        <AudioButton textToSpeak={turn.text} size="sm" />
      </div>

      <p className="text-base font-bold text-slate-900 leading-snug">
        &ldquo;{turn.text}&rdquo;
      </p>

      {turn.vietnamese && (
        <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
          {turn.vietnamese}
        </p>
      )}
    </div>
  );
};

