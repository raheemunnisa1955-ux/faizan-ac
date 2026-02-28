import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Filter, CheckCircle2, AlertCircle, Clock,
  Thermometer, Zap, Wind, Star, ArrowRight, Phone,
  ChevronDown, X
} from 'lucide-react'

type Condition = 'Excellent' | 'Good' | 'Fair'
type ACType = 'VRV' | 'Ductable' | 'Split' | 'Tower'

interface Unit {
  id: string
  brand: string
  model: string
  type: ACType
  capacity: string
  tech: string
  coil: string
  condition: Condition
  year: number
  price: string
  originalPrice: string
  img: string
  rating: number
  certScore: number
  location: string
  tags: string[]
}

const units: Unit[] = [
  {
    id: 'U001',
    brand: 'Daikin',
    model: 'VRV-IV S Series',
    type: 'VRV',
    capacity: '8 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Excellent',
    year: 2021,
    price: '₹3,80,000',
    originalPrice: '₹7,20,000',
    img: '/ac-vrv.jpg',
    rating: 4.9,
    certScore: 96,
    location: 'Secunderabad',
    tags: ['Multi-Zone', 'R-410A', 'BMS Ready'],
  },
  {
    id: 'U002',
    brand: 'Mitsubishi',
    model: 'PURY-EP250',
    type: 'VRV',
    capacity: '10 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Excellent',
    year: 2020,
    price: '₹4,50,000',
    originalPrice: '₹9,00,000',
    img: '/ac-daikin.jpg',
    rating: 4.8,
    certScore: 94,
    location: 'Banjara Hills',
    tags: ['City Multi', 'R-32', 'Heat Recovery'],
  },
  {
    id: 'U003',
    brand: 'Blue Star',
    model: 'DFSF060BE',
    type: 'Ductable',
    capacity: '5 TR',
    tech: 'Fixed Speed',
    coil: 'Copper',
    condition: 'Good',
    year: 2019,
    price: '₹1,20,000',
    originalPrice: '₹2,40,000',
    img: '/ac-ductable.jpg',
    rating: 4.5,
    certScore: 88,
    location: 'Kukatpally',
    tags: ['R-22', 'Fresh Air', 'Ducted'],
  },
  {
    id: 'U004',
    brand: 'Carrier',
    model: 'CDPUC060',
    type: 'Ductable',
    capacity: '5 TR',
    tech: 'Fixed Speed',
    coil: 'Aluminium',
    condition: 'Good',
    year: 2018,
    price: '₹95,000',
    originalPrice: '₹2,10,000',
    img: '/ac-rooftop.jpg',
    rating: 4.3,
    certScore: 82,
    location: 'Madhapur',
    tags: ['Rooftop', 'R-22', 'Commercial'],
  },
  {
    id: 'U005',
    brand: 'Daikin',
    model: 'FTKF50TV16U',
    type: 'Split',
    capacity: '1.5 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Excellent',
    year: 2022,
    price: '₹28,000',
    originalPrice: '₹55,000',
    img: '/ac-split.jpg',
    rating: 4.9,
    certScore: 97,
    location: 'Gachibowli',
    tags: ['5-Star', 'Wi-Fi', 'R-32'],
  },
  {
    id: 'U006',
    brand: 'Voltas',
    model: '185V DZW',
    type: 'Split',
    capacity: '1.5 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Good',
    year: 2021,
    price: '₹22,000',
    originalPrice: '₹46,000',
    img: '/ac-split.jpg',
    rating: 4.4,
    certScore: 86,
    location: 'Ameerpet',
    tags: ['3-Star', 'R-32', 'Auto Restart'],
  },
  {
    id: 'U007',
    brand: 'LG',
    model: 'LS-Q18YNZA',
    type: 'Split',
    capacity: '1.5 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Fair',
    year: 2019,
    price: '₹16,500',
    originalPrice: '₹42,000',
    img: '/ac-split.jpg',
    rating: 4.0,
    certScore: 74,
    location: 'Dilsukhnagar',
    tags: ['Dual Inverter', 'R-410A'],
  },
  {
    id: 'U008',
    brand: 'Hitachi',
    model: 'RAS-D18CDE',
    type: 'Tower',
    capacity: '1.5 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Excellent',
    year: 2022,
    price: '₹32,000',
    originalPrice: '₹68,000',
    img: '/ac-tower.jpg',
    rating: 4.7,
    certScore: 93,
    location: 'Jubilee Hills',
    tags: ['Cassette', 'Auto Clean', 'R-32'],
  },
  {
    id: 'U009',
    brand: 'Samsung',
    model: 'AF28BSSDAURNNA',
    type: 'Tower',
    capacity: '2 TR',
    tech: 'Inverter',
    coil: 'Aluminium',
    condition: 'Good',
    year: 2020,
    price: '₹26,000',
    originalPrice: '₹58,000',
    img: '/ac-tower.jpg',
    rating: 4.3,
    certScore: 85,
    location: 'HITEC City',
    tags: ['Wind-Free', 'R-32', 'Smart'],
  },
  {
    id: 'U010',
    brand: 'Blue Star',
    model: '5HW18ZBWS',
    type: 'Split',
    capacity: '1.5 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Good',
    year: 2021,
    price: '₹24,000',
    originalPrice: '₹50,000',
    img: '/ac-split.jpg',
    rating: 4.5,
    certScore: 89,
    location: 'Kondapur',
    tags: ['5-Star', 'R-32', 'Self Clean'],
  },
  {
    id: 'U011',
    brand: 'Carrier',
    model: 'CAI18EE3R39F0',
    type: 'Split',
    capacity: '1.5 TR',
    tech: 'Fixed Speed',
    coil: 'Aluminium',
    condition: 'Fair',
    year: 2017,
    price: '₹12,000',
    originalPrice: '₹35,000',
    img: '/ac-split.jpg',
    rating: 3.8,
    certScore: 70,
    location: 'Uppal',
    tags: ['R-410A', 'Budget'],
  },
  {
    id: 'U012',
    brand: 'Daikin',
    model: 'FCAG71ARV16',
    type: 'Ductable',
    capacity: '6 TR',
    tech: 'Inverter',
    coil: 'Copper',
    condition: 'Excellent',
    year: 2022,
    price: '₹1,80,000',
    originalPrice: '₹3,60,000',
    img: '/ac-ductable.jpg',
    rating: 4.9,
    certScore: 98,
    location: 'Financial District',
    tags: ['Inverter', 'R-410A', 'Premium'],
  },
]

const conditionConfig: Record<Condition, { color: string; bg: string; icon: typeof CheckCircle2; label: string }> = {
  Excellent: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: CheckCircle2, label: 'Excellent' },
  Good: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Clock, label: 'Good' },
  Fair: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: AlertCircle, label: 'Fair' },
}

const typeFilters: (ACType | 'All')[] = ['All', 'VRV', 'Ductable', 'Split', 'Tower']

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ACType | 'All'>('All')
  const [condFilter, setCondFilter] = useState<Condition | 'All'>('All')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'cert'>('cert')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = units
    .filter((u) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        u.brand.toLowerCase().includes(q) ||
        u.model.toLowerCase().includes(q) ||
        u.type.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.tags.some((t) => t.toLowerCase().includes(q))
      const matchType = typeFilter === 'All' || u.type === typeFilter
      const matchCond = condFilter === 'All' || u.condition === condFilter
      return matchSearch && matchType && matchCond
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'cert') return b.certScore - a.certScore
      const pa = parseInt(a.price.replace(/[₹,]/g, ''))
      const pb = parseInt(b.price.replace(/[₹,]/g, ''))
      return sortBy === 'price-asc' ? pa - pb : pb - pa
    })

  return (
    <main className="pt-20 lg:pt-24 min-h-screen" style={{ background: '#0a0f1e' }}>
      {/* Header */}
      <section
        className="relative py-16 lg:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1424 0%, #0a0f1e 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(0,82,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
            >
              — Live Inventory —
            </p>
            <h1
              className="font-calistoga text-5xl lg:text-6xl text-white mb-4"
              style={{ fontFamily: 'Calistoga, serif' }}
            >
              Certified Units
            </h1>
            <p
              className="text-base max-w-xl"
              style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {units.length} pre-owned systems available. Every listing is a certified engineering
              report — not just a photo and a price.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div
        className="sticky top-16 lg:top-20 z-30 py-4"
        style={{
          background: 'rgba(10, 15, 30, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: '#475569' }}
              />
              <input
                type="text"
                placeholder="Search brand, model, location, type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.5)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Type Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {typeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className="flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: typeFilter === t ? 'linear-gradient(135deg, #0052FF, #4D7CFF)' : 'rgba(255,255,255,0.04)',
                    border: typeFilter === t ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: typeFilter === t ? '#fff' : '#64748b',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort + Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-xs font-medium outline-none cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94a3b8',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <option value="cert">Cert Score</option>
                  <option value="rating">Rating</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: showFilters ? 'rgba(0,82,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: showFilters ? '1px solid rgba(0,82,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: showFilters ? '#4D7CFF' : '#64748b',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Filter size={12} />
                Condition
              </button>
            </div>
          </div>

          {/* Condition filter */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 mt-3 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {(['All', 'Excellent', 'Good', 'Fair'] as (Condition | 'All')[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCondFilter(c)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: condFilter === c
                      ? c === 'All' ? 'rgba(0,82,255,0.2)' : conditionConfig[c as Condition]?.bg
                      : 'rgba(255,255,255,0.03)',
                    border: condFilter === c
                      ? `1px solid ${c === 'All' ? 'rgba(0,82,255,0.4)' : conditionConfig[c as Condition]?.color + '60'}`
                      : '1px solid rgba(255,255,255,0.06)',
                    color: condFilter === c
                      ? c === 'All' ? '#4D7CFF' : conditionConfig[c as Condition]?.color
                      : '#475569',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {c}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            Showing <span className="text-white font-semibold">{filtered.length}</span> of {units.length} units
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Wind size={48} className="mx-auto mb-4 opacity-20" style={{ color: '#4D7CFF' }} />
            <p className="text-lg font-medium text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              No units match your filters
            </p>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              Try adjusting your search or contact us for custom sourcing
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((unit, i) => {
              const cond = conditionConfig[unit.condition]
              const CondIcon = cond.icon
              const savings = Math.round(
                ((parseInt(unit.originalPrice.replace(/[₹,]/g, '')) -
                  parseInt(unit.price.replace(/[₹,]/g, ''))) /
                  parseInt(unit.originalPrice.replace(/[₹,]/g, ''))) *
                  100
              )
              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="group relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(14, 20, 40, 0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{
                    borderColor: 'rgba(0, 82, 255, 0.3)',
                    y: -4,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={unit.img}
                      alt={`${unit.brand} ${unit.model}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(14,20,40,1) 0%, rgba(14,20,40,0.3) 50%, transparent 100%)' }}
                    />

                    {/* Savings badge */}
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                        color: '#fff',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      -{savings}%
                    </div>

                    {/* Unit ID */}
                    <div
                      className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-mono"
                      style={{
                        background: 'rgba(10,15,30,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#475569',
                      }}
                    >
                      #{unit.id}
                    </div>

                    {/* Cert Score */}
                    <div className="absolute bottom-3 right-3">
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                        style={{
                          background: 'rgba(10,15,30,0.9)',
                          border: '1px solid rgba(0,82,255,0.3)',
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: unit.certScore >= 90 ? '#22c55e' : unit.certScore >= 80 ? '#f59e0b' : '#ef4444' }}
                        />
                        <span className="text-xs font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {unit.certScore}/100
                        </span>
                        <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                          CERT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content — Engineering Report Style */}
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p
                          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                          style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
                        >
                          {unit.brand}
                        </p>
                        <h3
                          className="text-base font-bold text-white leading-tight"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {unit.model}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={11} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        <span className="text-xs font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {unit.rating}
                        </span>
                      </div>
                    </div>

                    {/* Spec Grid */}
                    <div
                      className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl"
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      {[
                        { label: 'Type', value: unit.type, icon: Wind },
                        { label: 'Capacity', value: unit.capacity, icon: Thermometer },
                        { label: 'Tech', value: unit.tech, icon: Zap },
                        { label: 'Coil', value: unit.coil, icon: null },
                        { label: 'Year', value: unit.year.toString(), icon: null },
                        { label: 'Location', value: unit.location.split(' ')[0], icon: null },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                          <p
                            className="text-xs mb-0.5 font-medium"
                            style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-xs font-semibold text-white truncate"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {unit.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-medium"
                          style={{
                            background: 'rgba(0,82,255,0.08)',
                            border: '1px solid rgba(0,82,255,0.15)',
                            color: '#4D7CFF',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Condition */}
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
                      style={{ background: cond.bg, border: `1px solid ${cond.color}30` }}
                    >
                      <CondIcon size={13} style={{ color: cond.color }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: cond.color, fontFamily: 'Inter, sans-serif' }}
                      >
                        {cond.label} Condition
                      </span>
                      <span
                        className="ml-auto text-xs"
                        style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
                      >
                        42-pt Checked
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="text-xl font-bold text-white"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {unit.price}
                        </p>
                        <p
                          className="text-xs line-through"
                          style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}
                        >
                          MRP {unit.originalPrice}
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/919000000000?text=Hi, I'm interested in Unit #${unit.id} - ${unit.brand} ${unit.model} (${unit.capacity})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                          boxShadow: '0 0 16px rgba(0, 82, 255, 0.3)',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <Phone size={12} />
                        Enquire
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-10 rounded-2xl"
          style={{
            background: 'rgba(0,82,255,0.06)',
            border: '1px solid rgba(0,82,255,0.2)',
          }}
        >
          <h3
            className="font-calistoga text-2xl lg:text-3xl text-white mb-3"
            style={{ fontFamily: 'Calistoga, serif' }}
          >
            Don't see what you need?
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}
          >
            We source custom units on request. Tell us your specs and we'll find it.
          </p>
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Request Custom Unit
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
