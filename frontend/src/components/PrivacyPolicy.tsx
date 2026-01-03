import './LegalPages.css'

const PrivacyPolicy = () => {
  return (
    <section className="legal-page section">
      <div className="container">
        <h1 className="page-title">Política de Privacidad y Confidencialidad</h1>
        <div className="legal-content">
          <p className="last-updated">Última actualización: {new Date().toLocaleDateString('es-AR')}</p>

          <h2>1. Introducción</h2>
          <p>
            Como profesional de la salud mental, me comprometo a proteger la privacidad y confidencialidad 
            de la información personal y clínica de todos mis pacientes, en cumplimiento con las leyes 
            aplicables de protección de datos y las normas éticas de la práctica psicológica.
          </p>

          <h2>2. Información que Recopilamos</h2>
          <h3>2.1 Información Personal</h3>
          <ul>
            <li>Nombre completo</li>
            <li>Fecha de nacimiento</li>
            <li>Información de contacto (teléfono, email, dirección)</li>
            <li>Información de emergencia</li>
          </ul>

          <h3>2.2 Información Clínica</h3>
          <ul>
            <li>Historia clínica</li>
            <li>Motivo de consulta</li>
            <li>Notas de sesiones terapéuticas</li>
            <li>Evaluaciones y diagnósticos</li>
            <li>Planes de tratamiento</li>
          </ul>

          <h3>2.3 Información de Pago</h3>
          <ul>
            <li>Datos de facturación</li>
            <li>Historial de pagos (procesados de forma segura por terceros)</li>
          </ul>

          <h2>3. Confidencialidad Terapéutica</h2>
          <p>
            Todo lo que se comparte en sesión es estrictamente confidencial. La información solo se 
            compartirá en las siguientes circunstancias excepcionales:
          </p>
          <ul>
            <li>Con su consentimiento explícito por escrito</li>
            <li>Cuando exista riesgo inminente de daño a usted o a terceros</li>
            <li>Cuando sea requerido por orden judicial</li>
            <li>En casos de sospecha de abuso o maltrato infantil (obligación legal)</li>
          </ul>

          <h2>4. Uso de la Información</h2>
          <p>Su información se utiliza exclusivamente para:</p>
          <ul>
            <li>Proporcionar servicios terapéuticos de calidad</li>
            <li>Coordinar su atención</li>
            <li>Procesar pagos</li>
            <li>Comunicarnos sobre citas y seguimiento</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h2>5. Almacenamiento y Seguridad</h2>
          <ul>
            <li>Toda la información se almacena en servidores seguros con cifrado</li>
            <li>Los registros clínicos se mantienen durante el tiempo requerido por ley</li>
            <li>Acceso restringido solo al profesional tratante</li>
            <li>Copias de seguridad regulares y seguras</li>
          </ul>

          <h2>6. Sesiones en Línea</h2>
          <p>
            Para sesiones por videollamada, utilizamos plataformas seguras que cumplen con estándares 
            de privacidad. Sin embargo, es importante que usted también tome precauciones:
          </p>
          <ul>
            <li>Conectarse desde un lugar privado</li>
            <li>Usar una conexión segura a internet</li>
            <li>Mantener actualizado su software de seguridad</li>
          </ul>

          <h2>7. Sus Derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul>
            <li>Acceder a su información personal y clínica</li>
            <li>Solicitar correcciones a información inexacta</li>
            <li>Solicitar una copia de sus registros</li>
            <li>Retirar su consentimiento (sujeto a limitaciones legales)</li>
            <li>Presentar una queja ante autoridades competentes</li>
          </ul>

          <h2>8. Cookies y Tecnologías de Seguimiento</h2>
          <p>
            Este sitio web utiliza cookies esenciales para su funcionamiento. No utilizamos cookies 
            de seguimiento publicitario. Puede configurar su navegador para rechazar cookies, aunque 
            esto puede afectar la funcionalidad del sitio.
          </p>

          <h2>9. Menores de Edad</h2>
          <p>
            Para pacientes menores de 18 años, requerimos el consentimiento de los padres o tutores 
            legales. La información se maneja con el mismo nivel de confidencialidad, respetando el 
            derecho del menor a la privacidad en el contexto terapéutico.
          </p>

          <h2>10. Cambios a esta Política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política. Los cambios significativos se 
            comunicarán a los pacientes activos. La versión actualizada se publicará en este sitio 
            con la fecha de última actualización.
          </p>

          <h2>11. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, 
            por favor contácteme a través de los medios indicados en este sitio web.
          </p>

          <div className="legal-note">
            <p>
              <strong>Nota importante:</strong> Esta política de privacidad complementa, pero no 
              reemplaza, el consentimiento informado que se firma al inicio del tratamiento, donde 
              se detallan los límites de la confidencialidad en el contexto terapéutico específico.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy

