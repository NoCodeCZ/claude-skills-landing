import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const THAI_NAMES = [
  'สมชาย','สมหญิง','วิทยา','สุภาพ','ประเสริฐ','สุดา','วิไล','อรุณ','พรชัย','นภา',
  'ธนากร','ปิยะ','กัลยา','ศิริพร','มานะ','จิราภรณ์','สุรศักดิ์','อัญชลี','ณัฐพล','รัตนา',
  'พิชัย','ดวงใจ','ภาคิน','ปราณี','เกรียงศักดิ์','วรรณา','อนุชา','สุนิสา','ชัยวัฒน์','ลัดดา',
  'ธีรพงษ์','กาญจนา','วีระ','สมพร','อภิชาติ','นิตยา','สุทธิพงษ์','พัชรี','วิชัย','จันทรา',
  'กิตติ','อรพรรณ','ประสิทธิ์','พิมพ์ใจ','สุวิทย์','รุ่งนภา','นิพนธ์','ศศิธร','วรพจน์','มาลี',
  'ธนพล','ขวัญใจ','อดิศร','ภัทรา','ชาญชัย','นวลจันทร์','ปรีชา','อัจฉรา','สุชาติ','ดารณี',
  'พงษ์ศักดิ์','จิตรา','ไพโรจน์','สุพัตรา','สมศักดิ์','นฤมล','บุญชัย','วิภา','อำนาจ','ปวีณา',
  'ชัยพร','อรวรรณ','ศักดิ์ชัย','สุมาลี','เอกชัย','พิมลพรรณ','สราวุธ','จารุวรรณ','ธวัชชัย','กนกวรรณ',
  'ณรงค์','ศิริวรรณ','วัชรพงษ์','ภาวิณี','พิพัฒน์','ชุติมา','ยุทธนา','ธิดารัตน์','สุริยา','พรทิพย์',
  'ทศพร','ณิชา','ภูมิพัฒน์','แพรวา','กันตพัฒน์','ชนิกานต์','ปัณณวิชญ์','ธัญญ์นรี','กฤตภาส','ลลิตา',
]

const ACTIONS = [
  { icon: '🛒', text: 'เพิ่มสินค้าลงตะกร้า' },
  { icon: '✅', text: 'ซื้อสินค้าเรียบร้อย' },
  { icon: '👀', text: 'กำลังดูสินค้าอยู่' },
]

const PROVINCES = [
  'กรุงเทพฯ','เชียงใหม่','ภูเก็ต','ชลบุรี','นครราชสีมา','ขอนแก่น','เชียงราย',
  'สงขลา','นนทบุรี','ปทุมธานี','สมุทรปราการ','อุดรธานี','นครปฐม','สุราษฎร์ธานี',
  'ระยอง','พิษณุโลก','อุบลราชธานี','ลำปาง','นครศรีธรรมราช','ตรัง',
]

const TIME_AGOS = [
  '1 นาทีที่แล้ว','2 นาทีที่แล้ว','3 นาทีที่แล้ว','5 นาทีที่แล้ว',
  '8 นาทีที่แล้ว','10 นาทีที่แล้ว','12 นาทีที่แล้ว','15 นาทีที่แล้ว',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function SocialProofNotification() {
  const location = useLocation()
  const [notification, setNotification] = useState(null)
  const [phase, setPhase] = useState('hidden') // hidden | show | hide
  const [dismissed, setDismissed] = useState(false)
  const namesRef = useRef(shuffle(THAI_NAMES))
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  const nextName = useCallback(() => {
    const name = namesRef.current[indexRef.current % namesRef.current.length]
    indexRef.current++
    return name
  }, [])

  const showNext = useCallback(() => {
    if (dismissed) return
    const action = pick(ACTIONS)
    setNotification({
      name: nextName(),
      icon: action.icon,
      text: action.text,
      location: pick(PROVINCES),
      time: pick(TIME_AGOS),
    })
    setPhase('show')

    // After 4s, hide it
    timerRef.current = setTimeout(() => {
      setPhase('hide')
      // After animation, schedule next
      timerRef.current = setTimeout(() => {
        setPhase('hidden')
        const delay = 8000 + Math.random() * 4000
        timerRef.current = setTimeout(showNext, delay)
      }, 500)
    }, 4000)
  }, [dismissed, nextName])

  useEffect(() => {
    if (location.pathname !== '/') return
    const initialDelay = 3000 + Math.random() * 3000
    timerRef.current = setTimeout(showNext, initialDelay)
    return () => clearTimeout(timerRef.current)
  }, [location.pathname, showNext])

  const handleDismiss = () => {
    setDismissed(true)
    setPhase('hide')
    clearTimeout(timerRef.current)
    setTimeout(() => setPhase('hidden'), 500)
  }

  if (location.pathname !== '/' || phase === 'hidden' || !notification) return null

  return (
    <div className={`aa-social-proof ${phase === 'show' ? 'aa-social-proof--show' : 'aa-social-proof--hide'}`}>
      <div className="aa-social-proof__icon">{notification.icon}</div>
      <div className="aa-social-proof__content">
        <div><strong>{notification.name}</strong> จาก {notification.location}</div>
        <span className="aa-social-proof__action">{notification.text}</span>
        <small className="aa-social-proof__time">{notification.time}</small>
      </div>
      <button className="aa-social-proof__close" onClick={handleDismiss}>×</button>
    </div>
  )
}
