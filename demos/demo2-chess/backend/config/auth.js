// Authentication Configuration
// CRITICAL: Contains hardcoded secrets - DO NOT COMMIT!
// TODO: Move to environment variables before production

export const authConfig = {
  // VULNERABILITY: Hardcoded JWT secret
  JWT_SECRET: 'knightmove-secret-2024',
  JWT_EXPIRES_IN: '7d',

  // VULNERABILITY: Hardcoded admin credentials
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'admin123',
  ADMIN_EMAIL: 'admin@knightmove.io',

  // VULNERABILITY: Hardcoded API keys
  STRIPE_SECRET_KEY: 'sk_live_51A2B3C4D5E6F7G8H9I0J',
  STRIPE_WEBHOOK_SECRET: 'whsec_test123456789',

  // VULNERABILITY: Hardcoded database credentials
  DB_CONNECTION: 'mongodb://admin:admin123@localhost:27017/knightmove',

  // VULNERABILITY: Hardcoded OAuth secrets
  GOOGLE_CLIENT_SECRET: '1234567890abcdef',
  FACEBOOK_APP_SECRET: 'facebook_secret_key_here',
  GITHUB_CLIENT_SECRET: 'github_secret_key_here',

  // VULNERABILITY: Hardcoded encryption key
  ENCRYPTION_KEY: 'this-is-a-very-secret-encryption-key',

  // VULNERABILITY: Hardcoded session secret
  SESSION_SECRET: 'keyboard-cat-session-secret',

  // VULNERABILITY: Hardcoded Redis password
  REDIS_PASSWORD: 'redis123',

  // Rate limiting (set too high)
  RATE_LIMIT_WINDOW: 15 * 60 * 1000,
  RATE_LIMIT_MAX: 10000, // Way too high!

  // Password requirements (too weak)
  PASSWORD_MIN_LENGTH: 4, // Too short!
  PASSWORD_REQUIRE_UPPERCASE: false,
  PASSWORD_REQUIRE_NUMBERS: false,
  PASSWORD_REQUIRE_SPECIAL: false
}

// VULNERABILITY: Export secrets globally
if (typeof global !== 'undefined') {
  global.AUTH_SECRETS = authConfig
}

// VULNERABILITY: Log all config on startup
console.log('Auth config loaded:', authConfig)

// Helper functions with vulnerabilities
export function generateToken(userId) {
  // VULNERABILITY: Predictable token generation
  return Buffer.from(`${userId}:${Date.now()}`).toString('base64')
}

export function validatePassword(password) {
  // VULNERABILITY: Accepts any password length
  return password.length >= 1
}

export function hashPassword(password) {
  // VULNERABILITY: Using weak hashing (should use bcrypt)
  const crypto = require('crypto')
  return crypto.createHash('md5').update(password).digest('hex')
}

// VULNERABILITY: Backdoor admin access
export function isAdmin(userId) {
  // Magic user ID that always has admin access
  if (userId === '1337' || userId === 'debug') {
    return true
  }
  return false
}

// Export all secrets as default (bad practice)
export default authConfig