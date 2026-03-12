import { createHash } from 'crypto'

function sha256(value) {
  if (!value) return ''
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const accessToken = (process.env.META_ACCESS_TOKEN || '').trim()
  const pixelId = (process.env.VITE_META_PIXEL_ID || '').trim()

  if (!accessToken || !pixelId) {
    return res.status(500).json({ error: 'Meta CAPI not configured' })
  }

  let events = []
  let testEventCode = ''
  try {
    const body = req.body || {}
    events = body.events || []
    testEventCode = body.test_event_code || ''
  } catch {
    return res.status(400).json({ error: 'Invalid body' })
  }

  if (!events.length) {
    return res.status(400).json({ error: 'No events' })
  }

  const capiEvents = events.map((evt) => {
    const event = {
      event_name: evt.event_name,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: evt.url || '',
      user_data: {
        client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
        client_user_agent: req.headers['user-agent'] || '',
      },
    }

    // Event ID for deduplication with pixel
    if (evt.event_id) event.event_id = evt.event_id

    // Browser identifiers (no hashing)
    if (evt.fbp) event.user_data.fbp = evt.fbp
    if (evt.fbc) event.user_data.fbc = evt.fbc

    // Customer info (hashed)
    if (evt.email) event.user_data.em = [sha256(evt.email)]
    if (evt.phone) event.user_data.ph = [sha256(evt.phone)]
    if (evt.first_name) event.user_data.fn = [sha256(evt.first_name)]
    if (evt.last_name) event.user_data.ln = [sha256(evt.last_name)]

    // External ID
    if (evt.external_id) event.user_data.external_id = [sha256(evt.external_id)]

    // Custom data
    if (evt.value !== undefined || evt.currency || evt.content_name || evt.content_ids || evt.content_type || evt.contents) {
      event.custom_data = {}
      if (evt.value !== undefined) event.custom_data.value = evt.value
      if (evt.currency) event.custom_data.currency = evt.currency
      if (evt.content_name) event.custom_data.content_name = evt.content_name
      if (evt.content_ids) event.custom_data.content_ids = evt.content_ids
      if (evt.content_type) event.custom_data.content_type = evt.content_type
      if (evt.contents) event.custom_data.contents = evt.contents
      if (evt.num_items) event.custom_data.num_items = evt.num_items
    }

    return event
  })

  const payload = {
    data: capiEvents,
    access_token: accessToken,
  }
  if (testEventCode) {
    payload.test_event_code = testEventCode
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('[meta-capi] Error:', JSON.stringify(data))
      return res.status(500).json({
        error: 'Meta CAPI error',
        detail: data.error?.message || JSON.stringify(data),
      })
    }

    return res.status(200).json({ success: true, events_received: data.events_received })
  } catch (err) {
    return res.status(500).json({ error: 'Network error', detail: err.message })
  }
}
