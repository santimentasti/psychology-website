import { Award, BookOpen, Heart, Users, Globe, GraduationCap } from 'lucide-react'
import { CONTACT_INFO, PROFESSIONAL_INFO, PATIENT_LOCATIONS } from '../constants/mockData'
import './About.css'

const ICON_SIZE = 32

interface QualificationCard {
  icon: React.ReactNode
  title: string
  items: string[]
}

const About = () => {
  const qualifications: QualificationCard[] = [
    {
      icon: <GraduationCap size={ICON_SIZE} />,
      title: 'Formación',
      items: [
        `Licenciatura en Psicología - ${PROFESSIONAL_INFO.university} (${PROFESSIONAL_INFO.graduationYear})`,
        `Especialización en ${PROFESSIONAL_INFO.specialization}`
      ]
    },
    {
      icon: <BookOpen size={ICON_SIZE} />,
      title: 'Especialidad',
      items: [
        PROFESSIONAL_INFO.specialization,
        'Terapia Individual y de Pareja',
        'Manejo de Ansiedad y Depresión'
      ]
    },
    {
      icon: <Heart size={ICON_SIZE} />,
      title: 'Enfoque',
      items: [
        'Terapia centrada en el paciente',
        'Basada en evidencia científica',
        'Ambiente seguro y confidencial'
      ]
    },
    {
      icon: <Users size={ICON_SIZE} />,
      title: 'Experiencia',
      items: [
        `${PROFESSIONAL_INFO.yearsOfExperience} años de práctica clínica`,
        `Más de ${PROFESSIONAL_INFO.patientsServed} pacientes atendidos`,
        `Más de ${PROFESSIONAL_INFO.sessionsCompleted.toLocaleString('es-AR')} sesiones realizadas`
      ]
    },
    {
      icon: <Globe size={ICON_SIZE} />,
      title: 'Idiomas',
      items: PROFESSIONAL_INFO.languages
    },
    {
      icon: <Award size={ICON_SIZE} />,
      title: 'Alcance',
      items: [
        'Atiendo pacientes en:',
        ...PATIENT_LOCATIONS
      ]
    }
  ]

  return (
    <section id="sobre-mi" className="section about">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        
        <div className="about-intro">
          <div className="about-text">
            <p>
              Soy <strong>{CONTACT_INFO.psychologistName}</strong>, psicólogo clínico licenciado en {PROFESSIONAL_INFO.university} ({PROFESSIONAL_INFO.graduationYear}) 
              con {PROFESSIONAL_INFO.yearsOfExperience} años de experiencia ayudando a personas a superar sus desafíos emocionales y mejorar su 
              calidad de vida. Mi pasión es proporcionar un espacio seguro donde puedas explorar 
              tus pensamientos, sentimientos y comportamientos sin juicio.
            </p>
            <p>
              Mi enfoque terapéutico se basa en la <strong>{PROFESSIONAL_INFO.specialization}</strong>, 
              una de las modalidades más efectivas y respaldadas científicamente. He atendido a más de {PROFESSIONAL_INFO.patientsServed} pacientes 
              y realizado más de {PROFESSIONAL_INFO.sessionsCompleted.toLocaleString('es-AR')} sesiones, trabajando con personas de diferentes partes del mundo, 
              incluyendo Argentina, Latinoamérica, Canadá, Estados Unidos y Europa.
            </p>
            <p>
              Ofrezco terapia tanto en <strong>Español</strong> como en <strong>Inglés</strong>, 
              y trabajo de manera colaborativa contigo para identificar patrones de pensamiento y comportamiento que 
              pueden estar causando malestar, desarrollando juntos estrategias prácticas para el cambio.
            </p>
            <p>
              Creo firmemente que cada persona tiene el potencial para crecer y sanar. Mi objetivo 
              es acompañarte en tu viaje hacia el bienestar emocional, proporcionándote las 
              herramientas necesarias para que puedas enfrentar los desafíos de la vida con 
              confianza y resiliencia.
            </p>
          </div>
        </div>

        <div className="qualifications-grid">
          {qualifications.map((qual) => (
            <article key={qual.title} className="qualification-card card fade-in">
              <div className="qualification-icon" aria-hidden="true">
                {qual.icon}
              </div>
              <h3 className="qualification-title">{qual.title}</h3>
              <ul className="qualification-list">
                {qual.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="about-philosophy">
          <h3 className="philosophy-title">Mi Filosofía de Trabajo</h3>
          <div className="philosophy-content">
            <div className="philosophy-item">
              <div className="philosophy-number">01</div>
              <div className="philosophy-text">
                <h4>Confidencialidad absoluta</h4>
                <p>Todo lo que compartas en sesión permanece estrictamente confidencial.</p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-number">02</div>
              <div className="philosophy-text">
                <h4>Sin juicios</h4>
                <p>Proporciono un espacio libre de críticas donde puedes ser tú mismo/a.</p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-number">03</div>
              <div className="philosophy-text">
                <h4>Orientado a resultados</h4>
                <p>Trabajamos con objetivos claros y medibles para tu progreso.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

