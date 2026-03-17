export type SupportedLanguage = 'es' | 'en'

export interface RouteSeoConfig {
  path: string
  title: Record<SupportedLanguage, string>
  description: Record<SupportedLanguage, string>
}

export const DEFAULT_SITE_URL = 'https://matiasmunno.com'
export const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/drv3s51ks/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/matias-munno-portrait'
export const SITE_NAME = 'Lic. Matias Munno - Psicologia Online'

export const ROUTE_SEO_CONFIG: RouteSeoConfig[] = [
  {
    path: '/',
    title: {
      es: 'Psicologo online en espanol | Terapia cognitivo conductual',
      en: 'Spanish Speaking Psychologist Online | CBT Therapy',
    },
    description: {
      es: 'Psicologo online en espanol para adultos y parejas. Terapia cognitivo conductual online para ansiedad, estres migratorio y bienestar emocional en todo el mundo.',
      en: 'Online therapy in Spanish and English with a CBT approach. Work on anxiety, expat adjustment, and emotional wellbeing from anywhere.',
    },
  },
  {
    path: '/privacy-policy',
    title: {
      es: 'Politica de Privacidad | Consulta psicologica online',
      en: 'Privacy Policy | Online Psychology Practice',
    },
    description: {
      es: 'Conoce como se protege tu informacion personal y clinica en esta consulta de psicologia online.',
      en: 'Learn how personal and clinical data is protected in this online psychology practice.',
    },
  },
  {
    path: '/terms-conditions',
    title: {
      es: 'Terminos y Condiciones | Terapia online en espanol',
      en: 'Terms and Conditions | Spanish Online Therapy',
    },
    description: {
      es: 'Revisa terminos de atencion, pagos, cancelaciones y telepsicologia para terapia online.',
      en: 'Review service terms, payments, cancellations, and teletherapy conditions.',
    },
  },
]

export const getSiteUrl = (): string => {
  const envSiteUrl = import.meta.env.VITE_SITE_URL

  if (!envSiteUrl) {
    return DEFAULT_SITE_URL
  }

  return envSiteUrl.endsWith('/') ? envSiteUrl.slice(0, -1) : envSiteUrl
}
