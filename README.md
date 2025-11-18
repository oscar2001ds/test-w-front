# 🏦 Test Banco W - Sistema de Simulaciones Financieras

Una plataforma moderna de simulación financiera construida con **Next.js 16**, **TypeScript**, **Tailwind CSS** y **Radix UI**, que permite a diferentes tipos de usuarios gestionar simulaciones de inversión con un sistema de roles jerárquico.

## 🚀 Características Principales

- 🔐 **Sistema de Autenticación** con roles jerárquicos (Cliente, Supervisor, Admin)
- 👥 **Gestión de Usuarios** con permisos granulares
- 📊 **Simulador Financiero** para proyección de inversiones
- 💼 **Panel de Administración** multi-rol
- 📱 **Diseño Responsivo** optimizado para todos los dispositivos
- 🎨 **UI/UX Moderna** con componentes reutilizables
- 🔄 **Estado Global** con Context API de React
- ✅ **Validación de Formularios** con Formik y Yup

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** o **yarn**
- **Git**

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/oscar2001ds/test-w-front.git
cd test-w-front
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env` con las configuraciones necesarias:

```bash
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:4003
```

### 4. Ejecutar el Proyecto

#### Modo Desarrollo
```bash
npm run dev
# o
yarn dev
```

#### Modo Producción
```bash
# Compilar el proyecto
npm run build
# o
yarn build

# Ejecutar en producción
npm run start
# o
yarn start
```

La aplicación estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
test-w-front/
├── 📄 README.md                    # Este archivo
├── 📄 package.json                 # Dependencias y scripts
├── 📄 .env.example                 # Variables de entorno de ejemplo
├── 📄 tailwind.config.ts           # Configuración de Tailwind CSS
├── 📄 next.config.ts               # Configuración de Next.js
├── 📄 tsconfig.json                # Configuración de TypeScript
├── 📄 eslint.config.mjs            # Configuración de ESLint
├── 📄 middleware.ts                # Middleware de Next.js (redirecciones)
├── 📁 public/                      # Archivos estáticos
├── 📁 docs/                        # Documentación adicional
└── 📁 src/                         # Código fuente principal
    ├── 📁 app/                     # Router de Next.js 13+ (App Router)
    │   ├── 📄 layout.tsx           # Layout principal de la app
    │   ├── 📄 page.tsx             # Página de inicio
    │   ├── 📄 globals.css          # Estilos globales
    │   ├── 📁 auth/                # Rutas de autenticación
    │   └── 📁 financial-simulator/ # Rutas del simulador
    ├── 📁 core/                    # Funcionalidades centrales
    │   ├── 📁 config/              # Configuraciones globales
    │   ├── 📁 context/             # Contexts de React
    │   ├── 📁 types/               # Tipos TypeScript globales
    │   └── 📁 utils/               # Utilidades generales
    ├── 📁 shared/                  # Componentes y recursos compartidos
    │   ├── 📁 components/          # Componentes UI reutilizables
    │   │   └── 📁 ui/              # Sistema de diseño (shadcn/ui)
    │   ├── 📁 hooks/               # Hooks personalizados
    │   └── 📁 utils/               # Utilidades compartidas
    └── 📁 modules/                 # Módulos de funcionalidad
        ├── 📁 auth/                # Módulo de autenticación
        │   ├── 📁 components/      # Componentes del módulo
        │   ├── 📁 hooks/           # Hooks específicos
        │   ├── 📁 services/        # Servicios/API calls
        │   └── 📁 types/           # Tipos del módulo
        └── 📁 financial-simulator/ # Módulo principal del simulador
            ├── 📁 components/      # Componentes del módulo
            │   ├── 📁 usersView/   # Vista de gestión de usuarios
            │   ├── 📁 myProfileView/ # Vista de perfil personal
            │   └── 📁 simulatorView/ # Vista del simulador
            ├── 📁 hooks/           # Hooks del simulador
            ├── 📁 services/        # Servicios/API calls
            ├── 📁 types/           # Tipos del simulador
            └── 📁 constants/       # Constantes y configuraciones
```

## 🏗️ Arquitectura del Proyecto

### 🔧 Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + CSS Modules
- **Componentes**: Radix UI + shadcn/ui
- **Formularios**: Formik + Yup
- **Iconos**: Lucide React
- **Notificaciones**: React Hot Toast
- **Animaciones**: AOS (Animate On Scroll)

## 👥 Sistema de Roles y Permisos

### 🔐 Jerarquía de Roles

| Rol | Permisos | Descripción |
|-----|----------|-------------|
| **Super Admin** | 🛠️ Gestión completa | Puede gestionar administradores, supervisores y clientes |
| **Admin** | 🔧 Gestión parcialmente completa | Puede gestionar supervisores y clientes |
| **Supervisor** | 👀 Gestión limitada | Puede gestionar solo clientes |
| **Cliente** | 📊 Solo simulaciones | Acceso únicamente a sus simulaciones |

### 🚪 Rutas Protegidas

```typescript
// Configuración en src/core/config/protected-routes.ts
const roleAccess = {
  '/financial-simulator/admins': ['super-admin', 'admin'],
  '/financial-simulator/supervisors': ['super-admin', 'admin'], 
  '/financial-simulator/clients': ['super-admin', 'admin', 'supervisor'],
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Compilar para producción
npm run start        # Servidor de producción

# Calidad de Código
npm run lint         # Ejecutar ESLint
```

## 🎉 Conclusión

Gracias por tomarse el tiempo de revisar mi prueba. La desarrollé con mucho esfuerzo y dedicación, buscando entregar un resultado que realmente valiera la pena.  
Si tienen alguna inquietud o comentario, pueden contactarme al número de abajo. Un Saludo, espero podernos ver pronto!
- 🟢 WhatsApp: 3124204039 

---

**Desarrollado con ❤️**
