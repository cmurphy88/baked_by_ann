/**
 * Sanitize user input by trimming whitespace
 */
export function sanitizeInput(input) {
  return typeof input === 'string' ? input.trim() : input
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate user registration data
 */
export function validateRegistration(data) {
  const errors = []

  if (!data.username || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters')
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required')
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate login data
 */
export function validateLogin(data) {
  const errors = []

  if (!data.username || data.username.trim().length === 0) {
    errors.push('Username is required')
  }

  if (!data.password || data.password.length === 0) {
    errors.push('Password is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
