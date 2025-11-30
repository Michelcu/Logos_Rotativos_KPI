# Despliegue en Railway

## Pasos para desplegar

### 1. Crear cuenta en Railway
Visita [railway.app](https://railway.app) y crea una cuenta gratuita.

### 2. Crear nuevo proyecto
1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Autoriza Railway para acceder a tu repositorio
4. Selecciona el repositorio `Logos_Rotativos`

### 3. Añadir PostgreSQL
1. En tu proyecto, click en "New"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente la base de datos y la variable `DATABASE_URL`

### 4. Configurar Variables de Entorno
En la sección "Variables", añade las siguientes variables:

```
NODE_ENV=production
SESSION_SECRET=genera-un-secreto-aleatorio-largo-y-seguro-aqui
ADMIN_EMAIL=tu-email@kpigaming.es
ADMIN_PASSWORD=tu-contraseña-segura
BASE_URL=https://tu-proyecto.up.railway.app
```

**Importante:** 
- `SESSION_SECRET`: Genera una cadena aleatoria larga (mínimo 32 caracteres)
- `ADMIN_PASSWORD`: Usa una contraseña segura
- `BASE_URL`: Railway te proporcionará la URL después del primer despliegue

### 5. Actualizar BASE_URL
Después del primer despliegue:
1. Copia la URL generada por Railway (ej: `https://logos-rotativos-production.up.railway.app`)
2. Actualiza la variable `BASE_URL` con esa URL
3. Railway redespleará automáticamente

### 6. Verificar Despliegue
1. Accede a la URL de tu proyecto
2. Inicia sesión con las credenciales de admin
3. ¡Listo! El sistema está funcionando

## Actualizar el proyecto

Cada vez que hagas `git push` a tu rama principal, Railway redespleará automáticamente.

## Configuración del dominio personalizado

Para usar `visuales.kpigaming.es`:

1. En Railway, ve a Settings → Domains
2. Click en "Custom Domain"
3. Ingresa `visuales.kpigaming.es`
4. Railway te dará un registro CNAME
5. En tu proveedor de DNS (donde tengas kpigaming.es):
   - Tipo: CNAME
   - Nombre: visuales
   - Valor: (el que te dio Railway)
6. Actualiza `BASE_URL` a `https://visuales.kpigaming.es`

## Costos

Railway ofrece:
- $5 USD de crédito gratis al mes
- Suficiente para un proyecto pequeño como este
- PostgreSQL incluido en el plan gratuito

## Backup de Base de Datos

Para hacer backup de tu base de datos:

```bash
# Conectar a Railway CLI
railway login

# Obtener DATABASE_URL
railway variables

# Hacer backup
pg_dump $DATABASE_URL > backup.sql

# Restaurar backup
psql $DATABASE_URL < backup.sql
```

## Solución de problemas

### Error: "Cannot connect to database"
- Verifica que la variable `DATABASE_URL` esté configurada
- Asegúrate de que el servicio PostgreSQL esté activo

### Error: "Session table does not exist"
- Las migraciones deberían crear esta tabla automáticamente
- Si no, ejecuta manualmente: `railway run npm run migrate`

### Los archivos subidos no persisten
- Railway usa almacenamiento efímero
- Para producción, considera usar:
  - AWS S3
  - Cloudinary
  - Railway Volumes (próximamente)

## Monitoreo

Railway proporciona:
- Logs en tiempo real
- Métricas de CPU y memoria
- Alertas de errores

Accede desde el dashboard de tu proyecto.
