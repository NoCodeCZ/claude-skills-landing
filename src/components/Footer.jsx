import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="aa-footer">
      <div className="aa-container">
        <div className="aa-footer-links">
          <a href="mailto:hello@aiflow.com">hello@aiflow.com</a>
          <Link to="/privacy">นโยบายความเป็นส่วนตัว</Link>
          <Link to="/terms">ข้อกำหนดและเงื่อนไข</Link>
        </div>
        <p>&copy; 2026 AI Flow&trade;. สงวนลิขสิทธิ์</p>
      </div>
    </footer>
  )
}
