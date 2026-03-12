import TerminalBar from '../components/TerminalBar'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="aa-sales-page">
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % cat privacy-policy.md" />
            <div className="aa-terminal-body aa-legal-body">
              <h2 className="aa-heading">นโยบายความเป็นส่วนตัว</h2>
              <p className="aa-legal-updated">อัปเดตล่าสุด: 7 มีนาคม 2026</p>

              <h3>1. ข้อมูลที่เราเก็บรวบรวม</h3>
              <p>
                เมื่อคุณทำการสั่งซื้อผ่านเว็บไซต์ของเรา เราเก็บรวบรวมข้อมูลดังต่อไปนี้:
              </p>
              <ul>
                <li><strong>ชื่อ-นามสกุล</strong> — เพื่อระบุตัวตนของลูกค้า</li>
                <li><strong>อีเมล</strong> — เพื่อส่งลิงก์ดาวน์โหลดและการสื่อสารหลังการขาย</li>
                <li><strong>ข้อมูลการชำระเงิน</strong> — ประมวลผลผ่าน Stripe โดยตรง เราไม่เก็บข้อมูลบัตรเครดิตไว้ในเซิร์ฟเวอร์ของเรา</li>
              </ul>

              <h3>2. การใช้ข้อมูล</h3>
              <p>เราใช้ข้อมูลที่เก็บรวบรวมเพื่อ:</p>
              <ul>
                <li>ดำเนินการสั่งซื้อและจัดส่งสินค้าดิจิทัล</li>
                <li>ให้การสนับสนุนหลังการขาย</li>
                <li>ปรับปรุงผลิตภัณฑ์และบริการของเรา</li>
              </ul>

              <h3>3. บริการของบุคคลที่สาม</h3>
              <p>เราใช้บริการของบุคคลที่สามดังต่อไปนี้:</p>
              <ul>
                <li><strong>Stripe</strong> — สำหรับประมวลผลการชำระเงิน (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">นโยบายความเป็นส่วนตัวของ Stripe</a>)</li>
                <li><strong>Meta (Facebook) Pixel</strong> — สำหรับการติดตามโฆษณาและวิเคราะห์การใช้งานเว็บไซต์</li>
                <li><strong>Facebook Messenger</strong> — สำหรับการสนทนาและสนับสนุนลูกค้า</li>
                <li><strong>Vercel</strong> — สำหรับโฮสต์เว็บไซต์</li>
              </ul>

              <h3>4. คุกกี้</h3>
              <p>
                เว็บไซต์ของเราใช้คุกกี้เพื่อวัตถุประสงค์ดังต่อไปนี้:
              </p>
              <ul>
                <li>คุกกี้ที่จำเป็น — เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง</li>
                <li>คุกกี้วิเคราะห์ — Meta Pixel เพื่อวัดประสิทธิภาพโฆษณา</li>
              </ul>

              <h3>5. สิทธิ์ของคุณ</h3>
              <p>
                คุณมีสิทธิ์ขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้ตลอดเวลา
                โดยติดต่อเราที่อีเมลด้านล่าง
              </p>

              <h3>6. การติดต่อ</h3>
              <p>
                หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่:{' '}
                <a href="mailto:hello@aiflow.com">hello@aiflow.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
