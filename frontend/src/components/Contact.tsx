import { useMemo, useCallback } from 'react'
import { ReactNode } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin } from 'lucide-react'
import { CONTACT_INFO, FAQ_DATA } from '../constants/mockData'
import { openWhatsApp, formatPhoneNumber } from '../utils/helpers'
import './Contact.css'

const ICON_SIZE = 32

interface ContactMethod {
  icon: ReactNode
  title: string
  content: string
  description: string
  action: () => void
  color: string
}

interface SocialLink {
  icon: ReactNode
  name: string
  handle: string
  url: string
}

const Contact = () => {
  const handleWhatsAppClick = useCallback(() => {
    if (CONTACT_INFO.phone) {
      const message = 'Hola, me gustaría obtener más información sobre los servicios.'
      openWhatsApp(CONTACT_INFO.phone, message)
    }
  }, [])

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
        title: 'WhatsApp',
        content: formatPhoneNumber(CONTACT_INFO.phone),
        description: 'Respuesta rápida',
        action: handleWhatsAppClick,
        color: '#25d366'
      }, {
        icon: <Phone size={ICON_SIZE} />,
        title: 'Teléfono',
        content: formatPhoneNumber(CONTACT_INFO.phone),
        description: 'Llamadas disponibles',
        action: handlePhoneClick,
        color: '#4a90a4'
      })
    }

    if (CONTACT_INFO.email) {
      methods.push({
        icon: <Mail size={ICON_SIZE} />,
        title: 'Email',
        content: CONTACT_INFO.email,
        description: 'Respuesta en 24 horas',
        action: handleEmailClick,
        color: '#5eb3cc'
      })
    }

    if (CONTACT_INFO.addressShort) {
      methods.push({
        icon: <MapPin size={ICON_SIZE} />,
        title: 'Ubicación',
        content: CONTACT_INFO.addressShort,
        description: CONTACT_INFO.address || '',
        action: () => {},
        color: '#90c9db'
      })
    }

    return methods
  }, [handleWhatsAppClick, handlePhoneClick, handleEmailClick])

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
        <h2 className="section-title">Contacto</h2>
        <p className="contact-subtitle">
          Estoy aquí para ayudarte. Contáctame por el medio que prefieras
        </p>

        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="contact-card card"
              onClick={method.action}
              style={{ '--card-color': method.color } as React.CSSProperties}
            >
              <div className="contact-icon">
                {method.icon}
              </div>
              <h3 className="contact-title">{method.title}</h3>
              <p className="contact-content">{method.content}</p>
              <p className="contact-description">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="contact-extra">
          {socialLinks.length > 0 && (
            <div className="social-section card">
              <h3>Sígueme en Redes Sociales</h3>
              <p className="social-subtitle">
                Comparto contenido sobre salud mental, consejos y recursos útiles
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
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
            <h3>Preguntas Frecuentes</h3>
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className="faq-item">
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
            <button className="btn btn-primary" onClick={handleWhatsAppClick}>
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

