import { useEffect, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { CALENDLY_URL } from '../constants/mockData'
import './Booking.css'

const CALENDLY_WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_WIDGET_HEIGHT = 700

const Booking = () => {
  const { t } = useTranslation()
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!CALENDLY_URL) return

    const existingScript = document.querySelector(`script[src="${CALENDLY_WIDGET_SCRIPT}"]`)
    if (existingScript) return

    const script = document.createElement('script')
    script.src = CALENDLY_WIDGET_SCRIPT
    script.async = true
    document.body.appendChild(script)

    return () => {
      const scriptToRemove = document.querySelector(`script[src="${CALENDLY_WIDGET_SCRIPT}"]`)
      if (scriptToRemove) document.body.removeChild(scriptToRemove)
    }
  }, [])

  return (
    <section id="agenda" className="section booking-section">
      <div className="container">
        <h2 className="section-title">{t.booking.title}</h2>
        <p className="booking-subtitle">{t.booking.subtitle}</p>

        {CALENDLY_URL ? (
          <div className="booking-widget-wrapper">
            <div
              ref={widgetRef}
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&hide_event_type_details=0`}
              style={{ minWidth: 320, height: CALENDLY_WIDGET_HEIGHT }}
            />
          </div>
        ) : (
          <div className="booking-placeholder">
            <div className="placeholder-inner">
              <span className="placeholder-icon">📅</span>
              <p className="placeholder-text">{t.booking.configPending}</p>
              <p className="placeholder-subtext">{t.booking.whatsappFallback}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Booking
