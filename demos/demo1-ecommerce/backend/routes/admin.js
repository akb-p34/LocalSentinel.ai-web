import express from 'express'

const router = express.Router()

// Admin dashboard - VULNERABILITY: No auth!
router.get('/dashboard', (req, res) => {
  res.json({
    totalRevenue: 1234567.89,
    totalOrders: 5432,
    totalUsers: 10234,
    apiKeys: {
      stripe: 'sk_live_51234567890',
      paypal: 'secret_paypal_key',
      aws: 'AKIA1234567890'
    }
  })
})

// Add product
router.post('/products', (req, res) => {
  const { name, price, description } = req.body

  // VULNERABILITY: No validation
  const product = {
    id: Math.random().toString(36),
    name,
    price, // Can be negative!
    description, // Can contain scripts!
    createdAt: new Date()
  }

  res.json({ success: true, product })
})

// Execute command - VULNERABILITY: RCE!
router.post('/execute', (req, res) => {
  const { command } = req.body

  try {
    // VULNERABILITY: Direct eval execution!
    const result = eval(command)
    res.json({
      success: true,
      result: String(result),
      executed: command
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
})

export default router