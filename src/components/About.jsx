import { Award, BookOpen, Heart, Users } from 'lucide-react'
import { CONTACT_INFO, PROFESSIONAL_INFO } from '../constants/mockData'
import './About.css'

const ICON_SIZE = 32

const About = () => {
  const qualifications = [
    {
      icon: <Award size={ICON_SIZE} />,
      title: 'Certificaciones',
      items: PROFESSIONAL_INFO.education
    },
    {
      icon: <BookOpen size={ICON_SIZE} />,
      title: 'Especialidades',
      items: [
        'Ansiedad y depresión',
        'Terapia de pareja',
        'Desarrollo personal',
        'Manejo del estrés'
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
        `${PROFESSIONAL_INFO.yearsOfExperience}+ años de práctica clínica`,
        'Trabajo con adultos y adolescentes',
        'Consulta presencial y en línea'
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
              Soy <strong>{CONTACT_INFO.psychologistName}</strong>, psicóloga clínica con más de una década 
              de experiencia ayudando a personas a superar sus desafíos emocionales y mejorar su 
              calidad de vida. Mi pasión es proporcionar un espacio seguro donde puedas explorar 
              tus pensamientos, sentimientos y comportamientos sin juicio.
            </p>
            <p>
              Mi enfoque terapéutico se basa en la <strong>{PROFESSIONAL_INFO.specialization}</strong>, 
              una de las modalidades más efectivas y respaldadas científicamente. Trabajo de manera 
              colaborativa contigo para identificar patrones de pensamiento y comportamiento que 
              pueden estar causando malestar, y desarrollamos juntos estrategias prácticas para el cambio.
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
          {qualifications.map((qual, index) => (
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

