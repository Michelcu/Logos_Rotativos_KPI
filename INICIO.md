# 🚀 Inicio Rápido - KPI Gaming Visuales

## ✅ Sistema Completo Creado

El sistema de gestión de visuales rotativas para tus streamers está listo. Aquí está todo lo que se ha creado:

### 📁 Estructura del Proyecto

```
Logos_Rotativos/
├── src/
│   ├── config/              # Configuración
│   ├── controllers/         # Lógica de negocio
│   ├── database/            # BD y migraciones
│   ├── middleware/          # Autenticación
│   ├── models/              # Modelos de datos
│   ├── routes/              # Rutas de la API
│   ├── views/               # Templates HTML
│   └── server.js            # Servidor principal
├── public/
│   ├── css/                 # Estilos
│   ├── js/                  # JavaScript frontend
│   └── uploads/             # Archivos subidos
├── .env                     # Variables de entorno LOCAL
├── .env.example             # Ejemplo de configuración
├── package.json             # Dependencias
├── railway.json             # Config para Railway
├── README.md                # Documentación técnica
├── DEPLOY.md                # Guía de despliegue
└── GUIA_USO.md              # Manual de usuario
```

### 🎯 Funcionalidades Implementadas

✅ **Panel de Administración**
- Login seguro con sesiones
- Gestión completa de creadores (crear, editar, eliminar)
- Gestión completa de creatividades (crear, editar, eliminar)
- Asignación de múltiples creadores por creatividad
- Generación automática de enlaces OBS únicos

✅ **Sistema de Creatividades**
- Subida de videos (MP4, WebM) hasta 100MB
- Subida de imágenes (JPG, PNG, GIF, WebP)
- Enlaces permanentes que no cambian
- Actualización de contenido sin cambiar URLs

✅ **Vista OBS**
- Página pública sin autenticación
- Reproducción automática en bucle
- Fondo transparente
- Compatible con OBS Browser Source

✅ **Base de Datos**
- PostgreSQL configurado
- Migraciones automáticas
- Relaciones many-to-many entre creatividades y creadores

## 🛠️ Instalación y Prueba Local

### Opción 1: Con PostgreSQL Local

Si tienes PostgreSQL instalado:

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar .env**
   - Edita el archivo `.env`
   - Cambia `DATABASE_URL` por tu conexión PostgreSQL local

3. **Crear base de datos**
   ```bash
   npm run migrate
   ```

4. **Iniciar servidor**
   ```bash
   npm run dev
   ```

5. **Abrir en navegador**
   - Panel: http://localhost:3000/dashboard
   - Login: admin@kpigaming.es / admin123

### Opción 2: Sin PostgreSQL Local (Ir directo a Railway)

Si no tienes PostgreSQL instalado localmente:

1. **Sube el proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Sistema de visuales KPI Gaming"
   git branch -M main
   git remote add origin [URL-DE-TU-REPO]
   git push -u origin main
   ```

2. **Despliega en Railway**
   - Sigue las instrucciones en `DEPLOY.md`
   - Railway incluye PostgreSQL gratis

## 📦 Desplegar en Railway (Producción)

### Pasos Rápidos:

1. **Crear proyecto en Railway**
   - Ve a [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub"
   - Selecciona este repositorio

2. **Añadir PostgreSQL**
   - Click en "New" → "Database" → "PostgreSQL"
   - Railway conecta automáticamente

3. **Configurar Variables**
   Añade en "Variables":
   ```
   NODE_ENV=production
   SESSION_SECRET=[genera-un-secreto-largo-aqui]
   ADMIN_EMAIL=tu-email@kpigaming.es
   ADMIN_PASSWORD=[contraseña-segura]
   BASE_URL=https://tu-proyecto.up.railway.app
   ```

4. **Configurar dominio personalizado**
   - Settings → Domains → Custom Domain
   - Añade: `visuales.kpigaming.es`
   - Configura el CNAME en tu DNS
   - Actualiza `BASE_URL` a `https://visuales.kpigaming.es`

Ver detalles completos en **DEPLOY.md**

## 📖 Cómo Usar

### Para ti (Admin):
1. Inicia sesión en `/dashboard`
2. Añade creadores en la pestaña "Creadores"
3. Crea creatividades en la pestaña "Creatividades"
4. Asigna creadores a cada creatividad
5. Copia el enlace OBS y envíalo a tus streamers

### Para tus streamers:
1. Reciben el enlace tipo: `https://visuales.kpigaming.es/obs/abc123`
2. Lo añaden en OBS como "Navegador" (Browser Source)
3. Ajustan tamaño y posición
4. ¡Listo! El video/imagen aparece en su stream

Ver manual completo en **GUIA_USO.md**

## 🔑 Credenciales por Defecto

**Para desarrollo local:**
- Email: `admin@kpigaming.es`
- Password: `admin123`

**⚠️ IMPORTANTE:** Cambia estas credenciales en producción usando las variables de entorno.

## 🎨 Características Destacadas

- **Sin grupos complejos**: Solo creatividades y creadores (más simple)
- **Enlaces permanentes**: El enlace OBS nunca cambia
- **Actualización en vivo**: Cambias el video, aparece automáticamente
- **Múltiples asignaciones**: Una creatividad para varios streamers
- **Panel moderno**: Interfaz limpia y fácil de usar
- **Mobile-friendly**: Funciona en móviles y tablets

## 📊 Límites y Recomendaciones

- **Tamaño máximo archivo**: 100MB
- **Formatos recomendados**: 
  - Video: MP4 (H.264, ~5-10MB)
  - Imagen: PNG con transparencia
- **Resolución recomendada**: 1920x1080 o menor
- **Duración video**: 5-30 segundos (se reproduce en bucle)

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor con auto-reload

# Producción
npm start            # Inicia servidor

# Base de datos
npm run migrate      # Ejecuta migraciones
```

## 📞 Próximos Pasos

1. **Probar localmente** (opcional)
   - Instala dependencias
   - Configura PostgreSQL
   - Ejecuta migraciones
   - Inicia servidor

2. **Desplegar en Railway**
   - Sube a GitHub
   - Conecta con Railway
   - Configura variables
   - Añade dominio personalizado

3. **Configurar producción**
   - Cambiar credenciales de admin
   - Generar SESSION_SECRET seguro
   - Configurar BASE_URL correcta

4. **Empezar a usar**
   - Añadir tus streamers
   - Subir creatividades
   - Compartir enlaces OBS

## 🆘 Soporte

- **Documentación técnica**: README.md
- **Guía de despliegue**: DEPLOY.md
- **Manual de usuario**: GUIA_USO.md

## 🎯 Diferencias con tu sistema anterior

Este sistema es más simple y directo:

**Antes:**
- Grupos → Creatividades → Creadores (complejo)

**Ahora:**
- Creatividades → Creadores directamente (simple)

Cada creatividad tiene:
- Un nombre/descripción
- Un archivo (video/imagen)
- Una lista de creadores asignados
- Un enlace OBS único

¡Mucho más fácil de gestionar! 🚀

---

**¿Listo para empezar?** 

1. Si tienes PostgreSQL: `npm install` → `npm run migrate` → `npm run dev`
2. Si no: Sube a GitHub y despliega en Railway

¡Éxito con KPI Gaming! 🎮
