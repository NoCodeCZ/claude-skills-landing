import { useNavigate } from 'react-router-dom'

export default function StickyFooterCTA() {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    navigate('/checkout')
  }

  return (
    <a href="/checkout" className="aa-sticky-footer" onClick={handleClick}>
      <div className="aa-sticky-footer-glow" />
      <div className="aa-sticky-footer-content">
        <div className="aa-sticky-footer-main">
          <span className="aa-sticky-footer-check">✅</span>
          <span>รับ Claude Skill ตอนนี้</span>
          <span className="aa-sticky-footer-old">23,993</span>
          <span className="aa-sticky-footer-arrow">→</span>
          <span className="aa-sticky-footer-price">997.-</span>
          <span className="aa-sticky-footer-rocket">🚀</span>
        </div>
        <div className="aa-sticky-footer-sub">
          เข้าสู่ยุคการทำงานด้วย Agentic Workflow
        </div>
      </div>
    </a>
  )
}
