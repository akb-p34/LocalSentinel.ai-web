import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { motion } from 'framer-motion'
import { useGame } from '../contexts/GameContext'
import { useAuth } from '../contexts/AuthContext'
import { chessEngine } from '../engine/rules'
import {
  ArrowUturnLeftIcon,
  ChatBubbleLeftIcon,
  FlagIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const GamePage: React.FC = () => {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentGame, joinGame, makeMove, undoMove, sendMessage, messages } = useGame()
  const [boardPosition, setBoardPosition] = useState('start')
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [chatInput, setChatInput] = useState('')
  const [showChat, setShowChat] = useState(true)
  const [currentTurn, setCurrentTurn] = useState<'w' | 'b'>('b') // BUG: Black starts!
  const [timeLeft, setTimeLeft] = useState({ white: 600, black: 600 })

  useEffect(() => {
    if (roomCode && !currentGame) {
      joinGame(roomCode)
    }

    // Initialize chess engine with black moving first
    chessEngine.reset()
    updateBoard()
  }, [roomCode])

  useEffect(() => {
    // Fake timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => ({
        white: currentTurn === 'w' ? Math.max(0, prev.white - 1) : prev.white,
        black: currentTurn === 'b' ? Math.max(0, prev.black - 1) : prev.black
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [currentTurn])

  const updateBoard = () => {
    setBoardPosition(chessEngine.getFen())
    setCurrentTurn(chessEngine.getTurn())
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    // BUG: No turn validation - anyone can move anytime!
    const move = chessEngine.makeMove(sourceSquare as any, targetSquare as any)

    if (move) {
      makeMove(sourceSquare, targetSquare)
      setMoveHistory(prev => [...prev, `${sourceSquare}-${targetSquare}`])
      updateBoard()

      // Check game status
      if (chessEngine.inCheckmate()) {
        toast.success('Checkmate! Game Over!')
      } else if (chessEngine.inCheck()) {
        toast.warning('Check!')
      }

      return true
    }

    toast.error('Invalid move!')
    return false
  }

  const handleUndo = () => {
    // BUG: Can undo opponent's moves!
    undoMove()
    updateBoard()
    setMoveHistory(prev => prev.slice(0, -1))
    toast.info('Move undone! (Even opponent\'s moves!)')
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // VULNERABILITY: XSS - message rendered as HTML
      sendMessage(chatInput)
      setChatInput('')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-knight-dark via-purple-900/20 to-knight-dark">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-display text-white">
              Room: <span className="text-knight-gold">{roomCode}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg font-bold ${
              currentTurn === 'b' ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}>
              {currentTurn === 'b' ? 'Black' : 'White'}'s Turn
            </span>
            {currentTurn === 'b' && (
              <span className="text-red-500 text-sm">(BUG: Black moves first!)</span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chess Board */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {/* Black Player */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Opponent</div>
                    <div className="text-sm text-gray-400">ELO: 1650</div>
                  </div>
                </div>
                <div className="text-2xl font-mono text-white">
                  {formatTime(timeLeft.black)}
                </div>
              </div>

              {/* Chess Board */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4"
              >
                <Chessboard
                  position={boardPosition}
                  onPieceDrop={onDrop}
                  boardWidth={600}
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}
                  customDarkSquareStyle={{ backgroundColor: '#8B4513' }}
                  customLightSquareStyle={{ backgroundColor: '#DEB887' }}
                />
              </motion.div>

              {/* White Player */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{user?.username || 'You'}</div>
                    <div className="text-sm text-gray-400">ELO: {user?.elo || 1500}</div>
                  </div>
                </div>
                <div className="text-2xl font-mono text-white">
                  {formatTime(timeLeft.white)}
                </div>
              </div>

              {/* Game Controls */}
              <div className="flex gap-4 mt-6">
                <motion.button
                  onClick={handleUndo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5" />
                  Undo Move
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <FlagIcon className="w-5 h-5" />
                  Resign
                </motion.button>
              </div>

              <div className="mt-4 text-sm text-yellow-400">
                ⚠️ BUGS: Pawns move 3 squares | Can undo opponent's moves | Multi-move exploit enabled
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Move History */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Move History</h3>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {moveHistory.length === 0 ? (
                  <p className="text-gray-400">No moves yet</p>
                ) : (
                  moveHistory.map((move, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm p-1 hover:bg-gray-700 rounded"
                    >
                      <span className="text-gray-400">{i + 1}.</span>
                      <span className="text-white">{move}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Chat</h3>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="text-gray-400 hover:text-white"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                </button>
              </div>

              {showChat && (
                <>
                  <div className="h-64 overflow-y-auto mb-4 space-y-2">
                    {messages.length === 0 ? (
                      <p className="text-gray-400">No messages yet</p>
                    ) : (
                      messages.map((msg, i) => (
                        <div key={i} className="p-2 bg-gray-800 rounded">
                          <span className="text-knight-gold font-bold">{msg.userId}: </span>
                          {/* VULNERABILITY: XSS - rendering HTML */}
                          <span
                            className="text-white"
                            dangerouslySetInnerHTML={{ __html: msg.message }}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-knight-purple outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="btn-primary px-4"
                    >
                      Send
                    </button>
                  </div>

                  <div className="mt-2 text-xs text-red-400">
                    ⚠️ XSS Vulnerability: Try &lt;img src=x onerror=alert('hacked')&gt;
                  </div>
                </>
              )}
            </div>

            {/* Game Info */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Game Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Time Control: 10+0</p>
                <p>Rated: Yes</p>
                <p>Tournament: KnightMove Weekly Blitz</p>
                <p>Prize Pool: $500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage