# Prueba Técnica Seneca 2025

Prueba técnica para el puesto de Desarrollador FullStack.

## Requisitos Previos

- Node.js (versión 20 o superior)
- npm o yarn
- Base de datos compatible con Prisma (PostgreSQL)

## Pasos para Configurar el Proyecto

### 1. Clonar el Repositorio

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Entrar al directorio del proyecto
cd prueba-tecnica-seneca-2025
```

### 2. Configurar Variables de Entorno

- Duplicar el archivo `.env.example` que se encuentra en la carpeta `backend` y renombrarlo a `.env`.
- Configurar las variables de entorno necesarias en el archivo `.env`.

### 3. Configurar el Backend

```bash
# Entrar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Generar el cliente de Prisma
npx prisma generate

# Aplicar las migraciones
npx prisma migrate dev

# Ejecutar el seed para poblar la base de datos
npm run seed

# Iniciar el servidor del backend
npm run dev
```

El servidor del backend estará disponible en `http://localhost:3000` (por defecto).

### 4. Configurar el Frontend

```bash
# Volver a la raíz del proyecto
cd ../front-end

# Instalar dependencias
npm install

# Iniciar el servidor del frontend
npm run dev
```

El servidor del frontend estará disponible en `http://localhost:5173` (por defecto).

## Notas Adicionales

- Asegúrate de que la base de datos esté corriendo antes de ejecutar las migraciones y el seed.
- Si necesitas cambiar los puertos por defecto, actualiza las variables de entorno correspondientes en el archivo `.env` del backend y en la configuración de Vite en el frontend.

## Estructura del Proyecto

- `backend/`: Contiene el código del servidor desarrollado con Node.js y Express.
- `front-end/`: Contiene el código del cliente desarrollado con React.
