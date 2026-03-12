import TerminalBar from '../components/TerminalBar'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="aa-sales-page">
      <section className="aa-section">
        <div className="aa-container">
          <div className="aa-terminal">
            <TerminalBar title="claude@skills ~ % cat terms-and-conditions.md" />
            <div className="aa-terminal-body aa-legal-body">
              <h2 className="aa-heading">ข้อกำหนดและเงื่อนไข</h2>
              <p className="aa-legal-updated">อัปเดตล่าสุด: 7 มีนาคม 2026</p>

              <h3>1. ภาพรวม</h3>
              <p>
                เมื่อคุณสั่งซื้อ Claude Skills Ultimate Bundle จาก AI Flow
                คุณตกลงยอมรับข้อกำหนดและเงื่อนไขเหล่านี้ กรุณาอ่านอย่างละเอียด
              </p>

              <h3>2. สินค้าและราคา</h3>
              <ul>
                <li>Claude Skills Ultimate Bundle เป็นสินค้าดิจิทัล ประกอบด้วยไฟล์ Skills กว่า 500+ ไฟล์</li>
                <li>ราคา: ฿997 (เก้าร้อยเก้าสิบเจ็ดบาท) จ่ายครั้งเดียว</li>
                <li>การชำระเงินผ่าน Stripe ในสกุลเงินบาทไทย (THB)</li>
                <li>คุณจะได้รับลิงก์ดาวน์โหลดทันทีหลังชำระเงินสำเร็จ</li>
              </ul>

              <h3>3. นโยบายคืนเงิน</h3>
              <p>
                เรามีนโยบายรับประกันคืนเงิน 7 วัน หากคุณไม่พึงพอใจกับสินค้า
                คุณสามารถขอคืนเงินเต็มจำนวนภายใน 7 วันหลังจากวันที่ซื้อ
                โดยติดต่อเราที่ <a href="mailto:hello@aiflow.com">hello@aiflow.com</a>
              </p>
              <ul>
                <li>การคืนเงินจะดำเนินการภายใน 5-7 วันทำการ</li>
                <li>คืนเงินผ่านช่องทางเดียวกับที่ชำระเงิน</li>
                <li>ไม่มีเงื่อนไขเพิ่มเติม — ไม่ต้องให้เหตุผล</li>
              </ul>

              <h3>4. ทรัพย์สินทางปัญญา</h3>
              <ul>
                <li>ไฟล์ Skills ทั้งหมดเป็นทรัพย์สินทางปัญญาของ AI Flow</li>
                <li>คุณได้รับสิทธิ์ใช้งานส่วนบุคคล ไม่จำกัดเวลา สำหรับการใช้งานภายในธุรกิจของคุณ</li>
                <li>ห้ามแจกจ่าย ขายต่อ หรือเผยแพร่ไฟล์ Skills ให้บุคคลอื่น</li>
                <li>ห้ามใช้ไฟล์ Skills เพื่อสร้างผลิตภัณฑ์ที่แข่งขันโดยตรง</li>
              </ul>

              <h3>5. ข้อจำกัดความรับผิดชอบ</h3>
              <ul>
                <li>สินค้านี้เป็นเครื่องมือช่วยเหลือ ไม่รับประกันผลลัพธ์ทางธุรกิจ</li>
                <li>ผลลัพธ์ขึ้นอยู่กับการใช้งานของผู้ใช้และปัจจัยอื่นๆ</li>
                <li>AI Flow ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้งาน Skills</li>
                <li>ความรับผิดชอบสูงสุดจำกัดที่จำนวนเงินที่คุณชำระ</li>
              </ul>

              <h3>6. การเปลี่ยนแปลงข้อกำหนด</h3>
              <p>
                เราอาจปรับปรุงข้อกำหนดเหล่านี้เป็นครั้งคราว
                การเปลี่ยนแปลงจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์
              </p>

              <h3>7. การติดต่อ</h3>
              <p>
                หากมีคำถามเกี่ยวกับข้อกำหนดเหล่านี้ กรุณาติดต่อเราที่:{' '}
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
