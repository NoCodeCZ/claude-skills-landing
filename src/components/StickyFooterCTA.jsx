import { useNavigate } from 'react-router-dom'

export default function StickyFooterCTA() {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    navigate('/checkout')
  }

  return (
    <div className="aa-sticky-footer">
      <div className="aa-sticky-footer-inner">
        <div className="aa-sticky-footer-text">
          <span>Claude Skills</span>
          <span className="aa-sticky-footer-old">23,993</span>
          <span className="aa-sticky-footer-arrow">&gt;</span>
          <span className="aa-sticky-footer-price">997.-</span>
        </div>
        <a href="/checkout" className="aa-sticky-footer-btn" onClick={handleClick}>
          ✅ คลิก! รับโปร
        </a>
      </div>
    </div>
  )
}
