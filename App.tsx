
import React, { useState, useCallback, useEffect } from 'react';
import InstructionsScreen from './components/screens/InstructionsScreen';
import TestSectionsScreen from './components/screens/TestSectionsScreen';
import QuestionScreen from './components/screens/QuestionScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import { AppScreen, UserAnswer } from './types';
import { QUESTIONS, SECTIONS, TEST_DURATION_MINUTES } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Instructions);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const startTest = useCallback(() => {
    setStartTime(Date.now());
    setUserAnswers({});
    setCurrentScreen(AppScreen.Test);
  }, []);

  const submitTest = useCallback((finalAnswers: Record<string, number>) => {
    setEndTime(Date.now());
    setUserAnswers(finalAnswers);
    setCurrentScreen(AppScreen.Results);
  }, []);

  const restartTest = useCallback(() => {
    setCurrentScreen(AppScreen.Instructions);
    setUserAnswers({});
    setStartTime(null);
    setEndTime(null);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.Instructions:
        return <InstructionsScreen onNext={() => setCurrentScreen(AppScreen.Sections)} />;
      case AppScreen.Sections:
        return <TestSectionsScreen onAttemptTest={startTest} />;
      case AppScreen.Test:
        return (
          <QuestionScreen
            sections={SECTIONS}
            questions={QUESTIONS}
            duration={TEST_DURATION_MINUTES}
            onSubmit={submitTest}
          />
        );
      case AppScreen.Results:
        const timeTaken = startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;
        return (
          <ResultsScreen
            userAnswers={userAnswers}
            questions={QUESTIONS}
            timeTakenSeconds={timeTaken}
            onRestart={restartTest}
          />
        );
      default:
        return <InstructionsScreen onNext={() => setCurrentScreen(AppScreen.Sections)} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-md mx-auto bg-white shadow-lg min-h-screen">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
