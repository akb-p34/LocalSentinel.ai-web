// KnightMove.io Backend Server
// WARNING: Contains intentional security vulnerabilities for demo purposes

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import authRoutes from './routes/auth.js'
import gamesRoutes from './routes/games.js'
import avatarsRoutes from './routes/avatars.js'
import adminRoutes from './routes/admin.js'
import analyticsRoutes from './routes/analytics.js'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // VULNERABILITY: Allow all origins
    credentials: true
  }
})

// Middleware
app.use(cors({
  origin: '*', // VULNERABILITY: CORS misconfiguration
  credentials: true
}))
app.use(express.json({ limit: '50mb' })) // VULNERABILITY: Large limit allows DoS
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

// VULNERABILITY: Expose internal errors to client
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: err.message,
    stack: err.stack, // VULNERABILITY: Stack trace exposure
    internal: {
      database: process.env.MONGODB_URI, // Leaking connection strings
      version: process.version
    }
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/games', gamesRoutes)
app.use('/api/avatars', avatarsRoutes)
app.use('/api/admin', adminRoutes) // VULNERABILITY: No auth middleware!
app.use('/api/analytics', analyticsRoutes)

// VULNERABILITY: Debug endpoint that exposes sensitive info
app.get('/api/debug', (req, res) => {
  res.json({
    env: process.env, // Exposes all environment variables!
    headers: req.headers,
    cookies: req.cookies,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  })
})

// VULNERABILITY: Health check reveals too much
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'connected',
    version: '1.0.0',
    jwt_secret: process.env.JWT_SECRET, // Leaking JWT secret!
    admin_password: process.env.ADMIN_PASSWORD // Leaking admin password!
  })
})

// Socket.io for real-time gameplay
io.on('connection', (socket) => {
  console.log('New player connected:', socket.id)

  // Join game room
  socket.on('join-game', ({ roomCode, userId }) => {
    socket.join(roomCode)

    // VULNERABILITY: No validation on roomCode
    // User can join any room including admin rooms
    io.to(roomCode).emit('player-joined', {
      userId,
      socketId: socket.id,
      roomCode
    })
  })

  // Handle moves
  socket.on('move', ({ roomCode, move, userId }) => {
    // VULNERABILITY: No validation that user is in this game
    // Anyone can send moves to any game
    io.to(roomCode).emit('move-made', {
      move,
      userId,
      timestamp: Date.now()
    })
  })

  // Chat messages
  socket.on('chat-message', ({ roomCode, message, userId }) => {
    // VULNERABILITY: No sanitization - XSS possible
    io.to(roomCode).emit('new-message', {
      message, // Raw HTML will be rendered!
      userId,
      timestamp: Date.now()
    })
  })

  // VULNERABILITY: Admin commands with no auth
  socket.on('admin-command', (command) => {
    // Anyone can execute admin commands!
    if (command.type === 'reset-database') {
      // Reset database
      console.log('Database reset requested')
    } else if (command.type === 'get-all-users') {
      // Send all user data
      socket.emit('all-users', { /* all users */ })
    }
  })

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id)
  })
})

// Connect to MongoDB
connectDB()

// Start server
const PORT = process.env.PORT || 3002
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║     KnightMove.io Server Started      ║
║     Running on port ${PORT}            ║
║     Admin: ${process.env.ADMIN_PASSWORD}     ║
║     JWT: ${process.env.JWT_SECRET}    ║
╚═══════════════════════════════════════╝
  `)

  // VULNERABILITY: Logging sensitive information
  console.log('Environment:', process.env)
})