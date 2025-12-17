import { Brain, Mail, Phone, MapPin, Instagram, Linkedin, Heart } from 'lucide-react'
import { CONTACT_INFO } from '../constants/mockData'
import { getCurrentYear, formatPhoneNumber } from '../utils/helpers'
import './Footer.css'

const Footer = () => {
  const currentYear = getCurrentYear()

  const footerLinks = {
    servicios: [
      { label: 'Terapia Individual', href: '#servicios' },
      { label: 'Terapia de Pareja', href: '#servicios' },
      { label: 'Terapia Familiar', href: '#servicios' },
      { label: 'Desarrollo Personal', href: '#servicios' }
    ],
    recursos: [
      { label: 'Sobre mí', href: '#sobre-mi' },
      { label: 'Agenda tu cita', href: '#agenda' },
      { label: 'Contacto', href: '#contacto' }
    ]
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <Brain size={32} aria-hidden="true" />
              <span>{CONTACT_INFO.psychologistName}</span>
            </div>
            <p className="footer-description">
              Psicóloga clínica especializada en terapia cognitivo-conductual. 
              Más de 10 años ayudando a personas a alcanzar su bienestar emocional.
            </p>
            <div className="footer-social">
              <a 
                href={CONTACT_INFO.socialMedia.instagram.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label={`Síguenos en Instagram: ${CONTACT_INFO.socialMedia.instagram.handle}`}
              >
                <Instagram size={20} />
              </a>
              <a 
                href={CONTACT_INFO.socialMedia.linkedin.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label={`Conéctate en LinkedIn: ${CONTACT_INFO.socialMedia.linkedin.handle}`}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Servicios</h4>
            <ul className="footer-links">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-contact">
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href={`tel:${CONTACT_INFO.phone}`}>
                  {formatPhoneNumber(CONTACT_INFO.phone)}
                </a>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>{CONTACT_INFO.addressShort}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} {CONTACT_INFO.psychologistName}. Todos los derechos reservados.
            </p>
            <p className="footer-legal">
              <a href="#confidencialidad">Política de Confidencialidad</a>
              <span className="separator">•</span>
              <a href="#terminos">Términos y Condiciones</a>
            </p>
          </div>
          <p className="footer-love">
            Hecho con <Heart size={16} className="heart-icon" /> para tu bienestar
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

