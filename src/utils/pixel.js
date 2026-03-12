// Browser pixel
function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

// Get fbp/fbc cookies
function getCookie(name) {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : ''
}

// Server-side CAPI call
function sendCAPI(eventName, extraData = {}) {
  const payload = {
    events: [
      {
        event_name: eventName,
        url: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
        ...extraData,
      },
    ],
  }

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})
}

export function trackViewContent() {
  const data = {
    content_name: 'Claude Skills Ultimate Bundle',
    content_type: 'product',
    value: 997,
    currency: 'THB',
  }
  fbq('track', 'ViewContent', data)
  sendCAPI('ViewContent', data)
}

export function trackAddToCart() {
  const data = {
    content_name: 'Claude Skills Ultimate Bundle',
    content_type: 'product',
    value: 997,
    currency: 'THB',
  }
  fbq('track', 'AddToCart', data)
  sendCAPI('AddToCart', data)
}

export function trackInitiateCheckout() {
  const data = {
    content_name: 'Claude Skills Ultimate Bundle',
    value: 997,
    currency: 'THB',
  }
  fbq('track', 'InitiateCheckout', data)
  sendCAPI('InitiateCheckout', data)
}

export function trackPurchase(value = 997, currency = 'THB') {
  const data = {
    content_name: 'Claude Skills Ultimate Bundle',
    value,
    currency,
  }
  fbq('track', 'Purchase', data)
  sendCAPI('Purchase', data)
}
