import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useGame } from '../contexts/GameContext'
import toast from 'react-hot-toast'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { playerStats } = useGame()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast.success(`Uploaded: ${file.name}`)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-knight-dark flex items-center justify-center">
        <div className="card">
          <h2 className="text-2xl text-white mb-4">Please login to view profile</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-knight-dark to-purple-900/20 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-display text-white mb-8">Player Profile</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Info */}
          <div className="card">
            <h2 className="text-2xl text-white mb-4">Account Details</h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400">Username</label>
                <p className="text-white text-xl">{user.username}</p>
              </div>

              <div>
                <label className="text-gray-400">Email</label>
                <p className="text-white">{user.email}</p>
              </div>

              <div>
                <label className="text-gray-400">ELO Rating</label>
                <p className="text-3xl font-bold text-knight-gold">{user.elo}</p>
              </div>

              <div>
                <label className="text-gray-400">Account Type</label>
                <p className="text-white">
                  {user.isPremium ? '⭐ Premium' : 'Free'}
                  {user.isAdmin && ' 👑 Admin'}
                </p>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="text-gray-400">Avatar</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-white"
                  accept="*/*"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Max size: 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <h2 className="text-2xl text-white mb-4">Statistics</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Games Played</span>
                <span className="text-white font-bold">{playerStats.gamesPlayed}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Wins</span>
                <span className="text-green-400 font-bold">{playerStats.wins}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Draws</span>
                <span className="text-yellow-400 font-bold">{playerStats.draws}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-white font-bold">
                  {((playerStats.wins / playerStats.gamesPlayed) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Current Streak</span>
                <span className="text-knight-gold font-bold">🔥 {playerStats.currentStreak}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg text-white mb-2">Achievements</h3>
              <div className="flex gap-2 flex-wrap">
                {['🏆 Champion', '⚡ Speed Demon', '🎯 Tactician', '👑 Royalty'].map(badge => (
                  <span key={badge} className="px-2 py-1 bg-gray-800 rounded text-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card mt-8 border-red-500/50">
          <h2 className="text-2xl text-red-400 mb-4">Danger Zone</h2>
          <p className="text-gray-400 mb-4">
            These actions are permanent and cannot be undone.
          </p>
          <button className="btn-primary bg-red-600 hover:bg-red-700">
            Delete Account
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 text-gray-400 hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default ProfilePage