import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import PaymentPage from './pages/PaymentPage'
import ThankYouPage from './pages/ThankYouPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import SocialProofNotification from './components/SocialProofNotification'
import ScrollToTop from './components/ScrollToTop'
import { initPixel } from './lib/tracking'

function App() {
  useEffect(() => { initPixel() }, [])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <SocialProofNotification />
    </>
  )
}

export default App
