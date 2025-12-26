import { ReactNode } from 'react'
import { Brain, Users, HeartHandshake, Sparkles, ShieldCheck, Smile } from 'lucide-react'
import { SERVICES_DATA, FIRST_CONSULTATION_PRICE, Service } from '../constants/mockData'
import { formatCurrency } from '../utils/helpers'
import './Services.css'

const ICON_SIZE = 40

// Map service IDs to their corresponding icons
const serviceIcons: Record<string, ReactNode> = {
  'terapia-individual': <Brain size={ICON_SIZE} />,
  'terapia-pareja': <Users size={ICON_SIZE} />,
  'terapia-familiar': <HeartHandshake size={ICON_SIZE} />,
  'desarrollo-personal': <Sparkles size={ICON_SIZE} />,
  'manejo-ansiedad': <ShieldCheck size={ICON_SIZE} />,
  'tratamiento-depresion': <Smile size={ICON_SIZE} />
}

interface ServiceWithIcon extends Service {
  icon: ReactNode
  formattedPrice: string
}

const Services = () => {
  const services: ServiceWithIcon[] = SERVICES_DATA.map(service => ({
    ...service,
    icon: serviceIcons[service.id] || <Brain size={ICON_SIZE} />,
    formattedPrice: formatCurrency(service.price, service.currency)
  }))

  return (
    <section id="servicios" className="section services">
      <div className="container">
        <h2 className="section-title">Servicios</h2>
        <p className="services-subtitle">
          Ofrezco una variedad de servicios terapéuticos adaptados a tus necesidades específicas
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
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>

              <div className="service-footer">
                <span className="service-price">{service.formattedPrice}</span>
                <span className="service-session">por sesión</span>
              </div>
            </article>
          ))}
        </div>

        <div className="services-note">
          <h3>Modalidades de Atención</h3>
          <div className="modalities">
            <div className="modality">
              <h4>📍 Presencial</h4>
              <p>Consulta en tu ubicación o videollamada</p>
            </div>
            <div className="modality">
              <h4>💻 En Línea</h4>
              <p>Sesiones por videollamada segura - Atiendo en múltiples países</p>
            </div>
          </div>
          <p className="note-text">
            <strong>Primera sesión:</strong> La primera consulta tiene un costo de{' '}
            {formatCurrency(FIRST_CONSULTATION_PRICE.amount, FIRST_CONSULTATION_PRICE.currency)}{' '}
            donde evaluaremos tu situación y estableceremos un plan de tratamiento personalizado.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services

