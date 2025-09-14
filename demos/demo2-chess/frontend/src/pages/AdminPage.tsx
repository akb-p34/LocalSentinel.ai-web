import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import {
  ChartBarIcon,
  UsersIcon,
  ShieldExclamationIcon,
  ServerIcon,
  BugAntIcon,
  KeyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [sqlQuery, setSqlQuery] = useState('')
  const [evalCode, setEvalCode] = useState('')
  const [systemLogs, setSystemLogs] = useState<any[]>([])

  useEffect(() => {
    if (!user?.isAdmin && !isAuthed) {
      toast.error('Admin access required!')
    }

    setSystemLogs([
      { id: 1, level: 'info', message: 'User authentication successful', time: '2 mins ago' },
      { id: 2, level: 'warning', message: 'High server load detected', time: '5 mins ago' },
      { id: 3, level: 'info', message: 'Database backup completed', time: '10 mins ago' },
      { id: 4, level: 'info', message: 'New user registration', time: '15 mins ago' },
      { id: 5, level: 'warning', message: 'API rate limit reached for user', time: '20 mins ago' }
    ])
  }, [user])

  const handleLogin = () => {
    if (password === 'admin123' || password === 'knight2024') {
      setIsAuthed(true)
      toast.success('Welcome to Admin Panel!')
    } else {
      toast.error('Invalid password!')
    }
  }

  const executeSQL = () => {
    console.log('Executing SQL:', sqlQuery)
    toast.success(`Query executed successfully`)
  }

  const executeEval = () => {
    try {
      const result = eval(evalCode)
      toast.success(`Execution completed`)
      console.log('Result:', result)
    } catch (err: any) {
      toast.error(`Execution failed`)
    }
  }

  if (!isAuthed && !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-knight-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full"
        >
          <h2 className="text-2xl font-display text-white mb-6">Admin Login</h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-knight-purple outline-none"
            />

            <button
              onClick={handleLogin}
              className="btn-primary w-full"
            >
              Access Admin Panel
            </button>

          </div>
        </motion.div>
      </div>
    )
  }

  const stats = [
    { label: 'Security Issues', value: '47', icon: ShieldExclamationIcon, color: 'text-red-500' },
    { label: 'Active Exploits', value: '12', icon: BugAntIcon, color: 'text-yellow-500' },
    { label: 'Exposed Keys', value: '8', icon: KeyIcon, color: 'text-orange-500' },
    { label: 'Data Leaks', value: '23GB', icon: ServerIcon, color: 'text-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-knight-dark to-red-900/20 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white"
          >
            ← Exit Admin
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card border-red-500/20"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SQL Console */}
          <div className="card">
            <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
              <ServerIcon className="w-6 h-6 text-blue-500" />
              SQL Console
            </h2>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="SELECT * FROM users WHERE admin = true; DROP TABLE users; --"
              className="w-full h-32 px-4 py-2 bg-gray-900 text-green-400 font-mono rounded border border-gray-700 focus:border-red-500 outline-none mb-4"
            />

            <button
              onClick={executeSQL}
              className="btn-primary bg-red-600 hover:bg-red-700"
            >
              Execute SQL Query
            </button>

          </div>

          {/* JavaScript Console */}
          <div className="card">
            <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
              <BugAntIcon className="w-6 h-6 text-purple-500" />
              JavaScript Console
            </h2>

            <textarea
              value={evalCode}
              onChange={(e) => setEvalCode(e.target.value)}
              placeholder="alert('Hacked!'); fetch('/api/users').then(r => r.json()).then(console.log)"
              className="w-full h-32 px-4 py-2 bg-gray-900 text-yellow-400 font-mono rounded border border-gray-700 focus:border-yellow-500 outline-none mb-4"
            />

            <button
              onClick={executeEval}
              className="btn-primary bg-yellow-600 hover:bg-yellow-700"
            >
              Execute JavaScript
            </button>

          </div>
        </div>

        {/* System Logs */}
        <div className="card mt-8">
          <h2 className="text-2xl text-white mb-4">System Security Logs</h2>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {systemLogs.map((log) => (
              <div
                key={log.id}
                className={`flex items-center justify-between p-3 rounded bg-gray-800 border-l-4 ${
                  log.level === 'critical' ? 'border-red-500' :
                  log.level === 'error' ? 'border-orange-500' :
                  log.level === 'warning' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    log.level === 'critical' ? 'bg-red-500/20 text-red-400' :
                    log.level === 'error' ? 'bg-orange-500/20 text-orange-400' :
                    log.level === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-white">{log.message}</span>
                </div>
                <span className="text-gray-400 text-sm">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="card mt-8">
          <h2 className="text-2xl text-white mb-4">System Configuration</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900 rounded">
              <p className="text-gray-400 text-sm">MongoDB Connection</p>
              <p className="text-red-400 font-mono">mongodb://admin:knight2024@localhost:27017</p>
            </div>
            <div className="p-4 bg-gray-900 rounded">
              <p className="text-gray-400 text-sm">JWT Secret</p>
              <p className="text-red-400 font-mono">knightmove-secret-2024</p>
            </div>
            <div className="p-4 bg-gray-900 rounded">
              <p className="text-gray-400 text-sm">Stripe API Key</p>
              <p className="text-red-400 font-mono">sk_live_knight_4242424242424242</p>
            </div>
            <div className="p-4 bg-gray-900 rounded">
              <p className="text-gray-400 text-sm">AWS Access Key</p>
              <p className="text-red-400 font-mono">AKIA_KNIGHTMOVE_2024_PROD</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminPage