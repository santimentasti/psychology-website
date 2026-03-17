import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Booking from '../components/Booking'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GlobalTherapySection from '../components/GlobalTherapySection'
import { useTranslation } from '../hooks/useTranslation'
import SeoHead from '../seo/SeoHead'
import { ROUTE_SEO_CONFIG } from '../seo/seoConfig'
import { getFaqSchema, getPsychologistSchema, getServiceSchema } from '../seo/structuredData'

const HomePage = () => {
  const { language } = useTranslation()
  const seoConfig = ROUTE_SEO_CONFIG[0]

  return (
    <>
      <SeoHead
        title={seoConfig.title[language]}
        description={seoConfig.description[language]}
        path={seoConfig.path}
        language={language}
        schemas={[
          getPsychologistSchema(language),
          getServiceSchema(language),
          getFaqSchema(language),
        ]}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <GlobalTherapySection />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default HomePage

