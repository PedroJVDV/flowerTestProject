import { useState } from 'react'
import './App.css'

const FLOWER_EMOJIS = ['🌹', '🌺', '🌸', '💐', '✿']

const FLOWER_PIXELS = [
  '.....RRR.....',
  '....RRRRR....',
  '...RRRRRRR...',
  '...RRRRRRR...',
  '....RRRRR....',
  '.....RRR.....',
  '....GGGGG....',
  '...GGG.GGG...',
  '......B......',
  '......B......',
  '......B......',
  '.....BBB.....',
]

const createBloomParticles = (count = 26) =>
  Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count
    const spread = 70 + Math.random() * 180

    return {
      id: index,
      emoji: FLOWER_EMOJIS[index % FLOWER_EMOJIS.length],
      x: `${Math.cos(angle) * spread}px`,
      y: `${Math.sin(angle) * spread}px`,
      rotate: `${-40 + Math.random() * 80}deg`,
      size: `${1.1 + Math.random() * 1.2}rem`,
      duration: `${0.9 + Math.random() * 0.9}s`,
      delay: `${Math.random() * 0.2}s`,
    }
  })

const playPlopSound = () => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return

  const context = new AudioCtx()
  const now = context.currentTime

  const oscillator = context.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(420, now)
  oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.2)

  const gain = context.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)

  oscillator.connect(gain)
  gain.connect(context.destination)

  oscillator.start(now)
  oscillator.stop(now + 0.24)

  oscillator.onended = () => {
    context.close().catch(() => {})
  }
}

function App() {
  const [isBloomed, setIsBloomed] = useState(false)
  const [particles, setParticles] = useState([])

  const handleFlowerClick = () => {
    if (isBloomed) return

    setParticles(createBloomParticles())
    setIsBloomed(true)
    playPlopSound()
  }

  return (
    <main className={`scene ${isBloomed ? 'scene-bloomed' : ''}`}>
      <div className="wave-overlay" aria-hidden="true" />

      <div className="bloom-layer" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="petal"
            style={{
              '--x': particle.x,
              '--y': particle.y,
              '--rotate': particle.rotate,
              '--size': particle.size,
              '--duration': particle.duration,
              '--delay': particle.delay,
            }}
          >
            {particle.emoji}
          </span>
        ))}
      </div>

      {!isBloomed && (
        <button
          type="button"
          className="flower-button"
          onClick={handleFlowerClick}
          aria-label="Clique para florescer"
        >
          <div className="pixel-flower" role="img" aria-label="Flor pixel art vermelha com folhas verdes e caule preto">
            {FLOWER_PIXELS.join('').split('').map((pixel, index) => (
              <span
                key={index}
                className={`pixel ${pixel === 'R' ? 'pixel-red' : ''} ${pixel === 'G' ? 'pixel-green' : ''} ${pixel === 'B' ? 'pixel-black' : ''}`}
              />
            ))}
          </div>
        </button>
      )}

      {isBloomed && <p className="after-message">O jardim floresceu ✨</p>}
    </main>
  )
}

export default App
