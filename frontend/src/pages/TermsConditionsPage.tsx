import Header from '../components/Header'
import TermsConditions from '../components/TermsConditions'
import Footer from '../components/Footer'
import { useTranslation } from '../hooks/useTranslation'
import SeoHead from '../seo/SeoHead'
import { ROUTE_SEO_CONFIG } from '../seo/seoConfig'

const TermsConditionsPage = () => {
  const { language } = useTranslation()
  const seoConfig = ROUTE_SEO_CONFIG[2]

  return (
    <>
      <SeoHead
        title={seoConfig.title[language]}
        description={seoConfig.description[language]}
        path={seoConfig.path}
        language={language}
      />
      <Header />
      <TermsConditions />
      <Footer />
    </>
  )
}

export default TermsConditionsPage

