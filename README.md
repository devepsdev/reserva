# Sabor Auténtico - Sistema de Reservas

Sistema full-stack de reservas para restaurante construido con Next.js, Prisma y PostgreSQL. Incluye una interfaz pública para que los clientes reserven mesas y un panel de administración para gestionar las reservas.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Base de datos:** PostgreSQL + Prisma 7
- **Autenticación:** NextAuth.js (JWT + Credentials)
- **UI:** Tailwind CSS 4, Framer Motion, Lucide Icons

## Estructura del proyecto

```Estructura
app/
  api/
    reservations/          # CRUD de reservas + disponibilidad
    tables/                # Listado de mesas
    auth/[...nextauth]/    # Autenticación NextAuth
    admin/login/           # Login de administrador
  admin/
    page.tsx               # Login admin
    dashboard/page.tsx     # Panel de administración
  components/              # Hero, Navbar, ReservationSection, Footer...
  page.tsx                 # Página principal
lib/
  auth.ts                  # Configuración NextAuth
  prisma.ts                # Cliente Prisma
prisma/
  schema.prisma            # Esquema de base de datos
scripts/
  seed-admin.ts            # Seed del usuario admin
middleware.ts              # Protección de rutas /admin
```

## Modelos de datos

- **Table** - Mesas del restaurante (número, capacidad)
- **Reservation** - Reservas (nombre, email, teléfono, fecha, invitados, duración, estado, notas)
- **Admin** - Usuarios administradores (email, password bcrypt)

Estados de reserva: `PENDING` → `CONFIRMED` → `COMPLETED` | `CANCELLED`

## API Endpoints

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/reservations` | GET | Listar todas las reservas |
| `/api/reservations` | POST | Crear nueva reserva |
| `/api/reservations/[id]` | GET / PUT / DELETE | Obtener, actualizar o eliminar reserva |
| `/api/reservations/available` | GET | Buscar mesas disponibles por fecha, hora e invitados |
| `/api/tables` | GET | Listar todas las mesas |

## Primeros pasos

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` con:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/basedatos"
NEXTAUTH_SECRET="tu-secreto"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Ejecutar migraciones y seed

```bash
npx prisma migrate deploy
npm run seed:admin
```

Esto crea el usuario admin por defecto: `admin@restaurante.com` / `admin123`.

### 4. Iniciar el servidor

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run seed:admin` | Crear usuario admin por defecto |

## Funcionalidades

**Público:**

- Búsqueda de mesas disponibles por fecha, hora y número de invitados
- Formulario de reserva en 4 pasos (buscar, seleccionar mesa, datos personales, confirmación)
- Detección de solapamiento de horarios

**Admin (`/admin`):**

- Login seguro con credenciales
- Dashboard con estadísticas (reservas de hoy, pendientes, confirmadas, total)
- Filtrado por fecha y estado
- Gestión de estados de reserva (confirmar, completar, cancelar)
- Eliminación de reservas
