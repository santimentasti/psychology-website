# 🚀 Guía de Desarrollo - Psychology Practice Website

## 📋 Estado Actual del Proyecto

### ✅ Completado (100%)

**Backend:**
- ✅ Autenticación (register, login, JWT)
- ✅ Gestión de Servicios (CRUD completo)
- ✅ Sistema de Citas (appointments con validación de disponibilidad)
- ✅ Procesamiento de Pagos (Stripe y PayPal)
- ✅ Gestión de Pacientes (perfil, documentos, estadísticas)
- ✅ Base de datos PostgreSQL configurada
- ✅ Prisma ORM con todas las migraciones
- ✅ Middleware de seguridad (CORS, rate limiting, helmet)
- ✅ Validación con Zod
- ✅ Manejo de errores centralizado

**Frontend:**
- ✅ React + TypeScript + Vite configurado
- ✅ React Router configurado
- ✅ Páginas legales (Privacy Policy, Terms & Conditions)
- ✅ Servicio API completo para backend
- ✅ Componentes principales (Header, Footer, Hero, Services, etc.)
- ✅ Estilos CSS personalizados

**Configuración:**
- ✅ Monorepo con workspaces
- ✅ TypeScript en frontend y backend
- ✅ Tipos compartidos en `shared/`
- ✅ Variables de entorno configuradas

---

## 🏃 Cómo Iniciar el Desarrollo

### 1. Verificar Prerequisitos

```bash
# Verificar Node.js (debe ser >= 16)
node --version

# Verificar npm (debe ser >= 8)
npm --version

# Verificar que PostgreSQL esté corriendo en Docker
docker ps
```

### 2. Instalar Dependencias

```bash
# Desde la raíz del proyecto
npm install
```

Esto instalará dependencias de:
- Frontend
- Backend
- Shared

### 3. Configurar Variables de Entorno

#### Backend

```bash
cd backend
# Copiar .env.example a .env
cp .env.example .env
```

Editar `backend/.env` con tus valores:

```env
# Database (ya configurado con tu Docker)
DATABASE_URL="postgresql://sportmatch_user:sportmatch_password@localhost:5432/sportmatch?schema=psychology_website"

# JWT (cambiar por un string seguro)
JWT_SECRET="tu-secret-key-super-segura-minimo-32-caracteres"

# Stripe (opcional para desarrollo)
STRIPE_SECRET_KEY="sk_test_..." # o dejar vacío
STRIPE_WEBHOOK_SECRET="whsec_..." # o dejar vacío

# PayPal (opcional para desarrollo)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."

# Email (opcional para desarrollo)
SENDGRID_API_KEY="..."
SENDGRID_FROM_EMAIL="noreply@psychology-practice.com"
```

#### Frontend

```bash
cd frontend
# Crear .env (copiar de .env.example)
cp .env.example .env
```

El `.env` del frontend ya está configurado correctamente:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Verificar Base de Datos

```bash
cd backend

# Verificar que Prisma esté generado
npm run generate

# Verificar migraciones (ya aplicadas)
# Si necesitas resetear:
# npm run migrate
```

### 5. Iniciar Servidores

#### Opción A: Iniciar Todo Junto (Recomendado)

```bash
# Desde la raíz del proyecto
npm run dev:all
```

Esto iniciará:
- Frontend en `http://localhost:5173`
- Backend en `http://localhost:3000`

#### Opción B: Iniciar por Separado

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Verificar que Todo Funciona

1. **Backend Health Check:**
   - Abre: `http://localhost:3000/health`
   - Debe retornar: `{"status":"ok","message":"Psychology API is running"}`

2. **Frontend:**
   - Abre: `http://localhost:5173`
   - Debe mostrar la página principal

3. **API Endpoint:**
   - Abre: `http://localhost:3000/api`
   - Debe retornar: `{"message":"Welcome to Psychology Practice API"}`

---

## 🧪 Testing de Endpoints

### Autenticación

**Registro:**
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Login:**
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Servicios

```bash
# Obtener todos los servicios
GET http://localhost:3000/api/services

# Obtener servicio por ID
GET http://localhost:3000/api/services/service-individual
```

### Citas (Requiere autenticación)

```bash
# Obtener citas del paciente
GET http://localhost:3000/api/appointments
Authorization: Bearer <token>

# Crear cita
POST http://localhost:3000/api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "service-individual",
  "dateTime": "2026-01-15T10:00:00Z",
  "notes": "Primera consulta"
}
```

---

## 📁 Estructura del Proyecto

```
psychology-website/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas (HomePage, PrivacyPolicy, etc.)
│   │   ├── services/     # API service (api.service.ts)
│   │   ├── constants/    # Datos mock (mockData.ts)
│   │   └── utils/        # Utilidades
│   └── package.json
│
├── backend/              # Express + TypeScript + Prisma
│   ├── src/
│   │   ├── config/       # Configuraciones (DB, Stripe, PayPal, etc.)
│   │   ├── controllers/  # Controladores de rutas
│   │   ├── services/     # Lógica de negocio
│   │   ├── routes/       # Definición de rutas
│   │   ├── middleware/   # Middleware (auth, validation, etc.)
│   │   ├── schemas/      # Esquemas Zod
│   │   ├── types/        # Tipos TypeScript
│   │   └── utils/        # Utilidades
│   ├── prisma/
│   │   ├── schema.prisma # Esquema de base de datos
│   │   └── seed.ts       # Datos iniciales
│   └── package.json
│
└── shared/               # Tipos compartidos
    ├── types/           # Interfaces TypeScript
    └── constants/       # Constantes compartidas
```

---

## 🔧 Comandos Útiles

### Backend

```bash
cd backend

# Desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Verificar tipos
npm run type-check

# Prisma Studio (GUI para la base de datos)
npm run studio

# Ejecutar migraciones
npm run migrate

# Seed de datos
npm run seed
```

### Frontend

```bash
cd frontend

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Verificar tipos
npm run type-check
```

### Monorepo (desde la raíz)

```bash
# Instalar todas las dependencias
npm install

# Iniciar frontend
npm run dev

# Iniciar backend
npm run dev:backend

# Iniciar ambos
npm run dev:all

# Build de todo
npm run build

# Type check de todo
npm run type-check
```

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
npm install
```

### Error: "Prisma Client not generated"
```bash
cd backend
npm run generate
```

### Error: "Database connection failed"
- Verifica que PostgreSQL esté corriendo en Docker
- Verifica `DATABASE_URL` en `backend/.env`
- Verifica que el esquema `psychology_website` exista

### Error: "Port already in use"
- Backend usa puerto 3000
- Frontend usa puerto 5173
- Cierra otros procesos que usen estos puertos

### Error: "Stripe is not configured"
- Es normal en desarrollo si no configuraste Stripe
- Los endpoints de pago mostrarán error, pero el resto funciona
- Para desarrollo completo, agrega `STRIPE_SECRET_KEY` en `.env`

---

## 📝 Próximos Pasos Sugeridos

1. **Personalizar Contenido:**
   - Actualizar `frontend/src/constants/mockData.ts` con información real
   - Reemplazar placeholders de contacto

2. **Configurar APIs de Pago:**
   - Obtener keys de Stripe (test mode)
   - Obtener credenciales de PayPal (sandbox)
   - Ver `backend/STRIPE_SETUP.md` (si existe)

3. **Testing:**
   - Probar todos los endpoints con Postman o similar
   - Probar flujo completo: registro → login → crear cita → pagar

4. **Frontend Integration:**
   - Conectar componentes del frontend con `api.service.ts`
   - Crear formularios de registro/login
   - Integrar calendario con backend

5. **Producción:**
   - Configurar variables de entorno de producción
   - Setup de hosting (Vercel/Netlify para frontend, Render/Railway para backend)
   - Configurar dominio y HTTPS

---

## 🎯 Endpoints Disponibles

### Públicos
- `GET /health` - Health check
- `GET /api` - API info
- `GET /api/services` - Lista de servicios
- `GET /api/services/:id` - Servicio por ID
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login

### Protegidos (Requieren JWT)
- `GET /api/auth/profile` - Perfil del paciente
- `GET /api/appointments` - Citas del paciente
- `POST /api/appointments` - Crear cita
- `GET /api/payments` - Pagos del paciente
- `POST /api/payments/create-intent` - Crear intención de pago
- `GET /api/patients/profile` - Perfil
- `PUT /api/patients/profile` - Actualizar perfil

### Webhooks
- `POST /api/webhooks/stripe` - Webhook de Stripe
- `POST /api/webhooks/paypal` - Webhook de PayPal

---

## 📚 Recursos

- **Backend README:** `backend/README.md`
- **Frontend:** Ver componentes en `frontend/src/components/`
- **API Service:** `frontend/src/services/api.service.ts`
- **Prisma Schema:** `backend/prisma/schema.prisma`

---

## ✅ Checklist Pre-Launch

- [ ] Variables de entorno de producción configuradas
- [ ] Base de datos de producción configurada
- [ ] Stripe/PayPal configurados con keys de producción
- [ ] Email service configurado (SendGrid)
- [ ] Frontend build de producción probado
- [ ] Todos los endpoints probados
- [ ] Información de contacto actualizada
- [ ] Páginas legales revisadas
- [ ] HTTPS configurado
- [ ] Dominio configurado
- [ ] Backups de base de datos configurados

---

¡Listo para desarrollar! 🚀

