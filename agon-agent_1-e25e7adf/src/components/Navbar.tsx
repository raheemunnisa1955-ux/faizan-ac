import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/sell', label: 'Sell' },
  { href: '/location', label: 'Location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 15, 30, 0.85)'
            : 'rgba(10, 15, 30, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled
            ? '1px solid rgba(77, 124, 255, 0.2)'
            : '1px solid rgba(77, 124, 255, 0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-lg overflow-hidden"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 82, 255, 0.4)',
                  }}
                >
                  <img
                    src="/image_d638a6.png"
                    alt="AC Resellers Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full pulse-blue"
                  style={{ background: '#0052FF' }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-calistoga text-white text-base lg:text-lg tracking-tight"
                  style={{ fontFamily: 'Calistoga, serif' }}
                >
                  AC Resellers
                </span>
                <span
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}
                >
                  by Ateeq Ateeq
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
                    style={{
                      color: isActive ? '#fff' : '#94a3b8',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(0, 82, 255, 0.15)', border: '1px solid rgba(0, 82, 255, 0.3)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/sell"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #0052FF 0%, #4D7CFF 100%)',
                  boxShadow: '0 0 20px rgba(0, 82, 255, 0.35)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Zap size={14} />
                Get Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(10, 15, 30, 0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(77, 124, 255, 0.2)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        color: isActive ? '#fff' : '#94a3b8',
                        background: isActive ? 'rgba(0, 82, 255, 0.15)' : 'transparent',
                        border: isActive ? '1px solid rgba(0, 82, 255, 0.3)' : '1px solid transparent',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-2"
              >
                <Link
                  to="/sell"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0052FF 0%, #4D7CFF 100%)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <Zap size={14} />
                  Get Instant Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
