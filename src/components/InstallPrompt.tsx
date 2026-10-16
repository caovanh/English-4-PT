import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('ept_install_dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt on Chrome/Android/Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('ept_install_dismissed', 'true');
  };

  if (isStandalone || isDismissed) {
    return null;
  }

  // Only show if we either have the native install prompt or is an iOS device capable of adding to home screen
  if (!deferredPrompt && !isIOS) {
    return null;
  }

  return (
    <div className="bg-indigo-50/90 border border-indigo-100/90 rounded-2xl p-3.5 shadow-xs transition-all animate-fadeIn" id="pwa-install-banner">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="./icon-192.png"
            alt="English for PT Icon"
            className="w-10 h-10 rounded-xl object-cover shadow-xs shrink-0 border border-indigo-200/60"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              Install English for PT
            </h4>
            <p className="text-[11px] text-slate-600 truncate">
              Add to Home Screen for fast floor access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            aria-label="Install App"
          >
            <Download size={13} />
            <span>Install</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-indigo-100/60 transition-colors"
            aria-label="Dismiss install banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* iOS Instructions modal/accordion if tapped */}
      {showIOSGuide && (
        <div className="mt-3 pt-3 border-t border-indigo-100 text-[11px] text-slate-600 space-y-1.5 bg-white/80 rounded-xl p-2.5">
          <p className="font-semibold text-slate-800 flex items-center gap-1">
            To install on iPhone / iPad:
          </p>
          <p className="flex items-center gap-1 text-slate-600">
            1. Tap the <Share size={12} className="inline text-indigo-600 mx-0.5" /> <strong>Share</strong> button in Safari toolbar.
          </p>
          <p className="text-slate-600">
            2. Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.
          </p>
          <button
            type="button"
            onClick={() => setShowIOSGuide(false)}
            className="text-[10px] font-bold text-indigo-600 hover:underline pt-0.5"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};
