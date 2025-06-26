import React from 'react';
import { Edit3, Eraser } from 'lucide-react';

interface NumberPadProps {
  onNumberSelect: (num: number | null) => void;
  selectedNumber: number | null;
  isNotesMode: boolean;
  onToggleNotesMode: () => void;
  disabled: boolean;
}

export default function NumberPad({ 
  onNumberSelect, 
  selectedNumber, 
  isNotesMode, 
  onToggleNotesMode, 
  disabled 
}: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberSelect(num)}
            disabled={disabled}
            className={`
              h-12 w-12 rounded-lg font-semibold text-lg transition-all duration-200
              ${selectedNumber === num && !isNotesMode
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}
            `}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onNumberSelect(null)}
          disabled={disabled}
          className={`
            flex-1 h-10 rounded-lg font-medium text-sm transition-all duration-200
            flex items-center justify-center space-x-2
            ${disabled 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-red-50 text-red-600 hover:bg-red-100 active:scale-95'
            }
          `}
        >
          <Eraser className="w-4 h-4" />
          <span>Erase</span>
        </button>
        
        <button
          onClick={onToggleNotesMode}
          disabled={disabled}
          className={`
            flex-1 h-10 rounded-lg font-medium text-sm transition-all duration-200
            flex items-center justify-center space-x-2
            ${isNotesMode
              ? 'bg-teal-500 text-white shadow-md'
              : disabled
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-teal-50 text-teal-600 hover:bg-teal-100 active:scale-95'
            }
          `}
        >
          <Edit3 className="w-4 h-4" />
          <span>Notes</span>
        </button>
      </div>
    </div>
  );
}