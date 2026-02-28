import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Zap, Shield, Award, TrendingUp,
  Wind, Thermometer, Star, Phone, ChevronRight
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const stats = [
  { value: '500+', label: 'Units Resold', icon: TrendingUp },
  { value: '12+', label: 'Years Active', icon: Award },
  { value: '98%', label: 'Client Retention', icon: Star },
  { value: '24hr', label: 'Turnaround', icon: Zap },
]

const categories = [
  {
    type: 'VRV / VRF Systems',
    desc: 'Variable Refrigerant Volume multi-zone systems for large commercial spaces.',
    img: '/ac-vrv.jpg',
    badge: 'Commercial',
  },
  {
    type: 'Ductable ACs',
    desc: 'Centralized ducted systems ideal for offices, hotels, and malls.',
    img: '/ac-ductable.jpg',
    badge: 'Industrial',
  },
  {
    type: 'Split ACs',
    desc: 'Efficient wall-mounted splits from 1TR to 5TR, all major brands.',
    img: '/ac-split.jpg',
    badge: 'Residential',
  },
  {
    type: 'Tower ACs',
    desc: 'Floor-standing cassette units for showrooms, lobbies, and open halls.',
    img: '/ac-tower.jpg',
    badge: 'Commercial',
  },
]

const brands = ['Daikin', 'Mitsubishi', 'Voltas', 'Blue Star', 'Carrier', 'LG', 'Samsung', 'Hitachi']

const whyUs = [
  { icon: Shield, title: 'Certified Inspection', desc: 'Every unit passes a 42-point engineering checklist before listing.' },
  { icon: Zap, title: 'Same-Day Response', desc: 'WhatsApp quote within 2 hours of your inquiry, guaranteed.' },
  { icon: Award, title: 'Warranty Backed', desc: 'All units come with a 90-day operational warranty from us.' },
  { icon: Wind, title: 'Free Site Survey', desc: 'Our technicians visit your site before any purchase — zero pressure.' },
]

export default function HomePage() {
  return (
    <main className="pt-16 lg:pt-20 overflow-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1424 60%, #0a1230 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,82,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,82,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Blue glow orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0052FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4D7CFF 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          {/* Asymmetric grid */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">
            {/* Left — 7 cols */}
            <div className="lg:col-span-7 lg:pr-16">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
                style={{
                  background: 'rgba(0, 82, 255, 0.12)',
                  border: '1px solid rgba(0, 82, 255, 0.3)',
                  color: '#4D7CFF',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Hyderabad's #1 HVAC Reseller
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="font-calistoga leading-none mb-6"
                style={{
                  fontFamily: 'Calistoga, serif',
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                REFRESH
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0052FF 0%, #4D7CFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  SYSTEMS
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
                style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Pre-owned VRV, Ductable, Split & Tower air conditioning systems —
                certified, tested, and ready to deploy. Built for businesses that demand
                performance without the premium price tag.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  to="/inventory"
                  className="group flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #0052FF 0%, #4D7CFF 100%)',
                    boxShadow: '0 0 30px rgba(0, 82, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Browse Inventory
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/sell"
                  className="group flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e2e8f0',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 82, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  Sell Your AC
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-wrap gap-6"
              >
                {['42-Point Inspection', 'GST Invoiced', 'Pan-Hyderabad Delivery'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} style={{ color: '#0052FF' }} />
                    <span className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — 5 cols: Hero image + floating card */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-2xl overflow-hidden float-anim"
                style={{
                  boxShadow: '0 0 60px rgba(0, 82, 255, 0.2), 0 30px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src="/ac-hero.jpg"
                  alt="Industrial HVAC System"
                  className="w-full h-80 lg:h-[500px] object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,15,30,0.8) 0%, transparent 50%)',
                  }}
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(10, 15, 30, 0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(0, 82, 255, 0.3)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium mb-0.5" style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}>
                          FEATURED UNIT
                        </p>
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Daikin VRV-IV · 8TR · R-410A
                        </p>
                      </div>
                      <div
                        className="px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                          color: '#fff',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        ₹3.8L
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-6 -left-6 px-5 py-4 rounded-xl hidden lg:block"
                style={{
                  background: 'rgba(14, 20, 40, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 82, 255, 0.25)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0, 82, 255, 0.15)' }}
                  >
                    <Thermometer size={18} style={{ color: '#4D7CFF' }} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>47 Units</p>
                    <p className="text-xs" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>Available Now</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #0052FF, transparent)' }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </section>

      {/* ─── INDUSTRIAL STATS (Inverted Contrast — Slate-900) ─── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ background: '#0f172a' }}
      >
        {/* Scan lines effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,82,255,0.02) 2px, rgba(0,82,255,0.02) 4px)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
            >
              — By the Numbers —
            </p>
            <h2
              className="font-calistoga text-4xl lg:text-5xl text-white"
              style={{ fontFamily: 'Calistoga, serif' }}
            >
              Industrial Scale.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Boutique Precision.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-8 rounded-2xl text-center overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s',
                }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0, 82, 255, 0.05)' }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(0, 82, 255, 0.12)', border: '1px solid rgba(0, 82, 255, 0.2)' }}
                >
                  <Icon size={22} style={{ color: '#4D7CFF' }} />
                </div>
                <p
                  className="font-calistoga text-4xl lg:text-5xl mb-2"
                  style={{
                    fontFamily: 'Calistoga, serif',
                    background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {value}
                </p>
                <p className="text-sm font-medium" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 lg:py-28" style={{ background: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
            >
              — Product Categories —
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2
                className="font-calistoga text-4xl lg:text-5xl text-white max-w-lg"
                style={{ fontFamily: 'Calistoga, serif' }}
              >
                Every System Type. One Source.
              </h2>
              <Link
                to="/inventory"
                className="group flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}
              >
                View All Units
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map(({ type, desc, img, badge }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to="/inventory" className="group block">
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.4s',
                    }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={img}
                        alt={type}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.9) 0%, rgba(10,15,30,0.2) 60%, transparent 100%)' }}
                      />
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide"
                        style={{
                          background: 'rgba(0, 82, 255, 0.2)',
                          border: '1px solid rgba(0, 82, 255, 0.4)',
                          color: '#4D7CFF',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {badge}
                      </div>
                    </div>
                    <div
                      className="p-5"
                      style={{ background: 'rgba(14, 20, 40, 0.95)' }}
                    >
                      <h3
                        className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {type}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                        {desc}
                      </p>
                      <div
                        className="mt-4 flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}
                      >
                        Explore
                        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20 lg:py-28" style={{ background: '#0d1424' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
              >
                — Why Ateeq Ateeq —
              </p>
              <h2
                className="font-calistoga text-4xl lg:text-5xl text-white mb-6 leading-tight"
                style={{ fontFamily: 'Calistoga, serif' }}
              >
                The Trusted Name in Pre-Owned HVAC
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                With over a decade of hands-on experience in Hyderabad's commercial
                cooling market, we've built a reputation on transparency, technical
                rigor, and after-sale accountability.
              </p>
              <a
                href="https://wa.me/918106947294"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                  boxShadow: '0 0 24px rgba(0, 82, 255, 0.35)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Phone size={16} />
                WhatsApp Us Now
              </a>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{
                    borderColor: 'rgba(0, 82, 255, 0.3)',
                    background: 'rgba(0, 82, 255, 0.04)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(0, 82, 255, 0.1)', border: '1px solid rgba(0, 82, 255, 0.2)' }}
                  >
                    <Icon size={20} style={{ color: '#4D7CFF' }} />
                  </div>
                  <h3
                    className="text-base font-semibold text-white mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-16" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p
            className="text-center text-xs font-medium tracking-widest uppercase mb-10"
            style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}
          >
            Brands We Stock
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {brands.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#475569',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 lg:py-28" style={{ background: '#0f172a' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 lg:p-16 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,82,255,0.15) 0%, rgba(77,124,255,0.08) 100%)',
              border: '1px solid rgba(0, 82, 255, 0.25)',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #0052FF, transparent)' }}
            />
            <h2
              className="font-calistoga text-4xl lg:text-5xl text-white mb-4"
              style={{ fontFamily: 'Calistoga, serif' }}
            >
              Ready to Sell Your AC?
            </h2>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Get an instant valuation in 2 hours. No obligation, no middlemen.
              Just a fair price from Hyderabad's most trusted HVAC reseller.
            </p>
            <Link
              to="/sell"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                boxShadow: '0 0 40px rgba(0, 82, 255, 0.5)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Start the 7-Phase Wizard
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-10 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#0a0f1e' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>
            © 2025 AC Resellers by Ateeq Ateeq · Hyderabad, Telangana
          </p>
          <div className="flex gap-6">
            {['Home', 'Inventory', 'Sell', 'Location'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-xs font-medium transition-colors hover:text-white"
                style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
