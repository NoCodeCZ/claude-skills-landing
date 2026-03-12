import { useEffect, useRef } from 'react'

const COLORS = ['#ff4136', '#ff69b4', '#00d26a', '#2ecc40', '#0074d9', '#00bcd4', '#ffdc00', '#ff851b']
const PIECE_COUNT = 150

export default function Confetti() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    for (let i = 0; i < PIECE_COUNT; i++) {
      const el = document.createElement('div')
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const left = Math.random() * 100
      const delay = Math.random() * 800
      const duration = 2200 + Math.random() * 1800
      const width = 6 + Math.random() * 6
      const height = width * (1.2 + Math.random() * 1.5)
      const drift = -40 + Math.random() * 80
      const spin = 200 + Math.random() * 500
      const wobble = 10 + Math.random() * 30

      el.style.cssText = `
        position: absolute;
        top: -20px;
        left: ${left}%;
        width: ${width}px;
        height: ${height}px;
        background-color: ${color};
        border-radius: ${Math.random() > 0.5 ? '2px' : '50% 50% 50% 0'};
        opacity: 1;
        pointer-events: none;
        animation: confettiParty ${duration}ms ${delay}ms ease-out forwards;
        --drift: ${drift}px;
        --spin: ${spin}deg;
        --wobble: ${wobble}px;
      `

      container.appendChild(el)
      setTimeout(() => el.remove(), duration + delay + 200)
    }

    return () => {
      while (container.firstChild) container.firstChild.remove()
    }
  }, [])

  return <div ref={containerRef} className="aa-confetti-container" />
}
