import { ReactNode } from 'react'
import { Brain, Users, Sparkles, ShieldCheck, Smile } from 'lucide-react'
import { SERVICES_DATA, Service } from '../constants/mockData'
import { formatCurrency } from '../utils/helpers'
import { useTranslation } from '../hooks/useTranslation'
import './Services.css'

const ICON_SIZE = 40

// Map service IDs to their corresponding icons
const serviceIcons: Record<string, ReactNode> = {
  'terapia-individual': <Brain size={ICON_SIZE} />,
  'terapia-pareja': <Users size={ICON_SIZE} />,
  'desarrollo-personal': <Sparkles size={ICON_SIZE} />,
  'manejo-ansiedad': <ShieldCheck size={ICON_SIZE} />,
  'tratamiento-depresion': <Smile size={ICON_SIZE} />
}

interface ServiceWithIcon extends Service {
  icon: ReactNode
  formattedPrice: string
}

const Services = () => {
  const { t } = useTranslation()

  const servicesWithTranslations = [
    {
      ...SERVICES_DATA[0],
      title: t.services.individualTherapy,
      description: t.services.individualDescription,
      features: t.services.individualFeatures
    },
    {
      ...SERVICES_DATA[1],
      title: t.services.coupleTherapy,
      description: t.services.coupleDescription,
      features: t.services.coupleFeatures
    }
  ]

  const services: ServiceWithIcon[] = servicesWithTranslations.map(service => ({
    ...service,
    icon: serviceIcons[service.id] || <Brain size={ICON_SIZE} />,
    formattedPrice: formatCurrency(service.price, service.currency)
  }))

  return (
    <section id="servicios" className="section services">
      <div className="container">
        <h2 className="section-title">{t.services.title}</h2>
        <p className="services-subtitle">
          {t.services.subtitle}
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card card">
              <div className="service-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={`${service.id}-${feature}`}>{feature}</li>
                ))}
              </ul>

              <div className="service-footer">
                <span className="service-price">{service.formattedPrice}</span>
                <span className="service-session">{t.services.perSession}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="services-note">
          <h3>{t.services.modality}</h3>
          <div className="modalities">
            <div className="modality">
              <h4>{t.services.online}</h4>
              <p>{t.services.onlineDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services

