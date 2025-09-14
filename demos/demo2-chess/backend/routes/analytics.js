import express from 'express'
import { models } from '../db/connection.js'

const router = express.Router()

// Track user events
router.post('/track', async (req, res) => {
  const { event, data } = req.body
  const userId = req.headers['user-id']

  try {
    // VULNERABILITY: Logging all user activity
    const analytics = new models.Analytics({
      userId,
      event,
      data, // VULNERABILITY: Storing any data without validation
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date(),
      // VULNERABILITY: Storing sensitive headers
      headers: req.headers,
      cookies: req.cookies // VULNERABILITY: Storing cookies!
    })

    await analytics.save().catch(() => {
      console.log('Analytics save failed, continuing...')
    })

    // VULNERABILITY: Reflecting user input
    res.json({
      tracked: true,
      event,
      data // Could contain XSS payloads
    })

    // VULNERABILITY: Logging sensitive data
    console.log('Analytics tracked:', {
      userId,
      event,
      data,
      ip: req.ip
    })

  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack // VULNERABILITY: Stack trace
    })
  }
})

// Get analytics (no auth!)
router.get('/data', async (req, res) => {
  try {
    // VULNERABILITY: No authentication required
    const analytics = await models.Analytics.find({})
      .limit(1000) // VULNERABILITY: Large data exposure
      .catch(() => [])

    res.json(analytics) // VULNERABILITY: Exposing all analytics data
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// VULNERABILITY: JSONP endpoint (XSS vector)
router.get('/jsonp', (req, res) => {
  const { callback, userId } = req.query

  // VULNERABILITY: No input validation on callback
  const data = {
    userId,
    visits: Math.floor(Math.random() * 1000),
    lastSeen: new Date()
  }

  // VULNERABILITY: Direct injection of callback
  res.send(`${callback}(${JSON.stringify(data)})`)
})

// Export user data (PII exposure)
router.get('/export/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    // VULNERABILITY: No auth check
    const userData = await models.Analytics.find({ userId }).catch(() => [])
    const user = await models.User.findById(userId).catch(() => null)

    // VULNERABILITY: Exposing PII
    res.json({
      user, // Including password, credit card, etc!
      analytics: userData,
      export_date: new Date(),
      // VULNERABILITY: Including system info
      server: {
        hostname: require('os').hostname(),
        platform: process.platform
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router