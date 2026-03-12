const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''
const TEST_EVENT_CODE = 'TEST86618'

// Initialize Meta Pixel
let pixelInitialized = false
export function initPixel() {
  if (pixelInitialized || !PIXEL_ID) return
  pixelInitialized = true

  /* eslint-disable */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

// Get fbp/fbc cookies
function getFbp() {
  const match = document.cookie.match(/_fbp=([^;]+)/)
  return match ? match[1] : ''
}

function getFbc() {
  const match = document.cookie.match(/_fbc=([^;]+)/)
  if (match) return match[1]
  // Build from fbclid URL param
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid')
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`
  return ''
}

// Generate unique event ID for deduplication
function generateEventId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

// Fire pixel event (client-side)
function firePixel(eventName, params, eventId) {
  if (!window.fbq) return
  const opts = eventId ? { eventID: eventId } : {}

  // Standard events
  const standardEvents = [
    'ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase',
    'Lead', 'CompleteRegistration', 'PageView',
  ]

  if (standardEvents.includes(eventName)) {
    window.fbq('track', eventName, params || {}, opts)
  } else {
    window.fbq('trackCustom', eventName, params || {}, opts)
  }
}

// Fire server event (CAPI)
function fireCAPI(event) {
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      events: [event],
      test_event_code: TEST_EVENT_CODE,
    }),
  }).catch(() => {})
}

// Main tracking function — fires both pixel + CAPI
export function trackEvent(eventName, options = {}) {
  const {
    value, currency, content_name, content_ids, content_type, contents, num_items,
    email, phone, first_name, last_name, external_id,
  } = options

  const eventId = generateEventId()

  // Client-side pixel
  const pixelParams = {}
  if (value !== undefined) pixelParams.value = value
  if (currency) pixelParams.currency = currency
  if (content_name) pixelParams.content_name = content_name
  if (content_ids) pixelParams.content_ids = content_ids
  if (content_type) pixelParams.content_type = content_type
  if (contents) pixelParams.contents = contents
  if (num_items) pixelParams.num_items = num_items
  firePixel(eventName, pixelParams, eventId)

  // Server-side CAPI
  const capiEvent = {
    event_name: eventName,
    event_id: eventId,
    url: window.location.href,
    fbp: getFbp(),
    fbc: getFbc(),
  }
  if (value !== undefined) capiEvent.value = value
  if (currency) capiEvent.currency = currency
  if (content_name) capiEvent.content_name = content_name
  if (content_ids) capiEvent.content_ids = content_ids
  if (content_type) capiEvent.content_type = content_type
  if (contents) capiEvent.contents = contents
  if (num_items) capiEvent.num_items = num_items
  if (email) capiEvent.email = email
  if (phone) capiEvent.phone = phone
  if (first_name) capiEvent.first_name = first_name
  if (last_name) capiEvent.last_name = last_name
  if (external_id) capiEvent.external_id = external_id

  fireCAPI(capiEvent)
}

// Scroll depth tracker
export function trackScrollDepth(thresholds = [25, 50, 75, 95]) {
  const fired = new Set()

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return
    const percent = Math.round((scrollTop / docHeight) * 100)

    for (const t of thresholds) {
      if (percent >= t && !fired.has(t)) {
        fired.add(t)
        trackEvent(`scroll_depth_${t}`, {
          content_name: `scroll_${t}%`,
        })
      }
    }

    if (fired.size === thresholds.length) {
      window.removeEventListener('scroll', onScroll)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

// Time spent tracker
export function trackTimeSpent(intervals = [15, 30, 45, 60]) {
  const timers = []
  for (const secs of intervals) {
    const timer = setTimeout(() => {
      trackEvent(`time_spent_${secs}`, {
        content_name: `time_${secs}s`,
      })
    }, secs * 1000)
    timers.push(timer)
  }
  return () => timers.forEach(clearTimeout)
}
