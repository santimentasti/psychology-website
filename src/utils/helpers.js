// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Formats a phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove the + and country code for display
  return phone.replace(/^\+52/, '+52 ')
}

/**
 * Generates WhatsApp URL with pre-filled message
 * @param {string} phoneNumber - WhatsApp phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppUrl = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

/**
 * Opens WhatsApp in a new window
 * @param {string} phoneNumber - WhatsApp phone number
 * @param {string} message - Message to send
 */
export const openWhatsApp = (phoneNumber, message) => {
  const url = getWhatsAppUrl(phoneNumber, message)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Smooth scroll to an element by ID
 * @param {string} elementId - ID of the element to scroll to
 */
export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Formats currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: MXN)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'MXN') => {
  return `$${amount.toLocaleString('es-MX')} ${currency}`
}

/**
 * Validates if a string is a valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Gets the current year for copyright
 * @returns {number} Current year
 */
export const getCurrentYear = () => {
  return new Date().getFullYear()
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}


