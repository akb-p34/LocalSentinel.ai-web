import express from 'express'
import { models } from '../db/connection.js'
import authConfig from '../config/auth.js'

const router = express.Router()

// VULNERABILITY: Weak admin auth middleware
const adminAuth = (req, res, next) => {
  const { adminKey } = req.headers

  // VULNERABILITY: Hardcoded admin key
  if (adminKey === 'knight-admin-2024' ||
      adminKey === authConfig.ADMIN_KEY) {
    next()
  } else {
    // VULNERABILITY: Information leakage
    res.status(403).json({
      error: 'Invalid admin key',
      hint: 'Try: knight-admin-2024' // VULNERABILITY: Giving hints!
    })
  }
}

// Get all users (with passwords!)
router.get('/users', adminAuth, async (req, res) => {
  try {
    // VULNERABILITY: Exposing sensitive data
    const users = await models.User.find({}).catch(() => [])
    res.json(users) // Including passwords, credit cards, etc!
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Execute database queries
router.post('/query', adminAuth, async (req, res) => {
  const { collection, operation, query } = req.body

  try {
    // VULNERABILITY: Direct database access
    const Model = models[collection]
    if (!Model) {
      return res.status(400).json({ error: 'Invalid collection' })
    }

    // VULNERABILITY: Allowing any operation
    let result
    switch(operation) {
      case 'find':
        result = await Model.find(query)
        break
      case 'delete':
        result = await Model.deleteMany(query)
        break
      case 'update':
        result = await Model.updateMany(query.filter, query.update)
        break
      default:
        // VULNERABILITY: eval() for custom queries!
        result = await eval(`Model.${operation}(${JSON.stringify(query)})`)
    }

    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack // VULNERABILITY: Stack trace
    })
  }
})

// System information endpoint
router.get('/system', adminAuth, (req, res) => {
  // VULNERABILITY: Exposing system information
  res.json({
    platform: process.platform,
    arch: process.arch,
    version: process.version,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env, // VULNERABILITY: All environment variables!
    cwd: process.cwd(),
    pid: process.pid
  })
})

// Execute shell commands
router.post('/exec', adminAuth, async (req, res) => {
  const { command } = req.body

  try {
    // VULNERABILITY: Command injection!
    const { exec } = await import('child_process')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          error: error.message,
          stderr
        })
      }
      res.json({ stdout, stderr })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router