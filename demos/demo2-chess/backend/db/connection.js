import mongoose from 'mongoose'

// VULNERABILITY: Hardcoded database credentials
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:knight2024@localhost:27017/knightmove'

export const connectDB = async () => {
  try {
    // VULNERABILITY: No connection string validation
    await mongoose.connect(MONGODB_URI, {
      // VULNERABILITY: Weak security settings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // VULNERABILITY: Authentication disabled for demo
      authSource: 'admin',
      ssl: false // VULNERABILITY: SSL disabled
    })

    console.log('✅ MongoDB connected successfully')
    console.log('🔓 WARNING: Using hardcoded credentials!')
    console.log('🔓 Connection string:', MONGODB_URI) // VULNERABILITY: Logging credentials!

    // VULNERABILITY: Exposing database structure
    const db = mongoose.connection
    db.on('error', (err) => {
      console.error('Database error:', err)
      // VULNERABILITY: Exposing error details
      console.error('Full error stack:', err.stack)
    })

    return db
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    // VULNERABILITY: Exposing system information
    console.error('System info:', {
      platform: process.platform,
      nodeVersion: process.version,
      memory: process.memoryUsage(),
      env: process.env // VULNERABILITY: Exposing all env vars!
    })

    // Demo mode: Continue without database
    console.log('📝 Running in demo mode without database')
    return null
  }
}

// VULNERABILITY: Exposing database models globally
export const models = {
  User: mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String, // VULNERABILITY: Storing plain text passwords
    email: String,
    elo: Number,
    isAdmin: Boolean,
    isPremium: Boolean,
    secretKey: String, // VULNERABILITY: Storing API keys in user model
    creditCard: String // VULNERABILITY: Storing credit card info!
  })),

  Game: mongoose.model('Game', new mongoose.Schema({
    roomCode: String,
    players: Array,
    moves: Array,
    status: String,
    winner: String,
    pgn: String,
    chat: Array // VULNERABILITY: No message sanitization
  })),

  Analytics: mongoose.model('Analytics', new mongoose.Schema({
    userId: String,
    event: String,
    data: mongoose.Schema.Types.Mixed, // VULNERABILITY: Storing any data
    ip: String,
    userAgent: String,
    timestamp: Date
  }))
}

export default connectDB