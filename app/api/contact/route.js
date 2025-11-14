import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (consider Redis for production)
const rateLimitMap = new Map()

function rateLimit(identifier) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 3 // max 3 requests per minute

  const userRequests = rateLimitMap.get(identifier) || []
  const recentRequests = userRequests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(identifier, recentRequests)
  return true
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, socialMedia, weddingDate, guestCount, services, additionalDetails } =
      body

    // Validate required fields
    if (!name || !email || !weddingDate || !guestCount || !services) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Escape HTML to prevent XSS
    const escapeHtml = (unsafe) => {
      if (!unsafe) return ''
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSocialMedia = socialMedia ? escapeHtml(socialMedia) : ''
    const safeWeddingDate = escapeHtml(weddingDate)
    const safeGuestCount = escapeHtml(guestCount.toString())
    const safeServices = escapeHtml(services)
    const safeAdditionalDetails = additionalDetails
      ? escapeHtml(additionalDetails)
      : ''

    // Format wedding date for display
    const formattedDate = new Date(weddingDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `Baked by Ann <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: process.env.RECIPIENT_EMAIL || 'your-email@example.com',
      subject: `New Wedding Inquiry from ${safeName} - Baked by Ann`,
      replyTo: email,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #1F2937;
      background-color: #F3F4F6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #5ab6b5 0%, #449a99 100%);
      color: white;
      padding: 30px 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
    .content {
      background-color: #FFFFFF;
      padding: 30px 25px;
      border-radius: 0 0 8px 8px;
      border: 2px solid #5ab6b5;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 2px solid #E5E7EB;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: bold;
      color: #357b7a;
      margin-bottom: 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .value {
      color: #111827;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.5;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #5ab6b5;
      font-size: 13px;
      color: #4B5563;
      text-align: center;
    }
    .highlight {
      background-color: #D1FAF9;
      padding: 20px;
      border-radius: 8px;
      border-left: 5px solid #357b7a;
    }
    .highlight .value {
      font-size: 20px;
      font-weight: bold;
      color: #357b7a;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="color: #1F2937;">💍 New Wedding Inquiry</h2>
      <p style="margin: 10px 0 0 0; font-size: 16px; color: #1F2937;">Baked by Ann</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value">${safeName}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${safeEmail}" style="color: #1F2937; text-decoration: none;">${safeEmail}</a></div>
      </div>

      ${
        safeSocialMedia
          ? `<div class="field">
        <div class="label">Social Media</div>
        <div class="value">${safeSocialMedia}</div>
      </div>`
          : ''
      }

      <div class="field highlight">
        <div class="label">Wedding Date</div>
        <div class="value" style="font-size: 20px; font-weight: bold; color: #1F2937;">${formattedDate}</div>
      </div>

      <div class="field">
        <div class="label">Number of Guests</div>
        <div class="value">${safeGuestCount} guests</div>
      </div>

      <div class="field">
        <div class="label">Services Interested In</div>
        <div class="value">${safeServices.replace(/\n/g, '<br>')}</div>
      </div>

      ${
        safeAdditionalDetails
          ? `<div class="field">
        <div class="label">Additional Details</div>
        <div class="value">${safeAdditionalDetails.replace(/\n/g, '<br>')}</div>
      </div>`
          : ''
      }
    </div>
    <div class="footer">
      <p>Submitted on ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}</p>
      <p style="margin-top: 10px;">Reply directly to this email to contact the customer.</p>
    </div>
  </div>
</body>
</html>`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
