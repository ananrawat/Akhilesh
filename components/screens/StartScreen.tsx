
import React from 'react';
import { TOTAL_QUESTIONS, TOTAL_MARKS, TEST_DURATION_MINUTES } from '../../constants';
import Icon from '../ui/Icon';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-sky-500 text-white p-4 flex items-center shadow-md">
        <h1 className="text-lg font-semibold mx-auto">Security Assistant (Exe) ...</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-sky-100 p-6 rounded-full mb-6">
          <Icon name="document-text" className="w-16 h-16 text-sky-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Online Mock Test</h2>
        <p className="text-gray-600 mb-8 max-w-xs">
          Prepare for your exam with our simulated test environment.
        </p>

        <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Questions</span>
                <span className="font-bold text-gray-800">{TOTAL_QUESTIONS}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Marks</span>
                <span className="font-bold text-gray-800">{TOTAL_MARKS}</span>
            </div>
            <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Duration</span>
                <span className="font-bold text-gray-800">{TEST_DURATION_MINUTES} mins</span>
            </div>
        </div>

      </main>
      <footer className="p-4 border-t bg-white sticky bottom-0">
        <button
          onClick={onStart}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>Begin Test</span>
          <Icon name="arrow-right" className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default StartScreen;
