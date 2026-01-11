# 🧠 Psychology Practice Website - Monorepo

Una plataforma profesional y moderna diseñada para psicólogos, que facilita la gestión del consultorio, el agendamiento de citas y el procesamiento de pagos internacionales.

## 📁 Estructura del Monorepo

Este proyecto utiliza una estructura de monorepo para mantener sincronizados el frontend, el backend y el código compartido:

- [frontend/](file:///c:/Users/santi/OneDrive/Escritorio/proyectos/psychology-website/frontend) - Aplicación Single Page (SPA) con React y Vite.
- [backend/](file:///c:/Users/santi/OneDrive/Escritorio/proyectos/psychology-website/backend) - API REST robusta con Express.js y Prisma ORM.
- [shared/](file:///c:/Users/santi/OneDrive/Escritorio/proyectos/psychology-website/shared) - Tipos de TypeScript y constantes compartidas entre ambos extremos.

## ✨ Características Principales

- **📅 Sistema de Agendamiento**: Gestión de turnos con estados (PENDIENTE, CONFIRMADO, COMPLETADO, CANCELADO). Incluye validación de disponibilidad de slots.
- **💰 Pagos Multi-moneda**: Soporte integrado para cobros en **USD, EUR, ARS y MXN** a través de **Stripe** y **PayPal**.
- **🔒 Autenticación Segura**: Sistema de login para pacientes con JWT (JSON Web Tokens) y cifrado de contraseñas.
- **📄 Gestión de Documentos**: Los pacientes pueden subir y gestionar documentos directamente desde su portal.
- **📧 Notificaciones Automáticas**: Envío de correos electrónicos de confirmación y recordatorios mediante la API de **SendGrid**.
- **📱 Optimización Total**: Diseño responsive de alta fidelidad, animaciones fluidas y micro-interacciones.
- **🛡️ Seguridad Avanzada**: Implementación de rate-limiting, headers de seguridad (Helmet) y validación estricta de datos con Zod.

## 🛠️ Tecnologías

### Frontend
- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite
- **Navegación**: React Router v6
- **Iconos**: Lucide React
- **Estilos**: Pure CSS (Variables modernas, Grid, Flexbox)
- **Componentes**: React Calendar para agendamiento

### Backend
- **Core**: Express.js + TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT (jsonwebtoken) & BcryptJS
- **Validación**: Zod
- **Logs**: Morgan & Logger personalizado

### Integraciones y Servicios
- **Pagos**: Stripe SDK & PayPal Checkout Server SDK
- **Email**: SendGrid Mail Service
- **Seguridad**: Helmet & Express Rate Limit
- **Subida de Archivos**: Multer

## 🚀 Instalación y Configuración

### 1. Clonar e instalar dependencias
Desde la raíz del proyecto:
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en el directorio `backend/` basado en el ejemplo:
```bash
cd backend
cp .env.example .env
```
Asegúrate de configurar `DATABASE_URL`, las claves de `STRIPE`, `PAYPAL` y `SENDGRID`.

### 3. Preparar la Base de Datos
Genera el cliente de Prisma y aplica las migraciones:
```bash
cd backend
npm run generate
npm run migrate
```

## 📝 Scripts Disponibles

### Raíz (Gestión Global)
- `npm run dev:all` - Ejecuta Frontend y Backend simultáneamente (Modo Desarrollo).
- `npm run build` - Compila todos los paquetes para producción.
- `npm run dev` - Abre solo el frontend.
- `npm run dev:backend` - Inicia solo el servidor de API.

### Backend
- `npm run seed` - Poblar la base de datos con datos iniciales (servicios, slots).
- `npm run studio` - Abre la interfaz visual de Prisma para ver los datos.
- `npm run type-check` - Verifica la integridad de tipos.

## 🎨 Personalización y Guías

Para más detalles sobre cómo contribuir o personalizar el sitio, consulta:
- [BEST_PRACTICES.md](file:///c:/Users/santi/OneDrive/Escritorio/proyectos/psychology-website/BEST_PRACTICES.md) - Guía de estilos y arquitectura.
- [DEVELOPMENT_GUIDE.md](file:///c:/Users/santi/OneDrive/Escritorio/proyectos/psychology-website/DEVELOPMENT_GUIDE.md) - Documentación detallada de flujo de trabajo.

---

**Nota Legal/Presentación**: Este proyecto es una solución profesional para consultorios. Los datos de contacto en las demostraciones son ficticios y deben ser actualizados en el archivo de configuración correspondiente antes de su despliegue en producción.

