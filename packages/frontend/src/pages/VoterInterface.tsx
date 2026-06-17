import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function VoterInterface() {
  const [votingAddress, setVotingAddress] = useState('')
  const [privateID, setPrivateID] = useState('')
  const [loading, setLoading] = useState(false)
  const [votingInfo, setVotingInfo] = useState<any>(null)
  const [selectedVote, setSelectedVote] = useState<number | null>(null)

  const handleJoinVoting = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!votingAddress.trim()) {
        toast.error('Please enter voting address')
        return
      }
      if (!privateID.trim()) {
        toast.error('Please enter your private voting ID')
        return
      }

      toast.loading('Fetching voting information...')

      // TODO: Fetch voting info from contract
      setVotingInfo({
        title: 'Sample Voting Session',
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        options: ['Option A', 'Option B', 'Option C'],
        totalVotes: 42,
      })

      toast.success('Voting session loaded!')
    } catch (error) {
      toast.error('Failed to load voting session')
    } finally {
      setLoading(false)
    }
  }

  const handleCastVote = async () => {
    if (selectedVote === null) {
      toast.error('Please select a voting option')
      return
    }

    setLoading(true)
    try {
      toast.loading('Generating zero-knowledge proof...')
      // TODO: Generate proof and submit vote
      console.log({ votingAddress, privateID, selectedVote })
      toast.success('Vote submitted successfully!')
      setSelectedVote(null)
    } catch (error) {
      toast.error('Failed to submit vote')
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div className="mb-12" initial={{ y: -20 }} animate={{ y: 0 }}>
          <h1 className="text-5xl font-bold text-white mb-4">Vote Anonymously</h1>
          <p className="text-white/70 text-lg">Your privacy is protected by zero-knowledge proofs</p>
        </motion.div>

        {!votingInfo ? (
          /* Join Voting Form */
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Join Voting Session</h2>

            <form onSubmit={handleJoinVoting} className="space-y-6">
              {/* Voting Address */}
              <div>
                <label className="block text-white font-medium mb-2">Voting Contract Address</label>
                <input
                  type="text"
                  value={votingAddress}
                  onChange={(e) => setVotingAddress(e.target.value)}
                  placeholder="0x123...abc"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition font-mono text-sm"
                />
              </div>

              {/* Private ID */}
              <div>
                <label className="block text-white font-medium mb-2">Your Private Voting ID</label>
                <input
                  type="password"
                  value={privateID}
                  onChange={(e) => setPrivateID(e.target.value)}
                  placeholder="Your secret mnemonic"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Loading...
                  </span>
                ) : (
                  'Join Voting'
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* Voting Interface */
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{votingInfo.title}</h2>
              <p className="text-white/70 text-sm">
                Deadline: {new Date(votingInfo.deadline).toLocaleString()}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {votingInfo.options.map((option: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedVote(index)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left font-medium ${
                    selectedVote === index
                      ? 'bg-green-500/30 border-green-400 text-green-100'
                      : 'bg-white/5 border-white/20 text-white hover:border-white/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        selectedVote === index
                          ? 'bg-green-400 border-green-400'
                          : 'border-white/40'
                      }`}
                    >
                      {selectedVote === index && <span className="text-white font-bold">✓</span>}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Vote Stats */}
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-8">
              <p className="text-white/70 text-sm">Total votes: {votingInfo.totalVotes}</p>
            </div>

            {/* Cast Vote Button */}
            <motion.button
              onClick={handleCastVote}
              disabled={loading || selectedVote === null}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Submitting...
                </span>
              ) : (
                '🔐 Cast Your Vote Anonymously'
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
