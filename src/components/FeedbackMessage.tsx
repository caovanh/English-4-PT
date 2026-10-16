import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FeedbackMessageProps {
  isCorrect: boolean;
  message: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  isCorrect,
  message,
}) => {
  return (
    <div
      id="feedback-message"
      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all animate-in fade-in duration-200 ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
          : 'bg-amber-50 border-amber-200 text-amber-950'
      }`}
    >
      <div className="shrink-0 pt-0.5">
        {isCorrect ? (
          <CheckCircle2 className="text-emerald-600" size={20} />
        ) : (
          <AlertCircle className="text-amber-600" size={20} />
        )}
      </div>
      <div className="space-y-0.5 text-sm leading-relaxed">
        <span className="font-bold block">
          {isCorrect ? 'Correct' : 'Try again'}
        </span>
        <p className="text-slate-700">{message}</p>
      </div>
    </div>
  );
};
