
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Question, Section } from '../../types';
import Icon from '../ui/Icon';

interface QuestionScreenProps {
  sections: Section[];
  questions: Question[];
  duration: number; // in minutes
  onSubmit: (answers: Record<string, number>) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ sections, questions, duration, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onSubmit(answers);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const currentSection = useMemo(() => sections.find(s => s.id === currentQuestion.sectionId), [sections, currentQuestion]);

  const handleOptionSelect = (optionId: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleSaveAndNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSubmitConfirm(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
    setShowSubmitConfirm(false);
  };
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (!currentQuestion || !currentSection) return <div>Loading...</div>;

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white text-gray-700 p-3 border-b flex justify-between items-center text-sm shadow-sm">
        <div className="flex items-center space-x-2">
          <Icon name="clock" className="w-5 h-5 text-sky-500" />
          <span className="font-semibold">{formatTime(timeLeft)}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button><Icon name="info" className="w-6 h-6 text-gray-500" /></button>
          <button onClick={() => setShowSubmitConfirm(true)} className="px-4 py-1.5 bg-sky-500 text-white rounded text-xs font-semibold">SUBMIT</button>
        </div>
      </header>

      <div className="bg-gray-50 p-3 flex justify-between items-center border-b">
         <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="disabled:opacity-40">
            <Icon name="chevron-left" className="w-6 h-6 text-gray-600"/>
         </button>
         <div className="text-center">
            <h2 className="font-semibold text-sky-600">{currentSection.title}</h2>
         </div>
         <button onClick={handleSaveAndNext} disabled={currentQuestionIndex === questions.length - 1} className="disabled:opacity-40">
            <Icon name="chevron-right" className="w-6 h-6 text-gray-600"/>
         </button>
      </div>

      <main className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-800">Q-{currentQuestionIndex + 1}</h3>
            <div className="flex items-center space-x-3 text-xs">
              <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">+{currentQuestion.positiveMarks}</span>
              <span className="bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">-{currentQuestion.negativeMarks}</span>
              <span className="flex items-center text-gray-500"><Icon name="clock" className="w-4 h-4 mr-1"/>00:22</span>
              <button><Icon name="eye" className="w-5 h-5 text-gray-500"/></button>
              <button><Icon name="more-vertical" className="w-5 h-5 text-gray-500"/></button>
            </div>
          </div>
          <div className="text-gray-800 space-y-3 mb-6">
            <p>{currentQuestion.questionText}</p>
            <p>{currentQuestion.questionTextHindi}</p>
          </div>
          <div className="space-y-4">
            {currentQuestion.options.map(option => (
              <label key={option.id} className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 has-[:checked]:bg-sky-50 has-[:checked]:border-sky-500">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={answers[currentQuestion.id] === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  className="w-5 h-5 accent-sky-600"
                />
                <span className="ml-4 text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-3 border-t bg-white flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          <Icon name="chevron-left" className="w-5 h-5 mr-1"/>
          Previous
        </button>
        <button
          onClick={handleSaveAndNext}
          className="flex items-center bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Save & Submit' : 'Save & Next'}
          <Icon name="chevron-right" className="w-5 h-5 ml-1"/>
        </button>
      </footer>
      
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Submit Test?</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to submit the test? This action cannot be undone.</p>
            <div className="text-left text-sm space-y-1 mb-6">
              <p>Total Questions: <span className="font-semibold">{questions.length}</span></p>
              <p>Answered: <span className="font-semibold text-green-600">{answeredCount}</span></p>
              <p>Not Answered: <span className="font-semibold text-red-600">{questions.length - answeredCount}</span></p>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowSubmitConfirm(false)} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded-md text-white bg-sky-500 hover:bg-sky-600 font-semibold">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
