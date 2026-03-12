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
  try {
    const body = req.body || {}
    events = body.events || []
  } catch {
    return res.status(400).json({ error: 'Invalid body' })
  }

  if (!events.length) {
    return res.status(400).json({ error: 'No events' })
  }

  // Build CAPI event data
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

    // Add fbp/fbc cookies if provided
    if (evt.fbp) event.user_data.fbp = evt.fbp
    if (evt.fbc) event.user_data.fbc = evt.fbc

    // Add email hash if provided
    if (evt.email) {
      event.user_data.em = [evt.email.toLowerCase().trim()]
    }

    // Add custom data
    if (evt.value || evt.currency || evt.content_name) {
      event.custom_data = {}
      if (evt.value) event.custom_data.value = evt.value
      if (evt.currency) event.custom_data.currency = evt.currency
      if (evt.content_name) event.custom_data.content_name = evt.content_name
    }

    return event
  })

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: capiEvents,
          access_token: accessToken,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
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
