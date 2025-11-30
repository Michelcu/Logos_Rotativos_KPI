# KPI Gaming - Sistema de Visuales Rotativas

Sistema de gestión de creatividades (videos/imágenes) para streamers de Twitch con enlaces OBS.

## Características

- ✅ Panel de administración simple y limpio
- ✅ Gestión de creadores de contenido
- ✅ Gestión de creatividades (videos/imágenes)
- ✅ Asignación múltiple de creadores por creatividad
- ✅ Enlaces permanentes para OBS
- ✅ Cambio de creatividades sin actualizar enlaces
- ✅ Autenticación segura

## Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **Frontend:** HTML/CSS/JavaScript (vanilla)
- **Hosting:** Railway

## Instalación Local

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Copiar `.env.example` a `.env` y configurar variables
4. Crear la base de datos:
   ```bash
   npm run migrate
   ```
5. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue en Railway

1. Crear nuevo proyecto en Railway
2. Añadir PostgreSQL database
3. Conectar repositorio de GitHub
4. Railway detectará automáticamente el proyecto Node.js
5. Configurar variables de entorno desde `.env.example`
6. Railway ejecutará las migraciones automáticamente

## Uso

1. **Login:** Accede al panel con las credenciales de admin
2. **Creadores:** Añade los streamers del equipo
3. **Creatividades:** Sube videos/imágenes y asigna creadores
4. **Enlaces OBS:** Copia el enlace generado y pégalo en OBS Browser Source

## Estructura del Proyecto

```
├── src/
│   ├── server.js              # Punto de entrada
│   ├── config/                # Configuración
│   ├── database/              # Conexión y migraciones
│   ├── models/                # Modelos de datos
│   ├── routes/                # Rutas de la API
│   ├── controllers/           # Lógica de negocio
│   ├── middleware/            # Middleware (auth, etc.)
│   └── views/                 # Templates EJS
├── public/                    # Archivos estáticos
├── uploads/                   # Archivos subidos
└── package.json
```

## Licencia

MIT - KPI Gaming
