import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS_DATA } from '../constants/mockData'
import { useTranslation } from '../hooks/useTranslation'
import './Testimonials.css'

const FULL_STARS = 5

const StarRating = ({ count }: { count: number }) => (
  <div className="star-rating" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: FULL_STARS }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'star-filled' : 'star-empty'}
        aria-hidden="true"
      />
    ))}
  </div>
)

const Testimonials = () => {
  const { t } = useTranslation()

  // Merge static author data with translated quote/service
  const testimonials = TESTIMONIALS_DATA.map((meta) => {
    const translated = t.testimonials.items.find((item) => item.id === meta.id)
    return { ...meta, quote: translated?.quote ?? '', service: translated?.service ?? '' }
  })

  return (
    <section id="testimonios" className="section testimonials">
      <div className="container">
        <h2 className="section-title">{t.testimonials.title}</h2>

        <div className="testimonials-meta">
          <StarRating count={FULL_STARS} />
          <span className="testimonials-rating-label">{t.testimonials.ratingLabel}</span>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card card fade-in">
              <div className="testimonial-header">
                <StarRating count={item.rating} />
                <span className="testimonial-service">{item.service}</span>
              </div>

              <div className="testimonial-quote-wrapper">
                <Quote size={28} className="quote-icon" aria-hidden="true" />
                <p className="testimonial-quote">{item.quote}</p>
              </div>

              <footer className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">
                  {item.initials.charAt(0)}
                </div>
                <div className="author-info">
                  <span className="author-initials">{item.initials}</span>
                  <span className="author-location">{item.location}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <p className="testimonials-disclaimer">{t.testimonials.disclaimer}</p>
      </div>
    </section>
  )
}

export default Testimonials
