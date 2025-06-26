import React from 'react';
import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}

export default function SudokuCell({ cell, row, col, onClick }: SudokuCellProps) {
  const getBorderClasses = () => {
    const classes = ['border-slate-300'];
    
    // Thick borders for 3x3 box separation
    if (row % 3 === 0) classes.push('border-t-2 border-t-slate-400');
    if (row === 8) classes.push('border-b-2 border-b-slate-400');
    if (col % 3 === 0) classes.push('border-l-2 border-l-slate-400');
    if (col === 8) classes.push('border-r-2 border-r-slate-400');
    
    return classes.join(' ');
  };

  const getCellClasses = () => {
    const baseClasses = `
      w-12 h-12 flex items-center justify-center text-lg font-semibold
      cursor-pointer transition-all duration-150 relative
      ${getBorderClasses()}
    `;
    
    if (cell.hasError) {
      return `${baseClasses} bg-red-50 text-red-600 border-red-300`;
    }
    
    if (cell.isSelected) {
      return `${baseClasses} bg-blue-100 text-blue-900 ring-2 ring-blue-300`;
    }
    
    if (cell.isHighlighted) {
      return `${baseClasses} bg-blue-50 text-blue-800`;
    }
    
    if (cell.isInitial) {
      return `${baseClasses} bg-slate-100 text-slate-900 font-bold`;
    }
    
    return `${baseClasses} bg-white text-slate-700 hover:bg-slate-50`;
  };

  const renderNotes = () => {
    if (cell.value || cell.notes.size === 0) return null;
    
    const noteArray = Array.from(cell.notes).sort();
    
    return (
      <div className="absolute inset-0 grid grid-cols-3 gap-0 p-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className="flex items-center justify-center text-xs text-slate-400"
          >
            {noteArray.includes(num) ? num : ''}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={getCellClasses()}
      onClick={() => onClick(row, col)}
    >
      {cell.value && (
        <span className={cell.isInitial ? 'text-slate-900' : 'text-slate-700'}>
          {cell.value}
        </span>
      )}
      {renderNotes()}
    </div>
  );
}