import { useNavigate } from 'react-router-dom'
export default function CTA({ text = 'ดูแพ็คเกจ — ฿997', large, scrollTo }) {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    if (scrollTo) {
      const el = document.querySelector(scrollTo)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate('/checkout')
  }

  return (
    <div className="aa-cta-wrap">
      <a
        href={scrollTo || '/checkout'}
        className={`aa-cta${large ? ' lg' : ''}`}
        onClick={handleClick}
      >
        {text}
      </a>
    </div>
  )
}
