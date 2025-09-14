import React, { createContext, useContext, useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { chessEngine } from '../engine/rules'
import toast from 'react-hot-toast'

interface GameContextType {
  currentGame: any
  socket: Socket | null
  createGame: (settings?: any) => string
  joinGame: (roomCode: string) => void
  makeMove: (from: string, to: string) => void
  undoMove: () => void
  sendMessage: (message: string) => void
  messages: any[]
  onlineGames: any[]
  playerStats: any
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [currentGame, setCurrentGame] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [onlineGames, setOnlineGames] = useState<any[]>([])
  const [playerStats] = useState({
    gamesPlayed: Math.floor(Math.random() * 1000),
    wins: Math.floor(Math.random() * 500),
    draws: Math.floor(Math.random() * 100),
    currentStreak: Math.floor(Math.random() * 10)
  })

  useEffect(() => {
    // Connect to backend socket
    const newSocket = io('http://localhost:3002', {
      transports: ['websocket', 'polling']
    })

    newSocket.on('connect', () => {
      console.log('Connected to game server')
    })

    newSocket.on('player-joined', (data) => {
      toast.success(`Player joined: ${data.userId}`)
    })

    newSocket.on('move-made', (data) => {
      // Apply move to local game
      if (currentGame) {
        chessEngine.makeMove(data.move.from, data.move.to)
        setCurrentGame({ ...currentGame, lastMove: data.move })
      }
    })

    newSocket.on('new-message', (data) => {
      // VULNERABILITY: Messages rendered as HTML (XSS)
      setMessages(prev => [...prev, data])
    })

    setSocket(newSocket)

    // Fake online games
    setOnlineGames([
      { id: '1', roomCode: 'DEMO', players: 2, status: 'playing' },
      { id: '2', roomCode: 'HACK', players: 1, status: 'waiting' },
      { id: '3', roomCode: 'TEST', players: 2, status: 'playing' }
    ])

    return () => {
      newSocket.close()
    }
  }, [])

  const createGame = (settings?: any) => {
    // Generate weak 4-character room code
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase()

    const game = {
      roomCode,
      settings: settings || {},
      players: [],
      status: 'waiting',
      board: chessEngine.getBoard(),
      turn: 'b'
    }

    setCurrentGame(game)

    if (socket) {
      socket.emit('create-game', { roomCode, settings })
    }

    toast.success(`Game created! Room code: ${roomCode}`)
    return roomCode
  }

  const joinGame = (roomCode: string) => {
    // VULNERABILITY: No validation on room code
    if (socket) {
      socket.emit('join-game', {
        roomCode,
        userId: localStorage.getItem('userId') || 'anonymous'
      })
    }

    setCurrentGame({
      roomCode,
      status: 'playing',
      board: chessEngine.getBoard(),
      turn: 'b'
    })

    toast.success(`Joined game: ${roomCode}`)
  }

  const makeMove = (from: string, to: string) => {
    const success = chessEngine.makeMove(from as any, to as any)

    if (success) {
      if (socket && currentGame) {
        socket.emit('move', {
          roomCode: currentGame.roomCode,
          move: { from, to },
          userId: localStorage.getItem('userId')
        })
      }

      // Check game status
      if (chessEngine.inCheckmate()) {
        toast.success('Checkmate! You win!')
      } else if (chessEngine.inCheck()) {
        toast.warning('Check!')
      }

      setCurrentGame(prev => ({
        ...prev,
        board: chessEngine.getBoard(),
        turn: chessEngine.getTurn()
      }))
    } else {
      toast.error('Invalid move!')
    }
  }

  const undoMove = () => {
    chessEngine.undoMove()
    setCurrentGame(prev => ({
      ...prev,
      board: chessEngine.getBoard(),
      turn: chessEngine.getTurn()
    }))
    toast.info('Move undone!')
  }

  const sendMessage = (message: string) => {
    if (socket && currentGame) {
      socket.emit('chat-message', {
        roomCode: currentGame.roomCode,
        message,
        userId: localStorage.getItem('userId')
      })
    }
  }

  return (
    <GameContext.Provider value={{
      currentGame,
      socket,
      createGame,
      joinGame,
      makeMove,
      undoMove,
      sendMessage,
      messages,
      onlineGames,
      playerStats
    }}>
      {children}
    </GameContext.Provider>
  )
}