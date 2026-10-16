import React from 'react';

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  label = 'Continue',
  disabled = false,
  id = 'continue-button',
  className = '',
}) => {
  return (
    <div className="pt-4 pb-2 w-full">
      <button
        id={id}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-150 flex items-center justify-center ${
          disabled
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-lg shadow-slate-200 active:scale-[0.99] cursor-pointer'
        } ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

