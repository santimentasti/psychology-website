// ============================================
// PROFESSIONAL DATA - Matías Munno
// ============================================

export interface ContactInfo {
  psychologistName: string
  phone: string
  email: string
  address?: string
  addressShort?: string
  socialMedia: {
    instagram?: {
      url: string
      handle: string
    }
    linkedin?: {
      url: string
      handle: string
    }
  }
}

export interface ProfessionalInfo {
  graduationYear: number
  university: string
  yearsOfExperience: number
  patientsServed: number
  sessionsCompleted: number
  satisfactionRate?: number
  specialization: string
  languages: string[]
  education: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: number
  currency: string
}

export interface FAQ {
  question: string
  answer: string
}

// Contact Information
export const CONTACT_INFO: ContactInfo = {
  psychologistName: 'Lic. Matías Munno',
  phone: '+5491123456789', // TODO: Replace with real WhatsApp number
  email: 'matias.munno@psychology-practice.com', // TODO: Replace with real email
  address: 'Av. Corrientes 1234, Piso 5, Oficina 12, C1043 CABA, Buenos Aires, Argentina',
  addressShort: 'Buenos Aires, Argentina',
  socialMedia: {
    instagram: {
      url: 'https://instagram.com/matiasmunno_psi', // TODO: Replace with real Instagram
      handle: '@matiasmunno_psi'
    },
    linkedin: {
      url: 'https://linkedin.com/in/matias-munno', // TODO: Replace with real LinkedIn
      handle: 'Matías Munno'
    }
  }
}

// Professional Information
export const PROFESSIONAL_INFO: ProfessionalInfo = {
  graduationYear: 2019,
  university: 'Universidad de Buenos Aires',
  yearsOfExperience: 7,
  patientsServed: 500,
  sessionsCompleted: 4000,
  specialization: 'Terapia Cognitivo Conductual',
  languages: ['Español', 'Inglés'],
  education: [
    'Licenciatura en Psicología - Universidad de Buenos Aires (2019)',
    'Especialización en Terapia Cognitivo Conductual'
  ]
}

// Services Data
export const SERVICES_DATA: Service[] = [
  {
    id: 'terapia-individual',
    title: 'Terapia Individual',
    description: 'Sesiones personalizadas para trabajar en tus desafíos emocionales, ansiedad, depresión, o cualquier situación que afecte tu bienestar.',
    features: ['Sesiones de 50 minutos', 'Plan personalizado', 'Seguimiento continuo'],
    price: 800,
    currency: 'ARS'
  },
  {
    id: 'terapia-pareja',
    title: 'Terapia de Pareja',
    description: 'Fortalece tu relación trabajando en comunicación, resolución de conflictos y construcción de vínculos más saludables.',
    features: ['Sesiones de 60 minutos', 'Ejercicios prácticos', 'Estrategias de comunicación'],
    price: 1200,
    currency: 'ARS'
  },
  {
    id: 'terapia-familiar',
    title: 'Terapia Familiar',
    description: 'Mejora la dinámica familiar y resuelve conflictos mediante comunicación efectiva y comprensión mutua.',
    features: ['Sesiones de 60 minutos', 'Todos los miembros', 'Técnicas de mediación'],
    price: 1500,
    currency: 'ARS'
  },
  {
    id: 'desarrollo-personal',
    title: 'Desarrollo Personal',
    description: 'Alcanza tu máximo potencial trabajando en autoestima, confianza, establecimiento de metas y crecimiento personal.',
    features: ['Objetivos claros', 'Herramientas prácticas', 'Acompañamiento'],
    price: 800,
    currency: 'ARS'
  },
  {
    id: 'manejo-ansiedad',
    title: 'Manejo de Ansiedad',
    description: 'Aprende técnicas efectivas para controlar la ansiedad, el estrés y los ataques de pánico mediante TCC.',
    features: ['Técnicas de relajación', 'Estrategias de afrontamiento', 'Exposición gradual'],
    price: 800,
    currency: 'ARS'
  },
  {
    id: 'tratamiento-depresion',
    title: 'Tratamiento de Depresión',
    description: 'Trabaja en superar la depresión mediante técnicas cognitivo-conductuales y desarrollo de habilidades de afrontamiento.',
    features: ['Terapia basada en evidencia', 'Activación conductual', 'Reestructuración cognitiva'],
    price: 800,
    currency: 'ARS'
  }
]

// Available Schedule - Days and time slots
export const AVAILABLE_SCHEDULE: Record<string, string[]> = {
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
  currency: 'ARS'
}

// FAQ Data
export const FAQ_DATA: FAQ[] = [
  {
    question: '¿Cuánto dura una sesión?',
    answer: 'Las sesiones individuales duran 50 minutos y las de pareja/familia 60 minutos.'
  },
  {
    question: '¿Ofrecen sesiones en línea?',
    answer: 'Sí, ofrezco sesiones tanto presenciales como por videollamada segura. Atiendo pacientes en Argentina, Latinoamérica, Canadá, Estados Unidos y Europa.'
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

// Patient Locations
export const PATIENT_LOCATIONS = [
  'Argentina',
  'Latinoamérica',
  'Canadá',
  'Estados Unidos',
  'Europa'
]

