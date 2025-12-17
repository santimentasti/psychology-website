import { Calendar, MessageCircle, ArrowDown } from 'lucide-react'
import { CONTACT_INFO, PROFESSIONAL_INFO, HERO_IMAGE_URL } from '../constants/mockData'
import { openWhatsApp, smoothScrollTo } from '../utils/helpers'
import './Hero.css'

const Hero = () => {
  const handleWhatsAppClick = () => {
    const message = 'Hola, me gustaría solicitar información sobre los servicios de psicología.'
    openWhatsApp(CONTACT_INFO.phone, message)
  }

  const handleScheduleClick = () => {
    smoothScrollTo('agenda')
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            Tu bienestar emocional es mi prioridad
          </h1>
          <p className="hero-subtitle">
            Psicóloga clínica especializada en terapia cognitivo-conductual, 
            con más de 10 años de experiencia ayudando a personas a superar 
            sus desafíos emocionales y alcanzar una vida plena.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={handleScheduleClick}
            >
              <Calendar size={20} />
              Agendar Cita
            </button>
            <button 
              className="btn btn-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle size={20} />
              WhatsApp
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.yearsOfExperience}+</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.patientsServed}+</span>
              <span className="stat-label">Pacientes atendidos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{PROFESSIONAL_INFO.satisfactionRate}%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container slide-in-right">
          <div className="hero-image">
            <img 
              src={HERO_IMAGE_URL} 
              alt={`${CONTACT_INFO.psychologistName} - Psicóloga profesional`}
              loading="lazy"
            />
          </div>
          <div className="hero-badge" role="img" aria-label="Certificación profesional">
            <span className="badge-icon" aria-hidden="true">✓</span>
            <span className="badge-text">Certificada</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <ArrowDown className="scroll-icon" size={24} />
      </div>
    </section>
  )
}

export default Hero

