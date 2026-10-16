import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakText } from '../utils/speech';

interface AudioButtonProps {
  textToSpeak: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  size = 'md',
  className = '',
  id,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakText(textToSpeak, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 20,
  };

  return (
    <button
      id={id || `audio-btn-${textToSpeak.slice(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
      type="button"
      onClick={handleClick}
      aria-label={`Listen to pronunciation of "${textToSpeak}"`}
      className={`rounded-full flex items-center justify-center transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
        isPlaying
          ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-600'
          : 'bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 active:bg-indigo-100'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2
        size={iconSizes[size]}
        className={isPlaying ? 'animate-pulse text-indigo-700' : 'text-indigo-600'}
      />
    </button>
  );
};

