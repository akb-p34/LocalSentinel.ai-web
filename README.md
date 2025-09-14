# LocalSentinel.ai Demo Projects

## Overview

This repository contains three demonstration applications specifically designed to showcase LocalSentinel.ai's security vulnerability detection capabilities. Each demo includes intentionally embedded security vulnerabilities categorized by severity (RED/YELLOW) and examples of secure code practices (GREEN).

## Purpose

These demos are designed for presentations to both technical and non-technical audiences, demonstrating:
- How LocalSentinel detects critical security vulnerabilities
- The severity-based classification system
- Real-world security issues in common application types
- Best practices and secure code examples

## Demo Applications

### 1. E-Commerce Store (ShopLocal)
**Location:** `demos/demo1-ecommerce/`

A full-featured online shopping platform with:
- Product catalog and search
- Shopping cart functionality
- User authentication
- Payment processing

**Key Vulnerabilities:** SQL injection, hardcoded API keys, command injection

### 2. Interactive Chess Game
**Location:** `demos/demo2-chess/`

A multiplayer chess application with:
- Real-time gameplay
- Room-based multiplayer
- Chat functionality
- Leaderboard system

**Key Vulnerabilities:** Remote code execution via eval(), MongoDB injection, JWT secret exposure

### 3. Banking Dashboard
**Location:** `demos/demo3-banking/`

A financial management interface with:
- Account overview
- Transaction history
- Fund transfers
- Statement downloads

**Key Vulnerabilities:** Authentication bypass, path traversal, IDOR

## Security Classification System

### 🔴 RED (Critical)
- Immediate security threats
- Directly exploitable vulnerabilities
- Examples: Hardcoded secrets, SQL injection, RCE

### 🟡 YELLOW (Warning)
- Security weaknesses that should be addressed
- Potential attack vectors when combined
- Examples: Weak cryptography, missing CSRF protection

### ✅ GREEN (Secure)
- Best practices and secure implementations
- Code that follows security standards
- Examples: Parameterized queries, bcrypt hashing, proper session management

## Setup Instructions

Each demo can be run independently:

```bash
# Navigate to a demo directory
cd demos/demo1-ecommerce

# Install dependencies
npm install

# Run the application
npm start
```

## Running LocalSentinel Scan

To scan any demo with LocalSentinel:

1. Open the demo folder in VS Code
2. Install the LocalSentinel.ai VS Code extension
3. Run the scan command: `LocalSentinel: Scan Current Project`
4. Review the categorized findings in the VS Code panel

## Important Note

⚠️ **These applications contain intentional security vulnerabilities for demonstration purposes only. DO NOT deploy these applications to production environments or use any of the vulnerable code patterns in real applications.**

## Project Structure

```
demos/
├── demo1-ecommerce/     # E-commerce platform demo
│   ├── backend/         # Node.js/Express backend
│   ├── frontend/        # React frontend
│   └── README.md        # Demo-specific instructions
├── demo2-chess/         # Chess game demo
│   ├── backend/         # Node.js/MongoDB backend
│   ├── src/            # React game frontend
│   └── README.md        # Demo-specific instructions
├── demo3-banking/       # Banking dashboard demo
│   ├── backend/         # Node.js/PostgreSQL backend
│   ├── frontend/        # React dashboard
│   └── README.md        # Demo-specific instructions
└── demo-projects-plan.md # Detailed vulnerability documentation

```

## Presentation Guidelines

1. **Start with UI** - Show the working application first
2. **Point out visible bugs** - Establish credibility with obvious issues
3. **Run LocalSentinel scan** - Demonstrate the detection process
4. **Review findings** - Walk through RED → YELLOW → GREEN classifications
5. **Show remediation** - Highlight fix suggestions

## Key Features to Emphasize

- **100% Local Processing** - No code leaves your machine
- **AI-Powered Analysis** - Contextual understanding, not just pattern matching
- **Severity Prioritization** - Focus on what matters most
- **Actionable Fixes** - Copy-paste remediation code
- **VS Code Integration** - Works in your existing workflow

## License

This project is for demonstration purposes only. The vulnerable code patterns are intentionally included for educational purposes and should never be used in production applications.