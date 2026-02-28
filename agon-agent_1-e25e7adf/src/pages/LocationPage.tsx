import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Clock, Navigation, ArrowRight,
  CheckCircle2, Zap, Car, Train
} from 'lucide-react'

const serviceAreas = [
  'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Madhapur',
  'Kondapur', 'Kukatpally', 'Ameerpet', 'Secunderabad', 'Begumpet',
  'Financial District', 'Nanakramguda', 'Manikonda', 'Tolichowki', 'Mehdipatnam',
  'Dilsukhnagar', 'Uppal', 'LB Nagar', 'Miyapur', 'Bachupally',
]

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 5:00 PM', open: true },
  { day: 'Sunday', time: '10:00 AM – 2:00 PM', open: true },
]

const landmarks = [
  { icon: Car, label: '5 min from Gachibowli flyover' },
  { icon: Train, label: 'Near Hitec City Metro Station' },
  { icon: Navigation, label: 'Opposite Cyber Towers Gate 2' },
]

export default function LocationPage() {
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
              — Find Us —
            </p>
            <h1
              className="font-calistoga text-5xl lg:text-6xl text-white mb-4"
              style={{ fontFamily: 'Calistoga, serif' }}
            >
              Our Location
            </h1>
            <p
              className="text-base max-w-xl"
              style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Visit our warehouse in HITEC City, Hyderabad — where every unit on our
              inventory can be inspected in person before purchase.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left — Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 lg:p-8 rounded-2xl"
              style={{
                background: 'rgba(14, 20, 40, 0.8)',
                border: '1px solid rgba(0, 82, 255, 0.2)',
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,82,255,0.15)', border: '1px solid rgba(0,82,255,0.3)' }}
                >
                  <MapPin size={22} style={{ color: '#4D7CFF' }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{ color: '#4D7CFF', fontFamily: 'Inter, sans-serif' }}
                  >
                    Warehouse Address
                  </p>
                  <p className="text-lg font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    AC Resellers by Ateeq Ateeq
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    Plot No. 42, Phase II Industrial Estate<br />
                    HITEC City, Madhapur<br />
                    Hyderabad, Telangana — 500081
                  </p>
                </div>
              </div>

              {/* Landmarks */}
              <div className="space-y-2 mb-6">
                {landmarks.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={14} style={{ color: '#334155' }} />
                    <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=HITEC+City+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 w-full justify-center"
                style={{
                  background: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                  boxShadow: '0 0 20px rgba(0,82,255,0.3)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Navigation size={15} />
                Get Directions
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(14, 20, 40, 0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
              >
                Contact
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+919000000000"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,82,255,0.1)' }}
                  >
                    <Phone size={16} style={{ color: '#4D7CFF' }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>Phone / WhatsApp</p>
                    <p
                      className="text-sm font-semibold group-hover:text-blue-400 transition-colors"
                      style={{ color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}
                    >
                      +91 90000 00000
                    </p>
                  </div>
                </a>
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.1)' }}
                  >
                    <Zap size={16} style={{ color: '#22c55e' }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>WhatsApp (fastest)</p>
                    <p
                      className="text-sm font-semibold group-hover:text-green-400 transition-colors"
                      style={{ color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}
                    >
                      Message us now →
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(14, 20, 40, 0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock size={16} style={{ color: '#4D7CFF' }} />
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
                >
                  Business Hours
                </p>
              </div>
              <div className="space-y-3">
                {hours.map(({ day, time, open }) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                      {day}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {time}
                      </span>
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: open ? '#22c55e' : '#ef4444' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 pt-4 flex items-center gap-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <CheckCircle2 size={13} style={{ color: '#22c55e' }} />
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  Site visits by appointment — call ahead for large units
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — Map + Service Areas */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(0,82,255,0.2)',
                boxShadow: '0 0 40px rgba(0,82,255,0.08)',
              }}
            >
              <iframe
                title="AC Resellers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2959490897!2d78.37194!3d17.44895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688bbb29d3a4d0!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="380"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 lg:p-8 rounded-2xl"
              style={{
                background: 'rgba(14, 20, 40, 0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
                  >
                    Service Coverage
                  </p>
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    We Deliver Across Hyderabad
                  </h3>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{
                    background: 'rgba(0,82,255,0.12)',
                    border: '1px solid rgba(0,82,255,0.25)',
                    color: '#4D7CFF',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Free Delivery*
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.02 }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#64748b',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>
                *Free delivery on orders above ₹50,000 within GHMC limits
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <a
                href="https://wa.me/919000000000?text=I'd like to schedule a site visit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-5 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,82,255,0.15), rgba(77,124,255,0.08))',
                  border: '1px solid rgba(0,82,255,0.3)',
                }}
              >
                <Zap size={22} className="mb-3" style={{ color: '#4D7CFF' }} />
                <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Book Site Visit
                </p>
                <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  We come to you for inspection
                </p>
              </a>
              <Link
                to="/sell"
                className="group flex flex-col items-center text-center p-5 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <ArrowRight size={22} className="mb-3" style={{ color: '#475569' }} />
                <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sell Your AC
                </p>
                <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  Get an instant valuation
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
