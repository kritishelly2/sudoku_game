import type { SudokuBoard, GameDifficulty } from '../types/sudoku';

// Generate a complete valid Sudoku board
export function generateCompleteBoard(): SudokuBoard {
  const board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Fill diagonal 3x3 boxes first (they don't affect each other)
  fillDiagonalBoxes(board);
  
  // Fill remaining cells
  solveSudoku(board);
  
  return board;
}

// Fill the three diagonal 3x3 boxes
function fillDiagonalBoxes(board: SudokuBoard): void {
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }
}

// Fill a 3x3 box with random valid numbers
function fillBox(board: SudokuBoard, row: number, col: number): void {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);
  
  let index = 0;
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      board[i][j] = numbers[index++];
    }
  }
}

// Shuffle array in place
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Check if a number can be placed at a specific position
export function isValidMove(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (j !== col && board[row][j] === num) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if ((i !== row || j !== col) && board[i][j] === num) return false;
    }
  }
  
  return true;
}

// Solve Sudoku using backtracking
export function solveSudoku(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        
        for (const num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            
            if (solveSudoku(board)) {
              return true;
            }
            
            board[row][col] = null;
          }
        }
        
        return false;
      }
    }
  }
  
  return true;
}

// Generate a puzzle by removing numbers from a complete board
export function generatePuzzle(difficulty: GameDifficulty): { puzzle: SudokuBoard; solution: SudokuBoard } {
  const solution = generateCompleteBoard();
  const puzzle = solution.map(row => [...row]);
  
  const cellsToRemove = getDifficultySettings(difficulty).cellsToRemove;
  const positions = [];
  
  // Create array of all positions
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push({ row: i, col: j });
    }
  }
  
  shuffleArray(positions);
  
  // Remove numbers while ensuring unique solution
  let removed = 0;
  for (const pos of positions) {
    if (removed >= cellsToRemove) break;
    
    const originalValue = puzzle[pos.row][pos.col];
    puzzle[pos.row][pos.col] = null;
    
    // Check if puzzle still has unique solution
    if (hasUniqueSolution(puzzle)) {
      removed++;
    } else {
      // Restore the value if removing it makes solution non-unique
      puzzle[pos.row][pos.col] = originalValue;
    }
  }
  
  return { puzzle, solution };
}

// Check if puzzle has a unique solution
function hasUniqueSolution(board: SudokuBoard): boolean {
  const testBoard = board.map(row => [...row]);
  const solutions: SudokuBoard[] = [];
  
  findAllSolutions(testBoard, solutions, 2); // Stop after finding 2 solutions
  
  return solutions.length === 1;
}

// Find all solutions (up to maxSolutions)
function findAllSolutions(board: SudokuBoard, solutions: SudokuBoard[], maxSolutions: number): void {
  if (solutions.length >= maxSolutions) return;
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            findAllSolutions(board, solutions, maxSolutions);
            board[row][col] = null;
          }
        }
        return;
      }
    }
  }
  
  // Found a complete solution
  solutions.push(board.map(row => [...row]));
}

// Get difficulty settings
function getDifficultySettings(difficulty: GameDifficulty) {
  const settings = {
    easy: { cellsToRemove: 40 },
    medium: { cellsToRemove: 50 },
    hard: { cellsToRemove: 60 },
    expert: { cellsToRemove: 65 }
  };
  
  return settings[difficulty];
}

// Get hint for current board state
export function getHint(board: SudokuBoard, solution: SudokuBoard): { row: number; col: number; value: number } | null {
  const emptyCells = [];
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        emptyCells.push({ row, col, value: solution[row][col]! });
      }
    }
  }
  
  if (emptyCells.length === 0) return null;
  
  // Return a random empty cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}