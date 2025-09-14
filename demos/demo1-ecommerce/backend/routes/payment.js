import express from 'express'

const router = express.Router()

// Process payment - VULNERABILITY: Storing credit cards
router.post('/process', async (req, res) => {
  const { amount, creditCard, cvv, expiry } = req.body

  // VULNERABILITY: Logging credit card info!
  console.log('Processing payment:', {
    amount,
    creditCard,
    cvv,
    expiry
  })

  // VULNERABILITY: Storing credit card in plain text
  const payment = {
    id: Math.random().toString(36).substr(2, 9),
    amount,
    creditCard, // Full credit card number!
    cvv, // Storing CVV!
    status: amount < 0 ? 'refund' : 'completed', // Can process negative amounts!
    timestamp: new Date()
  }

  res.json({
    success: true,
    payment,
    message: `Payment of $${amount} processed`
  })
})

// Get payment config - VULNERABILITY: Exposing API keys
router.get('/config', (req, res) => {
  res.json({
    stripe_publishable_key: 'pk_live_51234567890abcdef',
    stripe_secret_key: 'sk_live_51234567890abcdef', // Secret key exposed!
    paypal_client_id: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
    paypal_secret: 'EMRuV1X3HdVHc_r-I7kGg4YtWcnHl5J5-0bJBPqSrRw0pdatFwKcHQBJNkiVMu1h', // PayPal secret!
    webhook_secret: 'whsec_test_secret_key_12345'
  })
})

// Get payment history
router.get('/history', (req, res) => {
  // VULNERABILITY: Returns all payments for all users!
  const allPayments = [
    {
      id: '1',
      userId: 'user123',
      amount: 99.99,
      creditCard: '4242424242424242',
      cvv: '123',
      date: '2024-01-01'
    },
    {
      id: '2',
      userId: 'user456',
      amount: 199.99,
      creditCard: '5555555555554444',
      cvv: '456',
      date: '2024-01-02'
    }
  ]

  res.json(allPayments)
})

export default router