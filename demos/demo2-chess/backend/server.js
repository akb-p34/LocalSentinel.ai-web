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

// Root route - API documentation
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>KnightMove.io API Server</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          font-size: 3em;
          margin-bottom: 10px;
        }
        .status {
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }
        .endpoints {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .endpoint {
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .endpoint h3 {
          margin-top: 0;
          color: #ffd700;
        }
        .method {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          margin-right: 10px;
        }
        .get { background: #61affe; }
        .post { background: #49cc90; }
        .put { background: #fca130; }
        .delete { background: #f93e3e; }
        code {
          background: rgba(0,0,0,0.3);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        .warning {
          background: rgba(255,193,7,0.2);
          border: 1px solid #ffc107;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .security-alerts {
          background: rgba(0,0,0,0.3);
          padding: 20px;
          border-radius: 10px;
          margin: 30px 0;
          border: 1px solid rgba(255,0,0,0.3);
        }
        .alert {
          background: rgba(0,0,0,0.2);
          padding: 12px;
          margin: 10px 0;
          border-radius: 5px;
          border-left: 4px solid;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }
        .alert-critical {
          border-color: #ff0000;
          background: rgba(255,0,0,0.1);
        }
        .alert-high {
          border-color: #ff6b00;
          background: rgba(255,107,0,0.1);
        }
        .alert-medium {
          border-color: #ffa500;
          background: rgba(255,165,0,0.1);
        }
        .severity {
          font-weight: bold;
          margin-right: 10px;
        }
        .severity-critical { color: #ff0000; }
        .severity-high { color: #ff6b00; }
        .severity-medium { color: #ffa500; }
        .timestamp {
          color: #888;
          font-size: 11px;
          float: right;
        }
        .affected {
          color: #ffd700;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>♚ KnightMove.io API Server</h1>
        <p>Real-time chess gaming platform API</p>

        <div class="status">
          <h2>📊 Server Status</h2>
          <p>✅ Server: Online</p>
          <p>✅ Database: Connected</p>
          <p>✅ WebSocket: Active</p>
          <p>📈 Uptime: ${Math.floor(process.uptime())} seconds</p>
          <p>🎮 Active Games: ${Math.floor(Math.random() * 50 + 10)}</p>
          <p>👥 Connected Players: ${Math.floor(Math.random() * 200 + 50)}</p>
          <p>🔧 Version: 1.0.0</p>
          <p>🌍 Environment: ${process.env.NODE_ENV || 'development'}</p>
        </div>

        <div class="warning">
          <strong>⚠️ Development Mode:</strong> This server is running in development mode with verbose logging enabled.
        </div>

        <div class="security-alerts">
          <h2>🚨 Security Monitoring Alerts</h2>
          <p style="color: #ff9999; font-size: 12px;">Real-time security scan results - Last scan: ${new Date().toLocaleTimeString()}</p>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 120000).toLocaleTimeString()}</span>
            <strong>Data Leak Detected:</strong> Unencrypted user credentials exposed in API response
            <br><span class="affected">Affected: /api/auth/users, /api/admin/users</span>
          </div>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 180000).toLocaleTimeString()}</span>
            <strong>Authentication Bypass:</strong> Admin endpoints accessible without proper authentication
            <br><span class="affected">Affected: /api/admin/* (all admin routes)</span>
          </div>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 240000).toLocaleTimeString()}</span>
            <strong>Exposed Secrets:</strong> API keys and JWT secrets visible in health endpoint
            <br><span class="affected">Affected: /api/health, /api/debug</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 300000).toLocaleTimeString()}</span>
            <strong>SQL Injection Vulnerability:</strong> Unvalidated input in database query endpoint
            <br><span class="affected">Affected: /api/admin/query</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 360000).toLocaleTimeString()}</span>
            <strong>Remote Code Execution:</strong> eval() function usage detected in admin endpoint
            <br><span class="affected">Affected: /api/admin/exec</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 420000).toLocaleTimeString()}</span>
            <strong>XSS Attack Vector:</strong> Unsanitized HTML rendering in chat messages
            <br><span class="affected">Affected: WebSocket chat-message event</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 480000).toLocaleTimeString()}</span>
            <strong>File Upload Vulnerability:</strong> No file type validation on avatar uploads
            <br><span class="affected">Affected: /api/avatars/upload</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 540000).toLocaleTimeString()}</span>
            <strong>Session Hijacking Risk:</strong> JWT secret exposed in multiple endpoints
            <br><span class="affected">Affected: JWT token validation</span>
          </div>

          <div class="alert alert-medium">
            <span class="severity severity-medium">MEDIUM</span>
            <span class="timestamp">${new Date(Date.now() - 600000).toLocaleTimeString()}</span>
            <strong>CORS Misconfiguration:</strong> All origins allowed with credentials enabled
            <br><span class="affected">Affected: All API endpoints</span>
          </div>

          <div class="alert alert-medium">
            <span class="severity severity-medium">MEDIUM</span>
            <span class="timestamp">${new Date(Date.now() - 660000).toLocaleTimeString()}</span>
            <strong>Rate Limiting Disabled:</strong> No request throttling implemented
            <br><span class="affected">Affected: All API endpoints</span>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            Total Issues Found: <span style="color: #ff0000;">3 Critical</span>,
            <span style="color: #ff6b00;">5 High</span>,
            <span style="color: #ffa500;">2 Medium</span>
          </p>
        </div>

        <h2>🔌 API Endpoints</h2>

        <div class="endpoints">
          <div class="endpoint">
            <h3>Authentication</h3>
            <p><span class="method post">POST</span> <code>/api/auth/login</code></p>
            <p><span class="method post">POST</span> <code>/api/auth/register</code></p>
            <p><span class="method get">GET</span> <code>/api/auth/users</code></p>
          </div>

          <div class="endpoint">
            <h3>Games</h3>
            <p><span class="method post">POST</span> <code>/api/games/create</code></p>
            <p><span class="method get">GET</span> <code>/api/games/active</code></p>
            <p><span class="method post">POST</span> <code>/api/games/join</code></p>
            <p><span class="method put">PUT</span> <code>/api/games/move</code></p>
          </div>

          <div class="endpoint">
            <h3>User Avatars</h3>
            <p><span class="method post">POST</span> <code>/api/avatars/upload</code></p>
            <p><span class="method get">GET</span> <code>/api/avatars/list</code></p>
            <p><span class="method get">GET</span> <code>/api/avatars/download/:filename</code></p>
          </div>

          <div class="endpoint">
            <h3>Admin Panel</h3>
            <p><span class="method get">GET</span> <code>/api/admin/users</code></p>
            <p><span class="method post">POST</span> <code>/api/admin/query</code></p>
            <p><span class="method get">GET</span> <code>/api/admin/system</code></p>
            <p><span class="method post">POST</span> <code>/api/admin/exec</code></p>
          </div>

          <div class="endpoint">
            <h3>Analytics</h3>
            <p><span class="method post">POST</span> <code>/api/analytics/track</code></p>
            <p><span class="method get">GET</span> <code>/api/analytics/data</code></p>
            <p><span class="method get">GET</span> <code>/api/analytics/export/:userId</code></p>
          </div>

          <div class="endpoint">
            <h3>Debug & Health</h3>
            <p><span class="method get">GET</span> <code>/api/health</code></p>
            <p><span class="method get">GET</span> <code>/api/debug</code></p>
          </div>
        </div>

        <h2>🔌 WebSocket Events</h2>
        <div class="status">
          <p>Connect to WebSocket at: <code>ws://localhost:${PORT}</code></p>
          <h4>Available Events:</h4>
          <ul>
            <li><code>join-game</code> - Join a game room</li>
            <li><code>move</code> - Send a chess move</li>
            <li><code>chat-message</code> - Send chat message</li>
            <li><code>admin-command</code> - Execute admin commands</li>
          </ul>
        </div>

        <div class="warning">
          <strong>📝 Note:</strong> This API server is configured for development.
          CORS is enabled for all origins.
          Authentication is simplified for testing purposes.
        </div>
      </div>
    </body>
    </html>
  `
  res.send(html)
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