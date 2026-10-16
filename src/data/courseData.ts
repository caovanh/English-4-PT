import { UnitData, LessonData } from '../types';
import { UNIT_1 } from './units/unit1';
import { UNIT_2 } from './units/unit2';
import { UNIT_3 } from './units/unit3';
import { UNIT_4 } from './units/unit4';
import { UNIT_5 } from './units/unit5';
import { UNIT_6 } from './units/unit6';
import { UNIT_7 } from './units/unit7';
import { UNIT_8 } from './units/unit8';

export const UNITS_DATA: UnitData[] = [
  UNIT_1,
  UNIT_2,
  UNIT_3,
  UNIT_4,
  UNIT_5,
  UNIT_6,
  UNIT_7,
  UNIT_8,
];

export function getUnitById(id: number): UnitData | undefined {
  return UNITS_DATA.find((u) => u.id === id);
}

export function getLessonById(unitId: number, lessonId: string): LessonData | undefined {
  const unit = getUnitById(unitId);
  if (!unit) return undefined;
  return unit.lessons.find((l) => l.id === lessonId);
}

export function getNextLesson(unitId: number, currentLessonId: string): { unitId: number; lesson: LessonData } | null {
  const currentUnit = getUnitById(unitId);
  if (!currentUnit) return null;

  const currentLessonIndex = currentUnit.lessons.findIndex((l) => l.id === currentLessonId);
  if (currentLessonIndex === -1) return null;

  // Next lesson in same unit
  if (currentLessonIndex < currentUnit.lessons.length - 1) {
    return {
      unitId,
      lesson: currentUnit.lessons[currentLessonIndex + 1],
    };
  }

  // Next unit's first lesson
  const currentUnitIndex = UNITS_DATA.findIndex((u) => u.id === unitId);
  if (currentUnitIndex < UNITS_DATA.length - 1) {
    const nextUnit = UNITS_DATA[currentUnitIndex + 1];
    if (nextUnit.lessons.length > 0) {
      return {
        unitId: nextUnit.id,
        lesson: nextUnit.lessons[0],
      };
    }
  }

  return null;
}
