import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Results() {
  const { address } = useParams()

  const results = [
    { option: 'Option A', votes: 45, percentage: 45 },
    { option: 'Option B', votes: 35, percentage: 35 },
    { option: 'Option C', votes: 20, percentage: 20 },
  ]

  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0)

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
          <h1 className="text-5xl font-bold text-white mb-4">Voting Results</h1>
          <p className="text-white/70 text-lg">Anonymous voting session results</p>
        </motion.div>

        {/* Results Cards */}
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-8 pb-8 border-b border-white/20">
            <p className="text-white/70 text-sm mb-2">Contract Address</p>
            <p className="text-white font-mono text-sm break-all">{address}</p>
          </div>

          <div className="space-y-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{result.option}</h3>
                  <span className="text-white/70 text-sm">
                    {result.votes} votes ({result.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">Total Votes</p>
              <p className="text-2xl font-bold text-white">{totalVotes}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">Winning Option</p>
              <p className="text-2xl font-bold text-green-400">{results[0].option}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">Participation</p>
              <p className="text-2xl font-bold text-white">100%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
