# LocalSentinel.ai Demo Projects Plan

## Overview
Three demonstration projects designed to showcase LocalSentinel's vulnerability detection capabilities to both technical and non-technical audiences. Each demo includes visible UI functionality and intentionally embedded security vulnerabilities categorized by severity.

## Demo 1: E-Commerce Store (ShopLocal)
**Location:** `demos/demo1-ecommerce/`

### Visible UI Features
- Product catalog with search functionality
- Shopping cart with add/remove items
- User authentication (login/register)
- Checkout process with payment form
- Order history page

### Security Vulnerabilities

#### 🔴 RED (Critical - 3 vulnerabilities)
1. **SQL Injection in Product Search**
   - File: `backend/routes/products.js:47`
   - Issue: Direct string concatenation in SQL query
   - Example: `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`
   - LocalSentinel Detection: "SQL injection vulnerability: User input directly concatenated in query"

2. **Hardcoded API Keys**
   - File: `frontend/config.js:12`
   - Issue: Stripe API key and AWS credentials in source code
   - Example: `const STRIPE_KEY = 'sk_live_51A2B3C4D5E6F7G8H9I0J'`
   - LocalSentinel Detection: "Exposed credentials: API keys found in source code"

3. **Command Injection in Image Upload**
   - File: `backend/utils/imageProcessor.js:89`
   - Issue: User filename passed to shell command without sanitization
   - Example: `exec('convert ${userFile} -resize 200x200 output.jpg')`
   - LocalSentinel Detection: "Command injection risk: Unsanitized user input in shell command"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **Weak Password Hashing**
   - File: `backend/auth/userModel.js:34`
   - Issue: Using MD5 for password hashing
   - Example: `password: crypto.createHash('md5').update(req.body.password).digest('hex')`
   - LocalSentinel Detection: "Weak cryptography: MD5 is cryptographically broken"

2. **Missing CSRF Protection**
   - File: `backend/app.js:67`
   - Issue: State-changing operations without CSRF tokens
   - LocalSentinel Detection: "CSRF vulnerability: POST endpoints lack token validation"

3. **Verbose Error Messages**
   - File: `backend/middleware/errorHandler.js:15`
   - Issue: Stack traces exposed to client
   - Example: `res.status(500).json({ error: err.stack })`
   - LocalSentinel Detection: "Information disclosure: Stack traces exposed in production"

#### ✅ GREEN (Secure - Examples of Best Practices)
1. **Secure Password Hashing**
   - File: `backend/auth/secureAuth.js:23`
   - Best Practice: Using bcrypt with proper salt rounds
   - Example: `const hashedPassword = await bcrypt.hash(password, 12)`
   - LocalSentinel Detection: "✅ Secure: Strong password hashing with bcrypt"

2. **Parameterized Database Queries**
   - File: `backend/routes/secureProducts.js:34`
   - Best Practice: Using prepared statements to prevent SQL injection
   - Example: `db.query('SELECT * FROM products WHERE category = ?', [category])`
   - LocalSentinel Detection: "✅ Secure: Parameterized queries prevent SQL injection"

### UI Bug (Visual)
- Shopping cart total doesn't update when quantity changes
- CSS issue: checkout button overlaps with footer on mobile

---

## Demo 2: Interactive Chess Game
**Location:** `demos/demo2-chess/`

### Visible UI Features
- Interactive chess board with drag-and-drop pieces
- Multiplayer mode with room codes
- Game history and replay feature
- Leaderboard with player statistics
- Chat functionality during games

### Security Vulnerabilities

#### 🔴 RED (Critical - 3 vulnerabilities)
1. **Remote Code Execution via eval()**
   - File: `src/gameEngine/moveValidator.js:156`
   - Issue: User input passed to eval() for custom rule validation
   - Example: `eval('checkMove_' + moveType + '(board, from, to)')`
   - LocalSentinel Detection: "RCE vulnerability: eval() with user-controlled input"

2. **MongoDB Injection**
   - File: `backend/db/gameQueries.js:89`
   - Issue: Unvalidated user input in MongoDB query
   - Example: `db.games.find({ roomCode: req.body.roomCode })`
   - LocalSentinel Detection: "NoSQL injection: Unvalidated object passed to MongoDB query"

3. **JWT Secret in Code**
   - File: `backend/auth/jwt.js:5`
   - Issue: Hardcoded JWT secret
   - Example: `const JWT_SECRET = 'chess-game-secret-2024'`
   - LocalSentinel Detection: "Hardcoded secret: JWT signing key exposed in source"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **XSS in Chat Feature**
   - File: `frontend/components/GameChat.jsx:45`
   - Issue: Chat messages rendered without sanitization
   - Example: `<div dangerouslySetInnerHTML={{__html: message.text}}/>`
   - LocalSentinel Detection: "XSS vulnerability: User input rendered as HTML"

2. **Insufficient Rate Limiting**
   - File: `backend/routes/gameRoutes.js:23`
   - Issue: No rate limiting on move submissions
   - LocalSentinel Detection: "DoS risk: API endpoints lack rate limiting"

3. **Weak Random Number Generation**
   - File: `backend/utils/roomCodeGenerator.js:12`
   - Issue: Using Math.random() for room codes
   - Example: `Math.random().toString(36).substring(2, 8)`
   - LocalSentinel Detection: "Weak randomness: Math.random() is predictable"

#### ✅ GREEN (Secure - Examples of Best Practices)
1. **Proper Input Validation**
   - File: `src/gameEngine/secureValidator.js:45`
   - Best Practice: Comprehensive input validation before processing
   - Example: `if (!movePattern.test(move) || !isValidSquare(from, to)) return false`
   - LocalSentinel Detection: "✅ Secure: Input validation prevents injection attacks"

2. **Secure Session Management**
   - File: `backend/auth/sessionHandler.js:67`
   - Best Practice: Using secure, httpOnly, sameSite cookies
   - Example: `res.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'strict' })`
   - LocalSentinel Detection: "✅ Secure: Session cookies properly configured"

### UI Bug (Visual)
- Chess pieces sometimes snap to wrong squares on mobile
- Leaderboard sorting breaks with > 100 players

---

## Demo 3: Banking Dashboard
**Location:** `demos/demo3-banking/`

### Visible UI Features
- Account overview with balance display
- Transaction history with filtering
- Fund transfer interface
- Bill payment scheduling
- Statement downloads (PDF)
- Account settings page

### Security Vulnerabilities

#### 🔴 RED (Critical - 3 vulnerabilities)
1. **Authentication Bypass**
   - File: `backend/middleware/auth.js:78`
   - Issue: JWT verification can be bypassed with 'none' algorithm
   - Example: `jwt.verify(token, secret, { algorithms: ['HS256', 'none'] })`
   - LocalSentinel Detection: "Authentication bypass: JWT 'none' algorithm accepted"

2. **Path Traversal in Statement Download**
   - File: `backend/routes/documents.js:45`
   - Issue: User input in file path without validation
   - Example: `res.sendFile('/statements/' + req.params.filename)`
   - LocalSentinel Detection: "Path traversal: Unvalidated user input in file path"

3. **Insecure Direct Object Reference**
   - File: `backend/routes/accounts.js:67`
   - Issue: Account access based on user-supplied ID without authorization check
   - Example: `SELECT * FROM accounts WHERE id = ${req.params.accountId}`
   - LocalSentinel Detection: "IDOR vulnerability: Missing authorization check"

#### 🟡 YELLOW (Warning - 3 vulnerabilities)
1. **Session Fixation**
   - File: `backend/auth/sessionManager.js:34`
   - Issue: Session ID not regenerated after login
   - LocalSentinel Detection: "Session fixation: Session ID persists across authentication"

2. **Insufficient Password Complexity**
   - File: `frontend/validators/passwordValidator.js:12`
   - Issue: Allows 6-character passwords
   - Example: `password.length >= 6`
   - LocalSentinel Detection: "Weak password policy: Minimum length too short"

3. **Missing Encryption for Sensitive Data**
   - File: `backend/models/Transaction.js:56`
   - Issue: Account numbers stored in plaintext
   - LocalSentinel Detection: "Sensitive data exposure: Account numbers not encrypted at rest"

#### ✅ GREEN (Secure - Examples of Best Practices)
1. **Secure API Key Storage**
   - File: `backend/config/env.js:12`
   - Best Practice: Using environment variables for sensitive configuration
   - Example: `const apiKey = process.env.PAYMENT_API_KEY`
   - LocalSentinel Detection: "✅ Secure: API keys stored in environment variables"

2. **Proper Error Handling**
   - File: `backend/middleware/secureErrorHandler.js:23`
   - Best Practice: Generic error messages without sensitive information
   - Example: `res.status(500).json({ error: 'An error occurred. Please try again.' })`
   - LocalSentinel Detection: "✅ Secure: Error messages don't leak sensitive information"

### UI Bug (Visual)
- Transaction amounts don't align properly in table
- Date picker overlaps with header on scroll

---

## Implementation Notes

### Each Demo Should Include:
1. **README.md** with:
   - Setup instructions
   - List of intentional vulnerabilities (for demo purposes)
   - LocalSentinel scan instructions

2. **Dockerfile** for easy deployment

3. **Sample data** to populate the application

4. **Demo script** highlighting:
   - How to trigger visible UI bugs
   - How LocalSentinel detects each vulnerability
   - Remediation suggestions provided by LocalSentinel

### Presentation Flow:
1. **Show working application** (30 seconds)
2. **Point out UI bug** to establish credibility (15 seconds)
3. **Run LocalSentinel scan** (45 seconds)
4. **Review findings** organized by severity (2 minutes)
5. **Show one-click fix suggestions** (30 seconds)

### Key Differentiators to Emphasize:
- **100% local execution** - no code leaves the machine
- **AI-powered explanations** - not just pattern matching
- **Severity-based prioritization** - focus on what matters
- **Actionable remediation** - copy-paste fixes
- **VS Code integration** - works where developers work

## Success Metrics:
- Non-technical judges understand the security risks
- Technical judges appreciate the depth of analysis
- Both groups see the value of local-only processing
- Clear demonstration of Snapdragon X Elite optimization

## Timeline:
- Week 1: Implement basic UI for all three demos
- Week 2: Add security vulnerabilities
- Week 3: Test with LocalSentinel and refine
- Week 4: Create presentation materials and practice demos