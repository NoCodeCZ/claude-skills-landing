export default async function handler(req, res) {
  // This endpoint is called via GET redirect from Stripe
  const sessionId = (req.query?.session_id || '').trim()
  const siteUrl = (process.env.VITE_SITE_URL || 'https://ccaiflowai.vercel.app').trim()
  let plan = 'skills_only'
  const thankYouBase = siteUrl + '/thank-you?session_id=' + sessionId

  if (!sessionId) {
    return res.redirect(302, siteUrl + '/thank-you')
  }

  const secretKey = (process.env.STRIPE_SECRET_KEY || '').trim()
  if (!secretKey) {
    console.error('[post-purchase] No Stripe key configured')
    return res.redirect(302, thankYouBase + '&plan=' + plan)
  }

  try {
    // Retrieve checkout session from Stripe
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: { 'Authorization': 'Bearer ' + secretKey },
      }
    )
    const session = await stripeRes.json()

    console.log('[post-purchase] Stripe session status:', session.payment_status, 'session:', sessionId)

    // Send to Zapier for any completed checkout (paid or unpaid for PromptPay)
    // Stripe redirects to success_url only after successful payment
    const zapierPayload = {
      email: session.customer_email || '',
      name: session.metadata?.customer_name || '',
      phone: session.metadata?.phone || '',
      plan: session.metadata?.plan || plan,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      session_id: sessionId,
    }

    console.log('[post-purchase] Sending to Zapier:', JSON.stringify(zapierPayload))

    const zapRes = await fetch('https://hooks.zapier.com/hooks/catch/5450603/ux1s1qe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zapierPayload),
    })

    console.log('[post-purchase] Zapier response:', zapRes.status)

    plan = zapierPayload.plan

    // Pass customer info to thank you page for Purchase pixel event
    const redirectParams = new URLSearchParams({
      session_id: sessionId,
      plan,
      email: zapierPayload.email,
      name: zapierPayload.name,
      phone: zapierPayload.phone,
      fn: session.metadata?.fn || (zapierPayload.name.split(' ')[0] || ''),
      ln: session.metadata?.ln || (zapierPayload.name.split(' ').slice(1).join(' ') || ''),
    })
    return res.redirect(302, siteUrl + '/thank-you?' + redirectParams.toString())
  } catch (err) {
    console.error('[post-purchase] Error:', err.message)
  }

  return res.redirect(302, thankYouBase + '&plan=' + plan)
}
