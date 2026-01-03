import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Brain } from 'lucide-react'
import { CONTACT_INFO } from '../constants/mockData'
import { debounce } from '../utils/helpers'
import './Header.css'

const SCROLL_THRESHOLD = 50

interface NavLink {
  href: string
  label: string
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

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
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#contacto', label: 'Contacto' }
  ]

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

        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header

