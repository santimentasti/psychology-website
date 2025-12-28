# Backend - Psychology Practice API

Backend API construido con Express.js, TypeScript y Prisma para la aplicación de práctica psicológica.

## 🚀 Inicio Rápido

### Instalación

Desde la raíz del monorepo:
```bash
npm install
```

O desde este directorio:
```bash
npm install
```

### Configuración de Base de Datos

1. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura `DATABASE_URL` en `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/psychology_practice?schema=public"
```

3. Ejecuta las migraciones de Prisma:
```bash
npm run migrate
```

4. (Opcional) Ejecuta el seed para datos de ejemplo:
```bash
npm run seed
```

### Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor con hot reload usando `nodemon` y `tsx`.

### Build

```bash
npm run build
```

Esto compilará el código TypeScript a JavaScript en la carpeta `dist/`.

### Producción

```bash
npm run build
npm run start
```

## 📁 Estructura

```
backend/
├── src/
│   ├── config/          # Configuraciones (database, stripe, paypal, email, jwt)
│   ├── controllers/     # Controladores de rutas
│   ├── services/        # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Middleware de Express
│   ├── types/           # Tipos TypeScript
│   ├── schemas/         # Esquemas de validación Zod
│   ├── utils/           # Utilidades
│   ├── server.ts        # Configuración de Express
│   └── index.ts         # Punto de entrada
├── prisma/
│   ├── schema.prisma    # Esquema de base de datos
│   ├── migrations/      # Migraciones (generadas)
│   └── seed.ts          # Datos de ejemplo
├── dist/                # Código compilado (generado)
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 🔧 Configuración

### Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/psychology_practice"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Email (SendGrid)
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=noreply@psychology-practice.com

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Inicia el servidor en producción (requiere build previo)
- `npm run migrate` - Ejecuta migraciones de Prisma
- `npm run seed` - Ejecuta el seed de datos de ejemplo
- `npm run studio` - Abre Prisma Studio (GUI para la base de datos)
- `npm run generate` - Genera el cliente de Prisma
- `npm run type-check` - Verifica tipos sin compilar

## 🛣️ Endpoints

- `GET /health` - Health check del servidor
- `GET /api` - Endpoint principal de la API

## 🗄️ Base de Datos

Este proyecto usa **Prisma** como ORM con **PostgreSQL**.

### Modelos Principales

- **Patient**: Pacientes/usuarios del sistema
- **Service**: Servicios terapéuticos ofrecidos
- **Appointment**: Citas agendadas
- **Payment**: Pagos procesados
- **Document**: Documentos de pacientes
- **AvailableSlot**: Horarios disponibles

### Comandos Útiles

```bash
# Crear una nueva migración
npm run migrate

# Ver la base de datos en Prisma Studio
npm run studio

# Resetear la base de datos (¡CUIDADO!)
npx prisma migrate reset
```

## 🔐 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de orígenes permitidos
- **Rate Limiting**: Límites de peticiones por IP
- **JWT**: Autenticación con tokens
- **bcrypt**: Hash de contraseñas

## 📦 Dependencias Principales

- **Express**: Framework web
- **Prisma**: ORM para PostgreSQL
- **TypeScript**: Tipado estático
- **Zod**: Validación de esquemas
- **Stripe**: Procesamiento de pagos
- **PayPal**: Procesamiento de pagos alternativo
- **SendGrid**: Envío de emails
- **JWT**: Autenticación

## 🔨 Próximos Pasos

El backend está configurado con:
- ✅ Estructura de carpetas completa
- ✅ Middleware de seguridad y validación
- ✅ Configuración de Prisma
- ✅ Tipos TypeScript compartidos
- ✅ Sistema de logging
- ✅ Manejo de errores

Pendiente de implementar:
- [ ] Rutas de autenticación (register, login)
- [ ] Rutas de citas (appointments)
- [ ] Rutas de pagos (payments)
- [ ] Rutas de servicios (services)
- [ ] Rutas de pacientes (patients)
- [ ] Webhooks de Stripe y PayPal
- [ ] Servicios de email
- [ ] Upload de documentos
