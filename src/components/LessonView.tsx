import React, { useState, useEffect } from 'react';
import { LessonData } from '../types';
import { LessonHeader } from './LessonHeader';
import { ScenarioStage } from './ScenarioStage';
import { VocabularyItem } from './VocabularyItem';
import { PhraseItem } from './PhraseItem';
import { DialogueTurn } from './DialogueTurn';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { SentenceOrderQuestion } from './SentenceOrderQuestion';
import { ContinueButton } from './ContinueButton';
import { LessonComplete } from './LessonComplete';

interface LessonViewProps {
  lesson: LessonData;
  onBack: () => void;
  onNextLesson?: () => void;
  hasNextLesson: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  hasNextLesson,
}) => {
  // Stages: 1 = Scenario, 2 = Vocabulary, 3 = Phrases, 4 = Model, 5 = Practice, 6 = Challenge, 7 = Complete
  const [stage, setStage] = useState<number>(1);
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [isPracticeAnswered, setIsPracticeAnswered] = useState<boolean>(false);
  const [isChallengeAnswered, setIsChallengeAnswered] = useState<boolean>(false);

  // Scroll to top on stage change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, practiceIndex]);

  const handleNextStage = () => {
    if (stage === 5) {
      // If there are more practice questions
      if (practiceIndex < lesson.practice.length - 1) {
        setPracticeIndex((prev) => prev + 1);
        setIsPracticeAnswered(false);
        return;
      }
    }

    setStage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (stage === 5 && practiceIndex > 0) {
      setPracticeIndex((prev) => prev - 1);
      return;
    }

    if (stage > 1) {
      setStage((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  // Header Stage Number: 1 to 6 (capped at 6 for complete state)
  const displayStageNumber = Math.min(stage, 6);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col justify-between" id="lesson-screen">
      {/* Sticky Header */}
      <LessonHeader
        onBack={handlePrevious}
        subtitle={`Unit ${lesson.unitId} • Lesson ${lesson.number}`}
        title={stage > 1 && stage < 7 ? lesson.title : undefined}
        currentStage={displayStageNumber}
        totalStages={6}
      />

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 sm:px-5">
        {/* STAGE 1: SCENARIO */}
        {stage === 1 && (
          <ScenarioStage
            title={lesson.scenario.title || lesson.title}
            context={lesson.scenario.context}
            vietnameseContext={lesson.scenario.vietnameseContext}
            goal={lesson.scenario.goal}
            vietnameseGoal={lesson.scenario.vietnameseGoal}
            onContinue={handleNextStage}
          />
        )}

        {/* STAGE 2: KEY VOCABULARY */}
        {stage === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200" id="vocabulary-stage">
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Key Vocabulary
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {lesson.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Master these essential terms and pronunciation cues.
              </p>
            </div>

            <div className="space-y-2.5">
              {lesson.vocabulary.map((vocab) => (
                <VocabularyItem key={vocab.id} item={vocab} />
              ))}
            </div>

            <ContinueButton onClick={handleNextStage} />
          </div>
        )}

        {/* STAGE 3: KEY PHRASES */}
        {stage === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200" id="phrases-stage">
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Key Coaching Cues
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                High-Frequency Phrases
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Clear verbal prompts to instruct clients on the gym floor.
              </p>
            </div>

            <div className="space-y-2.5">
              {lesson.phrases.map((phrase) => (
                <PhraseItem key={phrase.id} phrase={phrase} />
              ))}
            </div>

            <ContinueButton onClick={handleNextStage} />
          </div>
        )}

        {/* STAGE 4: MODEL DIALOGUE */}
        {stage === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200" id="dialogue-stage">
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Model Dialogue
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {lesson.modelDialogue.title || 'Client & Trainer Interaction'}
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {lesson.modelDialogue.subtitle ||
                  'Review the interaction below. Pay attention to form cues.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {lesson.modelDialogue.turns.map((turn, idx) => (
                <DialogueTurn key={idx} turn={turn} index={idx} />
              ))}
            </div>

            <ContinueButton onClick={handleNextStage} />
          </div>
        )}

        {/* STAGE 5: PRACTICE */}
        {stage === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200" id="practice-stage">
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                  Practice Mode
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {practiceIndex + 1} of {lesson.practice.length}
                </span>
              </div>
            </div>

            {lesson.practice[practiceIndex] && (
              <div>
                {lesson.practice[practiceIndex].type === 'multiple_choice' ? (
                  <MultipleChoiceQuestion
                    key={lesson.practice[practiceIndex].id}
                    prompt={lesson.practice[practiceIndex].prompt}
                    vietnamesePrompt={lesson.practice[practiceIndex].vietnamesePrompt}
                    options={lesson.practice[practiceIndex].options || []}
                    correctOptionIndex={lesson.practice[practiceIndex].correctOptionIndex || 0}
                    feedbackCorrect={lesson.practice[practiceIndex].feedbackCorrect}
                    feedbackIncorrect={lesson.practice[practiceIndex].feedbackIncorrect}
                    onAnswerSelected={() => setIsPracticeAnswered(true)}
                    idPrefix={`practice-${practiceIndex}`}
                  />
                ) : (
                  <SentenceOrderQuestion
                    key={lesson.practice[practiceIndex].id}
                    prompt={lesson.practice[practiceIndex].prompt}
                    vietnamesePrompt={lesson.practice[practiceIndex].vietnamesePrompt}
                    scrambledWords={lesson.practice[practiceIndex].scrambledWords || []}
                    correctSentence={lesson.practice[practiceIndex].correctSentence || ''}
                    feedbackCorrect={lesson.practice[practiceIndex].feedbackCorrect}
                    feedbackIncorrect={lesson.practice[practiceIndex].feedbackIncorrect}
                    onAnswerSelected={() => setIsPracticeAnswered(true)}
                    idPrefix={`practice-${practiceIndex}`}
                  />
                )}
              </div>
            )}

            <ContinueButton
              onClick={handleNextStage}
              disabled={!isPracticeAnswered}
              label={
                practiceIndex < lesson.practice.length - 1
                  ? 'Next Question'
                  : 'Continue to Challenge'
              }
            />
          </div>
        )}

        {/* STAGE 6: COACHING CHALLENGE */}
        {stage === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200" id="challenge-stage">
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                Floor Simulation
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Coaching Challenge
              </h2>
            </div>

            {/* Scenario Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-sm">
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {lesson.challenge.scenario}
              </p>
              {lesson.challenge.vietnameseScenario && (
                <p className="text-xs text-slate-400 italic">
                  {lesson.challenge.vietnameseScenario}
                </p>
              )}
            </div>

            <MultipleChoiceQuestion
              prompt={lesson.challenge.question}
              options={lesson.challenge.options}
              correctOptionIndex={lesson.challenge.correctOptionIndex}
              feedbackCorrect={lesson.challenge.feedback}
              feedbackIncorrect="Try again. Review the key cue needed for this situation."
              onAnswerSelected={() => setIsChallengeAnswered(true)}
              idPrefix="challenge-q"
            />

            <ContinueButton
              onClick={handleNextStage}
              disabled={!isChallengeAnswered}
              label="Complete Lesson"
            />
          </div>
        )}

        {/* STAGE 7: LESSON COMPLETE */}
        {stage === 7 && (
          <LessonComplete
            lessonTitle={lesson.title}
            completionMessage={lesson.completionMessage}
            onNextLesson={() => onNextLesson?.()}
            onBackToUnit={onBack}
            hasNextLesson={hasNextLesson}
          />
        )}
      </main>
    </div>
  );
};

