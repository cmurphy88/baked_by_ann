# Baked by Ann - Project Overview

## Quick Start

### Development Commands

```bash
npm run dev     # Start development server at http://localhost:3000
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

### Environment Setup

Required environment variables (see `.env.local.example`):

```bash
RESEND_API_KEY=your_resend_api_key        # Required for email functionality
RESEND_FROM_EMAIL=your_sender_email       # Email "from" address (defaults to onboarding@resend.dev)
RECIPIENT_EMAIL=your_recipient_email      # Where enquiry emails are sent
```

## Project Architecture

### Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS v4 with custom teal color palette
- **Icons**: lucide-react
- **Email**: Resend API
- **Data Fetching**: SWR (installed but not currently used)

### Directory Structure

```
baked_by_ann/
├── app/
│   ├── layout.jsx              # Root layout with metadata & global styles
│   ├── page.jsx                # Home page (client component)
│   ├── globals.css             # Tailwind CSS import
│   └── api/
│       └── contact/
│           └── route.js        # POST endpoint for contact form
├── components/
│   ├── Header.jsx              # Top navigation with logo & Instagram link
│   ├── HeroSection.jsx         # Hero banner with title
│   ├── PhotoGallery.jsx        # Grid of wedding cake placeholders
│   ├── EnquiryForm.jsx         # Contact form with validation & state
│   └── Footer.jsx              # Simple copyright footer
├── lib/
│   └── validations.js          # Validation utilities (mostly unused)
├── public/
│   ├── BakedByAnnLogo.jpeg     # Logo image
│   └── images/                 # Placeholder for gallery images
└── Configuration files below
```

## App Router Structure

### Pages & Routes

- **/** (app/page.jsx) - Single-page application showing:
  - Header navigation
  - Hero section
  - Photo gallery (6 placeholder images)
  - Wedding enquiry form
  - Footer

### API Routes

- **POST /api/contact** (app/api/contact/route.js)
  - Accepts wedding enquiry form submissions
  - Features:
    - In-memory rate limiting (3 requests/minute per IP)
    - HTML escaping for XSS protection
    - Email validation
    - Sends formatted HTML email via Resend
    - Auto-reply configured with customer's email

## Component Architecture

### Pattern: Flat Component Structure

All components are in `/components` with no nesting. Components use:

- **JSX** (not TypeScript)
- **Client-side rendering** where needed ('use client' directive)
- **lucide-react** for icons
- **Tailwind CSS** for styling with custom teal theme

### Component Details

**Header.jsx**

- Server component
- Logo (Next.js Image with priority loading)
- Instagram link (@bakedbyann80)
- Uses Next.js Link for navigation

**HeroSection.jsx**

- Simple presentational component
- Heart icon from lucide-react
- Teal gradient background

**PhotoGallery.jsx**

- Accepts `photos` prop (array of {id, src, alt})
- Currently shows placeholder cards with Cake icon
- Ready for real image integration
- 3-column responsive grid (1 col mobile, 2 tablet, 3 desktop)

**EnquiryForm.jsx** (Most Complex Component)

- Client component with React hooks
- **State management**:
  - `formData` - form field values
  - `status` - 'idle' | 'loading' | 'success' | 'error'
  - `errorMessage` - error display text
- **Form fields**:
  - Name\* (required)
  - Email\* (required, type="email")
  - Social Media (optional)
  - Wedding Date\* (required, type="date")
  - Guest Count\* (required, type="number")
  - Services\* (required, textarea)
  - Additional Details (optional, textarea)
- **Features**:
  - Form validation (HTML5 + server-side)
  - Loading states (disabled inputs during submit)
  - Success/error message display with dismiss
  - Auto-dismiss success message after 30s
  - Cleanup with useEffect/useRef for timeout

**Footer.jsx**

- Simple copyright with dynamic year

### Styling Approach

**Tailwind CSS v4**

- Custom teal color palette (50-900 shades) in tailwind.config.js
- Primary brand color: teal-300 (#9DD4D3)
- Gradient backgrounds: `bg-linear-to-b from-teal-50 via-white to-teal-50`
- Responsive utilities: sm:, md:, lg: breakpoints
- Utility-first approach (no custom CSS files except globals.css)
- Interactive states: hover effects, transitions, transforms

**Design System**

- Color scheme: Teal/turquoise with grays
- Shadows: shadow-sm, shadow-lg, shadow-xl, shadow-2xl
- Rounded corners: rounded-lg, rounded-2xl
- Spacing: consistent use of px-4, py-3, mb-6, etc.
- Typography: font-serif for headings, default sans for body

## API & Integration Patterns

### Email Integration (Resend)

**Configuration** (app/api/contact/route.js):

```javascript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
```

**Email Template**:

- HTML template with inline styles (email-safe)
- Custom teal branding matching website
- Structured fields display
- Highlighted wedding date section
- Reply-to set to customer's email for easy response

**Security Features**:

- Rate limiting (in-memory Map, 3 req/min per IP)
- HTML escaping function to prevent XSS
- Email format validation
- Required field validation
- IP-based throttling using x-forwarded-for header

### Form Handling Pattern

**Client-side** (EnquiryForm.jsx):

1. User fills form → updates React state
2. Submit triggers async POST to `/api/contact`
3. Shows loading spinner, disables form
4. On success: clear form, show success message
5. On error: show error message with details

**Server-side** (route.js):

1. Check rate limit
2. Parse JSON body
3. Validate required fields
4. Validate email format
5. Escape HTML in all user inputs
6. Format wedding date
7. Send email via Resend
8. Return JSON response {success, message} or {error}

### Validation Patterns

**Current Implementation**:

- HTML5 validation (required, type="email", min="1")
- Server-side validation in API route
- lib/validations.js exists but is NOT used (legacy code for user registration)

**Validation in API Route**:

```javascript
if (!name || !email || !weddingDate || !guestCount || !services) {
  return NextResponse.json({ error: '...' }, { status: 400 })
}
if (!email || !email.includes('@')) {
  return NextResponse.json({ error: '...' }, { status: 400 })
}
```

## Configuration Files

### next.config.js

- Minimal configuration (default Next.js settings)
- Ready for additions (image domains, redirects, etc.)

### tailwind.config.js

- Content paths: pages/**, components/**, app/\*\*
- Custom teal color palette (50-900)
- No plugins

### jsconfig.json

- Path alias: `@/*` maps to root directory
- Enables `import X from '@/components/X'`

### eslint.config.mjs

- Uses Next.js ESLint config (core-web-vitals + TypeScript)
- Ignores: .next/, out/, build/, next-env.d.ts

## Data Flow

### Form Submission Flow

```
User fills form
    ↓
EnquiryForm.jsx (client)
    ↓
POST /api/contact
    ↓
Rate limit check
    ↓
Validate & sanitize
    ↓
Resend API
    ↓
Email sent to RECIPIENT_EMAIL
    ↓
Response to client
    ↓
Success/error UI update
```

### State Management

- **No global state** (no Redux, Context, Zustand)
- Local React state (useState) in components
- SWR available but unused (may be for future API fetching)

## Important Patterns & Conventions

### File Naming

- Components: PascalCase.jsx (e.g., HeroSection.jsx)
- API routes: lowercase route.js
- Utilities: camelCase.js (e.g., validations.js)

### Import Patterns

```javascript
// Next.js imports
import Link from 'next/link'
import Image from 'next/image'

// Component imports with @ alias
import Header from '@/components/Header'

// Icon imports (named)
import { Heart, Calendar, Users } from 'lucide-react'
```

### Component Structure

```javascript
// Named export for utilities
export function utilityFunction() {}

// Default export for components
export default function ComponentName() {
  return <div>...</div>
}
```

### Client vs Server Components

- **Server by default** (layout.jsx, Header, Footer, etc.)
- **Client when needed** (page.jsx, EnquiryForm.jsx)
- Use 'use client' directive at top of file

### CSS Class Patterns

- Responsive: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Interactive: `hover:bg-teal-400 transition-all duration-300`
- Spacing: `px-4 sm:px-6 lg:px-8` (consistent padding scales)
- Container: `max-w-7xl mx-auto` (centered content container)

## Known Issues & Limitations

1. **Rate limiting** - In-memory Map (resets on server restart, not suitable for multi-instance deployments)
2. **Photo gallery** - Shows placeholders, needs real images in /public/images/
3. **lib/validations.js** - Contains unused validation functions (registration/login)
4. **No database** - All data sent via email, no storage
5. **No user accounts** - Single-purpose wedding enquiry site
6. **SWR installed but unused** - May be planned for future features

## Future Development Notes

### To Add Real Images:

1. Add images to `/public/images/` (wedding-1.jpg through wedding-6.jpg)
2. Update PhotoGallery component to use Next.js Image component:

```javascript
<Image src={image.src} alt={image.alt} fill className="object-cover" />
```

### To Implement Database:

- Currently all form data goes to email only
- To store enquiries: add Prisma/MongoDB/Supabase
- Update /api/contact to save data before/after sending email

### To Add More Pages:

- Create new folders in /app (e.g., /app/about/page.jsx)
- Update Header component with navigation links

### To Improve Rate Limiting:

- Replace in-memory Map with Redis
- Use middleware for centralized rate limiting
- Consider next-rate-limit package

## Dependencies Overview

**Core**:

- next: App Router, API routes, Image optimization
- react/react-dom: UI library
- resend: Email delivery service

**UI**:

- tailwindcss: Utility-first CSS
- lucide-react: Icon components
- prop-types: Runtime type checking (mostly unused)

**Dev**:

- eslint: Linting with Next.js config
- @tailwindcss/postcss: Tailwind v4 PostCSS integration

## Troubleshooting

**Email not sending?**

- Check RESEND_API_KEY in .env.local
- Verify Resend domain is verified
- Check RESEND_FROM_EMAIL matches verified domain

**Rate limit errors?**

- Wait 1 minute between requests
- Clear rate limit by restarting dev server
- Consider adjusting maxRequests in route.js

**Styles not applying?**

- Check Tailwind content paths in tailwind.config.js
- Restart dev server after config changes
- Verify @import "tailwindcss" in globals.css

**Images not loading?**

- Check file exists in /public/
- Use paths relative to /public (e.g., /BakedByAnnLogo.jpeg)
- Verify Image component has width/height or fill prop

## Git Workflow

- Main branch: `main`
- Clean working directory (as of initial commit)
- .env.local ignored (never commit secrets)
- .DS_Store ignored (macOS filesystem metadata)

---

**Last Updated**: Based on codebase snapshot from initial commit (aa26a06)
