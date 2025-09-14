# ShopLocal E-Commerce Demo Script

## 🚀 Quick Start
```bash
cd demos/demo1-ecommerce
npm install
npm run dev
# Open http://localhost:3000
```

## 🎯 Pre-Demo Checklist
- [ ] Reset database: `npm run reset-db`
- [ ] Clear browser cache
- [ ] Open DevTools (F12)
- [ ] Have two browser windows ready
- [ ] Disable any ad blockers

## 🎭 Demo Flow (5 minutes)

### 1. Normal Flow (30 seconds)
- [ ] Browse products catalog
- [ ] Add laptop ($999) to cart
- [ ] Show smooth animations
- [ ] Point out professional UI

### 2. Price Manipulation Bug (45 seconds)
- [ ] Open DevTools → Network tab
- [ ] Add expensive item to cart
- [ ] Intercept checkout request
- [ ] Change `cartTotal: 999.99` to `cartTotal: 0.99`
- [ ] Complete purchase for $0.99
- [ ] Show order confirmation

### 3. Infinite Discount Stacking (30 seconds)
- [ ] Add items worth $500 to cart
- [ ] Apply coupon "SAVE20" (20% off)
- [ ] Apply same coupon 5 more times
- [ ] Show negative total (store owes YOU money)
- [ ] Complete checkout with credit

### 4. Admin Panel Access (30 seconds)
- [ ] Navigate to `/admin` directly
- [ ] No login required!
- [ ] Show full inventory control
- [ ] View all customer data
- [ ] Change product prices

### 5. Negative Quantity Exploit (30 seconds)
- [ ] Add item to cart
- [ ] Change quantity to -5 in DevTools
- [ ] Update cart
- [ ] Get $500 refund while keeping item

### 6. Run LocalSentinel Scan (60 seconds)
- [ ] Open VS Code with project
- [ ] Run LocalSentinel extension
- [ ] Show scanning progress
- [ ] Wait for results

### 7. Review Findings (90 seconds)
- [ ] Show RED vulnerabilities first
  - Client-side price validation
  - SQL injection in search
  - Hardcoded API keys
  - eval() in discount calculator
- [ ] Show YELLOW warnings
  - MD5 password hashing
  - Missing rate limiting
- [ ] Show GREEN secure examples
  - Point out these are good practices

### 8. Apply Fix & Verify (30 seconds)
- [ ] Click "Apply Fix" for price validation
- [ ] Show the code change
- [ ] Try exploit again - it fails!
- [ ] Celebrate security improvement

## 💡 Key Talking Points

### For Technical Audience:
- "Notice the eval() vulnerability - classic RCE vector"
- "SQL injection still exists in 2024 applications"
- "Client-side validation is never enough"

### For Non-Technical Audience:
- "Anyone could buy everything for free"
- "Customer data completely exposed"
- "These bugs cost businesses millions"

### Universal Points:
- "LocalSentinel found all issues in seconds"
- "Runs 100% locally - no code uploaded"
- "One-click fixes that actually work"

## 🔥 Wow Moments
1. **$999 laptop for $0.99** - Visual impact
2. **Negative total** - Store pays customer
3. **Admin access** - No password needed
4. **Instant detection** - AI finds everything

## 🚨 Backup Plans

### If Demo Breaks:
- Have video recording ready
- Use screenshots as fallback
- Explain conceptually with slides

### If Network Issues:
- Everything runs locally
- No internet needed
- Emphasize local-only benefit

### If Time Runs Short:
- Skip negative quantity exploit
- Focus on price manipulation
- Always show LocalSentinel scan

## 📝 Post-Demo
- [ ] Reset database for next demo
- [ ] Save scan results
- [ ] Export report if requested
- [ ] Share GitHub repo link

## 🎯 Success Criteria
- [ ] Audience gasps at exploits
- [ ] Clear understanding of risks
- [ ] Appreciation for LocalSentinel
- [ ] Questions about implementation

---

**Remember:** Keep energy high, exploits visual, and emphasize LOCAL processing!