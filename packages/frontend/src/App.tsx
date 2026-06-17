import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import VoterInterface from './pages/VoterInterface'
import Results from './pages/Results'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/voter" element={<VoterInterface />} />
          <Route path="/results/:address" element={<Results />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
