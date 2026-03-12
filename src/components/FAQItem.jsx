import { useState } from 'react'

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="aa-faq-item">
      <button className="aa-faq-q" onClick={() => setOpen(!open)}>
        <span className="marker">&gt;</span>
        <span className="q-text">{question}</span>
        <span className="toggle">[{open ? '−' : '+'}]</span>
      </button>
      <div className={`aa-faq-a${open ? ' open' : ''}`}>
        {answer}
      </div>
    </div>
  )
}
