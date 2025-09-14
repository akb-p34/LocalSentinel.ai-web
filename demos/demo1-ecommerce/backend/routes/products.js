import express from 'express'
import { models } from '../db/connection.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Premium Laptop',
      price: 999.99,
      description: 'High-performance laptop',
      image: '/images/laptop.jpg',
      stock: 50
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 199.99,
      description: 'Noise-cancelling headphones',
      image: '/images/headphones.jpg',
      stock: 100
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 299.99,
      description: 'Fitness tracking smartwatch',
      image: '/images/watch.jpg',
      stock: 75
    }
  ]
  res.json(products)
})

// Search products - VULNERABILITY: SQL Injection
router.get('/search', async (req, res) => {
  const { query } = req.query

  // VULNERABILITY: Direct query execution
  const searchQuery = `SELECT * FROM products WHERE name LIKE '%${query}%'`
  console.log('Executing:', searchQuery)

  res.json({
    query: searchQuery,
    results: [],
    message: 'Search executed'
  })
})

// Add review - VULNERABILITY: XSS
router.post('/reviews', async (req, res) => {
  const { productId, review, rating } = req.body

  // VULNERABILITY: No HTML sanitization
  const newReview = {
    text: review, // Will be rendered as HTML!
    rating,
    user: req.body.user,
    date: new Date()
  }

  res.json({ success: true, review: newReview })
})

export default router