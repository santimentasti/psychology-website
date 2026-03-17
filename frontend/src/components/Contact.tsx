import { useMemo, useCallback } from 'react'
import { ReactNode } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin } from 'lucide-react'
import { CONTACT_INFO } from '../constants/mockData'
import { openWhatsApp, formatPhoneNumber } from '../utils/helpers'
import { useTranslation } from '../hooks/useTranslation'
import './Contact.css'

const ICON_SIZE = 32

interface ContactMethod {
  icon: ReactNode
  title: string
  content: string
  description: string
  action?: () => void
  actionLabel?: string
  color: string
}

interface SocialLink {
  icon: ReactNode
  name: string
  handle: string
  url: string
}

const Contact = () => {
  const { t, language } = useTranslation()

  const handleWhatsAppClick = useCallback(() => {
    if (CONTACT_INFO.phone) {
      const message = language === 'es'
        ? 'Hola, me gustaría obtener más información sobre los servicios.'
        : 'Hello, I would like to get more information about the services.'
      openWhatsApp(CONTACT_INFO.phone, message)
    }
  }, [language])

  const handleEmailClick = useCallback(() => {
    if (CONTACT_INFO.email) {
      window.location.href = `mailto:${CONTACT_INFO.email}`
    }
  }, [])

  const handlePhoneClick = useCallback(() => {
    if (CONTACT_INFO.phone) {
      window.location.href = `tel:${CONTACT_INFO.phone}`
    }
  }, [])

  const contactMethods = useMemo<ContactMethod[]>(() => {
    const methods: ContactMethod[] = []

    if (CONTACT_INFO.phone) {
      methods.push({
        icon: <MessageCircle size={ICON_SIZE} />,
        title: t.contact.whatsapp,
        content: formatPhoneNumber(CONTACT_INFO.phone),
        description: t.contact.quickResponse,
        action: handleWhatsAppClick,
        actionLabel: t.contact.whatsapp,
        color: '#25d366'
      }, {
        icon: <Phone size={ICON_SIZE} />,
        title: t.contact.phone,
        content: formatPhoneNumber(CONTACT_INFO.phone),
        description: t.contact.callsAvailable,
        action: handlePhoneClick,
        actionLabel: t.contact.phone,
        color: '#4a90a4'
      })
    }

    if (CONTACT_INFO.email) {
      methods.push({
        icon: <Mail size={ICON_SIZE} />,
        title: t.contact.email,
        content: CONTACT_INFO.email,
        description: t.contact.responseIn24Hours,
        action: handleEmailClick,
        actionLabel: t.contact.email,
        color: '#5eb3cc'
      })
    }

    if (CONTACT_INFO.addressShort) {
      methods.push({
        icon: <MapPin size={ICON_SIZE} />,
        title: t.contact.location,
        content: CONTACT_INFO.addressShort,
        description: t.contact.onlineConsultations,
        color: '#90c9db'
      })
    }

    return methods
  }, [t, handleWhatsAppClick, handlePhoneClick, handleEmailClick])

  const socialLinks = useMemo<SocialLink[]>(() => {
    const links: SocialLink[] = []
    
    if (CONTACT_INFO.socialMedia.instagram?.url) {
      links.push({
        icon: <Instagram size={24} />,
        name: 'Instagram',
        handle: CONTACT_INFO.socialMedia.instagram.handle || '',
        url: CONTACT_INFO.socialMedia.instagram.url
      })
    }

    if (CONTACT_INFO.socialMedia.linkedin?.url) {
      links.push({
        icon: <Linkedin size={24} />,
        name: 'LinkedIn',
        handle: CONTACT_INFO.socialMedia.linkedin.handle || '',
        url: CONTACT_INFO.socialMedia.linkedin.url
      })
    }

    return links
  }, [])

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="contact-subtitle">
          {t.contact.subtitle}
        </p>

        <div className="contact-grid">
          {contactMethods.map((method) => {
            const commonContent = (
              <>
                <div className="contact-icon">
                  {method.icon}
                </div>
                <h3 className="contact-title">{method.title}</h3>
                <p className="contact-content">{method.content}</p>
                <p className="contact-description">{method.description}</p>
              </>
            )

            if (!method.action) {
              return (
                <article
                  key={method.title}
                  className="contact-card card"
                  style={{ '--card-color': method.color } as React.CSSProperties}
                >
                  {commonContent}
                </article>
              )
            }

            return (
              <button
                key={method.title}
                type="button"
                className="contact-card card"
                onClick={method.action}
                style={{ '--card-color': method.color } as React.CSSProperties}
                aria-label={method.actionLabel}
              >
                {commonContent}
              </button>
            )
          })}
        </div>

        <div className="contact-extra">
          {socialLinks.length > 0 && (
            <div className="social-section card">
              <h3>Sígueme en Redes Sociales</h3>
              <p className="social-subtitle">
                Comparto contenido sobre salud mental, consejos y recursos útiles
              </p>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Visitar ${social.name}`}
                  >
                    <div className="social-icon">{social.icon}</div>
                    <div className="social-info">
                      <span className="social-name">{social.name}</span>
                      <span className="social-handle">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="faq-section card">
            <h3>{t.contact.faq}</h3>
            {t.contact.faqItems.map((faq) => (
              <div key={faq.question} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-cta">
          <h3>¿Listo para comenzar tu proceso terapéutico?</h3>
          <p>
            El primer paso es el más importante. Estoy aquí para acompañarte en tu 
            camino hacia el bienestar emocional.
          </p>
          {CONTACT_INFO.phone && (
            <button type="button" className="btn btn-primary" onClick={handleWhatsAppClick} aria-label="Contactar por WhatsApp ahora">
              <MessageCircle size={20} />
              Contactar ahora
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact

