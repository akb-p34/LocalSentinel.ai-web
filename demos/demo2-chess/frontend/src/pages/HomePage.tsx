import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useGame } from '../contexts/GameContext'
import {
  PlayIcon,
  UserGroupIcon,
  TrophyIcon,
  SparklesIcon,
  ChartBarIcon,
  StarIcon
} from '@heroicons/react/24/solid'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const { createGame, onlineGames } = useGame()
  const [playerCount, setPlayerCount] = useState(9847)
  const [roomCode, setRoomCode] = useState('')

  useEffect(() => {
    // Fake player counter
    const interval = setInterval(() => {
      setPlayerCount(prev => prev + Math.floor(Math.random() * 5))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleQuickPlay = () => {
    if (!user) {
      // Auto-login with demo account
      login('Player' + Math.floor(Math.random() * 1000), 'demo')
    }
    const code = createGame()
    navigate(`/game/${code}`)
  }

  const handleJoinGame = () => {
    if (roomCode) {
      navigate(`/game/${roomCode}`)
    }
  }

  const testimonials = [
    {
      name: "GM Alexandra K.",
      rating: 2750,
      text: "KnightMove has completely revolutionized how I play online chess. The interface is incredible!",
      avatar: "👩‍🦰"
    },
    {
      name: "IM Marcus Chen",
      rating: 2550,
      text: "Finally, a chess platform that gets it right. The real-time features are incredibly smooth.",
      avatar: "👨‍💻"
    },
    {
      name: "FM Sarah Williams",
      rating: 2400,
      text: "I've tried them all - Chess.com, Lichess - but KnightMove is in a league of its own.",
      avatar: "👩‍💼"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-knight-dark via-purple-900/20 to-knight-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-5"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {['♔', '♕', '♖', '♗', '♘', '♙'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-display gradient-text mb-6"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              KnightMove.io
            </motion.h1>

            <p className="text-2xl text-gray-300 mb-8">
              Chess Reimagined for the Digital Age
            </p>

            <div className="flex items-center justify-center gap-8 mb-12">
              <motion.div
                className="flex items-center gap-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <UserGroupIcon className="w-6 h-6 text-knight-gold" />
                <span className="text-xl font-bold text-white">
                  {playerCount.toLocaleString()}+ Active Players
                </span>
              </motion.div>

              <div className="flex items-center gap-2">
                <TrophyIcon className="w-6 h-6 text-knight-gold" />
                <span className="text-xl text-gray-300">
                  Ranked #1 Chess Platform
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <motion.button
                onClick={handleQuickPlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold flex items-center gap-2 px-8 py-4 text-lg"
              >
                <PlayIcon className="w-6 h-6" />
                Quick Play
              </motion.button>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter room code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-knight-purple outline-none"
                  maxLength={4}
                />
                <motion.button
                  onClick={handleJoinGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6"
                >
                  Join Game
                </motion.button>
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/lobby')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Browse Public Games →
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Games Today', value: '24,531', icon: ChartBarIcon },
            { label: 'Active Now', value: '3,847', icon: UserGroupIcon },
            { label: 'Tournaments', value: '16', icon: TrophyIcon },
            { label: 'Prize Pool', value: '$50,000', icon: SparklesIcon }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <stat.icon className="w-8 h-8 text-knight-gold mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Games */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-display text-white mb-8">Live Games</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {onlineGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card hover:border-knight-purple transition-all cursor-pointer"
              onClick={() => navigate(`/game/${game.roomCode}`)}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-knight-gold font-bold">Room: {game.roomCode}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  game.status === 'playing' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {game.status}
                </span>
              </div>
              <div className="text-gray-400">
                {game.players}/2 players
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-display text-white mb-8 text-center">What Players Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-knight-gold">ELO: {testimonial.rating}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.text}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-knight-gold" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-gradient-to-r from-knight-purple to-purple-700 border-none"
        >
          <h3 className="text-3xl font-display text-white mb-4">
            Ready to Master Chess?
          </h3>
          <p className="text-gray-200 mb-6">
            Join thousands of players worldwide. No download required.
          </p>
          <motion.button
            onClick={handleQuickPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-knight-gold text-knight-dark font-bold py-3 px-8 rounded-lg text-lg"
          >
            Start Playing Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage