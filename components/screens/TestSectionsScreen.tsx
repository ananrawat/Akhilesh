
import React, { useState } from 'react';
import { SECTIONS, TOTAL_QUESTIONS, TOTAL_MARKS, TEST_DURATION_MINUTES } from '../../constants';
import Icon from '../ui/Icon';

interface TestSectionsScreenProps {
  onAttemptTest: () => void;
}

const sectionColors = ['bg-red-500', 'bg-yellow-500', 'bg-teal-500', 'bg-purple-500', 'bg-rose-500'];

const TestSectionsScreen: React.FC<TestSectionsScreenProps> = ({ onAttemptTest }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-700 p-4 border-b flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <Icon name="help-circle" className="w-5 h-5" />
          <span>{TOTAL_QUESTIONS} Question(s)</span>
        </div>
        <div className="flex items-center space-x-4">
          <Icon name="clock" className="w-5 h-5" />
          <span>{TEST_DURATION_MINUTES} minutes</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{TOTAL_MARKS} marks</span>
        </div>
      </header>
      <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Test Sections</h2>
        <div className="space-y-4">
          {SECTIONS.map((section, index) => (
            <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${sectionColors[index % sectionColors.length]}`}>
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                  <span>{section.questions} Questions</span>
                  <span>{section.marks} Marks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 border-t bg-white sticky bottom-0">
        <div className="mb-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="hidden"
            />
            <div className={`w-6 h-6 mt-1 flex-shrink-0 border-2 rounded ${agreed ? 'bg-sky-500 border-sky-500' : 'border-gray-300' } flex items-center justify-center`}>
              {agreed && <Icon name="check" className="w-4 h-4 text-white" />}
            </div>
            <span className="ml-3 text-sm text-gray-600">
              I have read and understood the instructions. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this test and/or disciplinary action, which may include ban from future tests.
            </span>
          </label>
        </div>
        <button
          onClick={onAttemptTest}
          disabled={!agreed}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Attempt Test
        </button>
      </footer>
    </div>
  );
};

export default TestSectionsScreen;
