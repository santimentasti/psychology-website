import Header from '../components/Header'
import PrivacyPolicy from '../components/PrivacyPolicy'
import Footer from '../components/Footer'
import { useTranslation } from '../hooks/useTranslation'
import SeoHead from '../seo/SeoHead'
import { ROUTE_SEO_CONFIG } from '../seo/seoConfig'

const PrivacyPolicyPage = () => {
  const { language } = useTranslation()
  const seoConfig = ROUTE_SEO_CONFIG[1]

  return (
    <>
      <SeoHead
        title={seoConfig.title[language]}
        description={seoConfig.description[language]}
        path={seoConfig.path}
        language={language}
      />
      <Header />
      <PrivacyPolicy />
      <Footer />
    </>
  )
}

export default PrivacyPolicyPage

