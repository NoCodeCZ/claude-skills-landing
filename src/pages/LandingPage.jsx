import { useEffect } from 'react'
import TerminalBar from '../components/TerminalBar'
import CTA from '../components/CTA'
import FAQItem from '../components/FAQItem'
import Footer from '../components/Footer'
import StickyFooterCTA from '../components/StickyFooterCTA'
import { trackEvent, trackScrollDepth, trackTimeSpent } from '../lib/tracking'

export default function LandingPage() {
  useEffect(() => {
    // ViewContent after 3 seconds
    const vcTimer = setTimeout(() => {
      trackEvent('ViewContent', {
        content_name: 'Claude Skills Landing Page',
        content_type: 'product',
        value: 997,
        currency: 'THB',
      })
    }, 3000)

    // Scroll depth tracking
    const cleanupScroll = trackScrollDepth([25, 50, 75, 95])

    // Time spent tracking
    const cleanupTime = trackTimeSpent([15, 30, 45, 60])

    return () => {
      clearTimeout(vcTimer)
      cleanupScroll()
      cleanupTime()
    }
  }, [])

  return (
    <div className="aa-sales-page aa-has-sticky-header">

      <StickyFooterCTA />
      {/* -- Attention Bar -- */}
      <div className="aa-attention-bar">
        🚨 Attention : ลูกค้ามากกว่า 1,000+ รายกำลังใช้ Claude Skill ติดสปีดธุรกิจ
      </div>

      {/* -- Hero -- */}
      <section className="aa-hero">
        <div className="aa-container">
          <img src="/mascot.png" alt="Claude Skills Mascot" className="aa-hero-mascot" />
          <h1>
            <span className="accent">"แพ็กสุดยอด Claude Skill ครบชุด"</span><br />
            สำหรับคนทำธุรกิจ, ชาวออฟฟิศ และ ฟรีแลนซ์
          </h1>
          <div className="aa-hero-video">
            <iframe
              src="https://www.loom.com/embed/b5bd104d365845b489654b71342f0305?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              allow="autoplay"
            />
          </div>
          <p className="aa-hero-sub">
            Skills สำเร็จรูปกว่า 500+ ตัว ที่เปลี่ยน Claude ให้เป็นทีมปฏิบัติการธุรกิจครบวงจร
            ใช้ได้ทั้ง Claude.ai, Claude Code และ Cowork — คอนเทนต์ การตลาด การเงิน กฎหมาย
            ระบบปฏิบัติการ จัดการได้ในไม่กี่วินาที
          </p>
          <CTA scrollTo="#pricing" />
          <p className="aa-trust">ซื้อครั้งเดียว • ดาวน์โหลดทันที • รับประกัน 7 วัน</p>
        </div>
      </section>

      {/* -- Setup -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % ./install.sh" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading">พร้อมใช้งานใน 2 นาที</h2>
              <p className="aa-sub">
                Claude Skills Ultimate Bundle มอบ Skills สำเร็จรูปกว่า 500+ ตัว
                ที่จัดการงานธุรกิจจริง — ระบบที่มีโครงสร้างซึ่งสร้างผลลัพธ์ที่สมบูรณ์แบบ
                พร้อมใช้งานได้ทันทีทุกครั้ง
              </p>
              <div className="aa-steps">
                <div className="aa-step">
                  <div className="aa-step-num">1</div>
                  <h3>ดาวน์โหลด</h3>
                  <p>
                    ดาวน์โหลดไฟล์ Skills แล้ววางลงในโฟลเดอร์ Skills ของคุณ
                    มีคู่มือติดตั้งแบบคลิกเดียว
                  </p>
                </div>
                <div className="aa-step">
                  <div className="aa-step-num">2</div>
                  <h3>ถาม Claude</h3>
                  <p>
                    แค่บอกสิ่งที่คุณต้องการ Claude จะตรวจจับ Skill ที่เหมาะสมโดยอัตโนมัติ
                    และพาคุณผ่านขั้นตอนต่างๆ หรือพิมพ์{' '}
                    <code>/skill-name</code> ใน Claude Code
                  </p>
                </div>
                <div className="aa-step">
                  <div className="aa-step-num">3</div>
                  <h3>เสร็จสิ้น</h3>
                  <p>
                    ได้ผลลัพธ์ที่สมบูรณ์แบบ พร้อมใช้งานทันที
                    ไม่ต้องมีความรู้เรื่อง Prompt Engineering
                  </p>
                </div>
              </div>
              <CTA scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      {/* -- Target Users -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % cat target-users.md" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading">สร้างมาเพื่อคนที่ขับเคลื่อนธุรกิจ</h2>
              <p className="aa-sub">
                ถ้าคุณทำหลายบทบาทพร้อมกัน และต้องการ AI ที่ตามทันจริงๆ
                แพ็กเกจนี้สร้างมาเพื่อคุณ
              </p>
              <div className="aa-grid2">
                {[
                  ['🚀', 'เจ้าของธุรกิจคนเดียว', 'คุณเป็นทั้ง CEO นักการตลาด คนเขียนคอนเทนต์ และนักบัญชี Skills เหล่านี้จัดการทุกแผนกให้คุณ เพื่อให้คุณโฟกัสกับการเติบโต'],
                  ['💼', 'ฟรีแลนซ์ & ที่ปรึกษา', 'ข้อเสนอ สัญญา กรณีศึกษา ใบแจ้งหนี้ — งานธุรการด้านลูกค้า ทำเสร็จในไม่กี่นาทีแทนที่จะเป็นชั่วโมง'],
                  ['🏢', 'เจ้าของเอเจนซี่', 'SOPs ระบบ Onboarding แดชบอร์ดลูกค้า และรายงาน — สร้างระบบให้เอเจนซี่ของคุณ โดยไม่ต้องจ้างผู้จัดการ'],
                  ['✏️', 'ครีเอเตอร์ & ผู้สร้างคอร์ส', 'บทความบล็อก สคริปต์วิดีโอ โครงร่างคอร์ส ลำดับอีเมล — ผลิตคอนเทนต์ได้มากขึ้นด้วยแรงน้อยลง'],
                  ['🛒', 'ผู้ขายออนไลน์', 'รายละเอียดสินค้า โฆษณา การปรับแต่ง Checkout นโยบายจัดส่ง — ทุกอย่างที่ร้านของคุณต้องการเพื่อเพิ่มยอดขาย'],
                  ['🚀', 'ผู้ก่อตั้งสตาร์ทอัพ', 'แผนธุรกิจ Pitch Deck วิจัยตลาด พยากรณ์การเงิน — พร้อมนำเสนอนักลงทุนโดยไม่ต้องมีทีมเต็ม'],
                ].map(([icon, title, desc]) => (
                  <div className="aa-card" key={title}>
                    <div className="aa-card-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
              <CTA scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      {/* -- Skills Directory -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % ls -la skills/" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading">500+ Skills ครอบคลุมทุกส่วนของธุรกิจ</h2>
              <p className="aa-sub">
                แต่ละ Skill จะถามคำถามที่ถูกต้อง และส่งมอบผลลัพธ์ที่สมบูรณ์แบบพร้อมใช้งาน
                นี่คือตัวอย่างบางส่วน
              </p>
              <ul className="aa-dir-list">
                {[
                  ['content-copy/', 'blog-post, twitter-thread, tiktok-script, pillar-page ..'],
                  ['email-automation/', 'email-sequence, abandoned-cart-email, black-friday-emails ..'],
                  ['sales-funnels/', 'sales-funnel-builder, tripwire-offer, webinar-sales-script ..'],
                  ['ads-paid-media/', 'facebook-ad-campaign, google-ads-campaign, tiktok-ad-script ..'],
                  ['seo-search/', 'keyword-research, local-seo-plan, featured-snippet-optimizer ..'],
                  ['finance-pricing/', 'financial-model, revenue-forecast, unit-economics ..'],
                  ['legal-compliance/', 'contract-writer, saas-agreement, gdpr-compliance-checklist ..'],
                  ['launch-growth/', 'product-hunt-launch, beta-launch-plan, waitlist-builder ..'],
                  ['social-media/', 'viral-content-formula, instagram-carousel, youtube-strategy ..'],
                  ['client-consulting/', 'discovery-call-script, scope-of-work, service-productization ..'],
                  ['operations-systems/', 'sop-builder, automation-workflow, okr-builder ..'],
                  ['ai-automation/', 'ai-use-case-finder, prompt-library, tool-stack-audit ..'],
                  ['courses-education/', 'course-outline, cohort-program, certification-program ..'],
                  ['personal-brand/', 'personal-brand-strategy, ted-talk-outline, book-proposal ..'],
                  ['analytics-data/', 'ab-test-plan, customer-lifetime-value, conversion-funnel-analysis ..'],
                  ['industry-specific/', 'property-listing, menu-design-brief, fitness-program-outline ..'],
                ].map(([folder, files]) => (
                  <li className="aa-dir-item" key={folder}>
                    <span className="arrow">&#128194;</span>
                    <span className="folder">{folder}</span>
                    <span className="files">{files}</span>
                  </li>
                ))}
              </ul>
              <CTA scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      {/* -- What Are Claude Skills -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % cat basics.md" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading">Claude Skills คืออะไร?</h2>
              <p className="aa-sub">
                Skills คือไฟล์คำสั่งที่มีโครงสร้าง ซึ่งขยายความสามารถของ Claude
                แต่ละ Skill ประกอบด้วยกรอบการทำงานระดับผู้เชี่ยวชาญ กระบวนการทีละขั้นตอน
                และเทมเพลตผลลัพธ์ — ทำให้ Claude ส่งมอบผลงานที่เป็นมืออาชีพ
                แทนที่จะเป็นผลลัพธ์ AI ทั่วไป
              </p>
              <div className="aa-points">
                <div className="aa-point">
                  <div>
                    <span className="marker">&gt;</span>
                    <strong>ไม่ใช่แค่ Prompt.</strong> Prompt คือคำถามครั้งเดียว แต่ Skill
                    คือระบบที่มีโครงสร้าง ซึ่งนำทาง Claude ผ่านกระบวนการหลายขั้นตอน —
                    ถามคำถามที่ถูกต้อง ใช้กรอบการทำงานที่พิสูจน์แล้ว
                    และจัดรูปแบบผลลัพธ์อย่างมืออาชีพ
                  </div>
                </div>
                <div className="aa-point">
                  <div>
                    <span className="marker">&gt;</span>
                    <strong>ใช้ได้ทุกที่ที่ Claude ทำงาน</strong> Skills ใช้ได้ทั้ง
                    Claude.ai, Claude Code และ Cowork บนเว็บ Claude จะใช้โดยอัตโนมัติ
                    เมื่อเกี่ยวข้อง ใน Claude Code คุณยังสามารถเรียกใช้โดยตรงด้วย{' '}
                    <code>/slash-command</code>
                  </div>
                </div>
                <div className="aa-point">
                  <div>
                    <span className="marker">&gt;</span>
                    <strong>สร้างบนมาตรฐานเปิด</strong> Claude Skills เป็นไปตามมาตรฐาน
                    Agent Skills ที่เปิดให้ใช้ได้กับเครื่องมือ AI หลายตัว
                    แต่ละ Skill เป็นโฟลเดอร์ง่ายๆ ที่มีไฟล์ SKILL.md —
                    ไม่มีการล็อคกับผู้ให้บริการ ไม่ต้องติดตั้งซับซ้อน
                  </div>
                </div>
              </div>
              <CTA scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      {/* -- Pricing -- */}
      <section id="pricing" className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % cat pricing.conf" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading" style={{ textAlign: 'center' }}>
                ทุกอย่าง ราคาเดียว
              </h2>
              <div className="aa-pricing">
                <div className="aa-pricing-label">Claude Skills Ultimate Bundle</div>
                <table className="aa-pricing-table">
                  <tbody>
                    {[
                      ['คอนเทนต์ ก็อปปี้ & โซเชียลมีเดีย (75+)', '฿3,299'],
                      ['การตลาด การขาย & โฆษณา (90+)', '฿4,299'],
                      ['การเงิน กฎหมาย & การปฏิบัติตามกฎ (60+)', '฿2,999'],
                      ['ปฏิบัติการ HR & ระบบ (80+)', '฿3,699'],
                      ['SEO วิเคราะห์ & ข้อมูล (40+)', '฿2,299'],
                      ['เปิดตัว SaaS & อีคอมเมิร์ซ (60+)', '฿2,999'],
                      ['แบรนด์ส่วนตัว การศึกษา & อุตสาหกรรม (100+)', '฿4,399'],
                    ].map(([name, price]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{price}</td>
                      </tr>
                    ))}
                    <tr className="total">
                      <td>มูลค่ารวม</td>
                      <td>฿23,993</td>
                    </tr>
                  </tbody>
                </table>
                <CTA text="✅ สั่งซื้อตอนนี้ — ฿997" />
                <div className="aa-price-big">฿997</div>
                <p className="aa-price-note">จ่ายครั้งเดียว • ใช้ได้ตลอดชีพ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % man claude-skills" />
            <div className="aa-terminal-body">
              <h2 className="aa-heading">มีคำถาม?</h2>
              <div className="aa-faq-list">
                <FAQItem
                  question="Claude Skill คืออะไรกันแน่?"
                  answer={
                    <p>
                      Skill คือไฟล์ SKILL.md ที่มีโครงสร้าง ซึ่งขยายความสามารถของ Claude
                      แต่ละตัวประกอบด้วยคำสั่งระดับผู้เชี่ยวชาญ กรอบการทำงานที่พิสูจน์แล้ว
                      และเทมเพลตผลลัพธ์ เมื่อคุณติดตั้ง Skill แล้ว Claude จะรู้โดยอัตโนมัติ
                      ว่าเมื่อไหร่ควรใช้ตามคำร้องขอของคุณ — หรือคุณสามารถเรียกใช้โดยตรงด้วย{' '}
                      <code>/slash-command</code> ใน Claude Code
                      คิดว่าเหมือนจ้างผู้เชี่ยวชาญ ไม่ใช่แค่ก็อปปี้ Prompt
                    </p>
                  }
                />
                <FAQItem
                  question="ใช้ Skills เหล่านี้ได้ที่ไหนบ้าง?"
                  answer={
                    <p>
                      ทุกที่ที่ Claude ทำงาน — Claude.ai, Claude Code และ Cowork
                      บนเว็บ เปิดใช้งานใน Customize &gt; Skills แล้ว Claude จะใช้โดยอัตโนมัติ
                      ใน Claude Code วางลงในโฟลเดอร์ Skills แล้วเรียกใช้ด้วย{' '}
                      <code>/skill-name</code> หรือให้ Claude ตรวจจับเอง
                      คุณแค่ต้องมีแพลน Claude ที่ใช้งานอยู่ Skills เหล่านี้ซื้อครั้งเดียว
                      ไม่มีค่าใช้จ่ายรายเดือน
                    </p>
                  }
                />
                <FAQItem
                  question="ติดตั้ง Skills ยังไง?"
                  answer={
                    <p>
                      คุณจะได้รับลิงก์ดาวน์โหลดหลังซื้อ พร้อมโฟลเดอร์ Skills ทั้งหมด
                      และคู่มือเริ่มต้นใช้งานฉบับย่อ สำหรับ Claude.ai อัปโหลดที่
                      Customize &gt; Skills สำหรับ Claude Code วางลงในโฟลเดอร์{' '}
                      <code>~/.claude/skills/</code> ไม่ว่าแบบไหนใช้เวลาประมาณ 2 นาที
                      ไม่ต้องเขียนโค้ดหรือตั้งค่าทางเทคนิค
                    </p>
                  }
                />
                <FAQItem
                  question="เป็นแค่ Prompt หรูหราหรือเปล่า?"
                  answer={
                    <p>
                      ไม่ใช่ แต่ละ Skill เป็นระบบที่มีโครงสร้าง ซึ่งนำทาง Claude
                      ผ่านกระบวนการหลายขั้นตอน — ถามคำถามที่ถูกต้อง
                      ใช้กรอบการทำงานที่พิสูจน์แล้ว (เช่น PAS สำหรับ Sales Copy
                      หรือ AIDA สำหรับโฆษณา) และจัดรูปแบบผลลัพธ์อย่างมืออาชีพ
                      เหมือนจ้างผู้เชี่ยวชาญมากกว่าแค่ก็อปปี้ Prompt
                    </p>
                  }
                />
                <FAQItem
                  question="ใช้ได้กับธุรกิจประเภทของฉันไหม?"
                  answer={
                    <p>
                      แพ็กเกจนี้ครอบคลุมการสร้างคอนเทนต์ การตลาด การขาย การเงิน กฎหมาย
                      ปฏิบัติการ และกลยุทธ์ ถ้าคุณทำธุรกิจออนไลน์ ธุรกิจบริการ
                      หรือธุรกิจครีเอเตอร์ คุณจะพบ Skills หลายสิบตัว
                      ที่ใช้ได้โดยตรงกับงานประจำวันของคุณ
                    </p>
                  }
                />
                <FAQItem
                  question="ถ้าไม่ชอบล่ะ?"
                  answer={
                    <p>
                      คุณได้รับการคุ้มครองด้วยการรับประกันคืนเงิน 7 วัน
                      ลองใช้ทุก Skill ในแพ็กเกจ ถ้าไม่ช่วยประหยัดเวลาและแรงจริงๆ
                      อีเมลหาเราเพื่อขอเงินคืนเต็มจำนวน ไม่มีเงื่อนไข ไม่ถามเหตุผล
                    </p>
                  }
                />
                <FAQItem
                  question="เหมาะกับเจ้าของธุรกิจคนเดียวเท่านั้นหรือ?"
                  answer={
                    <p>
                      เจ้าของธุรกิจคนเดียวได้ประโยชน์มากที่สุดเพราะต้องทำทุกอย่าง
                      แต่ทีมขนาดเล็ก เจ้าของเอเจนซี่ และฟรีแลนซ์ก็ใช้แพ็กเกจนี้
                      เพื่อเร่งขั้นตอนการทำงาน ถ้าคุณใช้ Claude สำหรับธุรกิจ
                      Skills เหล่านี้จะช่วยประหยัดเวลาของคุณ
                    </p>
                  }
                />
              </div>
              <CTA scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      {/* -- Final CTA -- */}
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % sudo get-bundle --now" />
            <div className="aa-terminal-body aa-final">
              <div className="aa-badge">รับประกันทดลองใช้ 7 วัน</div>
              <h2>
                บริหารธุรกิจด้วย{' '}
                <span className="accent">"Agentic Workflow"</span>
                <span className="aa-cursor" />
              </h2>
              <p>
                Skills กว่า 500+ ตัว ครอบคลุมทุกแผนก เพียงคำสั่งเดียว
                ถ้าไม่ช่วยประหยัดเวลาในสัปดาห์แรก รับเงินคืนเต็มจำนวน
              </p>
              <CTA large text="✅ รับ Claude Skill ตอนนี้" scrollTo="#pricing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
