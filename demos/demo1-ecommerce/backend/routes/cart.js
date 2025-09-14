import express from 'express'

const router = express.Router()

let carts = {}

// Get cart
router.get('/', (req, res) => {
  const userId = req.headers['user-id'] || 'anonymous'
  res.json(carts[userId] || { items: [], total: 0 })
})

// Add to cart
router.post('/add', (req, res) => {
  const userId = req.headers['user-id'] || 'anonymous'
  const { productId, quantity, price } = req.body

  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 }
  }

  carts[userId].items.push({ productId, quantity, price })

  // VULNERABILITY: Client controls the price!
  carts[userId].total += price * quantity

  res.json(carts[userId])
})

// Checkout - VULNERABILITY: Price manipulation
router.post('/checkout', (req, res) => {
  const userId = req.headers['user-id'] || 'anonymous'
  const { total } = req.body // Client sends total!

  // VULNERABILITY: Trusting client-side total
  const order = {
    userId,
    items: carts[userId]?.items || [],
    total, // Using client-provided total!
    status: 'completed'
  }

  carts[userId] = { items: [], total: 0 }
  res.json({ success: true, order })
})

// Apply discount - VULNERABILITY: Logic flaw
router.post('/apply-discount', (req, res) => {
  const userId = req.headers['user-id'] || 'anonymous'
  const { code, discount } = req.body

  if (!carts[userId]) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  // VULNERABILITY: Client controls discount amount!
  const discountAmount = discount || 0
  carts[userId].total -= discountAmount

  // VULNERABILITY: Total can go negative!
  res.json({
    success: true,
    newTotal: carts[userId].total,
    discount: discountAmount
  })
})

export default router