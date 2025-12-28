# 🧠 Psychology Practice Website - Monorepo

Una página web moderna y profesional para consultorios de psicología, diseñada para mostrar servicios, agendar citas y facilitar el contacto con pacientes.

## 📁 Estructura del Proyecto

Este es un monorepo que contiene:

- **`frontend/`** - Aplicación React + TypeScript + Vite
- **`backend/`** - API Express.js + TypeScript

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
- npm (versión 8 o superior)

### Instalación

1. Instala todas las dependencias del monorepo:
```bash
npm install
```

Esto instalará las dependencias tanto del frontend como del backend.

### Desarrollo

#### Frontend solamente
```bash
npm run dev
# o
npm run dev --workspace=frontend
```

#### Backend solamente
```bash
npm run dev:backend
# o
npm run dev --workspace=backend
```

#### Frontend y Backend simultáneamente
```bash
npm run dev:all
```

### Build para producción

#### Build completo
```bash
npm run build
```

#### Build individual
```bash
npm run build:frontend
npm run build:backend
```

## 📂 Estructura de Carpetas

```
psychology-website/
├── frontend/          # Aplicación React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # API Express.js
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── package.json       # Root package.json (workspaces)
```

## 🎯 Tecnologías

### Frontend
- React 18
- TypeScript
- Vite
- CSS3 (sin frameworks adicionales)
- Lucide React (iconos)

### Backend
- Express.js
- TypeScript
- CORS
- dotenv

## 🔧 Configuración del Backend

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cd backend
cp .env.example .env
```

2. Edita `.env` con tus configuraciones:
```env
PORT=3000
NODE_ENV=development
```

## 📝 Scripts Disponibles

### Root (Monorepo)
- `npm run dev` - Inicia el frontend en modo desarrollo
- `npm run dev:backend` - Inicia el backend en modo desarrollo
- `npm run dev:all` - Inicia frontend y backend simultáneamente
- `npm run build` - Build de todos los workspaces
- `npm run install:all` - Instala dependencias de todos los workspaces

### Frontend
- `npm run dev` - Servidor de desarrollo Vite
- `npm run build` - Build para producción
- `npm run preview` - Preview del build de producción

### Backend
- `npm run dev` - Servidor de desarrollo con hot reload (tsx)
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Inicia el servidor en producción
- `npm run type-check` - Verifica tipos sin compilar

## 🎨 Personalización

### Frontend
Ver la documentación en `frontend/README.md` (si existe) o consulta `BEST_PRACTICES.md` para detalles sobre personalización.

### Backend
El backend está configurado con Express.js y TypeScript. Puedes agregar rutas, controladores, servicios y modelos según tus necesidades.

## 📄 Licencia

Este proyecto es de uso libre para fines personales y profesionales.

## 🤝 Soporte

Para preguntas o soporte, contacta al desarrollador.

---

**Nota**: Esta es una maqueta/mockup para presentación. Los números de contacto y datos son de ejemplo y deben ser reemplazados con información real antes del lanzamiento.
