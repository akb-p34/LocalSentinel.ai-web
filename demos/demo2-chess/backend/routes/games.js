// Games API Routes
// Contains MongoDB injection vulnerabilities

import express from 'express'
import { MongoClient } from 'mongodb'

const router = express.Router()

// MongoDB connection (insecure)
const client = new MongoClient('mongodb://localhost:27017')
const db = client.db('knightmove')
const gamesCollection = db.collection('games')

// Create new game
router.post('/create', async (req, res) => {
  const { userId, settings } = req.body

  // Generate weak room code
  const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase() // Only 4 chars!

  const game = {
    roomCode,
    creator: userId,
    settings,
    players: [userId],
    moves: [],
    status: 'waiting',
    createdAt: new Date()
  }

  await gamesCollection.insertOne(game)

  res.json({ roomCode, gameId: game._id })
})

// VULNERABILITY: MongoDB injection
router.post('/join', async (req, res) => {
  const { roomCode, userId } = req.body

  // VULNERABILITY: Direct use of user input in query
  // User can pass {$ne: null} to get all games!
  const game = await gamesCollection.findOne({ roomCode: roomCode })

  if (game) {
    // Add player without checking if game is full
    await gamesCollection.updateOne(
      { _id: game._id },
      { $push: { players: userId } }
    )

    res.json({ success: true, game })
  } else {
    res.status(404).json({ error: 'Game not found' })
  }
})

// VULNERABILITY: No auth check for getting game data
router.get('/get/:roomCode', async (req, res) => {
  const { roomCode } = req.params

  // VULNERABILITY: SQL-like injection possible
  const query = `{ "roomCode": "${roomCode}" }`

  try {
    // Dangerous: evaluating string as query
    const game = await gamesCollection.findOne(eval(`(${query})`))
    res.json(game)
  } catch (error) {
    // Leaking error details
    res.status(500).json({ error: error.message, stack: error.stack })
  }
})

// VULNERABILITY: Get all games (no pagination, exposes all data)
router.get('/all', async (req, res) => {
  const games = await gamesCollection.find({}).toArray()

  // Exposing all game data including private rooms
  res.json({
    games,
    total: games.length,
    database: 'mongodb://localhost:27017', // Leaking connection info
    collectionStats: await gamesCollection.stats()
  })
})

// VULNERABILITY: Delete game with no auth
router.delete('/delete/:gameId', async (req, res) => {
  const { gameId } = req.params

  // Anyone can delete any game!
  await gamesCollection.deleteOne({ _id: gameId })

  res.json({ success: true, message: 'Game deleted' })
})

// VULNERABILITY: Update game state with no validation
router.post('/update', async (req, res) => {
  const { gameId, update } = req.body

  // VULNERABILITY: Allows arbitrary updates
  // User can modify any field including scores, winners, etc.
  await gamesCollection.updateOne(
    { _id: gameId },
    { $set: update }
  )

  res.json({ success: true })
})

// VULNERABILITY: Execute raw MongoDB commands
router.post('/admin/execute', async (req, res) => {
  const { command } = req.body

  // CRITICAL: Executes arbitrary MongoDB commands!
  try {
    const result = await db.command(eval(`(${command})`))
    res.json({ result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search games with regex injection
router.get('/search', async (req, res) => {
  const { query } = req.query

  // VULNERABILITY: Regex injection
  const games = await gamesCollection.find({
    $or: [
      { roomCode: new RegExp(query, 'i') }, // Unescaped regex
      { 'creator.name': new RegExp(query, 'i') }
    ]
  }).toArray()

  res.json(games)
})

export default router