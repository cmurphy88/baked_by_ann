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

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Render stars for email
function renderStars(rating) {
  const filled = '★'.repeat(rating)
  const empty = '☆'.repeat(5 - rating)
  return `<span style="color: #f59e0b; font-size: 24px; letter-spacing: 2px;">${filled}${empty}</span>`
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
    const {
      classDate,
      overallSatisfaction,
      recommendationLikelihood,
      enjoyedMost,
      improvements,
    } = body

    // Validate required fields
    if (
      !classDate ||
      !overallSatisfaction ||
      !recommendationLikelihood ||
      !enjoyedMost ||
      !improvements
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate star ratings (1-5)
    if (
      overallSatisfaction < 1 ||
      overallSatisfaction > 5 ||
      recommendationLikelihood < 1 ||
      recommendationLikelihood > 5
    ) {
      return NextResponse.json(
        { error: 'Star ratings must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate text length (minimum 10 characters)
    if (enjoyedMost.trim().length < 10 || improvements.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide more detailed feedback (at least 10 characters)' },
        { status: 400 }
      )
    }

    // Escape HTML in all user inputs
    const safeEnjoyedMost = escapeHtml(enjoyedMost)
    const safeImprovements = escapeHtml(improvements)

    // Format class date for display
    const formattedDate = new Date(classDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: `Baked by Ann Feedback <${process.env.FEEDBACK_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: process.env.RECIPIENT_EMAIL || 'your-email@example.com',
      subject: `Class Feedback - ${formattedDate} - Baked by Ann`,
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
      color: #1F2937;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 18px;
      font-weight: bold;
      color: #1F2937;
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
      font-size: 16px;
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
    .ratings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    @media (max-width: 600px) {
      .ratings-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📋 Class Feedback Received</h2>
      <p>${formattedDate}</p>
    </div>
    <div class="content">
      <!-- Ratings Section -->
      <div class="highlight">
        <div class="ratings-grid">
          <div>
            <div class="label">Overall Satisfaction</div>
            <div class="value">
              ${renderStars(overallSatisfaction)}
              <span style="margin-left: 10px; color: #1F2937; font-size: 18px;">${overallSatisfaction}/5</span>
            </div>
          </div>
          <div>
            <div class="label">Recommendation Likelihood</div>
            <div class="value">
              ${renderStars(recommendationLikelihood)}
              <span style="margin-left: 10px; color: #1F2937; font-size: 18px;">${recommendationLikelihood}/5</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback Responses -->
      <div class="field">
        <div class="label">What They Enjoyed Most</div>
        <div class="value">${safeEnjoyedMost.replace(/\n/g, '<br>')}</div>
      </div>

      <div class="field">
        <div class="label">Suggested Improvements</div>
        <div class="value">${safeImprovements.replace(/\n/g, '<br>')}</div>
      </div>
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
      <p style="margin-top: 10px; font-style: italic;">This feedback was submitted anonymously</p>
    </div>
  </div>
</body>
</html>`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send feedback. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Feedback sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Feedback form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
