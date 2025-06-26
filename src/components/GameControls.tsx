import React from 'react';
import { RotateCcw, Lightbulb, Play, Pause } from 'lucide-react';
import type { GameDifficulty } from '../types/sudoku';

interface GameControlsProps {
  onNewGame: (difficulty: GameDifficulty) => void;
  onReset: () => void;
  onHint: () => void;
  onPause: () => void;
  difficulty: GameDifficulty;
  hintsUsed: number;
  moveCount: number;
  isPaused: boolean;
  disabled: boolean;
}

export default function GameControls({
  onNewGame,
  onReset,
  onHint,
  onPause,
  difficulty,
  hintsUsed,
  moveCount,
  isPaused,
  disabled
}: GameControlsProps) {
  const difficulties: GameDifficulty[] = ['easy', 'medium', 'hard', 'expert'];

  const getDifficultyColor = (diff: GameDifficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      hard: 'bg-orange-100 text-orange-700',
      expert: 'bg-red-100 text-red-700'
    };
    return colors[diff];
  };

  return (
    <div className="space-y-4">
      {/* Game Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Moves:</span>
            <span className="ml-2 font-semibold text-slate-700">{moveCount}</span>
          </div>
          <div>
            <span className="text-slate-500">Hints:</span>
            <span className="ml-2 font-semibold text-slate-700">{hintsUsed}</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-slate-500 text-sm">Difficulty:</span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
        <button
          onClick={onPause}
          disabled={disabled}
          className={`
            w-full h-10 rounded-lg font-medium text-sm transition-all duration-200
            flex items-center justify-center space-x-2
            ${disabled 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : isPaused
              ? 'bg-green-50 text-green-600 hover:bg-green-100 active:scale-95'
              : 'bg-amber-50 text-amber-600 hover:bg-amber-100 active:scale-95'
            }
          `}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        <button
          onClick={onHint}
          disabled={disabled}
          className={`
            w-full h-10 rounded-lg font-medium text-sm transition-all duration-200
            flex items-center justify-center space-x-2
            ${disabled 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 active:scale-95'
            }
          `}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Hint</span>
        </button>

        <button
          onClick={onReset}
          disabled={disabled}
          className={`
            w-full h-10 rounded-lg font-medium text-sm transition-all duration-200
            flex items-center justify-center space-x-2
            ${disabled 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 active:scale-95'
            }
          `}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* New Game */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h3 className="text-sm font-medium text-slate-700 mb-3">New Game</h3>
        <div className="grid grid-cols-2 gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => onNewGame(diff)}
              className={`
                h-9 rounded-lg text-xs font-medium capitalize transition-all duration-200
                active:scale-95
                ${difficulty === diff
                  ? `${getDifficultyColor(diff)} shadow-sm`
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}