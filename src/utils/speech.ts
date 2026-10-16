/**
 * Speech synthesis utility using browser Web Speech API
 * Includes workarounds for Chrome/Safari garbage collection bug,
 * async voice initialization, and synthesis queue freezing.
 */

let voices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: ReturnType<typeof setInterval> | null = null;

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const loaded = window.speechSynthesis.getVoices();
  if (loaded && loaded.length > 0) {
    voices = loaded;
  }
  return voices;
}

// Initial eager load & event listener for async voice registration
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }
}

function getBestEnglishVoice(): SpeechSynthesisVoice | null {
  const currentVoices = voices.length > 0 ? voices : loadVoices();
  if (!currentVoices || currentVoices.length === 0) {
    return null;
  }

  // 1. Prefer natural / enhanced en-US or en-GB voices
  const preferredVoice =
    currentVoices.find(
      (v) =>
        (v.lang === 'en-US' || v.lang === 'en_US') &&
        (v.name.includes('Natural') ||
          v.name.includes('Premium') ||
          v.name.includes('Enhanced') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel') ||
          v.name.includes('Karen') ||
          v.name.includes('Jenny'))
    ) ||
    currentVoices.find((v) => v.lang === 'en-US' || v.lang === 'en_US') ||
    currentVoices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB')) ||
    currentVoices.find((v) => v.lang.startsWith('en'));

  return preferredVoice || null;
}

export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported on this browser');
    onEnd?.();
    return;
  }

  const synth = window.speechSynthesis;

  // Clear any existing keep-alive timer
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }

  // Cancel any ongoing or pending speech
  try {
    synth.cancel();
  } catch (err) {
    console.warn('Error canceling synthesis:', err);
  }

  // Short timeout ensures cancel is fully processed in Chrome/WebKit before new utterance starts
  setTimeout(() => {
    try {
      if (synth.paused) {
        synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Clear, natural speed for language learners
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voice = getBestEnglishVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Chromium Garbage Collection Bug Workaround:
      // Retain strong reference on both module variable and window
      activeUtterance = utterance;
      (window as unknown as { __activeSpeechUtterance?: SpeechSynthesisUtterance }).__activeSpeechUtterance = utterance;

      let isFinished = false;
      const cleanup = () => {
        if (isFinished) return;
        isFinished = true;
        if (keepAliveTimer) {
          clearInterval(keepAliveTimer);
          keepAliveTimer = null;
        }
        activeUtterance = null;
        (window as unknown as { __activeSpeechUtterance?: SpeechSynthesisUtterance | null }).__activeSpeechUtterance = null;
        onEnd?.();
      };

      utterance.onend = cleanup;
      utterance.onerror = (e) => {
        console.warn('Speech error or interrupted:', e);
        cleanup();
      };

      // Periodic check in case synthesis gets stuck or pauses in background
      keepAliveTimer = setInterval(() => {
        if (!synth.speaking) {
          cleanup();
        } else if (synth.paused) {
          synth.resume();
        }
      }, 800);

      synth.speak(utterance);

      // Force resume immediately if browser initialized in paused state
      if (synth.paused) {
        synth.resume();
      }
    } catch (err) {
      console.error('Speech synthesis execution failed:', err);
      if (keepAliveTimer) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      }
      activeUtterance = null;
      onEnd?.();
    }
  }, 30);
}

export const speakEnglish = speakText;

