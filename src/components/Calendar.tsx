import { useState, useCallback } from 'react'
import { Calendar as CalendarIcon, Clock, MessageCircle, CheckCircle } from 'lucide-react'
import { CONTACT_INFO, AVAILABLE_SCHEDULE, CANCELLATION_POLICY } from '../constants/mockData'
import { openWhatsApp } from '../utils/helpers'
import './Calendar.css'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')

  const handleBooking = useCallback(() => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor selecciona un día y un horario')
      return
    }

    if (CONTACT_INFO.phone) {
      const message = `Hola, me gustaría agendar una cita para el día ${selectedDate} a las ${selectedTime}.`
      openWhatsApp(CONTACT_INFO.phone, message)
    }
  }, [selectedDate, selectedTime])

  const handleDayChange = useCallback((day: string) => {
    setSelectedDate(day)
    setSelectedTime('') // Reset time when day changes
  }, [])

  const availableTimes = selectedDate ? (AVAILABLE_SCHEDULE[selectedDate] || []) : []

  return (
    <section id="agenda" className="section calendar-section">
      <div className="container">
        <h2 className="section-title">Agenda tu Cita</h2>
        <p className="calendar-subtitle">
          Selecciona el día y horario que mejor se ajuste a tus necesidades
        </p>

        <div className="calendar-container">
          <div className="calendar-info card">
            <div className="info-header">
              <CalendarIcon size={40} className="info-icon" />
              <h3>Información de Citas</h3>
            </div>
            
            <div className="info-content">
              <div className="info-item">
                <Clock size={24} />
                <div>
                  <h4>Duración</h4>
                  <p>Sesiones de 50-60 minutos</p>
                </div>
              </div>

              <div className="info-item">
                <CheckCircle size={24} />
                <div>
                  <h4>Modalidad</h4>
                  <p>Presencial u Online</p>
                </div>
              </div>

              <div className="info-item">
                <MessageCircle size={24} />
                <div>
                  <h4>Confirmación</h4>
                  <p>Respuesta en menos de 24 horas</p>
                </div>
              </div>
            </div>

            <div className="info-note">
              <p>
                <strong>Política de Cancelación:</strong> {CANCELLATION_POLICY}
              </p>
            </div>
          </div>

          <div className="booking-form card">
            <h3 className="form-title">Selecciona tu horario</h3>
            
            <div className="form-group">
              <label htmlFor="day-select">
                <CalendarIcon size={20} />
                Día de la semana
              </label>
              <select 
                id="day-select"
                value={selectedDate}
                onChange={(e) => handleDayChange(e.target.value)}
                className="form-select"
                aria-label="Selecciona el día de la semana"
              >
                <option value="">Selecciona un día</option>
                {Object.keys(AVAILABLE_SCHEDULE).map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {selectedDate && availableTimes.length > 0 && (
              <div className="form-group">
                <label htmlFor="time-select">
                  <Clock size={20} />
                  Horario disponible
                </label>
                <div className="time-slots" role="radiogroup" aria-label="Selecciona un horario">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      role="radio"
                      aria-checked={selectedTime === time}
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="btn btn-whatsapp booking-btn"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !CONTACT_INFO.phone}
            >
              <MessageCircle size={20} />
              Confirmar por WhatsApp
            </button>

            {selectedDate && selectedTime && (
              <div className="booking-summary">
                <CheckCircle size={20} />
                <p>
                  Has seleccionado: <strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="calendar-note">
          <p>
            Al hacer clic en "Confirmar por WhatsApp", serás redirigido a WhatsApp 
            para completar tu reserva. Te responderé lo antes posible para confirmar 
            tu cita.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Calendar

