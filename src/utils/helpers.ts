// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Formats a phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove the + and country code for display
  return phone.replace(/^\+52/, '+52 ')
}

/**
 * Generates WhatsApp URL with pre-filled message
 */
export const getWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

/**
 * Opens WhatsApp in a new window
 */
export const openWhatsApp = (phoneNumber: string, message: string): void => {
  const url = getWhatsAppUrl(phoneNumber, message)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Smooth scroll to an element by ID
 */
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Formats currency for display
 */
export const formatCurrency = (amount: number, currency: string = 'ARS'): string => {
  return `$${amount.toLocaleString('es-AR')} ${currency}`
}

/**
 * Validates if a string is a valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Gets the current year for copyright
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear()
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

