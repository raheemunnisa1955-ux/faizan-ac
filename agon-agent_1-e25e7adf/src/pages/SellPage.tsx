import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronLeft, Check, X,
  Zap, Wind, Thermometer, Shield, Camera, Phone,
  Star, AlertCircle
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface WizardState {
  brand: string
  type: string
  tech: string
  capacity: string
  coil: string
  condition: string
  conditionDetail: string
  photos: File[]
  name: string
  phone: string
  location: string
}

// ─── Phase Config ─────────────────────────────────────────────────────────────
const phases = [
  { id: 1, label: 'Brand', icon: Star, title: 'Select Your Brand', subtitle: 'Choose the manufacturer of your AC unit' },
  { id: 2, label: 'Type', icon: Wind, title: 'System Type', subtitle: 'What kind of AC system are you selling?' },
  { id: 3, label: 'Tech', icon: Zap, title: 'Technology', subtitle: 'Inverter or Fixed Speed?' },
  { id: 4, label: 'Capacity', icon: Thermometer, title: 'Cooling Capacity', subtitle: 'Select the tonnage of your unit' },
  { id: 5, label: 'Coil', icon: Shield, title: 'Coil Material', subtitle: 'Indoor unit coil type' },
  { id: 6, label: 'Condition', icon: AlertCircle, title: 'Unit Condition', subtitle: 'Honest assessment gets better offers' },
  { id: 7, label: 'Photos', icon: Camera, title: 'Upload Photos', subtitle: 'Clear photos = faster & higher quotes' },
]

const brands = ['Daikin', 'Mitsubishi', 'Voltas', 'Blue Star', 'Carrier', 'LG', 'Samsung', 'Hitachi', 'O General', 'Panasonic', 'Godrej', 'Other']
const acTypes = [
  { value: 'VRV', label: 'VRV / VRF', desc: 'Multi-zone variable refrigerant systems' },
  { value: 'Ductable', label: 'Ductable', desc: 'Centralized ducted air handling units' },
  { value: 'Split', label: 'Split AC', desc: 'Wall-mounted indoor/outdoor split units' },
  { value: 'Tower', label: 'Tower / Cassette', desc: 'Floor-standing or ceiling cassette units' },
]
const techOptions = [
  { value: 'Inverter', label: 'Inverter', desc: 'Variable speed compressor, energy efficient', premium: true },
  { value: 'Fixed Speed', label: 'Fixed Speed', desc: 'Standard on/off compressor technology', premium: false },
]
const capacities = ['0.75 TR', '1 TR', '1.25 TR', '1.5 TR', '2 TR', '2.5 TR', '3 TR', '4 TR', '5 TR', '6 TR', '7.5 TR', '10 TR', '12.5 TR', '15 TR+']
const coilOptions = [
  { value: 'Copper', label: 'Copper Coil', desc: 'Better heat transfer, more durable, higher value', premium: true },
  { value: 'Aluminium', label: 'Aluminium Coil', desc: 'Standard coil material, good performance', premium: false },
]
const conditions = [
  { value: 'Excellent', label: 'Excellent', desc: 'Fully working, no visible damage, recently serviced', color: '#22c55e', score: '90-100%' },
  { value: 'Good', label: 'Good', desc: 'Working, minor cosmetic issues, last serviced < 1 year', color: '#f59e0b', score: '70-89%' },
  { value: 'Fair', label: 'Fair', desc: 'Working with issues, needs service or minor repairs', color: '#ef4444', score: '50-69%' },
  { value: 'Not Working', label: 'Not Working', desc: 'Non-functional, for parts or repair', color: '#94a3b8', score: '10-49%' },
]

// ─── Estimate Calculator ──────────────────────────────────────────────────────
function calcEstimate(state: WizardState): { low: number; high: number } | null {
  if (!state.brand || !state.type || !state.capacity || !state.condition) return null
  const capVal = parseFloat(state.capacity)
  let base = capVal * 8000
  if (state.type === 'VRV') base *= 6
  else if (state.type === 'Ductable') base *= 2.5
  else if (state.type === 'Tower') base *= 1.2
  if (state.tech === 'Inverter') base *= 1.3
  if (state.coil === 'Copper') base *= 1.1
  const condMult = { Excellent: 0.55, Good: 0.4, Fair: 0.28, 'Not Working': 0.12 }[state.condition] || 0.4
  const val = base * condMult
  return { low: Math.round(val * 0.85), high: Math.round(val * 1.15) }
}

function formatINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  return `₹${(n / 1000).toFixed(0)}K`
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SellPage() {
  const [phase, setPhase] = useState(1)
  const [state, setState] = useState<WizardState>({
    brand: '', type: '', tech: '', capacity: '', coil: '', condition: '',
    conditionDetail: '', photos: [], name: '', phone: '', location: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (key: keyof WizardState, value: string | File[]) =>
    setState((s) => ({ ...s, [key]: value }))

  const canNext = () => {
    if (phase === 1) return !!state.brand
    if (phase === 2) return !!state.type
    if (phase === 3) return !!state.tech
    if (phase === 4) return !!state.capacity
    if (phase === 5) return !!state.coil
    if (phase === 6) return !!state.condition
    if (phase === 7) return state.phone.length >= 10
    return false
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files).slice(0, 8)
    update('photos', [...state.photos, ...arr].slice(0, 8))
  }

  const removePhoto = (i: number) => {
    const p = [...state.photos]
    p.splice(i, 1)
    update('photos', p)
  }

  const handleSubmit = () => {
    const est = calcEstimate(state)
    const msg = encodeURIComponent(
      `🔧 *AC Sale Inquiry — AC Resellers*\n\n` +
      `Brand: ${state.brand}\nType: ${state.type}\nTech: ${state.tech}\n` +
      `Capacity: ${state.capacity}\nCoil: ${state.coil}\nCondition: ${state.condition}\n` +
      (state.conditionDetail ? `Details: ${state.conditionDetail}\n` : '') +
      `\n👤 Name: ${state.name || 'Not provided'}\n📍 Location: ${state.location || 'Not provided'}\n` +
      (est ? `\n💰 Est. Value: ${formatINR(est.low)} – ${formatINR(est.high)}\n` : '') +
      `\n📸 Photos: ${state.photos.length} attached\n\nPlease contact me for a quote.`
    )
    window.open(`https://wa.me/919000000000?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  const estimate = calcEstimate(state)

  if (submitted) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center" style={{ background: '#0a0f1e' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #0052FF, #4D7CFF)', boxShadow: '0 0 40px rgba(0,82,255,0.5)' }}
          >
            <Check size={36} className="text-white" />
          </div>
          <h2
            className="font-calistoga text-4xl text-white mb-4"
            style={{ fontFamily: 'Calistoga, serif' }}
          >
            Inquiry Sent!
          </h2>
          <p className="text-base mb-2" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            Your WhatsApp message is ready. We'll respond within 2 hours with a firm quote.
          </p>
          {estimate && (
            <div
              className="mt-6 p-5 rounded-2xl"
              style={{ background: 'rgba(0,82,255,0.1)', border: '1px solid rgba(0,82,255,0.3)' }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}>
                ESTIMATED OFFER RANGE
              </p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Calistoga, serif' }}>
                {formatINR(estimate.low)} – {formatINR(estimate.high)}
              </p>
            </div>
          )}
          <button
            onClick={() => { setSubmitted(false); setPhase(1); setState({ brand: '', type: '', tech: '', capacity: '', coil: '', condition: '', conditionDetail: '', photos: [], name: '', phone: '', location: '' }) }}
            className="mt-8 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif' }}
          >
            Submit Another Unit
          </button>
        </motion.div>
      </main>
    )
  }

  const currentPhase = phases[phase - 1]
  const PhaseIcon = currentPhase.icon

  return (
    <main
      className="pt-16 min-h-screen"
      style={{ background: 'linear-gradient(135deg, #070c1a 0%, #0a0f1e 50%, #080d1c 100%)' }}
    >
      {/* Portal Header */}
      <div
        className="sticky top-16 z-20 py-4"
        style={{
          background: 'rgba(7, 12, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,82,255,0.12)',
        }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#0052FF', fontFamily: 'Inter, sans-serif' }}
              >
                Sell Your AC — Phase {phase} of {phases.length}
              </p>
            </div>
            {estimate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(0,82,255,0.12)', border: '1px solid rgba(0,82,255,0.25)' }}
              >
                <p className="text-xs font-bold" style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}>
                  Est. {formatINR(estimate.low)}–{formatINR(estimate.high)}
                </p>
              </motion.div>
            )}
          </div>
          {/* Progress Bar */}
          <div className="flex gap-1.5">
            {phases.map((p) => (
              <div
                key={p.id}
                className="h-1 rounded-full flex-1 transition-all duration-500"
                style={{
                  background: p.id < phase
                    ? 'linear-gradient(90deg, #0052FF, #4D7CFF)'
                    : p.id === phase
                    ? 'linear-gradient(90deg, #0052FF, #4D7CFF)'
                    : 'rgba(255,255,255,0.08)',
                  opacity: p.id === phase ? 1 : p.id < phase ? 0.8 : 0.3,
                }}
              />
            ))}
          </div>
          {/* Phase Labels */}
          <div className="flex gap-1.5 mt-1.5">
            {phases.map((p) => (
              <div key={p.id} className="flex-1 text-center">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: p.id <= phase ? '#4D7CFF' : '#334155',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                  }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Phase Header */}
            <div className="mb-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(77,124,255,0.1))',
                  border: '1px solid rgba(0,82,255,0.3)',
                }}
              >
                <PhaseIcon size={24} style={{ color: '#4D7CFF' }} />
              </div>
              <h2
                className="font-calistoga text-3xl lg:text-4xl text-white mb-2"
                style={{ fontFamily: 'Calistoga, serif' }}
              >
                {currentPhase.title}
              </h2>
              <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                {currentPhase.subtitle}
              </p>
            </div>

            {/* ─── Phase 1: Brand ─── */}
            {phase === 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => update('brand', b)}
                    className="group relative px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      background: state.brand === b
                        ? 'linear-gradient(135deg, rgba(0,82,255,0.25), rgba(77,124,255,0.15))'
                        : 'rgba(255,255,255,0.03)',
                      border: state.brand === b
                        ? '1px solid rgba(0,82,255,0.6)'
                        : '1px solid rgba(255,255,255,0.07)',
                      color: state.brand === b ? '#fff' : '#64748b',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {state.brand === b && (
                      <div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: '#0052FF' }}
                      >
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                    {b}
                  </button>
                ))}
              </div>
            )}

            {/* ─── Phase 2: Type ─── */}
            {phase === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {acTypes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => update('type', t.value)}
                    className="group relative text-left p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: state.type === t.value
                        ? 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(77,124,255,0.1))'
                        : 'rgba(255,255,255,0.02)',
                      border: state.type === t.value
                        ? '1px solid rgba(0,82,255,0.5)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {state.type === t.value && (
                      <div
                        className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #0052FF, #4D7CFF)' }}
                      >
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <p
                      className="text-base font-bold mb-1.5"
                      style={{
                        color: state.type === t.value ? '#fff' : '#94a3b8',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {t.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* ─── Phase 3: Tech ─── */}
            {phase === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => update('tech', t.value)}
                    className="relative text-left p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: state.tech === t.value
                        ? 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(77,124,255,0.1))'
                        : 'rgba(255,255,255,0.02)',
                      border: state.tech === t.value
                        ? '1px solid rgba(0,82,255,0.5)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {t.premium && (
                      <span
                        className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-3"
                        style={{
                          background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                          color: '#fff',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        +30% Value
                      </span>
                    )}
                    {state.tech === t.value && (
                      <div
                        className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #0052FF, #4D7CFF)' }}
                      >
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <p
                      className="text-base font-bold mb-1.5"
                      style={{ color: state.tech === t.value ? '#fff' : '#94a3b8', fontFamily: 'Inter, sans-serif' }}
                    >
                      {t.label}
                    </p>
                    <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* ─── Phase 4: Capacity ─── */}
            {phase === 4 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {capacities.map((c) => (
                  <button
                    key={c}
                    onClick={() => update('capacity', c)}
                    className="relative py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      background: state.capacity === c
                        ? 'linear-gradient(135deg, #0052FF, #4D7CFF)'
                        : 'rgba(255,255,255,0.03)',
                      border: state.capacity === c
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.07)',
                      color: state.capacity === c ? '#fff' : '#64748b',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: state.capacity === c ? '0 0 20px rgba(0,82,255,0.35)' : 'none',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* ─── Phase 5: Coil ─── */}
            {phase === 5 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coilOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => update('coil', c.value)}
                    className="relative text-left p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: state.coil === c.value
                        ? 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(77,124,255,0.1))'
                        : 'rgba(255,255,255,0.02)',
                      border: state.coil === c.value
                        ? '1px solid rgba(0,82,255,0.5)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {c.premium && (
                      <span
                        className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-3"
                        style={{ background: 'linear-gradient(135deg, #0052FF, #4D7CFF)', color: '#fff', fontFamily: 'Inter, sans-serif' }}
                      >
                        +10% Value
                      </span>
                    )}
                    {state.coil === c.value && (
                      <div
                        className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #0052FF, #4D7CFF)' }}
                      >
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <p
                      className="text-base font-bold mb-1.5"
                      style={{ color: state.coil === c.value ? '#fff' : '#94a3b8', fontFamily: 'Inter, sans-serif' }}
                    >
                      {c.label}
                    </p>
                    <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                      {c.desc}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* ─── Phase 6: Condition ─── */}
            {phase === 6 && (
              <div className="space-y-3">
                {conditions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => update('condition', c.value)}
                    className="w-full relative text-left p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: state.condition === c.value
                        ? `rgba(${c.color === '#22c55e' ? '34,197,94' : c.color === '#f59e0b' ? '245,158,11' : c.color === '#ef4444' ? '239,68,68' : '148,163,184'}, 0.08)`
                        : 'rgba(255,255,255,0.02)',
                      border: state.condition === c.value
                        ? `1px solid ${c.color}50`
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ background: c.color, boxShadow: `0 0 8px ${c.color}80` }}
                        />
                        <div>
                          <p
                            className="text-sm font-bold mb-0.5"
                            style={{ color: state.condition === c.value ? '#fff' : '#94a3b8', fontFamily: 'Inter, sans-serif' }}
                          >
                            {c.label}
                          </p>
                          <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                            {c.desc}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-bold" style={{ color: c.color, fontFamily: 'Inter, sans-serif' }}>
                          {c.score}
                        </p>
                        <p className="text-xs" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>
                          of MRP
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                {state.condition && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <label
                      className="block text-xs font-medium mb-2"
                      style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}
                    >
                      Additional details (optional)
                    </label>
                    <textarea
                      value={state.conditionDetail}
                      onChange={(e) => update('conditionDetail', e.target.value)}
                      placeholder="e.g. Compressor replaced 6 months ago, minor dent on outdoor unit..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── Phase 7: Photos + Contact ─── */}
            {phase === 7 && (
              <div className="space-y-8">
                {/* Photo Upload */}
                <div>
                  <div
                    className="relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-blue-500"
                    style={{
                      borderColor: 'rgba(0,82,255,0.3)',
                      background: 'rgba(0,82,255,0.03)',
                    }}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
                  >
                    <Camera size={36} className="mx-auto mb-3" style={{ color: '#4D7CFF' }} />
                    <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Drop photos here or click to upload
                    </p>
                    <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                      Up to 8 photos · JPG, PNG, HEIC · Max 10MB each
                    </p>
                    <p className="text-xs mt-2 font-medium" style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}>
                      📸 Tip: Include outdoor unit, indoor unit, nameplate & any damage
                    </p>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>

                  {state.photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {state.photos.map((f, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={URL.createObjectURL(f)}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-20 object-cover rounded-xl"
                            style={{ border: '1px solid rgba(0,82,255,0.2)' }}
                          />
                          <button
                            onClick={() => removePhoto(i)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: '#ef4444' }}
                          >
                            <X size={10} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Details */}
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Your Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                        Name (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={state.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e2e8f0',
                          fontFamily: 'Inter, sans-serif',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9000000000"
                        value={state.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e2e8f0',
                          fontFamily: 'Inter, sans-serif',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                      Location / Area in Hyderabad (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gachibowli, Banjara Hills..."
                      value={state.location}
                      onChange={(e) => update('location', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                </div>

                {/* Estimate Preview */}
                {estimate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(0,82,255,0.12), rgba(77,124,255,0.06))', border: '1px solid rgba(0,82,255,0.3)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}>
                          ESTIMATED OFFER RANGE
                        </p>
                        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Calistoga, serif' }}>
                          {formatINR(estimate.low)} – {formatINR(estimate.high)}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                          Final price confirmed after physical inspection
                        </p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(0,82,255,0.15)' }}
                      >
                        <Zap size={22} style={{ color: '#4D7CFF' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Summary */}
                <div
                  className="p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <p className="text-xs font-semibold mb-3" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                    SUBMISSION SUMMARY
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Brand', value: state.brand },
                      { label: 'Type', value: state.type },
                      { label: 'Tech', value: state.tech },
                      { label: 'Capacity', value: state.capacity },
                      { label: 'Coil', value: state.coil },
                      { label: 'Condition', value: state.condition },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs mb-0.5" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>{label}</p>
                        <p className="text-xs font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{value || '—'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setPhase((p) => Math.max(1, p - 1))}
            disabled={phase === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94a3b8',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <ChevronLeft size={16} />
            Back
          </button>

          {phase < phases.length ? (
            <button
              onClick={() => canNext() && setPhase((p) => p + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                background: canNext() ? 'linear-gradient(135deg, #0052FF, #4D7CFF)' : 'rgba(255,255,255,0.06)',
                boxShadow: canNext() ? '0 0 20px rgba(0,82,255,0.35)' : 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext()}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                background: canNext() ? 'linear-gradient(135deg, #0052FF, #4D7CFF)' : 'rgba(255,255,255,0.06)',
                boxShadow: canNext() ? '0 0 30px rgba(0,82,255,0.5)' : 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Phone size={16} />
              Send via WhatsApp
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
