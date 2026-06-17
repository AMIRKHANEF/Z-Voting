import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [voters, setVoters] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateVoting = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate inputs
      if (!title.trim()) {
        toast.error('Please enter a voting title')
        return
      }
      if (!deadline) {
        toast.error('Please select a deadline')
        return
      }
      if (!voters.trim()) {
        toast.error('Please enter voter addresses')
        return
      }

      toast.loading('Creating voting session...')

      // TODO: Connect to backend API
      console.log({ title, deadline, voters })

      toast.success('Voting session created successfully!')
      setTitle('')
      setDeadline('')
      setVoters('')
    } catch (error) {
      toast.error('Failed to create voting session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="mb-12" initial={{ y: -20 }} animate={{ y: 0 }}>
          <h1 className="text-5xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-white/70 text-lg">Create and manage voting sessions</p>
        </motion.div>

        {/* Create Voting Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Create New Voting</h2>

          <form onSubmit={handleCreateVoting} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-white font-medium mb-2">Voting Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., DAO Governance Proposal #42"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Deadline Input */}
            <div>
              <label className="block text-white font-medium mb-2">Voting Deadline</label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Voters Input */}
            <div>
              <label className="block text-white font-medium mb-2">Eligible Voters (one per line)</label>
              <textarea
                value={voters}
                onChange={(e) => setVoters(e.target.value)}
                placeholder="0x123...abc
0x456...def
0x789...ghi"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-mono text-sm"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Creating...
                </span>
              ) : (
                'Create Voting Session'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Recent Votings */}
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Votings</h2>
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">No votings created yet</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
