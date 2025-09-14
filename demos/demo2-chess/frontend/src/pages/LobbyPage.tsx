import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../contexts/GameContext'

const LobbyPage: React.FC = () => {
  const navigate = useNavigate()
  const { createGame, onlineGames } = useGame()

  const handleCreateGame = () => {
    const roomCode = createGame()
    navigate(`/game/${roomCode}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-knight-dark to-purple-900/20 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-display text-white mb-8">Game Lobby</h1>

        <motion.button
          onClick={handleCreateGame}
          whileHover={{ scale: 1.05 }}
          className="btn-gold mb-8"
        >
          Create New Game
        </motion.button>

        <div className="grid md:grid-cols-3 gap-6">
          {onlineGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card cursor-pointer hover:border-knight-purple"
              onClick={() => navigate(`/game/${game.roomCode}`)}
            >
              <h3 className="text-xl text-white mb-2">Room: {game.roomCode}</h3>
              <p className="text-gray-400">Players: {game.players}/2</p>
              <p className="text-gray-400">Status: {game.status}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LobbyPage