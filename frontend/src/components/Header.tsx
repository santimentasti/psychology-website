import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Brain, Globe } from 'lucide-react'
import { CONTACT_INFO } from '../constants/mockData'
import { debounce } from '../utils/helpers'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'
import './Header.css'

const SCROLL_THRESHOLD = 50

interface NavLink {
  href: string
  label: string
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const navLinks: NavLink[] = [
    { href: '#inicio', label: t.header.home },
    { href: '#sobre-mi', label: t.header.about },
    { href: '#servicios', label: t.header.services },
    { href: '#agenda', label: t.header.schedule },
    { href: '#contacto', label: t.header.contact }
  ]

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }, [language, setLanguage])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <Brain className="logo-icon" size={32} aria-hidden="true" />
          <span className="logo-text">{CONTACT_INFO.psychologistName}</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe size={20} />
            <span className="language-text">{language.toUpperCase()}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

