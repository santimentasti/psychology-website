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
  phone: '+5491157445931', // WhatsApp: +54 9 11 5744-5931
  email: 'munno.matias5@gmail.com',
  socialMedia: {}
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
    price: 50,
    currency: 'USD'
  },
  {
    id: 'terapia-de-pareja',
    title: 'Terapia de Pareja',
    description: 'Espacio para fortalecer la relación, mejorar la comunicación y resolver conflictos de pareja en un entorno seguro y profesional.',
    features: ['Sesiones de 60 minutos', 'Ambos integrantes', 'Técnicas terapéuticas cognitivo conductuales'],
    price: 60,
    currency: 'USD'
  }
]

// Calendly booking URL
// Set VITE_CALENDLY_URL in your .env file (e.g. https://calendly.com/your-handle)
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || ''

// First Consultation Price
export const FIRST_CONSULTATION_PRICE = {
  amount: 50,
  currency: 'USD'
}

// FAQ Data
export const FAQ_DATA: FAQ[] = [
  {
    question: '¿Cuánto dura una sesión?',
    answer: 'Las sesiones individuales duran 50 minutos y las de pareja/familia 60 minutos.'
  },
  {
    question: '¿Ofrecen sesiones en línea?',
    answer: 'Sí, ofrezco sesiones exclusivamente por videollamada segura. Atiendo pacientes en Argentina, Latinoamérica, Canadá, Estados Unidos y Europa.'
  },
  {
    question: '¿Cómo agendar la primera cita?',
    answer: 'Puedes contactarme por WhatsApp, teléfono o email para agendar tu primera consulta.'
  }
]

// Image URL - Professional portrait image (Cloudinary)
// Public ID: matias-munno-portrait
// Original dimensions: 960 × 1280
export const HERO_IMAGE_URL = import.meta.env.VITE_HERO_IMAGE_URL || 'https://res.cloudinary.com/drv3s51ks/image/upload/w_500,h_600,c_fill,q_auto,f_auto/matias-munno-portrait'

// Patient Locations
export const PATIENT_LOCATIONS = [
  'Argentina',
  'Latinoamérica',
  'Canadá',
  'Estados Unidos',
  'Europa'
]

