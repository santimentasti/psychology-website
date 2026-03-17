import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'))

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Suspense fallback={<main className="container section" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App

