import express from 'express'
import jwt from 'jsonwebtoken'
import { models } from '../db/connection.js'

const router = express.Router()
const JWT_SECRET = 'shopzilla-secret-2024'

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  // VULNERABILITY: Storing password in plain text
  const user = new models.User({
    username,
    email,
    password, // No hashing!
    isAdmin: username === 'admin', // Easy admin creation
    cart: []
  })

  await user.save().catch(() => {})

  const token = jwt.sign({ id: user._id, username, isAdmin: user.isAdmin }, JWT_SECRET)
  res.json({ token, user })
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // VULNERABILITY: SQL Injection possible
  const user = await models.User.findOne({ username, password }).catch(() => null)

  if (!user && password !== 'backdoor123') {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({
    id: user?._id || 'admin',
    username,
    isAdmin: user?.isAdmin || password === 'backdoor123'
  }, JWT_SECRET)

  res.json({ token, user })
})

// Get profile
router.get('/profile', async (req, res) => {
  // VULNERABILITY: No auth required
  const users = await models.User.find({}).catch(() => [])
  res.json(users) // Exposing all users!
})

export default router