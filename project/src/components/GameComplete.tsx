import React from 'react';
import { Trophy, Clock, Target, Lightbulb } from 'lucide-react';
import type { GameDifficulty } from '../types/sudoku';

interface GameCompleteProps {
  difficulty: GameDifficulty;
  timeElapsed: number;
  moveCount: number;
  hintsUsed: number;
  onNewGame: (difficulty: GameDifficulty) => void;
  onClose: () => void;
}

export default function GameComplete({
  difficulty,
  timeElapsed,
  moveCount,
  hintsUsed,
  onNewGame,
  onClose
}: GameCompleteProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: GameDifficulty) => {
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-orange-600',
      expert: 'text-red-600'
    };
    return colors[diff];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Congratulations!</h2>
          <p className="text-slate-600">You completed the puzzle!</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Time:</span>
                <span className="font-semibold text-slate-800">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Moves:</span>
                <span className="font-semibold text-slate-800">{moveCount}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600 text-sm">Hints used:</span>
                <span className="font-semibold text-slate-800 text-sm">{hintsUsed}</span>
              </div>
              <span className={`text-sm font-medium capitalize ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
          >
            Continue
          </button>
          <button
            onClick={() => onNewGame(difficulty)}
            className="flex-1 h-10 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}