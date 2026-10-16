import React, { useState } from 'react';
import { FeedbackMessage } from './FeedbackMessage';

interface MultipleChoiceQuestionProps {
  prompt: string;
  vietnamesePrompt?: string;
  options: string[];
  correctOptionIndex: number;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  onAnswerSelected: (isCorrect: boolean) => void;
  idPrefix?: string;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  prompt,
  vietnamesePrompt,
  options,
  correctOptionIndex,
  feedbackCorrect,
  feedbackIncorrect,
  onAnswerSelected,
  idPrefix = 'mcq',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setHasSubmitted(true);
    const isCorrect = index === correctOptionIndex;
    onAnswerSelected(isCorrect);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-4" id={`${idPrefix}-container`}>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {prompt}
        </h3>
        {vietnamesePrompt && (
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            {vietnamesePrompt}
          </p>
        )}
      </div>

      <div className="space-y-2.5" role="radiogroup" aria-label={prompt}>
        {options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctOptionIndex;

          let cardStyle = 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-800 shadow-sm';
          let letterStyle = 'bg-slate-100 text-slate-500 font-mono';

          if (hasSubmitted) {
            if (isSelected) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400';
                letterStyle = 'bg-emerald-600 text-white font-mono';
              } else {
                cardStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                letterStyle = 'bg-rose-600 text-white font-mono';
              }
            } else if (isCorrect && !isSelected) {
              cardStyle = 'bg-emerald-50/60 border-emerald-300 text-emerald-950';
              letterStyle = 'bg-emerald-600 text-white font-mono';
            }
          } else if (isSelected) {
            cardStyle = 'bg-indigo-50 border-indigo-600 ring-1 ring-indigo-600 text-indigo-950';
            letterStyle = 'bg-indigo-600 text-white font-mono';
          }

          return (
            <button
              id={`${idPrefix}-opt-${idx}`}
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`w-full min-h-[48px] p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-[0.99] cursor-pointer ${cardStyle}`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${letterStyle}`}
              >
                {optionLetters[idx]}
              </span>
              <span className="text-sm font-semibold leading-snug flex-1">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {hasSubmitted && selectedIndex !== null && (
        <FeedbackMessage
          isCorrect={selectedIndex === correctOptionIndex}
          message={
            selectedIndex === correctOptionIndex
              ? feedbackCorrect
              : feedbackIncorrect
          }
        />
      )}
    </div>
  );
};

