# Best Practices Implementadas

Este documento detalla todas las mejores prácticas implementadas en este proyecto mockup de sitio web de psicología.

## 🏗️ Arquitectura y Organización

### Separación de Concerns

#### 1. **Constants Centralizados** (`src/constants/mockData.js`)
- ✅ Todos los datos mockup están centralizados en un solo archivo
- ✅ Fácil de actualizar antes de producción
- ✅ Comentarios claros indicando que son datos de ejemplo
- ✅ Estructuración lógica por categorías

**Beneficio**: Cambiar información (nombre, teléfono, precios) requiere editar un solo archivo.

#### 2. **Funciones Utilitarias** (`src/utils/helpers.js`)
- ✅ Funciones reutilizables para operaciones comunes
- ✅ Evita duplicación de código
- ✅ Documentación JSDoc para cada función
- ✅ Funciones puras sin efectos secundarios

**Funciones incluidas**:
- `formatPhoneNumber()`: Formateo consistente de números
- `formatCurrency()`: Formateo de moneda
- `getWhatsAppUrl()` y `openWhatsApp()`: Lógica de WhatsApp centralizada
- `smoothScrollTo()`: Scroll suave reutilizable
- `debounce()`: Optimización de performance

#### 3. **Componentes por Responsabilidad**
Cada componente tiene una única responsabilidad:
- `Header`: Navegación
- `Hero`: Presentación inicial
- `About`: Información profesional
- `Services`: Catálogo de servicios
- `Calendar`: Sistema de reservas
- `Contact`: Información de contacto
- `Footer`: Pie de página

---

## ⚛️ React Best Practices

### 1. **Hooks y Performance**

#### useState
```javascript
// ✅ Estado agrupado cuando está relacionado
const [selectedDate, setSelectedDate] = useState('')
const [selectedTime, setSelectedTime] = useState('')

// ✅ Función updater para prevenir stale closures
setIsMenuOpen(prev => !prev)
```

#### useCallback
```javascript
// ✅ Memoización de funciones que se pasan como props o son dependencias
const handleWhatsAppClick = useCallback(() => {
  const message = 'Hola, me gustaría obtener más información.'
  openWhatsApp(CONTACT_INFO.phone, message)
}, [])
```

#### useMemo
```javascript
// ✅ Memoización de arrays/objetos complejos
const contactMethods = useMemo(() => [
  // ... array costoso de crear
], [handleWhatsAppClick, handlePhoneClick, handleEmailClick])
```

#### useEffect
```javascript
// ✅ Limpieza adecuada de event listeners
useEffect(() => {
  const handleScroll = debounce(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, 100)

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### 2. **Keys Estables**
```javascript
// ❌ MAL: Usando index como key
{services.map((service, index) => <div key={index}>...)}

// ✅ BIEN: Usando identificadores únicos
{services.map((service) => <article key={service.id}>...)}
```

### 3. **Fragmentos en lugar de divs innecesarios**
Ya implementado donde es apropiado.

---

## ♿ Accesibilidad (A11y)

### 1. **Etiquetas ARIA**
```javascript
// ✅ aria-label para botones sin texto visible
<button aria-label="Toggle menu">
  <Menu />
</button>

// ✅ aria-hidden para íconos decorativos
<Brain aria-hidden="true" />

// ✅ role para elementos interactivos custom
<div role="radiogroup" aria-label="Selecciona un horario">
  <button role="radio" aria-checked={isSelected}>
```

### 2. **Semántica HTML**
```javascript
// ✅ Uso de elementos semánticos
<article> para tarjetas de servicios
<section> para secciones principales
<nav> para navegación
<header>, <footer>, <main>
```

### 3. **Atributos de Accesibilidad**
- `alt` descriptivo en imágenes
- `loading="lazy"` para lazy loading de imágenes
- Labels asociados con inputs
- Contraste de colores adecuado

---

## 🚀 Performance

### 1. **Event Listeners Optimizados**
```javascript
// ✅ Passive listeners para scroll
window.addEventListener('scroll', handleScroll, { passive: true })

// ✅ Debouncing para eventos frecuentes
const handleScroll = debounce(() => {
  setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
}, 100)
```

### 2. **Lazy Loading**
```javascript
// ✅ Lazy loading de imágenes
<img loading="lazy" src={HERO_IMAGE_URL} alt="..." />
```

### 3. **Memoización Estratégica**
- Funciones callback memoizadas con `useCallback`
- Arrays/objetos costosos memoizados con `useMemo`
- Evita re-renders innecesarios

---

## 📝 Code Quality

### 1. **No Magic Numbers**
```javascript
// ❌ MAL
<Brain size={32} />
if (window.scrollY > 50) { }

// ✅ BIEN
const ICON_SIZE = 32
const SCROLL_THRESHOLD = 50

<Brain size={ICON_SIZE} />
if (window.scrollY > SCROLL_THRESHOLD) { }
```

### 2. **Nombres Descriptivos**
```javascript
// ✅ Variables descriptivas
const handleWhatsAppClick = () => { }
const FIRST_CONSULTATION_PRICE = { amount: 700, currency: 'MXN' }
const AVAILABLE_SCHEDULE = { ... }
```

### 3. **Funciones Puras**
```javascript
// ✅ Función pura sin side effects
export const formatCurrency = (amount, currency = 'MXN') => {
  return `$${amount.toLocaleString('es-MX')} ${currency}`
}
```

### 4. **Manejo de Errores**
```javascript
// ✅ Validación de inputs
const handleBooking = useCallback(() => {
  if (!selectedDate || !selectedTime) {
    alert('Por favor selecciona un día y un horario')
    return
  }
  // ... continuar con la lógica
}, [selectedDate, selectedTime])
```

---

## 🎨 CSS Best Practices

### 1. **CSS Variables**
```css
:root {
  --primary-color: #4a90a4;
  --secondary-color: #5eb3cc;
  --accent-color: #90c9db;
  /* ... */
}
```

### 2. **Organización de Imports**
```javascript
// ✅ Librerías externas primero
import { useState, useCallback } from 'react'
import { Calendar, Clock } from 'lucide-react'

// ✅ Luego imports locales
import { CONTACT_INFO } from '../constants/mockData'
import { openWhatsApp } from '../utils/helpers'
import './Calendar.css'
```

### 3. **Responsive Design**
- Mobile-first approach
- Breakpoints consistentes
- Flexbox y Grid Layout

---

## 🔒 Seguridad (Mockup)

### 1. **Links Seguros**
```javascript
// ✅ rel="noopener noreferrer" en links externos
<a 
  href={url} 
  target="_blank" 
  rel="noopener noreferrer"
>
```

### 2. **Datos Mock Claramente Marcados**
```javascript
// ✅ Comentarios indicando datos de ejemplo
// MOCK DATA - Replace with real data before production
export const CONTACT_INFO = {
  phone: '+525512345678', // Número de ejemplo
  // ...
}
```

---

## 📦 Estructura de Carpetas

```
src/
├── components/          # Componentes React
│   ├── Header.jsx
│   ├── Header.css
│   └── ...
├── constants/          # Datos centralizados
│   └── mockData.js
├── utils/             # Funciones utilitarias
│   └── helpers.js
├── App.jsx           # Componente principal
├── main.jsx         # Entry point
└── index.css       # Estilos globales
```

---

## 🔄 Fácil Customización

### Para actualizar antes de producción:

1. **Información Personal**: Editar `src/constants/mockData.js`
   - Cambiar `CONTACT_INFO`
   - Actualizar `PROFESSIONAL_INFO`

2. **Servicios y Precios**: Editar array `SERVICES_DATA`

3. **Horarios**: Modificar `AVAILABLE_SCHEDULE`

4. **Colores**: Editar variables CSS en `src/index.css`

5. **Imagen del Hero**: Cambiar `HERO_IMAGE_URL`

---

## ✅ Checklist de Best Practices

- [x] Separación de concerns (components, constants, utils)
- [x] Datos mockup centralizados y documentados
- [x] Funciones utilitarias reutilizables
- [x] Hooks de React correctamente utilizados
- [x] Performance optimizada (memoization, debouncing)
- [x] Accesibilidad (ARIA, semántica, alt text)
- [x] No magic numbers
- [x] Nombres descriptivos
- [x] Keys únicas y estables
- [x] Event listeners optimizados
- [x] Lazy loading de imágenes
- [x] CSS variables para theming
- [x] Responsive design
- [x] Links seguros (noopener noreferrer)
- [x] Manejo de errores básico
- [x] Código limpio y mantenible
- [x] Documentación clara

---

## 🚫 Anti-patterns Evitados

1. ❌ Magic numbers hardcodeados
2. ❌ Datos dispersos en múltiples archivos
3. ❌ Lógica duplicada
4. ❌ Keys usando index
5. ❌ Event listeners sin cleanup
6. ❌ Funciones anónimas re-creadas en cada render
7. ❌ Divs innecesarios (cuando se pueden usar Fragments)
8. ❌ Falta de accesibilidad
9. ❌ Estados no agrupados relacionados
10. ❌ Funciones impuras

---

## 📚 Recursos

- [React Docs - Hooks](https://react.dev/reference/react)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Vitals](https://web.dev/vitals/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Nota**: Este es un proyecto mockup. Antes de ir a producción:
1. Reemplazar todos los datos en `mockData.js`
2. Implementar backend real para reservas
3. Agregar sistema de autenticación si es necesario
4. Implementar analytics
5. Optimizar bundle size
6. Configurar SEO metadata
7. Pruebas de accesibilidad completas


