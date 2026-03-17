import { Calendar, MessageCircle, ArrowDown, ShieldCheck } from 'lucide-react'
import { CONTACT_INFO, PROFESSIONAL_INFO, HERO_IMAGE_URL } from '../constants/mockData'
import { openWhatsApp, smoothScrollTo } from '../utils/helpers'
import { useTranslation } from '../hooks/useTranslation'
import './Hero.css'

const Hero = () => {
  const { t } = useTranslation()

  const handleWhatsAppClick = (): void => {
    const message = 'Hola, me gustaría solicitar información sobre los servicios de psicología.'
    if (CONTACT_INFO.phone) {
      openWhatsApp(CONTACT_INFO.phone, message)
    }
  }

  const handleScheduleClick = (): void => {
    smoothScrollTo('agenda')
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleScheduleClick}
              aria-label={t.hero.cta}
            >
              <Calendar size={20} />
              {t.hero.cta}
            </button>
            {CONTACT_INFO.phone && (
              <button
                type="button"
                className="btn btn-whatsapp"
                onClick={handleWhatsAppClick}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle size={20} />
                WhatsApp
              </button>
            )}
          </div>
          <p className="hero-trust">
            <ShieldCheck size={15} aria-hidden="true" />
            {t.hero.trustLine}
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.yearsOfExperience}</span>
              <span className="stat-label">{t.about.experience}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.patientsServed}+</span>
              <span className="stat-label">{t.about.patients}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.sessionsCompleted.toLocaleString()}+</span>
              <span className="stat-label">{t.about.sessions}</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container slide-in-right">
          <div className="hero-image">
            <img
              src={HERO_IMAGE_URL}
              alt={`${CONTACT_INFO.psychologistName} - Psicólogo profesional`}
              loading="eager"
              fetchPriority="high"
              width={500}
              height={600}
            />
          </div>
          <div className="hero-badge" role="img" aria-label="Certificación profesional">
            <span className="badge-icon" aria-hidden="true">✓</span>
            <span className="badge-text">Lic. en Psicología · UBA</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <ArrowDown className="scroll-icon" size={24} />
      </div>
    </section>
  )
}

export default Hero

