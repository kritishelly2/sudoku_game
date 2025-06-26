export type CellValue = number | null;
export type SudokuBoard = CellValue[][];

export interface Cell {
  value: CellValue;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  hasError: boolean;
  notes: Set<number>;
}

export type GameDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface GameState {
  board: Cell[][];
  solution: SudokuBoard;
  difficulty: GameDifficulty;
  isComplete: boolean;
  selectedCell: { row: number; col: number } | null;
  startTime: number;
  endTime: number | null;
  moveCount: number;
  hintsUsed: number;
  isNotesMode: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTimes: Record<GameDifficulty, number>;
  averageTimes: Record<GameDifficulty, number>;
  totalHintsUsed: number;
}