import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import LobbyPage from './pages/LobbyPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage' // No auth required!
import { AuthProvider } from './contexts/AuthContext'
import { GameProvider } from './contexts/GameContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <div className="min-h-screen bg-knight-dark">
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1a1a2e',
                  color: '#fff',
                  border: '1px solid #6B46C1',
                },
              }}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/game/:roomCode" element={<GamePage />} />
              <Route path="/profile/:userId?" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} /> {/* VULNERABILITY: No auth check! */}
            </Routes>
          </div>
        </GameProvider>
      </AuthProvider>
    </Router>
  )
}

export default App