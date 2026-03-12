export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = (process.env.STRIPE_SECRET_KEY || '').trim()
  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe key not configured' })
  }

  const siteUrl = (process.env.VITE_SITE_URL || 'https://ccaiflowai.vercel.app').trim()
  const successUrl = siteUrl + '/api/post-purchase?session_id={CHECKOUT_SESSION_ID}'
  const cancelUrl = siteUrl + '/checkout'

  let email = ''
  let phone = ''
  let name = ''
  let fn = ''
  let ln = ''
  let upsell = false
  try {
    const body = req.body || {}
    email = (body.email || '').trim()
    phone = (body.phone || '').trim()
    name = (body.name || '').trim()
    fn = (body.fn || '').trim()
    ln = (body.ln || '').trim()
    upsell = body.upsell === true
  } catch {}

  const params = new URLSearchParams()
  params.append('payment_method_types[0]', 'card')
  params.append('payment_method_types[1]', 'promptpay')
  params.append('mode', 'payment')
  params.append('success_url', successUrl)
  params.append('cancel_url', cancelUrl)

  // Main product
  params.append('line_items[0][price_data][currency]', 'thb')
  params.append('line_items[0][price_data][product_data][name]', 'Claude Skills Ultimate Bundle')
  params.append('line_items[0][price_data][product_data][description]', '500+ Skills for Claude AI')
  params.append('line_items[0][price_data][unit_amount]', '99700')
  params.append('line_items[0][quantity]', '1')

  // Upsell product
  if (upsell) {
    params.append('line_items[1][price_data][currency]', 'thb')
    params.append('line_items[1][price_data][product_data][name]', '1,900+ N8N Workflows Bundle')
    params.append('line_items[1][price_data][product_data][description]', '1,900+ ready-to-go automation templates for N8N')
    params.append('line_items[1][price_data][unit_amount]', '49700')
    params.append('line_items[1][quantity]', '1')
  }

  // Plan type for Zapier routing
  params.append('metadata[plan]', upsell ? 'skills_and_n8n' : 'skills_only')

  if (email) {
    params.append('customer_email', email)
  }
  if (phone) {
    params.append('metadata[phone]', phone)
  }
  if (name) {
    params.append('metadata[customer_name]', name)
  }
  if (fn) {
    params.append('metadata[fn]', fn)
  }
  if (ln) {
    params.append('metadata[ln]', ln)
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + secretKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(500).json({
        error: 'Stripe API error',
        detail: data.error?.message || JSON.stringify(data),
      })
    }

    return res.status(200).json({ url: data.url })
  } catch (err) {
    return res.status(500).json({
      error: 'Network error',
      detail: err.message,
    })
  }
}
