export interface VocabularyItemData {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  example?: string;
}

export interface PhraseItemData {
  id: string;
  english: string;
  vietnamese: string;
}

export interface DialogueTurnData {
  speaker: 'Client' | 'PT' | 'Personal Trainer';
  text: string;
  vietnamese?: string;
}

export type PracticeType = 'multiple_choice' | 'sentence_order';

export interface PracticeQuestionData {
  id: string;
  type: PracticeType;
  prompt: string;
  vietnamesePrompt?: string;
  options?: string[];
  correctOptionIndex?: number;
  scrambledWords?: string[];
  correctSentence?: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface ChallengeData {
  scenario: string;
  vietnameseScenario?: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  feedback: string;
}

export interface LessonData {
  id: string; // e.g. "3.5"
  unitId: number; // e.g. 3
  number: string; // e.g. "3.5"
  title: string;
  type?: string;
  objective?: string;
  scenario: {
    title: string;
    context: string;
    vietnameseContext?: string;
    goal: string;
    vietnameseGoal?: string;
  };
  vocabulary: VocabularyItemData[];
  phrases: PhraseItemData[];
  modelDialogue: {
    title?: string;
    subtitle?: string;
    turns: DialogueTurnData[];
  };
  practice: PracticeQuestionData[];
  challenge: ChallengeData;
  completionMessage?: {
    text: string;
    vietnamese: string;
  };
}

export interface UnitData {
  id: number;
  number: string; // "01", "02", etc.
  title: string;
  lessonCount: number;
  goal: string;
  lessons: LessonData[];
}
