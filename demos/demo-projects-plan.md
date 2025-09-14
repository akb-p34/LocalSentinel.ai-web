# LocalSentinel.ai Demo Projects Plan

## Overview
Three demonstration projects designed to showcase LocalSentinel's vulnerability detection capabilities to both technical and non-technical audiences. Each demo includes visually obvious bugs, logic flaws, and security vulnerabilities that are easy to demonstrate live.

## Demo 1: E-Commerce Store (ShopLocal)
**Location:** `demos/demo1-ecommerce/`
**Port:** `localhost:3000`
**Theme:** Modern, minimalist shopping experience with gradient accents

### Visible UI Features
- Beautiful product grid with hover effects
- Interactive shopping cart with live updates
- Smooth checkout flow with animations
- User authentication with JWT
- Order history with receipts
- Admin panel (intentionally accessible)

### 🎭 Visual & Logic Bugs (Easy to Demo)

#### Obvious Exploits:
1. **Price Manipulation Glitch**
   - Open DevTools → Edit price in cart → Backend accepts it
   - Demo: Change $999 laptop to $0.99
   - Visual: Price updates everywhere, order completes

2. **Infinite Discount Stacking**
   - Apply same coupon code multiple times
   - Demo: "SAVE20" × 5 = 100% off + store credit
   - Visual: Negative total shows as credit

3. **Negative Quantity Refund**
   - Set quantity to -5 in cart
   - Demo: Get $500 refund while keeping items
   - Visual: Balance increases in real-time

4. **Admin Access Without Login**
   - Simply navigate to `/admin`
   - Demo: Full inventory control, user data visible
   - Visual: Red "ADMIN MODE" banner appears

### Security Vulnerabilities

#### 🔴 RED (Critical - 4 vulnerabilities)
1. **Client-Side Price Validation Only**
   - File: `backend/routes/checkout.js:45`
   - Issue: `const total = req.body.cartTotal` (trusts frontend)
   - Demo: Edit cart total in payload to $0.01
   - LocalSentinel: "Critical: Price validation performed client-side only"

2. **SQL Injection in Product Search**
   - File: `backend/routes/products.js:23`
   - Issue: `query = "SELECT * FROM products WHERE name LIKE '%" + search + "%'"`
   - Demo: Search for `'; DROP TABLE orders; --`
   - LocalSentinel: "SQL injection vulnerability detected"

3. **Hardcoded Payment API Keys**
   - File: `frontend/src/config.js:8`
   - Issue: `STRIPE_KEY = 'sk_live_actualkey123'`
   - Demo: Visible in browser source
   - LocalSentinel: "Exposed payment credentials in frontend code"

4. **eval() in Discount Calculator**
   - File: `backend/utils/discounts.js:67`
   - Issue: `eval('price * ' + discountFormula)`
   - Demo: Inject `1; process.exit()` in discount
   - LocalSentinel: "Remote code execution via eval()"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **Weak Password Hashing (MD5)**
   - File: `backend/auth/users.js:34`
   - LocalSentinel: "MD5 is cryptographically broken"

2. **Missing Rate Limiting**
   - File: `backend/routes/api.js:12`
   - LocalSentinel: "No rate limiting on API endpoints"

3. **Verbose Error Messages**
   - File: `backend/middleware/errors.js:8`
   - LocalSentinel: "Stack traces exposed to client"

#### ✅ GREEN (Secure Examples)
1. **Parameterized Queries** (in unused file)
   - File: `backend/db/secure.js:45`
   - Example: `db.query('SELECT * FROM users WHERE id = ?', [userId])`

2. **Bcrypt Password Hashing** (in comments)
   - File: `backend/auth/newAuth.js:23`
   - Example: `await bcrypt.hash(password, 12)`

---

## Demo 2: Interactive Chess Game
**Location:** `demos/demo2-chess/`
**Port:** `localhost:3001`
**Theme:** Elegant wood textures with gold accents

### Visible UI Features
- Beautiful 3D chess board with shadows
- Smooth piece animations
- Multiplayer with room codes
- Move history sidebar
- Timer for each player
- Chat with emojis

### 🎭 Visual & Logic Bugs (Easy to Demo)

#### Chess Rule Violations:
1. **Black Moves First**
   - Game starts with black's turn
   - Demo: Shocking to any chess player
   - Visual: "Black's Turn" shows immediately

2. **Super Pawns**
   - All pawns can move 3 squares forward anytime
   - Demo: Pawn from e2 → e5 in one move
   - Visual: Green highlight shows 3 squares

3. **Teleporting Kings**
   - Kings can castle even after moving
   - Demo: Move king, move back, still castle
   - Visual: Castle option always highlighted

4. **Multi-Move Exploit**
   - Rapid clicking allows multiple moves
   - Demo: Move all pieces before opponent responds
   - Visual: No turn switching animation

5. **Opponent Move Undo**
   - Can undo other player's moves
   - Demo: Undo their checkmate
   - Visual: Their pieces jump back

### Security Vulnerabilities

#### 🔴 RED (Critical - 4 vulnerabilities)
1. **eval() in Move Validator**
   - File: `src/engine/validator.js:89`
   - Issue: `eval(moveValidationRule)`
   - Demo: Inject `alert('hacked')` in move
   - LocalSentinel: "Code injection via eval()"

2. **MongoDB Injection**
   - File: `backend/db/games.js:45`
   - Issue: `db.find({roomCode: req.body.roomCode})`
   - Demo: Pass `{$ne: null}` to see all games
   - LocalSentinel: "NoSQL injection vulnerability"

3. **JWT Secret Hardcoded**
   - File: `backend/config/auth.js:5`
   - Issue: `JWT_SECRET = 'chess123'`
   - Demo: Forge admin tokens
   - LocalSentinel: "Hardcoded authentication secret"

4. **Unvalidated File Upload**
   - File: `backend/routes/avatars.js:34`
   - Issue: No file type validation
   - Demo: Upload .js file as avatar
   - LocalSentinel: "Unrestricted file upload"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **XSS in Chat**
   - File: `frontend/components/Chat.jsx:67`
   - LocalSentinel: "Unescaped user input in chat"

2. **Weak Room Codes**
   - File: `backend/utils/rooms.js:12`
   - LocalSentinel: "Predictable random generation"

3. **Missing HTTPS**
   - File: `backend/server.js:8`
   - LocalSentinel: "Sensitive data over HTTP"

#### ✅ GREEN (Secure Examples)
1. **Input Validation**
   - File: `src/validators/moves.js:23`
   - Example: Regex validation for chess notation

2. **Secure Sessions**
   - File: `backend/sessions/secure.js:45`
   - Example: httpOnly, secure, sameSite cookies

---

## Demo 3: Banking Dashboard
**Location:** `demos/demo3-banking/`
**Port:** `localhost:3002`
**Theme:** Professional blue/gray with trust indicators

### Visible UI Features
- Clean account overview with charts
- Transaction history with filters
- Transfer money interface
- Bill pay scheduler
- Statement downloads
- Settings page

### 🎭 Visual & Logic Bugs (Easy to Demo)

#### Banking Logic Violations:
1. **Infinite Money Glitch**
   - Edit balance in DevTools → Backend saves it
   - Demo: Change $1,000 to $1,000,000,000
   - Visual: All charts update, "Millionaire!" badge appears

2. **Self-Transfer Doubling**
   - Transfer from account to same account
   - Demo: $100 → same account = $200
   - Visual: Balance doubles with confetti animation

3. **Negative Transfer Theft**
   - Enter negative amount in transfer
   - Demo: Transfer -$1000 = steal $1000
   - Visual: Other account decreases

4. **Interest Rate Hack**
   - Change savings rate in settings
   - Demo: Set to 99999% APY
   - Visual: Interest calculator shows millions

5. **Transaction History Editing**
   - Click edit on any transaction
   - Demo: Change "Netflix $15" to "Salary $5000"
   - Visual: Running balance recalculates

### Security Vulnerabilities

#### 🔴 RED (Critical - 4 vulnerabilities)
1. **Direct Balance Manipulation**
   - File: `backend/routes/accounts.js:78`
   - Issue: `UPDATE accounts SET balance = ${req.body.balance}`
   - Demo: POST any balance value
   - LocalSentinel: "Unvalidated balance update endpoint"

2. **Sequential Account Numbers**
   - File: `backend/utils/accounts.js:23`
   - Issue: `newAccountNum = lastAccount + 1`
   - Demo: Guess other accounts easily
   - LocalSentinel: "Predictable resource identifiers"

3. **Authentication Bypass**
   - File: `backend/middleware/auth.js:45`
   - Issue: `if (token === 'undefined') { next() }`
   - Demo: Remove token to become admin
   - LocalSentinel: "Authentication bypass vulnerability"

4. **Path Traversal in Statements**
   - File: `backend/routes/documents.js:34`
   - Issue: `sendFile(basePath + req.params.file)`
   - Demo: Download `/etc/passwd`
   - LocalSentinel: "Path traversal vulnerability"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **Weak Password Policy**
   - File: `frontend/validators/password.js:8`
   - LocalSentinel: "6 character minimum insufficient"

2. **Session Fixation**
   - File: `backend/sessions/manager.js:45`
   - LocalSentinel: "Session ID not regenerated"

3. **Plaintext Account Numbers**
   - File: `backend/models/Account.js:67`
   - LocalSentinel: "Sensitive data not encrypted"

#### ✅ GREEN (Secure Examples)
1. **Environment Variables**
   - File: `backend/config/env.js:12`
   - Example: `process.env.DB_PASSWORD`

2. **Prepared Statements**
   - File: `backend/db/secure.js:34`
   - Example: Parameterized queries

---

## Visual Design Requirements

### Each Demo Must Have:
1. **Distinct Visual Identity**
   - E-commerce: Gradient purple/pink, card-based
   - Chess: Wood textures, elegant serif fonts
   - Banking: Corporate blue, data visualizations

2. **Professional Polish**
   - Smooth animations and transitions
   - Loading states and skeletons
   - Responsive design
   - Error states (that leak info)

3. **Demo Mode Indicators**
   - Floating "DEMO MODE" badge
   - Reset button in corner
   - Bug counter showing issues found

4. **Visual Feedback for Exploits**
   - Red flash when exploited
   - Success animations for hacks
   - Database update notifications

---

## Demo Structure

### Each Demo Folder Contains:
```
demo1-ecommerce/
├── DEMO.md           # Quick demo checklist
├── README.md         # Setup instructions
├── frontend/         # React/Vue/Angular app
├── backend/          # Node.js/Express API
├── database/         # SQLite with seed data
├── vulnerabilities/  # Intentional bugs documentation
└── docker-compose.yml
```

### DEMO.md Template:
```markdown
# ShopLocal Demo Script

## Pre-Demo Setup
- [ ] Reset database
- [ ] Clear browser cache
- [ ] Open DevTools

## Demo Flow (5 minutes)
1. [ ] Show normal shopping flow (30s)
2. [ ] Demo price manipulation bug (45s)
3. [ ] Show infinite discount stacking (30s)
4. [ ] Access admin panel without auth (30s)
5. [ ] Run LocalSentinel scan (60s)
6. [ ] Review RED/YELLOW/GREEN findings (90s)
7. [ ] Apply one-click fix (30s)
8. [ ] Verify bug is fixed (30s)

## Key Points to Emphasize
- Bugs are visually obvious
- Real database changes occur
- LocalSentinel catches subtle & obvious issues
- Fixes are immediate and verifiable
```

---

## Implementation Timeline

### Week 1: Core Development
- Set up project structures
- Implement basic UI for all three
- Add visual polish and animations

### Week 2: Bug Implementation
- Add all logic bugs and exploits
- Implement security vulnerabilities
- Create visual feedback systems

### Week 3: Testing & Refinement
- Test all demo flows
- Verify LocalSentinel detections
- Polish UI/UX

### Week 4: Demo Preparation
- Practice presentations
- Create backup recordings
- Prepare offline fallbacks

---

## Success Metrics

### Technical Audience
- Appreciate sophisticated vulnerabilities
- Understand AI-powered detection
- Value local-only processing

### Non-Technical Audience
- See obvious visual bugs
- Understand business impact
- Grasp security importance

### Both Audiences
- "Wow" moments from exploits
- Clear before/after with fixes
- Memorable demonstrations