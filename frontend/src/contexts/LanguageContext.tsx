import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'es' | 'en'
const DEFAULT_LANGUAGE: Language = 'es'
const LANG_QUERY_PARAM = 'lang'

const getLanguageFromUrl = (): Language | null => {
  const params = new URLSearchParams(window.location.search)
  const value = params.get(LANG_QUERY_PARAM)

  if (value === 'es' || value === 'en') {
    return value
  }

  return null
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const urlLanguage = getLanguageFromUrl()
    if (urlLanguage) {
      return urlLanguage
    }

    const saved = localStorage.getItem('language')
    return (saved === 'es' || saved === 'en') ? saved : DEFAULT_LANGUAGE
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.set(LANG_QUERY_PARAM, language)
    window.history.replaceState(null, '', nextUrl.toString())
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
