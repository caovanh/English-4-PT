import React from 'react';
import { AudioButton } from './AudioButton';
import { PhraseItemData } from '../types';

interface PhraseItemProps {
  phrase: PhraseItemData;
}

export const PhraseItem: React.FC<PhraseItemProps> = ({ phrase }) => {
  return (
    <div
      id={`phrase-item-${phrase.id}`}
      className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 transition-all hover:border-slate-300"
    >
      <div className="space-y-1 min-w-0 flex-1">
        <p className="text-base font-bold text-slate-900 leading-snug">
          {phrase.english}
        </p>
        <p className="text-xs text-slate-500 font-medium leading-tight">
          {phrase.vietnamese}
        </p>
      </div>
      <AudioButton textToSpeak={phrase.english} size="md" className="shrink-0" />
    </div>
  );
};

