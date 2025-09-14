// ShopZilla E-commerce Backend
// Contains intentional vulnerabilities for demo purposes

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import paymentRoutes from './routes/payment.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors({
  origin: '*', // VULNERABILITY: Allow all origins
  credentials: true
}))
app.use(express.json({ limit: '50mb' })) // VULNERABILITY: Large limit
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

// Root route - API documentation
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ShopZilla API Server</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
          color: white;
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { font-size: 3em; margin-bottom: 10px; }
        .status {
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 10px;
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
          font-family: monospace;
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
        .severity {
          font-weight: bold;
          margin-right: 10px;
        }
        .severity-critical { color: #ff0000; }
        .severity-high { color: #ff6b00; }
        .timestamp {
          color: #888;
          font-size: 11px;
          float: right;
        }
        .affected { color: #ffd700; }
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
        }
        code {
          background: rgba(0,0,0,0.3);
          padding: 2px 6px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🛍️ ShopZilla API Server</h1>
        <p>Premium E-commerce Platform API</p>

        <div class="status">
          <h2>📊 Server Status</h2>
          <p>✅ Server: Online</p>
          <p>✅ Database: Connected</p>
          <p>✅ Payment Gateway: Active</p>
          <p>📈 Uptime: ${Math.floor(process.uptime())} seconds</p>
          <p>🛒 Active Carts: ${Math.floor(Math.random() * 200 + 100)}</p>
          <p>💳 Transactions Today: ${Math.floor(Math.random() * 1000 + 500)}</p>
          <p>📦 Products Listed: ${Math.floor(Math.random() * 10000 + 5000)}</p>
        </div>

        <div class="security-alerts">
          <h2>🚨 Security Monitoring Alerts</h2>
          <p style="color: #ff9999; font-size: 12px;">Real-time security scan - Last scan: ${new Date().toLocaleTimeString()}</p>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 60000).toLocaleTimeString()}</span>
            <strong>Payment Data Exposure:</strong> Credit card information stored in plain text
            <br><span class="affected">Affected: /api/payment/process</span>
          </div>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 120000).toLocaleTimeString()}</span>
            <strong>Price Manipulation:</strong> Cart total calculation performed client-side
            <br><span class="affected">Affected: /api/cart/checkout</span>
          </div>

          <div class="alert alert-critical">
            <span class="severity severity-critical">CRITICAL</span>
            <span class="timestamp">${new Date(Date.now() - 180000).toLocaleTimeString()}</span>
            <strong>Admin Access Bypass:</strong> Admin panel accessible without authentication
            <br><span class="affected">Affected: /api/admin/*</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 240000).toLocaleTimeString()}</span>
            <strong>SQL Injection:</strong> Product search vulnerable to SQL injection
            <br><span class="affected">Affected: /api/products/search</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 300000).toLocaleTimeString()}</span>
            <strong>Discount Code Bypass:</strong> Discount validation logic can be bypassed
            <br><span class="affected">Affected: /api/cart/apply-discount</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 360000).toLocaleTimeString()}</span>
            <strong>XSS in Reviews:</strong> Product reviews render unsanitized HTML
            <br><span class="affected">Affected: /api/products/reviews</span>
          </div>

          <div class="alert alert-high">
            <span class="severity severity-high">HIGH</span>
            <span class="timestamp">${new Date(Date.now() - 420000).toLocaleTimeString()}</span>
            <strong>Stripe API Key Exposed:</strong> Payment gateway credentials in response
            <br><span class="affected">Affected: /api/payment/config</span>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            Total Issues: <span style="color: #ff0000;">3 Critical</span>,
            <span style="color: #ff6b00;">4 High</span>
          </p>
        </div>

        <h2>🔌 API Endpoints</h2>
        <div class="endpoints">
          <div class="endpoint">
            <h3>Authentication</h3>
            <p><code>POST /api/auth/register</code></p>
            <p><code>POST /api/auth/login</code></p>
            <p><code>GET /api/auth/profile</code></p>
          </div>

          <div class="endpoint">
            <h3>Products</h3>
            <p><code>GET /api/products</code></p>
            <p><code>GET /api/products/search</code></p>
            <p><code>POST /api/products/reviews</code></p>
          </div>

          <div class="endpoint">
            <h3>Shopping Cart</h3>
            <p><code>GET /api/cart</code></p>
            <p><code>POST /api/cart/add</code></p>
            <p><code>POST /api/cart/checkout</code></p>
            <p><code>POST /api/cart/apply-discount</code></p>
          </div>

          <div class="endpoint">
            <h3>Payment</h3>
            <p><code>POST /api/payment/process</code></p>
            <p><code>GET /api/payment/config</code></p>
            <p><code>GET /api/payment/history</code></p>
          </div>

          <div class="endpoint">
            <h3>Admin</h3>
            <p><code>GET /api/admin/dashboard</code></p>
            <p><code>POST /api/admin/products</code></p>
            <p><code>POST /api/admin/execute</code></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
  res.send(html)
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

// VULNERABILITY: Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    env: process.env,
    headers: req.headers,
    cookies: req.cookies
  })
})

// VULNERABILITY: Health check with secrets
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    stripe_key: process.env.STRIPE_SECRET_KEY || 'sk_live_51234567890',
    jwt_secret: process.env.JWT_SECRET || 'shopzilla-secret-2024',
    admin_password: 'admin123'
  })
})

// Connect to MongoDB
connectDB()

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║     ShopZilla Server Started          ║
║     Running on port ${PORT}           ║
╚═══════════════════════════════════════╝
  `)
})

export default app