import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import SellPage from './pages/SellPage'
import LocationPage from './pages/LocationPage'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/inventory" element={<PageWrapper><InventoryPage /></PageWrapper>} />
        <Route path="/sell" element={<PageWrapper><SellPage /></PageWrapper>} />
        <Route path="/location" element={<PageWrapper><LocationPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
