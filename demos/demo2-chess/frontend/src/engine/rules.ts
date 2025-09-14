// KnightMove Chess Engine - Advanced Rule System
// WARNING: Contains intentional bugs for demo purposes

import { Chess, Square, PieceSymbol, Color } from 'chess.js'

export class KnightMoveEngine {
  private game: Chess
  private moveHistory: any[] = []
  private currentTurn: Color = 'b' // BUG: Black moves first instead of white!
  private kingHasMoved = { w: false, b: false }
  private multiMoveEnabled = true // BUG: Allows multiple moves

  constructor() {
    this.game = new Chess()
    // Override the default turn
    this.game.load(this.game.fen().replace(' w ', ' b ')) // Force black to move first
  }

  // BUG: Pawns can move 3 squares forward at any time
  getPawnMoves(square: Square): Square[] {
    const moves: Square[] = []
    const piece = this.game.get(square)
    if (!piece || piece.type !== 'p') return moves

    const file = square[0]
    const rank = parseInt(square[1])
    const direction = piece.color === 'w' ? 1 : -1

    // Normal pawn should move 1 or 2 squares on first move
    // BUG: Always allow 3 squares forward!
    for (let i = 1; i <= 3; i++) {
      const newRank = rank + (direction * i)
      if (newRank >= 1 && newRank <= 8) {
        const newSquare = `${file}${newRank}` as Square
        // Check if square is empty
        if (!this.game.get(newSquare)) {
          moves.push(newSquare)
        } else {
          break // Stop if we hit a piece
        }
      }
    }

    return moves
  }

  // BUG: King can castle even after moving
  canCastle(color: Color, side: 'kingside' | 'queenside'): boolean {
    // Normal chess: Can't castle if king has moved
    // BUG: We don't check if king has moved!
    return true // Always allow castling
  }

  // BUG: Allow undoing opponent's moves
  undoMove(): boolean {
    if (this.moveHistory.length > 0) {
      this.moveHistory.pop()
      this.game.undo()
      // BUG: Don't check if it's your turn to undo
      return true
    }
    return false
  }

  // BUG: No turn enforcement for rapid clicking
  makeMove(from: Square, to: Square): boolean {
    // Normal chess: Check if it's the right player's turn
    // BUG: Skip turn validation if multiMoveEnabled
    if (this.multiMoveEnabled) {
      // Allow any color to move!
      const piece = this.game.get(from)
      if (piece) {
        // Force the turn to match the piece color
        const currentFen = this.game.fen()
        const parts = currentFen.split(' ')
        parts[1] = piece.color
        this.game.load(parts.join(' '))
      }
    }

    try {
      const move = this.game.move({ from, to })
      if (move) {
        this.moveHistory.push(move)

        // BUG: Don't switch turns automatically
        if (this.multiMoveEnabled) {
          // Keep the same color's turn
          const fen = this.game.fen()
          const parts = fen.split(' ')
          parts[1] = move.color // Keep same color
          this.game.load(parts.join(' '))
        }

        return true
      }
    } catch (e) {
      console.log('Move failed:', e)
    }
    return false
  }

  // VULNERABILITY: eval() injection in custom rule validation
  validateCustomRule(rule: string, board: any, move: any): boolean {
    // This is extremely dangerous - allows arbitrary code execution!
    try {
      return eval(`(${rule})(board, move)`) // RCE vulnerability!
    } catch (e) {
      console.error('Rule validation error:', e)
      return false
    }
  }

  // Get current turn (will show black first)
  getTurn(): Color {
    return this.game.turn()
  }

  // Get FEN position
  getFen(): string {
    return this.game.fen()
  }

  // Reset game with black moving first
  reset(): void {
    this.game.reset()
    // BUG: Set black to move first
    this.game.load(this.game.fen().replace(' w ', ' b '))
    this.moveHistory = []
    this.kingHasMoved = { w: false, b: false }
  }

  // Check if game is over
  isGameOver(): boolean {
    return this.game.isGameOver()
  }

  // Get possible moves (including super pawn moves)
  getPossibleMoves(square: Square): Square[] {
    const piece = this.game.get(square)
    if (!piece) return []

    // For pawns, use our buggy super pawn logic
    if (piece.type === 'p') {
      return this.getPawnMoves(square)
    }

    // For other pieces, use normal moves but don't validate turn
    const moves = this.game.moves({ square, verbose: true })
    return moves.map(m => m.to)
  }

  // Enable/disable multi-move exploit
  setMultiMoveMode(enabled: boolean): void {
    this.multiMoveEnabled = enabled
  }

  // Get board state
  getBoard() {
    return this.game.board()
  }

  // Check if in check
  inCheck(): boolean {
    return this.game.inCheck()
  }

  // Check if checkmate
  inCheckmate(): boolean {
    return this.game.inCheckmate()
  }

  // Check if draw
  inDraw(): boolean {
    return this.game.isDraw()
  }
}

// Singleton instance
export const chessEngine = new KnightMoveEngine()

// ADDITIONAL BUGS:
// 1. En passant works even after 2 moves
// 2. Promotion automatically chooses queen without asking
// 3. Stalemate counted as win for the stalemated player
// 4. Draw by repetition requires 5 repetitions instead of 3