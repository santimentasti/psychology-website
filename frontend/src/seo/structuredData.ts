import { CONTACT_INFO, PROFESSIONAL_INFO, SERVICES_DATA } from '../constants/mockData'
import { translations } from '../i18n/translations'
import { getSiteUrl, DEFAULT_OG_IMAGE, type SupportedLanguage } from './seoConfig'

interface WithContext {
  '@context': 'https://schema.org'
}

type JsonLd = Record<string, unknown> & WithContext

const SAME_AS_LINKS = [
  CONTACT_INFO.socialMedia.instagram?.url,
  CONTACT_INFO.socialMedia.linkedin?.url,
].filter(Boolean) as string[]

export const getPsychologistSchema = (language: SupportedLanguage): JsonLd => {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: CONTACT_INFO.psychologistName,
    description: language === 'es'
      ? 'Psicologo online especializado en terapia cognitivo conductual para hispanohablantes en todo el mundo.'
      : 'Online psychologist specialized in cognitive behavioral therapy for Spanish and English speakers worldwide.',
    url: siteUrl,
    image: DEFAULT_OG_IMAGE,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    areaServed: 'Worldwide',
    availableLanguage: ['es', 'en'],
    priceRange: '$$',
    sameAs: SAME_AS_LINKS,
  }
}

export const getServiceSchema = (language: SupportedLanguage): JsonLd => {
  const siteUrl = getSiteUrl()
  const firstServicePrice = SERVICES_DATA[0]?.price ?? 0

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: language === 'es' ? 'Terapia psicologica online' : 'Online psychotherapy',
    provider: {
      '@type': 'Person',
      name: CONTACT_INFO.psychologistName,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteUrl,
      availableLanguage: ['Spanish', 'English'],
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: firstServicePrice,
      availability: 'https://schema.org/InStock',
      url: siteUrl,
    },
    description: language === 'es'
      ? `Terapia cognitivo conductual online con ${PROFESSIONAL_INFO.yearsOfExperience} anos de experiencia clinica.`
      : `Online cognitive behavioral therapy backed by ${PROFESSIONAL_INFO.yearsOfExperience} years of clinical experience.`,
  }
}

export const getFaqSchema = (language: SupportedLanguage): JsonLd => {
  const faqItems = translations[language].contact.faqItems

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
