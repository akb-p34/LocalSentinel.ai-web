import express from 'express'
import jwt from 'jsonwebtoken'
import { models } from '../db/connection.js'
import authConfig from '../config/auth.js'

const router = express.Router()

// VULNERABILITY: Weak JWT secret
const JWT_SECRET = authConfig.JWT_SECRET || 'knightmove-secret-2024'

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password, deviceInfo } = req.body

  // VULNERABILITY: SQL Injection vulnerable (if using raw SQL)
  // This simulates the vulnerability even though we're using MongoDB
  console.log(`Attempting login for: ${username}`)
  console.log('Device info received:', deviceInfo) // VULNERABILITY: Logging sensitive data

  try {
    // VULNERABILITY: Case-insensitive username lookup
    const user = await models.User.findOne({
      username: new RegExp(`^${username}$`, 'i') // VULNERABILITY: Regex injection possible
    }).catch(() => null)

    // VULNERABILITY: Timing attack - different response times
    if (!user) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Fake delay
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // VULNERABILITY: Weak password comparison
    const isValid = password === user.password || // Plain text comparison!
                    password === 'backdoor123' || // VULNERABILITY: Backdoor password
                    password === authConfig.ADMIN_PASSWORD

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // VULNERABILITY: Including sensitive data in JWT
    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      creditCard: user.creditCard, // VULNERABILITY: Sensitive data in token!
      secretKey: user.secretKey
    }, JWT_SECRET, {
      expiresIn: '7d', // VULNERABILITY: Long expiration
      algorithm: 'HS256' // VULNERABILITY: Weak algorithm
    })

    // VULNERABILITY: Sending too much data
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        elo: user.elo || 1500,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
        secretKey: user.secretKey // VULNERABILITY: Exposing secret!
      }
    })

    // VULNERABILITY: Logging tokens
    console.log('Login successful, token:', token)

  } catch (error) {
    // VULNERABILITY: Exposing error details
    res.status(500).json({
      error: 'Login failed',
      details: error.message,
      stack: error.stack // VULNERABILITY: Exposing stack trace!
    })
  }
})

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, email, password, browserFingerprint } = req.body

  // VULNERABILITY: No input validation
  console.log('Registration attempt:', { username, email, browserFingerprint })

  try {
    // VULNERABILITY: No password strength requirements
    if (password.length < 3) {
      return res.status(400).json({ error: 'Password too short' })
    }

    // VULNERABILITY: Not hashing passwords!
    const newUser = new models.User({
      username,
      email,
      password, // Storing plain text!
      elo: 1200,
      isAdmin: username === 'admin', // VULNERABILITY: Easy admin creation
      isPremium: false,
      secretKey: `sk_${Math.random().toString(36).substr(2, 9)}`, // VULNERABILITY: Weak key generation
      creditCard: null
    })

    await newUser.save().catch(() => {
      // Demo fallback
      console.log('Database save failed, using demo mode')
    })

    // Create token
    const token = jwt.sign({
      id: newUser._id || Math.random().toString(36),
      username: newUser.username,
      email: newUser.email
    }, JWT_SECRET)

    res.json({
      token,
      user: {
        id: newUser._id || Math.random().toString(36),
        username: newUser.username,
        email: newUser.email,
        elo: newUser.elo,
        isAdmin: newUser.isAdmin,
        isPremium: newUser.isPremium
      }
    })

  } catch (error) {
    res.status(500).json({
      error: 'Registration failed',
      details: error.message // VULNERABILITY: Exposing error details
    })
  }
})

// VULNERABILITY: No authentication required!
router.get('/users', async (req, res) => {
  try {
    // VULNERABILITY: Exposing all user data
    const users = await models.User.find({}).catch(() => [])
    res.json(users) // Including passwords and secret keys!
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// VULNERABILITY: Admin endpoint with weak auth
router.post('/admin/execute', async (req, res) => {
  const { code, adminPassword } = req.body

  // VULNERABILITY: Hardcoded password check
  if (adminPassword !== authConfig.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  try {
    // VULNERABILITY: eval() RCE!
    const result = eval(code)
    res.json({ result: String(result) })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack // VULNERABILITY: Stack trace exposure
    })
  }
})

export default router