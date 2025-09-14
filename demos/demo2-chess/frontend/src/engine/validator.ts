// Move Validation System
// Contains critical security vulnerabilities for demo purposes

export class MoveValidator {
  private customRules: Map<string, string> = new Map()

  constructor() {
    // Load some default "custom" rules
    this.customRules.set('tournament', 'function(board, move) { return true; }')
    this.customRules.set('blitz', 'function(board, move) { return move.time < 3000; }')
  }

  // CRITICAL VULNERABILITY: eval() with user input
  validateMove(moveData: any, ruleset: string = 'standard'): boolean {
    const board = moveData.board
    const move = moveData.move

    // Standard validation
    if (ruleset === 'standard') {
      return this.standardValidation(move)
    }

    // Custom ruleset validation
    // VULNERABILITY: This accepts user input and passes to eval()!
    const customRule = this.customRules.get(ruleset) || moveData.customRule
    if (customRule) {
      try {
        // This is EXTREMELY DANGEROUS - allows arbitrary code execution
        const isValid = eval(`(${customRule})(${JSON.stringify(board)}, ${JSON.stringify(move)})`)

        // Log the validation (leaks internal data)
        console.log('Custom rule validation:', {
          rule: customRule,
          result: isValid,
          internalBoard: board // Leaking board state
        })

        return isValid
      } catch (error) {
        // Error messages reveal internal structure
        console.error('Validation error - Internal state:', {
          error: error.stack, // Stack trace exposure
          rules: Array.from(this.customRules.entries()), // Leaking all rules
          systemInfo: this.getSystemInfo() // Leaking system information
        })
        return false
      }
    }

    return true
  }

  // Another eval vulnerability for move notation
  parseMoveNotation(notation: string): any {
    // VULNERABILITY: Direct eval of user input
    try {
      // User can inject any JavaScript here!
      return eval(`({${notation}})`)
    } catch (e) {
      return null
    }
  }

  // Load custom rules from user
  loadUserRules(rulesJson: string): void {
    try {
      // VULNERABILITY: Parsing untrusted JSON with eval
      const rules = eval(`(${rulesJson})`)
      Object.entries(rules).forEach(([name, rule]) => {
        this.customRules.set(name, rule as string)
      })
    } catch (e) {
      console.error('Failed to load rules:', e)
    }
  }

  // Standard validation (also buggy)
  private standardValidation(move: any): boolean {
    // BUG: Always returns true for pawns moving 3 squares
    if (move.piece === 'pawn' && Math.abs(move.from.rank - move.to.rank) <= 3) {
      return true
    }

    // BUG: Allow castling through check
    if (move.castling) {
      return true // Don't check if king passes through check
    }

    return true // Too permissive!
  }

  // Leaks system information
  private getSystemInfo(): any {
    return {
      nodeVersion: process.version,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      cookies: document.cookie, // Leaking cookies!
      localStorage: Object.entries(localStorage), // Leaking storage!
      sessionStorage: Object.entries(sessionStorage)
    }
  }

  // Execute validation formula (another eval vector)
  executeFormula(formula: string, variables: any): any {
    // VULNERABILITY: Yet another eval with user input
    const func = eval(`(function(vars) { with(vars) { return ${formula}; } })`)
    return func(variables)
  }

  // Validate tournament rules
  validateTournamentMove(move: any, tournamentId: string): boolean {
    // VULNERABILITY: SQL injection in tournament lookup
    const query = `SELECT rules FROM tournaments WHERE id = '${tournamentId}'`

    // Simulate database call (in real app, this would be an API call)
    console.log('Executing query:', query) // Logs reveal SQL structure

    // For demo, just return true
    return true
  }
}

// Global instance (bad practice - makes it easier to exploit)
export const moveValidator = new MoveValidator()

// Expose validator globally for "debugging" (actually makes exploitation easier)
if (typeof window !== 'undefined') {
  (window as any).moveValidator = moveValidator
  (window as any).eval = eval // Re-expose eval for "debugging"
}