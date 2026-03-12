import { useState, useEffect } from 'react'

function getTimeLeft() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(23, 59, 59, 999)
  const diff = midnight - now
  if (diff <= 0) return { h: 0, m: 0, s: 0 }
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="aa-countdown-bar">
      <div className="aa-countdown-inner">
        <span className="aa-countdown-icon">🔥</span>
        <span className="aa-countdown-text">ราคาพิเศษนี้จะหมดภายใน</span>
        <div className="aa-countdown-clock">
          <div className="aa-countdown-unit">
            <span className="aa-countdown-num">{pad(time.h)}</span>
            <span className="aa-countdown-label">ชม.</span>
          </div>
          <span className="aa-countdown-sep">:</span>
          <div className="aa-countdown-unit">
            <span className="aa-countdown-num">{pad(time.m)}</span>
            <span className="aa-countdown-label">นาที</span>
          </div>
          <span className="aa-countdown-sep">:</span>
          <div className="aa-countdown-unit">
            <span className="aa-countdown-num">{pad(time.s)}</span>
            <span className="aa-countdown-label">วินาที</span>
          </div>
        </div>
      </div>
    </div>
  )
}
