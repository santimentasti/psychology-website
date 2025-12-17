// ============================================
// MOCK DATA - Replace with real data before production
// ============================================

// Contact Information - UPDATE THESE VALUES
export const CONTACT_INFO = {
  psychologistName: 'Dra. María González',
  phone: '+525512345678',
  email: 'contacto@mariagonzalez.com',
  address: 'Av. Presidente Masaryk 111, Polanco, CDMX',
  addressShort: 'Polanco, CDMX',
  socialMedia: {
    instagram: {
      url: 'https://instagram.com',
      handle: '@dra.mariagonzalez'
    },
    linkedin: {
      url: 'https://linkedin.com',
      handle: 'María González'
    }
  }
}

// Professional Information
export const PROFESSIONAL_INFO = {
  yearsOfExperience: 10,
  patientsServed: 500,
  satisfactionRate: 95,
  specialization: 'Terapia Cognitivo-Conductual (TCC)',
  education: [
    'Licenciatura en Psicología - UNAM',
    'Maestría en Psicología Clínica',
    'Certificación en TCC (Terapia Cognitivo-Conductual)'
  ]
}

// Services Data
export const SERVICES_DATA = [
  {
    id: 'terapia-individual',
    title: 'Terapia Individual',
    description: 'Sesiones personalizadas para trabajar en tus desafíos emocionales, ansiedad, depresión, o cualquier situación que afecte tu bienestar.',
    features: ['Sesiones de 50 minutos', 'Plan personalizado', 'Seguimiento continuo'],
    price: 800,
    currency: 'MXN'
  },
  {
    id: 'terapia-pareja',
    title: 'Terapia de Pareja',
    description: 'Fortalece tu relación trabajando en comunicación, resolución de conflictos y construcción de vínculos más saludables.',
    features: ['Sesiones de 60 minutos', 'Ejercicios prácticos', 'Estrategias de comunicación'],
    price: 1200,
    currency: 'MXN'
  },
  {
    id: 'terapia-familiar',
    title: 'Terapia Familiar',
    description: 'Mejora la dinámica familiar y resuelve conflictos mediante comunicación efectiva y comprensión mutua.',
    features: ['Sesiones de 60 minutos', 'Todos los miembros', 'Técnicas de mediación'],
    price: 1500,
    currency: 'MXN'
  },
  {
    id: 'desarrollo-personal',
    title: 'Desarrollo Personal',
    description: 'Alcanza tu máximo potencial trabajando en autoestima, confianza, establecimiento de metas y crecimiento personal.',
    features: ['Objetivos claros', 'Herramientas prácticas', 'Acompañamiento'],
    price: 800,
    currency: 'MXN'
  },
  {
    id: 'manejo-ansiedad',
    title: 'Manejo de Ansiedad',
    description: 'Aprende técnicas efectivas para controlar la ansiedad, el estrés y los ataques de pánico mediante TCC.',
    features: ['Técnicas de relajación', 'Estrategias de afrontamiento', 'Exposición gradual'],
    price: 800,
    currency: 'MXN'
  },
  {
    id: 'tratamiento-depresion',
    title: 'Tratamiento de Depresión',
    description: 'Trabaja en superar la depresión mediante técnicas cognitivo-conductuales y desarrollo de habilidades de afrontamiento.',
    features: ['Terapia basada en evidencia', 'Activación conductual', 'Reestructuración cognitiva'],
    price: 800,
    currency: 'MXN'
  }
]

// Available Schedule - Days and time slots
export const AVAILABLE_SCHEDULE = {
  'Lunes': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
  'Martes': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
  'Miércoles': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  'Jueves': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
  'Viernes': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  'Sábado': ['10:00', '11:00', '12:00']
}

// First Consultation Price
export const FIRST_CONSULTATION_PRICE = {
  amount: 700,
  currency: 'MXN'
}

// FAQ Data
export const FAQ_DATA = [
  {
    question: '¿Cuánto dura una sesión?',
    answer: 'Las sesiones individuales duran 50 minutos y las de pareja/familia 60 minutos.'
  },
  {
    question: '¿Ofrecen sesiones en línea?',
    answer: 'Sí, ofrezco sesiones tanto presenciales como por videollamada segura.'
  },
  {
    question: '¿Cómo agendar la primera cita?',
    answer: 'Puedes contactarme por WhatsApp, teléfono o email para agendar tu primera consulta.'
  }
]

// Image URL - Replace with actual psychologist image
export const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop'

// Cancellation Policy
export const CANCELLATION_POLICY = 'Si necesitas cancelar o reprogramar tu cita, por favor avísanos con al menos 24 horas de anticipación.'


