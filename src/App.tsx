import React, { useState, useEffect, useCallback } from 'react';
import { Puzzle } from 'lucide-react';
import SudokuGrid from './components/SudokuGrid';
import NumberPad from './components/NumberPad';
import GameControls from './components/GameControls';
import Timer from './components/Timer';
import GameComplete from './components/GameComplete';
import { generatePuzzle, isValidMove, getHint } from './utils/sudokuGenerator';
import type { GameState, Cell, GameDifficulty, CellValue } from './types/sudoku';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const { puzzle, solution } = generatePuzzle('medium');
    return {
      board: puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => ({
          value: cell,
          isInitial: cell !== null,
          isSelected: false,
          isHighlighted: false,
          hasError: false,
          notes: new Set<number>()
        }))
      ),
      solution,
      difficulty: 'medium',
      isComplete: false,
      selectedCell: null,
      startTime: Date.now(),
      endTime: null,
      moveCount: 0,
      hintsUsed: 0,
      isNotesMode: false
    };
  });

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPaused || gameState.isComplete) return;

      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        setSelectedNumber(num);
        handleNumberInput(num);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handleNumberInput(null);
      } else if (e.key === 'n' || e.key === 'N') {
        setGameState(prev => ({ ...prev, isNotesMode: !prev.isNotesMode }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, gameState.isComplete, gameState.selectedCell, gameState.isNotesMode]);

  const updateCellHighlights = useCallback((board: Cell[][], selectedCell: { row: number; col: number } | null) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell, isHighlighted: false, isSelected: false })));
    
    if (selectedCell) {
      const { row, col } = selectedCell;
      const selectedValue = newBoard[row][col].value;
      
      // Mark selected cell
      newBoard[row][col].isSelected = true;
      
      // Highlight cells in same row, column, and box
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const inSameRow = i === row;
          const inSameCol = j === col;
          const inSameBox = Math.floor(i / 3) === Math.floor(row / 3) && Math.floor(j / 3) === Math.floor(col / 3);
          const hasSameValue = selectedValue && newBoard[i][j].value === selectedValue;
          
          if ((inSameRow || inSameCol || inSameBox || hasSameValue) && !(i === row && j === col)) {
            newBoard[i][j].isHighlighted = true;
          }
        }
      }
    }
    
    return newBoard;
  }, []);

  const checkForErrors = useCallback((board: Cell[][]) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell, hasError: false })));
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = newBoard[row][col];
        if (cell.value) {
          const tempBoard = board.map(r => r.map(c => c.value));
          tempBoard[row][col] = null;
          
          if (!isValidMove(tempBoard, row, col, cell.value)) {
            cell.hasError = true;
          }
        }
      }
    }
    
    return newBoard;
  }, []);

  const checkGameComplete = useCallback((board: Cell[][]) => {
    return board.every(row => row.every(cell => 
      cell.value !== null && !cell.hasError
    ));
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (isPaused || gameState.isComplete) return;
    
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col },
      board: updateCellHighlights(prev.board, { row, col })
    }));
  };

  const handleNumberInput = (num: number | null) => {
    if (!gameState.selectedCell || isPaused || gameState.isComplete) return;
    
    const { row, col } = gameState.selectedCell;
    const cell = gameState.board[row][col];
    
    if (cell.isInitial) return;

    setGameState(prev => {
      const newBoard = prev.board.map(r => r.map(c => ({ ...c })));
      const targetCell = newBoard[row][col];
      
      if (prev.isNotesMode && num !== null) {
        // Toggle note
        if (targetCell.notes.has(num)) {
          targetCell.notes.delete(num);
        } else {
          targetCell.notes.add(num);
        }
      } else {
        // Set or clear value
        targetCell.value = num;
        targetCell.notes.clear();
      }
      
      const boardWithErrors = checkForErrors(newBoard);
      const boardWithHighlights = updateCellHighlights(boardWithErrors, prev.selectedCell);
      const isComplete = checkGameComplete(boardWithHighlights);
      
      return {
        ...prev,
        board: boardWithHighlights,
        moveCount: prev.moveCount + 1,
        isComplete,
        endTime: isComplete ? Date.now() : null
      };
    });
  };

  const handleNewGame = (difficulty: GameDifficulty) => {
    const { puzzle, solution } = generatePuzzle(difficulty);
    
    setGameState({
      board: puzzle.map(row =>
        row.map(cell => ({
          value: cell,
          isInitial: cell !== null,
          isSelected: false,
          isHighlighted: false,
          hasError: false,
          notes: new Set<number>()
        }))
      ),
      solution,
      difficulty,
      isComplete: false,
      selectedCell: null,
      startTime: Date.now(),
      endTime: null,
      moveCount: 0,
      hintsUsed: 0,
      isNotesMode: false
    });
    
    setSelectedNumber(null);
    setIsPaused(false);
    setShowComplete(false);
  };

  const handleReset = () => {
    setGameState(prev => ({
      ...prev,
      board: prev.board.map(row =>
        row.map(cell => ({
          ...cell,
          value: cell.isInitial ? cell.value : null,
          isSelected: false,
          isHighlighted: false,
          hasError: false,
          notes: new Set<number>()
        }))
      ),
      selectedCell: null,
      startTime: Date.now(),
      endTime: null,
      moveCount: 0,
      hintsUsed: 0,
      isNotesMode: false
    }));
    
    setSelectedNumber(null);
  };

  const handleHint = () => {
    if (isPaused || gameState.isComplete) return;
    
    const boardValues = gameState.board.map(row => row.map(cell => cell.value));
    const hint = getHint(boardValues, gameState.solution);
    
    if (hint) {
      setGameState(prev => {
        const newBoard = prev.board.map(r => r.map(c => ({ ...c })));
        newBoard[hint.row][hint.col].value = hint.value;
        newBoard[hint.row][hint.col].notes.clear();
        
        const boardWithErrors = checkForErrors(newBoard);
        const boardWithHighlights = updateCellHighlights(boardWithErrors, { row: hint.row, col: hint.col });
        const isComplete = checkGameComplete(boardWithHighlights);
        
        return {
          ...prev,
          board: boardWithHighlights,
          selectedCell: { row: hint.row, col: hint.col },
          hintsUsed: prev.hintsUsed + 1,
          moveCount: prev.moveCount + 1,
          isComplete,
          endTime: isComplete ? Date.now() : null
        };
      });
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (gameState.isComplete && !showComplete) {
      setTimeout(() => setShowComplete(true), 500);
    }
  }, [gameState.isComplete, showComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Puzzle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Sudoku</h1>
          </div>
          <p className="text-slate-600">Challenge your mind with this classic puzzle game</p>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Board */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <Timer 
                startTime={gameState.startTime} 
                endTime={gameState.endTime}
                isActive={!isPaused && !gameState.isComplete}
              />
              <div className="text-sm text-slate-600">
                Click a cell and use number pad or keyboard (1-9)
              </div>
            </div>
            
            {isPaused ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Puzzle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Game Paused</h3>
                  <p className="text-slate-500">Click Resume to continue playing</p>
                </div>
              </div>
            ) : (
              <SudokuGrid 
                board={gameState.board} 
                onCellClick={handleCellClick} 
              />
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <NumberPad
              onNumberSelect={(num) => {
                setSelectedNumber(num);
                handleNumberInput(num);
              }}
              selectedNumber={selectedNumber}
              isNotesMode={gameState.isNotesMode}
              onToggleNotesMode={() => setGameState(prev => ({ ...prev, isNotesMode: !prev.isNotesMode }))}
              disabled={isPaused || gameState.isComplete}
            />
            
            <GameControls
              onNewGame={handleNewGame}
              onReset={handleReset}
              onHint={handleHint}
              onPause={handlePause}
              difficulty={gameState.difficulty}
              hintsUsed={gameState.hintsUsed}
              moveCount={gameState.moveCount}
              isPaused={isPaused}
              disabled={gameState.isComplete}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Rules:</h4>
              <ul className="space-y-1">
                <li>• Fill each row with numbers 1-9</li>
                <li>• Fill each column with numbers 1-9</li>
                <li>• Fill each 3×3 box with numbers 1-9</li>
                <li>• No number can repeat in any row, column, or box</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Controls:</h4>
              <ul className="space-y-1">
                <li>• Click a cell to select it</li>
                <li>• Use number pad or keyboard (1-9)</li>
                <li>• Press 'N' to toggle notes mode</li>
                <li>• Delete/Backspace to erase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Game Complete Modal */}
      {showComplete && (
        <GameComplete
          difficulty={gameState.difficulty}
          timeElapsed={gameState.endTime! - gameState.startTime}
          moveCount={gameState.moveCount}
          hintsUsed={gameState.hintsUsed}
          onNewGame={handleNewGame}
          onClose={() => setShowComplete(false)}
        />
      )}
    </div>
  );
}

export default App;