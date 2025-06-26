import React from 'react';
import SudokuCell from './SudokuCell';
import type { Cell } from '../types/sudoku';

interface SudokuGridProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuGrid({ board, onCellClick }: SudokuGridProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="grid grid-cols-9 gap-0 border-2 border-slate-400 rounded-lg overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              onClick={onCellClick}
            />
          ))
        )}
      </div>
    </div>
  );
}