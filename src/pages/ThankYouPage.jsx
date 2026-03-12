import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TerminalBar from '../components/TerminalBar'
import Footer from '../components/Footer'

const TERMINAL_LINES = [
  { text: '$ stripe checkout --verify', delay: 0 },
  { text: 'Verifying payment session...', delay: 400, dim: true },
  { text: 'Payment confirmed.', delay: 900, success: true },
  { text: '', delay: 1200 },
  { text: '$ download --bundle "Claude Skills Ultimate"', delay: 1400 },
  { text: 'Preparing 500+ skills for download...', delay: 1800, dim: true },
  { text: 'Bundle ready. Check your email for the download link.', delay: 2400, success: true },
  { text: '', delay: 2700 },
  { text: '$ echo "Welcome to the team! 🎉"', delay: 3000 },
]

export default function ThankYouPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])


  return (
    <div className="aa-sales-page">
      <section className="aa-section aa-thankyou-section">
        <div className="aa-container">

          {/* Animated Terminal */}
          <div className="aa-terminal aa-thankyou-terminal">
            <TerminalBar title="claude@skills ~ % ./post-purchase.sh" />
            <div className="aa-terminal-body aa-thankyou-term-body">
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={`aa-term-line${line.success ? ' success' : ''}${line.dim ? ' dim' : ''}`}
                >
                  {line.text}
                </div>
              ))}
              {visibleLines < TERMINAL_LINES.length && (
                <span className="aa-term-cursor-block" />
              )}
            </div>
          </div>

          {/* Confirmation Card */}
          <div className="aa-terminal aa-thankyou-card">
            <TerminalBar title="order-confirmation.md" />
            <div className="aa-terminal-body">
              <div className="aa-thankyou-header">
                <div className="aa-thankyou-check-circle">&#10003;</div>
                <h2 className="aa-thankyou-title">การชำระเงินสำเร็จ</h2>
                <p className="aa-thankyou-subtitle">
                  ขอบคุณสำหรับการสั่งซื้อ Claude Skills Ultimate Bundle
                </p>
              </div>

              {sessionId && (
                <div className="aa-thankyou-session">
                  <span className="aa-session-label">Order ID:</span>
                  <code className="aa-session-id">{sessionId.slice(0, 24)}...</code>
                </div>
              )}

              <div className="aa-thankyou-next">
                <h3>ขั้นตอนต่อไป</h3>
                <div className="aa-thankyou-steps">
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">1</div>
                    <div>
                      <strong>ตรวจสอบอีเมล</strong>
                      <p>คุณจะได้รับอีเมลยืนยันพร้อมลิงก์ดาวน์โหลดภายในไม่กี่นาที</p>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">2</div>
                    <div>
                      <strong>ดาวน์โหลด & ติดตั้ง</strong>
                      <p>ดาวน์โหลดไฟล์ Skills แล้ววางลงในโฟลเดอร์ตามคู่มือ ใช้เวลาไม่ถึง 2 นาที</p>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">3</div>
                    <div>
                      <strong>เริ่มใช้งาน</strong>
                      <p>บอก Claude สิ่งที่คุณต้องการ หรือพิมพ์ <code>/skill-name</code> ใน Claude Code</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aa-thankyou-support">
                <span className="marker">&gt;</span>
                <span>
                  มีคำถาม? ติดต่อเราได้ที่{' '}
                  <a href="mailto:hello@aiflow.com">hello@aiflow.com</a>
                </span>
              </div>

              <div className="aa-cta-wrap">
                <Link to="/" className="aa-cta">
                  กลับหน้าแรก
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}
