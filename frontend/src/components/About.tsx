import { Award, BookOpen, Heart, Users, Globe, GraduationCap } from 'lucide-react'
import { CONTACT_INFO, PROFESSIONAL_INFO, PATIENT_LOCATIONS } from '../constants/mockData'
import { useTranslation } from '../hooks/useTranslation'
import './About.css'

const ICON_SIZE = 32

interface QualificationCard {
  icon: React.ReactNode
  title: string
  items: string[]
}

const About = () => {
  const { t, language } = useTranslation()

  const qualifications: QualificationCard[] = [
    {
      icon: <GraduationCap size={ICON_SIZE} />,
      title: t.about.qualifications.training,
      items: [
        `${language === 'es' ? 'Licenciatura en Psicología' : 'Bachelor in Psychology'} - ${PROFESSIONAL_INFO.university} (${PROFESSIONAL_INFO.graduationYear})`,
        `${language === 'es' ? 'Especialización en' : 'Specialization in'} ${PROFESSIONAL_INFO.specialization}`
      ]
    },
    {
      icon: <BookOpen size={ICON_SIZE} />,
      title: t.about.qualifications.specialty,
      items: [
        PROFESSIONAL_INFO.specialization,
        ...t.about.specialtyItems
      ]
    },
    {
      icon: <Heart size={ICON_SIZE} />,
      title: t.about.qualifications.focus,
      items: t.about.focusItems
    },
    {
      icon: <Users size={ICON_SIZE} />,
      title: t.about.experience,
      items: [
        `${PROFESSIONAL_INFO.yearsOfExperience} ${language === 'es' ? 'años de práctica clínica' : 'years of clinical practice'}`,
        `${language === 'es' ? 'Más de' : 'More than'} ${PROFESSIONAL_INFO.patientsServed} ${language === 'es' ? 'pacientes atendidos' : 'patients served'}`,
        `${language === 'es' ? 'Más de' : 'More than'} ${PROFESSIONAL_INFO.sessionsCompleted.toLocaleString()} ${language === 'es' ? 'sesiones realizadas' : 'sessions completed'}`
      ]
    },
    {
      icon: <Globe size={ICON_SIZE} />,
      title: t.about.languages,
      items: PROFESSIONAL_INFO.languages
    },
    {
      icon: <Award size={ICON_SIZE} />,
      title: t.about.qualifications.reach,
      items: [
        t.about.qualifications.reachIntro,
        ...PATIENT_LOCATIONS
      ]
    }
  ]

  return (
    <section id="sobre-mi" className="section about">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>
        
        <div className="about-intro">
          <div className="about-text">
            <p>{t.about.description}</p>
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
          <h3 className="philosophy-title">{t.about.philosophy.title}</h3>
          <div className="philosophy-content">
            <div className="philosophy-item">
              <div className="philosophy-number">01</div>
              <div className="philosophy-text">
                <h4>{t.about.philosophy.confidentiality}</h4>
                <p>{t.about.philosophy.confidentialityDesc}</p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-number">02</div>
              <div className="philosophy-text">
                <h4>{t.about.philosophy.noJudgment}</h4>
                <p>{t.about.philosophy.noJudgmentDesc}</p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-number">03</div>
              <div className="philosophy-text">
                <h4>{t.about.philosophy.resultsOriented}</h4>
                <p>{t.about.philosophy.resultsOrientedDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

