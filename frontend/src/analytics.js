const GA_MEASUREMENT_ID = 'G-1FRMZRZ1ZC'

export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return

  window.gtag('event', name, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  })
}

export function getSafeClickLabel(element) {
  const label = element.getAttribute('aria-label') || element.textContent || element.getAttribute('href') || 'unknown'
  return label.trim().replace(/\s+/g, ' ').slice(0, 80)
}
