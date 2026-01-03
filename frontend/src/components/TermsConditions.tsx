import './LegalPages.css'

const TermsConditions = () => {
  return (
    <section className="legal-page section">
      <div className="container">
        <h1 className="page-title">Términos y Condiciones</h1>
        <div className="legal-content">
          <p className="last-updated">Última actualización: {new Date().toLocaleDateString('es-AR')}</p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al solicitar servicios de psicología, usted acepta estos términos y condiciones. 
            Si no está de acuerdo, por favor no utilice estos servicios.
          </p>

          <h2>2. Servicios Ofrecidos</h2>
          <p>Ofrezco servicios profesionales de psicología que incluyen:</p>
          <ul>
            <li>Evaluación psicológica</li>
            <li>Psicoterapia individual</li>
            <li>Terapia de pareja</li>
            <li>Terapia familiar</li>
            <li>Orientación y counseling</li>
          </ul>
          <p>
            <strong>Importante:</strong> Los servicios psicológicos no constituyen tratamiento de 
            emergencia. En caso de crisis, contacte servicios de emergencia locales o acuda al 
            hospital más cercano.
          </p>

          <h2>3. Relación Terapéutica</h2>
          <h3>3.1 Naturaleza de la Relación</h3>
          <p>
            La relación entre terapeuta y paciente es estrictamente profesional. Cualquier relación 
            dual o conflicto de interés debe ser comunicado inmediatamente.
          </p>

          <h3>3.2 Duración del Tratamiento</h3>
          <p>
            La duración del tratamiento varía según las necesidades individuales. El progreso será 
            evaluado regularmente y usted tiene derecho a discontinuar el tratamiento en cualquier momento.
          </p>

          <h2>4. Citas y Cancelaciones</h2>
          <h3>4.1 Agendamiento</h3>
          <ul>
            <li>Las citas deben agendarse con anticipación</li>
            <li>La puntualidad es importante; las sesiones comienzan a la hora programada</li>
            <li>Las sesiones duran aproximadamente 50-60 minutos</li>
          </ul>

          <h3>4.2 Política de Cancelación</h3>
          <ul>
            <li>Las cancelaciones deben realizarse con al menos 24 horas de anticipación</li>
            <li>Cancelaciones con menos de 24 horas de anticipación pueden estar sujetas a cargo</li>
            <li>No-shows (ausencias sin aviso) serán cobrados</li>
            <li>Emergencias genuinas serán consideradas caso por caso</li>
          </ul>

          <h3>4.3 Reprogramación</h3>
          <p>
            Las citas pueden ser reprogramadas sin cargo si se notifica con al menos 24 horas de anticipación.
          </p>

          <h2>5. Honorarios y Pagos</h2>
          <h3>5.1 Tarifas</h3>
          <ul>
            <li>Las tarifas por sesión se especifican en la sección de Servicios</li>
            <li>La primera consulta tiene una tarifa especial</li>
            <li>Las tarifas pueden ajustarse anualmente con notificación previa</li>
          </ul>

          <h3>5.2 Métodos de Pago</h3>
          <ul>
            <li>Transferencia bancaria</li>
            <li>Tarjetas de crédito/débito (a través de procesadores seguros)</li>
            <li>PayPal u otros medios digitales</li>
          </ul>

          <h3>5.3 Política de Pago</h3>
          <ul>
            <li>El pago se realiza al momento de la sesión o según acuerdo previo</li>
            <li>Para paquetes prepagos, el pago debe realizarse antes de la primera sesión del paquete</li>
            <li>No se brindarán servicios con pagos pendientes</li>
          </ul>

          <h2>6. Sesiones en Línea (Telepsicología)</h2>
          <h3>6.1 Requisitos Técnicos</h3>
          <p>Para sesiones en línea, usted necesita:</p>
          <ul>
            <li>Conexión estable a internet</li>
            <li>Dispositivo con cámara y micrófono</li>
            <li>Espacio privado y silencioso</li>
          </ul>

          <h3>6.2 Limitaciones</h3>
          <ul>
            <li>Problemas técnicos pueden interrumpir sesiones</li>
            <li>La calidad de la conexión puede afectar la comunicación</li>
            <li>No es apropiado para todas las situaciones clínicas</li>
          </ul>

          <h3>6.3 Emergencias en Sesiones en Línea</h3>
          <p>
            Es importante proporcionar su ubicación física para sesiones en línea en caso de emergencia.
          </p>

          <h2>7. Confidencialidad</h2>
          <p>
            La confidencialidad es fundamental. Para información detallada, consulte nuestra 
            Política de Privacidad. Los límites de confidencialidad incluyen:
          </p>
          <ul>
            <li>Riesgo inminente de daño</li>
            <li>Sospecha de abuso infantil</li>
            <li>Orden judicial</li>
          </ul>

          <h2>8. Registros Clínicos</h2>
          <ul>
            <li>Se mantienen registros clínicos según requisitos legales y éticos</li>
            <li>Usted tiene derecho a acceder a sus registros</li>
            <li>Los registros se mantienen por el período requerido por ley</li>
            <li>Después del período legal, los registros son destruidos de forma segura</li>
          </ul>

          <h2>9. Comunicación Entre Sesiones</h2>
          <ul>
            <li>Email y mensajes de texto pueden usarse para coordinación administrativa</li>
            <li>No se debe compartir información clínica sensible por email no cifrado</li>
            <li>WhatsApp puede usarse para comunicaciones breves</li>
            <li>Emergencias requieren contactar servicios de emergencia, no al terapeuta</li>
          </ul>

          <h2>10. Terminación del Tratamiento</h2>
          <h3>10.1 Por el Paciente</h3>
          <p>
            Usted puede terminar el tratamiento en cualquier momento. Se recomienda una sesión de 
            cierre para revisar el progreso y planificar el futuro.
          </p>

          <h3>10.2 Por el Terapeuta</h3>
          <p>
            El terapeuta puede terminar el tratamiento si:
          </p>
          <ul>
            <li>Los objetivos terapéuticos se han alcanzado</li>
            <li>El tratamiento no está siendo beneficioso</li>
            <li>Existe conflicto de interés</li>
            <li>El paciente no cumple con los términos acordados</li>
          </ul>
          <p>
            En estos casos, se proporcionarán referencias apropiadas.
          </p>

          <h2>11. Limitación de Responsabilidad</h2>
          <p>
            Si bien me esfuerzo por proporcionar servicios de la más alta calidad:
          </p>
          <ul>
            <li>No puedo garantizar resultados específicos</li>
            <li>La terapia requiere participación activa del paciente</li>
            <li>Los resultados varían según cada individuo</li>
            <li>No soy responsable de decisiones que tome fuera de sesión</li>
          </ul>

          <h2>12. Código Ético</h2>
          <p>
            Mi práctica se rige por el Código de Ética del Colegio de Psicólogos y las leyes 
            aplicables de práctica profesional.
          </p>

          <h2>13. Quejas y Resolución de Conflictos</h2>
          <p>
            Si tiene alguna queja o preocupación:
          </p>
          <ol>
            <li>Comuníquela directamente conmigo para buscar solución</li>
            <li>Si no se resuelve, puede contactar al Colegio de Psicólogos correspondiente</li>
          </ol>

          <h2>14. Modificaciones</h2>
          <p>
            Estos términos pueden modificarse. Los cambios significativos se comunicarán a pacientes 
            activos. El uso continuado de servicios implica aceptación de los términos modificados.
          </p>

          <h2>15. Consentimiento Informado</h2>
          <p>
            Al agendar su primera cita, se le proporcionará un documento de Consentimiento Informado 
            más detallado que debe firmar antes de iniciar el tratamiento.
          </p>

          <h2>16. Legislación Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de Argentina y la jurisdicción aplicable será 
            la de Buenos Aires.
          </p>

          <h2>17. Contacto</h2>
          <p>
            Para preguntas sobre estos términos, por favor contácteme a través de los medios 
            indicados en este sitio web.
          </p>

          <div className="legal-note">
            <p>
              <strong>Declaración:</strong> Al solicitar servicios, usted reconoce haber leído, 
              comprendido y aceptado estos Términos y Condiciones, así como la Política de Privacidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsConditions

