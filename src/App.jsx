import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [page, setPage] = useState('landing')
  const [dark, setDark] = useState(false)
  const toggleTheme = () => setDark(d => !d)

  if (page === 'dashboard') {
    return <Dashboard onLogout={() => setPage('landing')} dark={dark} toggleTheme={toggleTheme} />
  }

  return <Landing onLogin={() => setPage('dashboard')} dark={dark} toggleTheme={toggleTheme} />
}
