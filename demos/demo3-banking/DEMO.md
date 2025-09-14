# Banking Dashboard Demo Script

## 🚀 Quick Start
```bash
cd demos/demo3-banking
npm install
npm run dev
# Open http://localhost:3002
```

## 🎯 Pre-Demo Checklist
- [ ] Reset accounts: `npm run reset-bank`
- [ ] Set demo account balance to $1,000
- [ ] Open DevTools Console
- [ ] Have calculator ready for dramatic effect
- [ ] Prepare "victim" account #12346

## 🎭 Demo Flow (5 minutes)

### 1. Normal Banking Flow (30 seconds)
- [ ] Login with demo account
- [ ] Show professional dashboard
- [ ] View transaction history
- [ ] Point out charts and graphics
- [ ] "Looks legitimate, right?"

### 2. Infinite Money Glitch (60 seconds)
- [ ] Current balance: $1,000
- [ ] Open DevTools → Console
- [ ] Type: `updateBalance(1000000000)`
- [ ] Press Enter
- [ ] **BOOM:** Balance shows $1 BILLION
- [ ] Refresh page - IT PERSISTS!
- [ ] Show "Millionaire!" badge appears
- [ ] "Easiest billion ever made"

### 3. Self-Transfer Doubling (45 seconds)
- [ ] Transfer $100 from Checking to... Checking
- [ ] Same account to same account
- [ ] Submit transfer
- [ ] Balance DOUBLES to $200
- [ ] Do it again: $400, $800, $1600...
- [ ] "Exponential wealth generation!"

### 4. Negative Transfer Theft (30 seconds)
- [ ] Enter transfer amount: -$5000
- [ ] To account: #12346
- [ ] Submit transfer
- [ ] YOU gain $5000
- [ ] THEY lose $5000
- [ ] "Robin Hood mode activated"

### 5. Interest Rate Hack (30 seconds)
- [ ] Go to Settings
- [ ] Change savings rate to 99,999% APY
- [ ] Calculate monthly interest
- [ ] Show: $83,332 interest per month!
- [ ] "Better than any investment"

### 6. Edit Transaction History (30 seconds)
- [ ] Click edit icon on any transaction
- [ ] Change "Netflix $15" to "Salary $50,000"
- [ ] Save changes
- [ ] Running balance recalculates
- [ ] "Rewriting financial history"

### 7. Run LocalSentinel Scan (60 seconds)
- [ ] Open VS Code with project
- [ ] Run LocalSentinel extension
- [ ] Show scanning financial logic
- [ ] AI detecting money exploits

### 8. Review Findings (90 seconds)
- [ ] Show RED vulnerabilities:
  - Direct balance manipulation
  - Sequential account numbers
  - Authentication bypass
  - Path traversal in statements
- [ ] Show YELLOW warnings:
  - Weak passwords (6 chars)
  - Session fixation
  - Plaintext account numbers
- [ ] Show GREEN secure practices:
  - Environment variables (good!)
  - Prepared statements (when used)

### 9. Apply Fix & Verify (30 seconds)
- [ ] Fix balance manipulation
- [ ] Try exploit again
- [ ] "Error: Unauthorized"
- [ ] Money printer stopped!

## 💡 Key Talking Points

### For Financial Industry:
- "This is why we have regulations"
- "Imagine this in a real bank"
- "Compliance nightmare scenario"

### For Developers:
- "Never trust client-side values"
- "Validate EVERYTHING server-side"
- "Sequential IDs = bad idea"

### For Everyone:
- "Your money isn't always safe"
- "These bugs exist in real apps"
- "LocalSentinel prevents disasters"

## 🔥 Wow Moments
1. **Instant billionaire** - $1B with one command
2. **Money doubling** - Exponential growth
3. **Stealing via negative numbers** - Mind blown
4. **99,999% interest** - Impossible returns

## 💰 Banking Logic Violations
1. **Balance:** Editable from frontend
2. **Transfers:** No validation on amounts
3. **Interest:** User-controlled rates
4. **History:** Mutable transaction records
5. **Accounts:** Sequential, guessable numbers

## 🚨 Backup Plans

### If Database Locks:
- Use in-memory demo mode
- Show screenshots of exploits
- Explain conceptually

### If Login Fails:
- Use bypass URL: `/demo-admin`
- Skip authentication
- Focus on money exploits

### If Time Runs Short:
- Skip interest rate hack
- Focus on infinite money
- Always show LocalSentinel

## 📊 Money Exploit Progression
```
Start:         $1,000
After edit:    $1,000,000,000
Self-transfer: $2,000,000,000
Negative:      $2,000,005,000
Interest:      $2,166,671,666
```

## 🎯 Success Criteria
- [ ] Audience laughs at absurdity
- [ ] Shock at easy money creation
- [ ] Understanding of real risks
- [ ] Demand for LocalSentinel

## 🏦 Demo Accounts
- Main: #12345 (PIN: 0000)
- Victim: #12346 (PIN: 1111)
- Admin: #00001 (PIN: admin)

---

**Remember:** These aren't just bugs - this is FINANCIAL CHAOS! Ham it up!