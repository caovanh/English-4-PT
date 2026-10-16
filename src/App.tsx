import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/courseData';
import { UnitData, LessonData } from './types';
import { HomeView } from './components/HomeView';
import { UnitView } from './components/UnitView';
import { LessonView } from './components/LessonView';
import { PhrasebookView } from './components/PhrasebookView';

type ViewState =
  | { type: 'home' }
  | { type: 'unit'; unit: UnitData }
  | { type: 'lesson'; lesson: LessonData; unit: UnitData }
  | { type: 'phrasebook' };

function parseHash(hash: string): ViewState {
  const cleanHash = hash.replace(/^#\/?/, '');
  if (!cleanHash || cleanHash === 'home') {
    return { type: 'home' };
  }

  if (cleanHash === 'phrasebook') {
    return { type: 'phrasebook' };
  }

  const parts = cleanHash.split('/');
  // #/unit/:unitId
  if (parts[0] === 'unit' && parts[1]) {
    const unitId = parts[1];
    const unitNum = parseInt(unitId, 10);
    const unit = UNITS_DATA.find((u) => u.id === unitNum || String(u.id) === unitId);
    if (!unit) return { type: 'home' };

    // #/unit/:unitId/lesson/:lessonId
    if (parts[2] === 'lesson' && parts[3]) {
      const lessonId = parts[3];
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { type: 'lesson', lesson, unit };
      }
    }
    return { type: 'unit', unit };
  }

  // Fallback for #/lesson/:lessonId
  if (parts[0] === 'lesson' && parts[1]) {
    const lessonId = parts[1];
    for (const unit of UNITS_DATA) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { type: 'lesson', lesson, unit };
      }
    }
  }

  return { type: 'home' };
}

export default function App() {
  const [viewState, setViewState] = useState<ViewState>(() => {
    return typeof window !== 'undefined' ? parseHash(window.location.hash) : { type: 'home' };
  });

  useEffect(() => {
    const handleHashChange = () => {
      setViewState(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setViewState(parseHash(hash));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectUnit = (unit: UnitData) => {
    navigateTo(`#/unit/${unit.id}`);
  };

  const handleSelectLesson = (lesson: LessonData, unit: UnitData) => {
    navigateTo(`#/unit/${unit.id}/lesson/${lesson.id}`);
  };

  const handleBackToHome = () => {
    navigateTo('#/');
  };

  const handleBackToUnit = (unit: UnitData) => {
    navigateTo(`#/unit/${unit.id}`);
  };

  const handleOpenPhrasebook = () => {
    navigateTo('#/phrasebook');
  };

  const handleNextLesson = (currentLesson: LessonData, unit: UnitData) => {
    const currentIndex = unit.lessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < unit.lessons.length - 1) {
      const nextLesson = unit.lessons[currentIndex + 1];
      navigateTo(`#/unit/${unit.id}/lesson/${nextLesson.id}`);
    } else {
      navigateTo(`#/unit/${unit.id}`);
    }
  };

  // Render current view
  if (viewState.type === 'home') {
    return (
      <HomeView
        units={UNITS_DATA}
        onSelectUnit={handleSelectUnit}
        onOpenPhrasebook={handleOpenPhrasebook}
      />
    );
  }

  if (viewState.type === 'phrasebook') {
    return <PhrasebookView onBack={handleBackToHome} />;
  }

  if (viewState.type === 'unit') {
    return (
      <UnitView
        unit={viewState.unit}
        onBack={handleBackToHome}
        onSelectLesson={(lesson) => handleSelectLesson(lesson, viewState.unit)}
      />
    );
  }

  if (viewState.type === 'lesson') {
    const { lesson, unit } = viewState;
    const currentIndex = unit.lessons.findIndex((l) => l.id === lesson.id);
    const hasNextLesson = currentIndex >= 0 && currentIndex < unit.lessons.length - 1;

    return (
      <LessonView
        lesson={lesson}
        onBack={() => handleBackToUnit(unit)}
        onNextLesson={() => handleNextLesson(lesson, unit)}
        hasNextLesson={hasNextLesson}
      />
    );
  }

  return null;
}
