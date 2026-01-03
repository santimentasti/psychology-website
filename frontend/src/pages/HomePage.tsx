import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Calendar from '../components/Calendar'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Calendar />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default HomePage

