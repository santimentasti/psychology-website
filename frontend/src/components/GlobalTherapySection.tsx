import { useTranslation } from '../hooks/useTranslation'
import './GlobalTherapySection.css'

const GlobalTherapySection = () => {
  const { language } = useTranslation()
  const isSpanish = language === 'es'

  return (
    <section className="section global-therapy-section" aria-labelledby="global-therapy-title">
      <div className="container">
        <h2 id="global-therapy-title" className="section-title">
          Online Therapy for Spanish and English Speakers Worldwide
        </h2>
        <p className="global-therapy-description">
          {isSpanish
            ? 'Ofrezco terapia online en espanol e ingles para personas que viven en el exterior, incluyendo expats y migrantes que enfrentan estres por adaptacion, duelo migratorio o cambios de identidad cultural.'
            : 'I provide online therapy in Spanish and English for people living abroad, including expats and migrants facing adjustment stress, immigration-related anxiety, and identity transitions.'}
        </p>
        <p className="global-therapy-description">
          {isSpanish
            ? 'Mi enfoque en terapia cognitivo conductual online ayuda a trabajar ansiedad, autoexigencia, relaciones y regulacion emocional con objetivos claros y herramientas practicas adaptadas a tu contexto internacional.'
            : 'My online cognitive behavioral therapy approach supports anxiety management, emotional regulation, relationship challenges, and high-performance stress with practical, goal-oriented strategies.'}
        </p>
        <p className="global-therapy-description">
          {isSpanish
            ? 'Si buscas un psicologo online en espanol con una mirada clinica, etica y basada en evidencia, este espacio terapeutico esta pensado para acompanarte con continuidad y cuidado profesional.'
            : 'If you are looking for a Spanish speaking psychologist online with an ethical, evidence-based clinical approach, this therapeutic space is designed to support you with continuity and professional care.'}
        </p>
      </div>
    </section>
  )
}

export default GlobalTherapySection
