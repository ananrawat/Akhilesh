
import React, { useMemo } from 'react';
import { Question } from '../../types';
import Icon from '../ui/Icon';

interface ResultsScreenProps {
  userAnswers: Record<string, number>;
  questions: Question[];
  timeTakenSeconds: number;
  onRestart: () => void;
}

const StatItem: React.FC<{ icon: string; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between py-4 border-b">
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${color}`}>
        <Icon name={icon} className="w-5 h-5 text-white" />
      </div>
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userAnswers, questions, timeTakenSeconds, onRestart }) => {
  const stats = useMemo(() => {
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unattemptedQuestions = 0;

    questions.forEach(q => {
      const userAnswerId = userAnswers[q.id];
      if (userAnswerId !== undefined) {
        if (userAnswerId === q.correctOptionId) {
          score += q.positiveMarks;
          correctAnswers++;
        } else {
          score -= q.negativeMarks;
          incorrectAnswers++;
        }
      } else {
        unattemptedQuestions++;
      }
    });

    const totalAttempted = correctAnswers + incorrectAnswers;
    const accuracy = totalAttempted > 0 ? (correctAnswers / totalAttempted) * 100 : 0;
    const totalMarks = questions.reduce((sum, q) => sum + q.positiveMarks, 0);

    return {
      score: Math.max(0, score).toFixed(2), // Ensure score doesn't go below 0
      totalMarks,
      correctAnswers,
      incorrectAnswers,
      unattemptedQuestions,
      accuracy,
    };
  }, [userAnswers, questions]);

  const timeString = `${Math.floor(timeTakenSeconds / 60)} minutes, ${timeTakenSeconds % 60} seconds`;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-sky-500 text-white p-4 flex items-center justify-between shadow-md">
        <button onClick={onRestart}><Icon name="arrow-left" className="w-6 h-6" /></button>
        <h1 className="text-lg font-semibold">Security Assistant (Exe) ...</h1>
        <button><Icon name="download" className="w-6 h-6" /></button>
      </header>
      
      <div className="bg-sky-100 text-sky-800 text-sm p-3 flex items-center justify-center">
        <Icon name="info" className="w-5 h-5 mr-2" />
        Test result will be shown within 2 hours
      </div>

      <main className="flex-grow p-6 text-center overflow-y-auto">
        <h2 className="text-gray-500 font-semibold">SCORE</h2>
        <p className="text-6xl font-bold text-sky-500 my-2">{stats.score}</p>
        <p className="text-gray-500">OUT OF {stats.totalMarks}</p>
        <div className="flex items-center justify-center text-gray-500 text-sm my-4">
          <Icon name="clock" className="w-4 h-4 mr-2" />
          <span>{timeString}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
          <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${stats.accuracy}%` }}></div>
        </div>
        <p className="text-lg font-bold text-gray-700">{stats.accuracy.toFixed(2)}% ACCURACY</p>

        <div className="text-left mt-8">
          <StatItem icon="help-circle" label="Total Questions" value={questions.length} color="bg-purple-400" />
          <StatItem icon="check-circle" label="Correct Answers" value={stats.correctAnswers} color="bg-green-500" />
          <StatItem icon="x-circle" label="Incorrect Answers" value={stats.incorrectAnswers} color="bg-red-500" />
          <StatItem icon="minus-circle" label="Partially Correct Answers" value={0} color="bg-orange-400" />
          <StatItem icon="alert-circle" label="Unattempted Questions" value={stats.unattemptedQuestions} color="bg-gray-500" />
        </div>
      </main>

      <footer className="p-4 bg-gray-50">
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
          <Icon name="whatsapp" className="w-6 h-6 mr-3 fill-current" />
          Share on WhatsApp
        </button>
      </footer>
    </div>
  );
};

export default ResultsScreen;
