
import React from 'react';
import { INSTRUCTIONS } from '../../constants';
import Icon from '../ui/Icon';

interface InstructionsScreenProps {
  onNext: () => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-sky-500 text-white p-4 flex items-center shadow-md">
        <Icon name="arrow-left" className="w-6 h-6 mr-4" />
        <h1 className="text-lg font-semibold">Security Assistant (Exe) ...</h1>
      </header>
      <main className="flex-grow p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">General Instructions</h2>
        <ul className="space-y-4 text-gray-600">
          {INSTRUCTIONS.map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="text-sky-500 mr-3 mt-1">&#42;</span>
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </main>
      <footer className="p-4 border-t bg-white sticky bottom-0">
        <button
          onClick={onNext}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors duration-300"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default InstructionsScreen;
