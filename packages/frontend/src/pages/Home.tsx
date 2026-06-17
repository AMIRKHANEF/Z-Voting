import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={fadeIn}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Anonymous & Secure Voting
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the future of voting with zero-knowledge proofs. Your identity is protected. Your vote counts.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="inline-block px-4 py-2 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium border border-blue-400/50">
              🔐 Fully Anonymous
            </span>
            <span className="inline-block px-4 py-2 bg-green-500/30 text-green-200 rounded-full text-sm font-medium border border-green-400/50">
              ⚡ Gasless
            </span>
            <span className="inline-block px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium border border-purple-400/50">
              ✓ Transparent
            </span>
          </div>
        </motion.div>

        {/* Role Selection Cards */}
        <motion.div className="grid md:grid-cols-2 gap-6 mb-12" variants={staggerContainer}>
          {/* Admin Card */}
          <motion.button
            variants={fadeIn}
            onClick={() => navigate('/admin')}
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 text-left"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 rounded-2xl transition-all" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-bold text-white mb-3">Create Voting</h3>
              <p className="text-white/70 mb-6">Set up a new anonymous voting session. Manage voters and track results in real-time.</p>
              <div className="inline-block px-4 py-2 bg-blue-500/30 text-blue-200 rounded-lg text-sm font-medium border border-blue-400/50 group-hover:bg-blue-500/50 transition-all">
                Admin Dashboard →
              </div>
            </div>
          </motion.button>

          {/* Voter Card */}
          <motion.button
            variants={fadeIn}
            onClick={() => navigate('/voter')}
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:border-green-400/50 hover:bg-green-500/10 transition-all duration-300 text-left"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10 rounded-2xl transition-all" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🗳️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Cast Your Vote</h3>
              <p className="text-white/70 mb-6">Join a voting session and cast your vote anonymously. Your privacy is guaranteed.</p>
              <div className="inline-block px-4 py-2 bg-green-500/30 text-green-200 rounded-lg text-sm font-medium border border-green-400/50 group-hover:bg-green-500/50 transition-all">
                Vote Now →
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Features Section */}
        <motion.div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8" variants={fadeIn}>
          <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Generate ID',
                description: 'Get your unique voting ID (public and private)',
              },
              {
                step: '2',
                title: 'Create Proof',
                description: 'Generate zero-knowledge proof of eligibility',
              },
              {
                step: '3',
                title: 'Cast Vote',
                description: 'Submit your vote anonymously on-chain',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
