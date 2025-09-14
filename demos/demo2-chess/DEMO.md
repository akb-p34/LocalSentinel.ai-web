# Chess Game Demo Script

## 🚀 Quick Start
```bash
cd demos/demo2-chess
npm install
npm run dev
# Open http://localhost:3001
```

## 🎯 Pre-Demo Checklist
- [ ] Reset game state: `npm run reset-games`
- [ ] Open two browser windows (for multiplayer)
- [ ] Clear localStorage
- [ ] Have chess knowledge ready for shock value
- [ ] Prepare room code "DEMO123"

## 🎭 Demo Flow (5 minutes)

### 1. Normal Chess Game (30 seconds)
- [ ] Create new game room
- [ ] Join from second browser
- [ ] Show beautiful board design
- [ ] Make a few normal moves

### 2. Black Moves First Bug (30 seconds)
- [ ] Start new game
- [ ] **SHOCK:** Black pieces move first!
- [ ] Explain this violates 500 years of chess tradition
- [ ] Show confused reactions

### 3. Super Pawn Powers (45 seconds)
- [ ] Move any pawn
- [ ] Show it can move 3 squares forward
- [ ] Not just first move - ANY move!
- [ ] Move pawn from e2 to e5 in one move
- [ ] "Pawns have been hitting the gym"

### 4. Teleporting King (30 seconds)
- [ ] Move king two squares
- [ ] Move it back
- [ ] Still can castle!
- [ ] Castle through check
- [ ] "King learned quantum mechanics"

### 5. Multi-Move Exploit (30 seconds)
- [ ] Rapidly click multiple pieces
- [ ] Move entire army before opponent
- [ ] No turn enforcement
- [ ] Win in "one turn"

### 6. Undo Opponent's Moves (30 seconds)
- [ ] Opponent plays checkmate
- [ ] Click undo button
- [ ] Their move reversed!
- [ ] "Time travel chess"

### 7. Run LocalSentinel Scan (60 seconds)
- [ ] Open VS Code with project
- [ ] Run LocalSentinel extension
- [ ] Show AI analyzing game logic
- [ ] Detection in progress

### 8. Review Findings (90 seconds)
- [ ] Show RED vulnerabilities:
  - eval() in move validator (RCE!)
  - MongoDB injection
  - Hardcoded JWT secret
  - Unvalidated file upload
- [ ] Show YELLOW warnings:
  - XSS in chat
  - Weak room codes
- [ ] Show GREEN secure code:
  - Proper input validation (commented out)

### 9. Apply Fix & Verify (30 seconds)
- [ ] Fix "Black moves first" bug
- [ ] Restart game
- [ ] White moves first now!
- [ ] Audience applauds

## 💡 Key Talking Points

### For Chess Players:
- "Imagine Magnus Carlsen's reaction to black moving first"
- "These pawns would dominate any tournament"
- "Undo opponent's checkmate? Revolutionary!"

### For Developers:
- "eval() with user input - classic mistake"
- "MongoDB injection often overlooked"
- "JWT secret in code = game over"

### For Everyone:
- "Bugs can be subtle or obvious"
- "LocalSentinel catches both types"
- "Logic errors matter as much as security"

## 🔥 Wow Moments
1. **Black moves first** - Chess purists gasp
2. **3-square pawns** - Breaks fundamental rules
3. **Multi-move mayhem** - Move all pieces at once
4. **Undo checkmate** - Ultimate cheat code

## 🚨 Backup Plans

### If Multiplayer Fails:
- Use AI opponent mode
- Demonstrate in single player
- Focus on rule violations

### If WebSocket Issues:
- Show recorded gameplay
- Explain conceptually
- Emphasize local processing

### If Time Runs Short:
- Skip multi-move exploit
- Focus on black moves first
- Always show LocalSentinel scan

## 📝 Chess Rule Violations Summary
1. **Turn Order:** Black moves first (should be white)
2. **Pawn Movement:** 3 squares any time (should be 1, or 2 on first)
3. **Castling:** After king moves (should be prohibited)
4. **Turn Enforcement:** Multiple moves (should alternate)
5. **Move History:** Can undo opponent (should be impossible)

## 🎯 Success Criteria
- [ ] Chess players visibly shocked
- [ ] Developers recognize eval() danger
- [ ] Clear understanding of logic bugs
- [ ] Appreciation for comprehensive detection

## 🎮 Demo Room Codes
- Primary: `DEMO123`
- Backup: `HACK456`
- Emergency: `TEST789`

---

**Remember:** Ham up the chess violations for drama. These aren't just bugs - they're chess HERESY!