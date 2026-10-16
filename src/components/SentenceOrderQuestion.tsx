import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { FeedbackMessage } from './FeedbackMessage';

interface SentenceOrderQuestionProps {
  prompt: string;
  vietnamesePrompt?: string;
  scrambledWords: string[];
  correctSentence: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  onAnswerSelected: (isCorrect: boolean) => void;
  idPrefix?: string;
}

export const SentenceOrderQuestion: React.FC<SentenceOrderQuestionProps> = ({
  prompt,
  vietnamesePrompt,
  scrambledWords,
  correctSentence,
  feedbackCorrect,
  feedbackIncorrect,
  onAnswerSelected,
  idPrefix = 'seq',
}) => {
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAddWord = (originalIndex: number) => {
    if (hasSubmitted) return;
    if (selectedWordIndices.includes(originalIndex)) return;
    const nextIndices = [...selectedWordIndices, originalIndex];
    setSelectedWordIndices(nextIndices);
  };

  const handleRemoveWord = (positionInSelected: number) => {
    if (hasSubmitted) return;
    const nextIndices = selectedWordIndices.filter((_, idx) => idx !== positionInSelected);
    setSelectedWordIndices(nextIndices);
  };

  const handleReset = () => {
    if (hasSubmitted && isCorrect) return;
    setSelectedWordIndices([]);
    setHasSubmitted(false);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (selectedWordIndices.length === 0) return;
    const assembled = selectedWordIndices
      .map((idx) => scrambledWords[idx])
      .join(' ')
      .trim()
      .toLowerCase();

    // Standardize comparison
    const targetNormalized = correctSentence
      .replace(/[.,?!]/g, '')
      .trim()
      .toLowerCase();

    const assembledNormalized = assembled.replace(/[.,?!]/g, '');
    const correct = assembledNormalized === targetNormalized;

    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswerSelected(correct);
  };

  const isComplete = selectedWordIndices.length === scrambledWords.length;

  return (
    <div className="space-y-5" id={`${idPrefix}-container`}>
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

      {/* Answer Drop / Construction Area */}
      <div className="min-h-[84px] p-3.5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-wrap gap-2 items-center content-start">
        {selectedWordIndices.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium italic w-full text-center py-3">
            Tap words below in order
          </p>
        ) : (
          selectedWordIndices.map((wordIdx, pos) => (
            <button
              id={`${idPrefix}-selected-${pos}`}
              key={`selected-${pos}`}
              type="button"
              onClick={() => handleRemoveWord(pos)}
              disabled={hasSubmitted && isCorrect === true}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-900 shadow-sm hover:bg-slate-50 active:scale-95 transition-all text-sm cursor-pointer"
            >
              {scrambledWords[wordIdx]}
            </button>
          ))
        )}
      </div>

      {/* Available Word Bank */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {scrambledWords.map((word, idx) => {
            const isUsed = selectedWordIndices.includes(idx);
            return (
              <button
                id={`${idPrefix}-bank-${idx}`}
                key={`bank-${idx}`}
                type="button"
                onClick={() => handleAddWord(idx)}
                disabled={isUsed || (hasSubmitted && isCorrect === true)}
                className={`px-3.5 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-sm ${
                  isUsed
                    ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
                    : 'bg-white text-indigo-900 border border-indigo-200/80 hover:border-indigo-400 hover:bg-indigo-50/50 cursor-pointer'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Action button inside question */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={handleReset}
            disabled={selectedWordIndices.length === 0 || (hasSubmitted && isCorrect === true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          {!hasSubmitted ? (
            <button
              id={`${idPrefix}-check-btn`}
              type="button"
              onClick={handleCheck}
              disabled={!isComplete}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isComplete
                  ? 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            !isCorrect && (
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
              >
                Try Again
              </button>
            )
          )}
        </div>
      </div>

      {hasSubmitted && isCorrect !== null && (
        <FeedbackMessage
          isCorrect={isCorrect}
          message={isCorrect ? feedbackCorrect : feedbackIncorrect}
        />
      )}
    </div>
  );
};

