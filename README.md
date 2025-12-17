# 🧠 Psychology Practice Website

Una página web moderna y profesional para consultorios de psicología, diseñada para mostrar servicios, agendar citas y facilitar el contacto con pacientes.

## ✨ Características

- **Hero Section**: Presentación profesional con foto y llamadas a la acción
- **Sobre mí**: Descripción detallada del psicólogo y sus calificaciones
- **Servicios**: Catálogo completo de servicios terapéuticos ofrecidos
- **Calendario**: Sistema de agendamiento con horarios disponibles
- **Contacto**: Múltiples métodos de contacto incluyendo WhatsApp
- **Diseño Responsive**: Optimizado para móviles, tablets y escritorio
- **Animaciones**: Transiciones suaves y efectos visuales profesionales

## 🚀 Instalación y Uso

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 🎨 Personalización

### ⚡ Forma Rápida (Recomendada)

**Todo en un solo archivo**: Edita `src/constants/mockData.js`

1. **Información Personal**:
   - Cambia `CONTACT_INFO` (nombre, teléfono, email, dirección)
   - Actualiza `PROFESSIONAL_INFO` (años de experiencia, certificaciones)

2. **Servicios y Precios**:
   - Modifica el array `SERVICES_DATA`

3. **Horarios Disponibles**:
   - Edita `AVAILABLE_SCHEDULE`

4. **Imagen del Hero**:
   - Actualiza `HERO_IMAGE_URL` con tu foto profesional

5. **Preguntas Frecuentes**:
   - Edita `FAQ_DATA`

### 🎨 Personalización Visual

**Colores**: Modifica las variables CSS en `src/index.css`:
```css
:root {
  --primary-color: #4a90a4;  /* Color principal */
  --secondary-color: #5eb3cc; /* Color secundario */
  --accent-color: #90c9db;    /* Color de acento */
}
```

### 📋 Best Practices Implementadas

Este proyecto sigue las mejores prácticas de desarrollo:
- ✅ Datos centralizados en `constants/mockData.js`
- ✅ Funciones utilitarias reutilizables en `utils/helpers.js`
- ✅ Optimización de performance con React hooks
- ✅ Accesibilidad (ARIA labels, semántica HTML)
- ✅ No magic numbers
- ✅ Código limpio y mantenible

**Ver más**: Consulta `BEST_PRACTICES.md` para detalles completos.

## 📱 Secciones

1. **Inicio**: Landing con foto y botones de acción
2. **Sobre mí**: Biografía, calificaciones y enfoque terapéutico
3. **Servicios**: Terapia individual, pareja, familia, desarrollo personal, etc.
4. **Agenda**: Sistema de selección de días y horarios
5. **Contacto**: WhatsApp, teléfono, email y redes sociales

## 🎯 Tecnologías

- React 18
- Vite
- CSS3 (sin frameworks adicionales)
- Lucide React (iconos)

## 📝 Sugerencias basadas en sitios similares

Esta página está inspirada en las mejores prácticas de sitios web de psicología profesional:

1. **Diseño calmo y profesional**: Colores azules/verdes que transmiten tranquilidad
2. **Información clara**: Servicios, horarios y precios accesibles
3. **Contacto fácil**: WhatsApp integrado para comunicación inmediata
4. **Credenciales visibles**: Certificaciones y experiencia destacadas
5. **Sistema de citas**: Calendario interactivo para mejor experiencia
6. **Responsive**: Funciona perfectamente en todos los dispositivos
7. **Confidencialidad**: Notas sobre privacidad y ética profesional

## 📄 Licencia

Este proyecto es de uso libre para fines personales y profesionales.

## 🤝 Soporte

Para preguntas o soporte, contacta al desarrollador.

---

**Nota**: Esta es una maqueta/mockup para presentación. Los números de contacto y datos son de ejemplo y deben ser reemplazados con información real antes del lanzamiento.

