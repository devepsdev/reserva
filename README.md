# Sabor Autentico - Sistema de Reservas

Sistema full-stack de reservas para restaurante construido con Next.js, Prisma y PostgreSQL. Incluye una interfaz publica para que los clientes reserven mesas y un panel de administracion para gestionar las reservas.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Base de datos:** PostgreSQL + Prisma 7
- **Autenticacion:** NextAuth.js (JWT + Credentials)
- **UI:** Tailwind CSS 4, Framer Motion, Lucide Icons

## Estructura del proyecto

```Estructura
app/
  api/
    reservations/          # CRUD de reservas + disponibilidad
    tables/                # Listado de mesas
    auth/[...nextauth]/    # Autenticacion NextAuth
    admin/login/           # Login de administrador
  admin/
    page.tsx               # Login admin
    dashboard/page.tsx     # Panel de administracion
  components/              # Hero, Navbar, ReservationSection, Footer...
  page.tsx                 # Pagina principal
lib/
  auth.ts                  # Configuracion NextAuth
  prisma.ts                # Cliente Prisma
prisma/
  schema.prisma            # Esquema de base de datos
scripts/
  seed-admin.ts            # Seed del usuario admin
middleware.ts              # Proteccion de rutas /admin
```

## Modelos de datos

- **Table** - Mesas del restaurante (numero, capacidad)
- **Reservation** - Reservas (nombre, email, telefono, fecha, invitados, duracion, estado, notas)
- **Admin** - Usuarios administradores (email, password bcrypt)

Estados de reserva: `PENDING` → `CONFIRMED` → `COMPLETED` | `CANCELLED`

## API Endpoints

| Endpoint | Metodo | Descripcion |
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

| Script | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion |
| `npm run start` | Servidor de produccion |
| `npm run lint` | Ejecutar ESLint |
| `npm run seed:admin` | Crear usuario admin por defecto |

## Funcionalidades

**Publico:**

- Busqueda de mesas disponibles por fecha, hora y numero de invitados
- Formulario de reserva en 4 pasos (buscar, seleccionar mesa, datos personales, confirmacion)
- Deteccion de solapamiento de horarios

**Admin (`/admin`):**

- Login seguro con credenciales
- Dashboard con estadisticas (reservas de hoy, pendientes, confirmadas, total)
- Filtrado por fecha y estado
- Gestion de estados de reserva (confirmar, completar, cancelar)
- Eliminacion de reservas
