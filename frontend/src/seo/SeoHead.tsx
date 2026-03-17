import { Helmet } from 'react-helmet-async'
import { getSiteUrl, SITE_NAME, DEFAULT_OG_IMAGE, type SupportedLanguage } from './seoConfig'

interface SeoHeadProps {
  title: string
  description: string
  path: string
  language: SupportedLanguage
  schemas?: Array<Record<string, unknown>>
}

const getCanonicalPath = (path: string): string => {
  if (!path.startsWith('/')) {
    return `/${path}`
  }

  return path
}

const SeoHead = ({ title, description, path, language, schemas = [] }: SeoHeadProps) => {
  const siteUrl = getSiteUrl()
  const canonicalPath = getCanonicalPath(path)
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  const esAltUrl = `${canonicalUrl}?lang=es`
  const enAltUrl = `${canonicalUrl}?lang=en`

  return (
    <Helmet prioritizeSeoTags>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es" href={esAltUrl} />
      <link rel="alternate" hrefLang="en" href={enAltUrl} />
      <link rel="alternate" hrefLang="x-default" href={esAltUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default SeoHead
