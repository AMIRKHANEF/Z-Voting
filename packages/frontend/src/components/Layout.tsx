import { Toaster } from 'sonner'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Z-Voting</h1>
              <span className="text-xs bg-green-500/30 text-green-200 px-2 py-1 rounded-full">v2.0</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="/" className="text-white/80 hover:text-white transition">
                Home
              </a>
              <a href="/admin" className="text-white/80 hover:text-white transition">
                Admin
              </a>
              <a href="/voter" className="text-white/80 hover:text-white transition">
                Voter
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1">{children}</div>
      </main>

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  )
}
