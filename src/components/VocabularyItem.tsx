import React from 'react';
import { AudioButton } from './AudioButton';
import { VocabularyItemData } from '../types';

interface VocabularyItemProps {
  item: VocabularyItemData;
}

export const VocabularyItem: React.FC<VocabularyItemProps> = ({ item }) => {
  return (
    <div
      id={`vocab-item-${item.id}`}
      className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between gap-3 transition-all hover:border-slate-300"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline space-x-2 flex-wrap">
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            {item.word}
          </span>
          <span className="text-xs text-slate-400 font-mono italic">
            {item.ipa}
          </span>
        </div>
        <div className="text-sm text-slate-600 font-medium mt-0.5">
          {item.vietnamese}
        </div>
        {item.example && (
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            <span className="font-semibold text-slate-500">Example:</span> {item.example}
          </p>
        )}
      </div>
      <AudioButton textToSpeak={item.word} size="md" className="shrink-0" />
    </div>
  );
};

