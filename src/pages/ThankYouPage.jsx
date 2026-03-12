import { useEffect, useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TerminalBar from '../components/TerminalBar'
import Footer from '../components/Footer'
import { trackEvent } from '../lib/tracking'

const SKILLS_LINES = [
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

const BUNDLE_LINES = [
  { text: '$ stripe checkout --verify', delay: 0 },
  { text: 'Verifying payment session...', delay: 400, dim: true },
  { text: 'Payment confirmed.', delay: 900, success: true },
  { text: '', delay: 1200 },
  { text: '$ download --bundle "Claude Skills Ultimate"', delay: 1400 },
  { text: 'Preparing 500+ skills for download...', delay: 1800, dim: true },
  { text: 'Skills bundle ready.', delay: 2400, success: true },
  { text: '', delay: 2700 },
  { text: '$ download --bundle "1,900+ N8N Workflows"', delay: 3000 },
  { text: 'Preparing 1,900+ N8N workflows...', delay: 3400, dim: true },
  { text: 'N8N workflows bundle ready.', delay: 4000, success: true },
  { text: '', delay: 4300 },
  { text: '$ echo "Welcome to the team! 🎉🚀"', delay: 4600 },
]

export default function ThankYouPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const plan = searchParams.get('plan') || 'skills_only'
  const customerEmail = searchParams.get('email') || ''
  const customerName = searchParams.get('name') || ''
  const customerPhone = searchParams.get('phone') || ''
  const customerFn = searchParams.get('fn') || ''
  const customerLn = searchParams.get('ln') || ''
  const isBundle = plan === 'skills_and_n8n'
  const lines = isBundle ? BUNDLE_LINES : SKILLS_LINES
  const [visibleLines, setVisibleLines] = useState(0)
  const purchaseFired = useRef(false)

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Fire Purchase event once
  useEffect(() => {
    if (!sessionId || purchaseFired.current) return
    purchaseFired.current = true

    const purchaseValue = isBundle ? 1494 : 997
    const contentName = isBundle
      ? 'Claude Skills Ultimate Bundle + N8N Workflows'
      : 'Claude Skills Ultimate Bundle'

    trackEvent('Purchase', {
      value: purchaseValue,
      currency: 'THB',
      content_name: contentName,
      content_type: 'product',
      content_ids: isBundle ? ['claude-skills-bundle', 'n8n-workflows'] : ['claude-skills-bundle'],
      num_items: isBundle ? 2 : 1,
      email: customerEmail,
      phone: customerPhone,
      first_name: customerFn,
      last_name: customerLn,
      external_id: sessionId,
    })
  }, [sessionId])

  return (
    <div className="aa-sales-page">
      <section className="aa-section aa-thankyou-section">
        <div className="aa-container">

          {/* Animated Terminal */}
          <div className="aa-terminal aa-thankyou-terminal">
            <TerminalBar title="claude@skills ~ % ./post-purchase.sh" />
            <div className="aa-terminal-body aa-thankyou-term-body">
              {lines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={`aa-term-line${line.success ? ' success' : ''}${line.dim ? ' dim' : ''}`}
                >
                  {line.text}
                </div>
              ))}
              {visibleLines < lines.length && (
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
                  {isBundle
                    ? 'ขอบคุณสำหรับการสั่งซื้อ Claude Skills Ultimate Bundle + 1,900+ N8N Workflows'
                    : 'ขอบคุณสำหรับการสั่งซื้อ Claude Skills Ultimate Bundle'}
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
                      <p>คุณจะได้รับอีเมลเชิญเข้ากลุ่ม Skool พร้อมลิงก์ดาวน์โหลดภายในไม่กี่นาที</p>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">2</div>
                    <div>
                      <strong>ขั้นตอนการเข้าเรียน Skool</strong>
                      <p>เพื่อเข้าถึงคู่มือสอนการใช้งาน Claude Skill กด Tabs Classroom เพื่อเข้ารับชม</p>
                      <p>โปรดศึกษาวิธีเข้ากลุ่มและเข้าเรียนได้จากลิ้งค์ด้านล่างก่อนครับ</p>
                      <div className="aa-thankyou-video-links">
                        <a href="https://rebrand.ly/using-pc" target="_blank" rel="noopener noreferrer" className="aa-thankyou-video-btn">
                          <span className="aa-thankyou-video-icon">&#128187;</span>
                          <span>สำหรับใช้งาน PC</span>
                        </a>
                        <a href="https://rebrand.ly/using-mobile" target="_blank" rel="noopener noreferrer" className="aa-thankyou-video-btn">
                          <span className="aa-thankyou-video-icon">&#128241;</span>
                          <span>สำหรับใช้งานผ่านมือถือ</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">3</div>
                    <div>
                      <strong>ตรวจสอบอีเมลเชิญเข้ากลุ่ม</strong>
                      <p>รบกวนตรวจสอบ email เพื่อเชิญเข้าใช้งาน (อาจอยู่ใน spam รบกวนตรวจสอบ)</p>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">4</div>
                    <div>
                      <strong>ดาวน์โหลด & ติดตั้ง</strong>
                      <p>
                        {isBundle
                          ? 'ดาวน์โหลดไฟล์ Skills และ N8N Workflows แล้ววางลงในโฟลเดอร์ตามคู่มือ ใช้เวลาไม่ถึง 2 นาที'
                          : 'ดาวน์โหลดไฟล์ Skills แล้ววางลงในโฟลเดอร์ตามคู่มือ ใช้เวลาไม่ถึง 2 นาที'}
                      </p>
                    </div>
                  </div>
                  <div className="aa-thankyou-step">
                    <div className="aa-thankyou-step-num">5</div>
                    <div>
                      <strong>เริ่มใช้งาน</strong>
                      <p>บอก Claude สิ่งที่คุณต้องการ หรือพิมพ์ <code>/skill-name</code> ใน Claude Code</p>
                    </div>
                  </div>
                </div>
              </div>

              {isBundle && (
                <div className="aa-thankyou-bundle-note">
                  <span className="marker">&gt;</span>
                  <span>
                    คุณจะได้รับ <strong>2 ลิงก์เชิญ</strong> — กลุ่ม Claude Skills และกลุ่ม N8N Workflows
                  </span>
                </div>
              )}

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
