import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import LineChat from '../components/LineChat'
import { trackEvent } from '../lib/tracking'
import Confetti from '../components/Confetti'

const MAIN_PRICE = 997
const UPSELL_ORIGINAL = 997
const UPSELL_PRICE = 497

export default function PaymentPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [upsellAdded, setUpsellAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const initiateCheckoutFired = useRef(false)

  const total = MAIN_PRICE + (upsellAdded ? UPSELL_PRICE : 0)

  // AddToCart when landing on checkout
  useEffect(() => {
    trackEvent('AddToCart', {
      content_name: 'Claude Skills Ultimate Bundle',
      content_type: 'product',
      content_ids: ['claude-skills-bundle'],
      value: MAIN_PRICE,
      currency: 'THB',
    })
  }, [])

  // InitiateCheckout when user starts typing
  function handleInitiateCheckout() {
    if (initiateCheckoutFired.current) return
    initiateCheckoutFired.current = true
    trackEvent('InitiateCheckout', {
      content_name: 'Claude Skills Ultimate Bundle',
      content_type: 'product',
      value: MAIN_PRICE,
      currency: 'THB',
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError('กรุณากรอกชื่อ นามสกุล อีเมล และเบอร์โทรศัพท์')
      return
    }
    setLoading(true)
    setError(null)

    const fullName = `${firstName.trim()} ${lastName.trim()}`
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: fullName,
          fn: firstName.trim(),
          ln: lastName.trim(),
          phone: phone.trim(),
          upsell: upsellAdded,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.detail || 'ไม่สามารถสร้างลิงก์ชำระเงินได้ กรุณาลองใหม่')
        setLoading(false)
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      setLoading(false)
    }
  }

  return (
    <div className="aa-sales-page">
      <Confetti />
      <section className="aa-section aa-checkout-section">
        <div className="aa-container aa-container-wide">
          <form onSubmit={handleSubmit} className="aa-co-grid">

            {/* ── Left Column ── */}
            <div className="aa-co-left">

              {/* Hero Title + Progress */}
              <div className="aa-co-hero">
                <h1 className="aa-co-hero-title">
                  อีกนิดเดียว... ติดสปีดงานคุณ
                  <br />
                  ด้วย <span className="accent">Agentic Workflow</span>
                </h1>
                <div className="aa-co-progress">
                  <span className="aa-co-progress-loading">LOADING...</span>
                  <span className="aa-co-progress-label">75%</span>
                  <div className="aa-co-progress-bar">
                    {Array.from({ length: 20 }, (_, i) => (
                      <span
                        key={i}
                        className={`aa-co-progress-block${i < 15 ? ' filled' : ''}`}
                        style={i < 15 ? { animationDelay: `${i * 80}ms` } : undefined}
                      />
                    ))}
                  </div>
                </div>
                <img
                  src="/order-steps.png"
                  alt="3 ขั้นตอนง่ายๆ ในการ Order"
                  className="aa-co-steps-img"
                />
              </div>

              {/* Contact */}
              <div className="aa-co-block">
                <h2 className="aa-co-heading">ข้อมูลติดต่อในการสั่งซื้อ</h2>
                <div className="aa-co-field">
                  <label className="aa-co-label">
                    ชื่อ (Facebook) / นามสกุล (Facebook) <span className="req">*</span>
                  </label>
                  <p className="aa-co-field-note">*สำคัญ : เพื่อใช้ในการ Verify เข้า Group คู่มือสอนใช้งาน</p>
                  <div className="aa-co-name-row">
                    <input
                      id="co-firstname"
                      type="text"
                      className="aa-co-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={handleInitiateCheckout}
                      placeholder="ชื่อ (Facebook)"
                      required
                    />
                    <input
                      id="co-lastname"
                      type="text"
                      className="aa-co-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={handleInitiateCheckout}
                      placeholder="นามสกุล (Facebook)"
                      required
                    />
                  </div>
                </div>
                <div className="aa-co-field">
                  <label className="aa-co-label" htmlFor="co-email">
                    อีเมลที่ใช้งานจริง <span className="req">*</span>
                  </label>
                  <p className="aa-co-field-note">เพื่อเข้าถึง และรับ Claude Skills และ N8N Workflows</p>
                  <input
                    id="co-email"
                    type="email"
                    className="aa-co-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInitiateCheckout}
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div className="aa-co-field">
                  <label className="aa-co-label" htmlFor="co-phone">
                    เบอร์โทรศัพท์ <span className="req">*</span>
                  </label>
                  <p className="aa-co-field-note">กรณีที่ต้องการซัพพอร์ต</p>
                  <input
                    id="co-phone"
                    type="tel"
                    className="aa-co-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={handleInitiateCheckout}
                    placeholder="08X-XXX-XXXX"
                    required
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="aa-co-block">
                <h2 className="aa-co-heading">ข้อมูลการชำระเงิน</h2>
                <p className="aa-co-note">
                  ทุกธุรกรรมมีความปลอดภัยและเข้ารหัส ข้อมูลบัตรเครดิตจะไม่ถูกเก็บบนเซิร์ฟเวอร์ของเรา
                </p>
                <div className="aa-co-payment-methods">
                  <div className="aa-co-method active">
                    <span className="aa-co-radio-dot" />
                    <span>บัตรเครดิต/เดบิต &amp; PromptPay</span>
                    <div className="aa-co-card-icons">
                      <span className="aa-card-badge visa">VISA</span>
                      <span className="aa-card-badge mc">MC</span>
                      <span className="aa-card-badge amex">AMEX</span>
                      <span className="aa-card-badge promptpay">PromptPay</span>
                    </div>
                  </div>
                </div>
                <p className="aa-co-stripe-note">
                  ระบบจะพาคุณไปยังหน้าชำระเงินที่ปลอดภัยของ Stripe
                </p>
              </div>

              {/* Exclusive Offer */}
              <div className="aa-co-block aa-co-upsell-wrap">
                <span className="aa-co-recommended-badge">Recommended</span>
                <div className={`aa-co-upsell${upsellAdded ? ' added' : ''}`}>

                  {/* Toggle header — entire row is clickable */}
                  <div
                    className="aa-co-upsell-header"
                    onClick={() => {
                      if (!upsellAdded) {
                        trackEvent('orderbump', {
                          content_name: '1,900+ N8N Workflows Bundle',
                          content_type: 'product',
                          value: UPSELL_PRICE,
                          currency: 'THB',
                        })
                      }
                      setUpsellAdded(!upsellAdded)
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h3 className="aa-co-upsell-question">
                      {upsellAdded && <span className="aa-co-upsell-check">&#10003;</span>}
                      รับ N8N Workflows ไปด้วยไหมครับ? <span className="aa-co-upsell-discount">(ลด 50% เฉพาะหน้านี้เท่านั้น)</span>
                    </h3>
                    <div className="aa-co-upsell-toggle-area">
                      {!upsellAdded && <span className="aa-co-upsell-arrow">&#10132;</span>}
                      <span className={`aa-co-toggle${upsellAdded ? ' on' : ''}`}>
                        <span className="aa-co-toggle-knob" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="aa-co-upsell-body">
                    <img
                      src="/n8n-workflows.png"
                      alt="1,900+ N8N Workflows"
                      className="aa-co-upsell-img"
                    />
                    <div className="aa-co-upsell-prices">
                      <span className="aa-co-upsell-original">&#3647;{UPSELL_ORIGINAL.toLocaleString()}</span>
                      <span className="aa-co-upsell-sale">&#3647;{UPSELL_PRICE}</span>
                      <span className="aa-co-upsell-vat">รวม VAT แล้ว</span>
                    </div>

                    <div className="aa-co-upsell-desc">
                      <p>
                        เทมเพลต Automation สำเร็จรูปกว่า <strong>1,900 ตัว</strong>สำหรับ N8N
                        ครอบคลุมทุกงาน แค่ค้นหา keyword ดาวน์โหลด
                        แล้วอัปโหลดเข้า N8N workspace ของคุณได้เลย
                      </p>
                      <p>ราคาปกติ &#3647;{UPSELL_ORIGINAL.toLocaleString()}</p>
                      <p className="aa-co-upsell-highlight">
                        หยิบไปด้วยกันวันนี้เพียง &#3647;{UPSELL_PRICE} เท่านั้น!
                      </p>
                      <p className="aa-co-upsell-saving">
                        (ประหยัด &#3647;{(UPSELL_ORIGINAL - UPSELL_PRICE).toLocaleString()} — ลด 50%)
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className={`aa-co-submit${loading ? ' loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="aa-spinner" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  `สั่งซื้อเลย  ฿${total.toLocaleString()}`
                )}
              </button>

              {error && <p className="aa-checkout-error">{error}</p>}

              {/* Trust badges */}
              <div className="aa-co-trust">
                <div className="aa-co-trust-item">
                  <span className="aa-check-icon">&#10003;</span>
                  รับประกันคืนเงิน 7 วัน
                </div>
                <div className="aa-co-trust-item">
                  <span className="aa-check-icon">&#10003;</span>
                  ดาวน์โหลดได้ทันที
                </div>
              </div>

            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="aa-co-right">
              <div className="aa-co-summary-card">
                <div className="aa-co-product-img">
                  <div className="aa-co-product-img-inner">
                    <span className="aa-co-img-text">500+</span>
                    <span className="aa-co-img-sub">CLAUDE SKILLS</span>
                  </div>
                </div>

                <h3 className="aa-co-summary-title">สรุปคำสั่งซื้อ</h3>

                <div className="aa-co-summary-row">
                  <div className="aa-co-summary-item-info">
                    <span className="aa-co-summary-dot">&#9632;</span>
                    <span>The Ultimate Claude Skills Bundle</span>
                  </div>
                  <span>&#3647;{MAIN_PRICE.toLocaleString()}</span>
                </div>

                {upsellAdded && (
                  <div className="aa-co-summary-row">
                    <div className="aa-co-summary-item-info">
                      <span className="aa-co-summary-dot">&#9889;</span>
                      <span>1,900+ N8N Workflows</span>
                    </div>
                    <span>&#3647;{UPSELL_PRICE}</span>
                  </div>
                )}

                <div className="aa-co-summary-divider" />

                <div className="aa-co-summary-row">
                  <span>ยอดรวม</span>
                  <span>&#3647;{total.toLocaleString()}</span>
                </div>

                <div className="aa-co-summary-divider" />

                <div className="aa-co-summary-row aa-co-summary-total">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>&#3647;{total.toLocaleString()}</span>
                </div>

                <p className="aa-co-onetime">ชำระครั้งเดียว</p>
              </div>

              <div className="aa-co-summary-links">
                <Link to="/terms">ข้อกำหนดและเงื่อนไข</Link>
                <Link to="/privacy">นโยบายความเป็นส่วนตัว</Link>
              </div>
            </div>

          </form>
        </div>
      </section>
      <Footer />
      <LineChat />
    </div>
  )
}
