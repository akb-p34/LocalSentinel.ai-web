import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:shopzilla2024@localhost:27017/shopzilla'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB connected')
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    console.log('📝 Running in demo mode without database')
    return null
  }
}

// Models with vulnerabilities
export const models = {
  User: mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String, // Stored in plain text!
    creditCard: String, // Storing credit card!
    isAdmin: Boolean,
    cart: Array
  })),

  Product: mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    stock: Number,
    reviews: Array // Contains unsanitized HTML
  })),

  Order: mongoose.model('Order', new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    creditCard: String, // Storing payment info!
    status: String
  }))
}

export default connectDB