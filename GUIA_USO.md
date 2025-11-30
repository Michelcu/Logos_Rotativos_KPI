# KPI Gaming - Visuales Rotativas

## Cómo Usar el Sistema

### Para Administradores

#### 1. Acceder al Panel
1. Abre tu navegador y ve a la URL del panel
2. Inicia sesión con tu email y contraseña de admin

#### 2. Añadir Creadores
1. Click en la pestaña "Creadores"
2. Click en "+ Nuevo Creador"
3. Completa el formulario:
   - **Nombre**: El nombre del streamer (ej: "PepeGamer")
   - **Usuario de Twitch**: Su usuario de Twitch (opcional)
   - **Notas**: Cualquier nota adicional (opcional)
4. Click en "Guardar"

#### 3. Crear Creatividad
1. Ve a la pestaña "Creatividades"
2. Click en "+ Nueva Creatividad"
3. Completa el formulario:
   - **Nombre**: Un nombre descriptivo (ej: "RedBull Q4 2025")
   - **Descripción**: Detalles adicionales (opcional)
   - **Archivo**: Sube el video o imagen (máx. 100MB)
   - **Creadores Asignados**: Marca los creadores que usarán esta creatividad
4. Click en "Guardar"

#### 4. Copiar Enlace OBS
- En cada creatividad verás un enlace único
- Click en "Copiar" para copiar el enlace al portapapeles
- Envía ese enlace a los creadores asignados

#### 5. Editar Creatividad
- Si cambias el video/imagen de una creatividad existente
- Los creadores verán automáticamente el nuevo contenido
- **No necesitas cambiar el enlace**

### Para Creadores de Contenido

#### 1. Recibir el Enlace
Tu administrador te enviará un enlace único tipo:
```
https://visuales.kpigaming.es/obs/abc123def456
```

#### 2. Añadir a OBS
1. Abre OBS Studio
2. En "Fuentes", click en el botón "+"
3. Selecciona "Navegador"
4. Dale un nombre (ej: "Sponsors KPI")
5. Pega el enlace en "URL"
6. Configura:
   - **Ancho**: 400-600px (ajusta según tu overlay)
   - **Alto**: 400-600px (ajusta según tu overlay)
   - Marca "Actualizar navegador cuando la escena se activa"
7. Click en "Aceptar"

#### 3. Posicionar y Ajustar
- Arrastra la fuente en la vista previa para posicionarla
- Redimensiona como prefieras (mantén proporciones)
- El video se reproducirá en bucle automáticamente

#### 4. Actualizar Contenido
- Si tu admin cambia la creatividad
- **No necesitas hacer nada**
- El nuevo video aparecerá automáticamente

### Tips y Trucos

#### Para Administradores
- **Organización**: Usa nombres descriptivos como "Q1_2025_Tech_Sponsors"
- **Múltiples versiones**: Crea diferentes creatividades para diferentes grupos de marcas
- **Backup**: Guarda los videos originales en tu ordenador
- **Test**: Prueba en OBS antes de enviar a los creadores

#### Para Creadores
- **Calidad**: Usa "Calidad de escalado: Bicúbico" en las propiedades de la fuente
- **Posición**: Coloca en una esquina donde no tape contenido importante
- **Tamaño**: Entre 300-600px suele funcionar bien
- **Transparencia**: Si el video tiene fondo transparente, se verá correctamente
- **Refresh**: Si no se actualiza, click derecho → "Actualizar"

### Resolución de Problemas

#### El video no se muestra en OBS
1. Verifica que el enlace esté correcto
2. Comprueba tu conexión a internet
3. Intenta actualizar la fuente (click derecho → Actualizar)
4. Verifica que la creatividad esté activa en el panel

#### El video se ve cortado o mal
- Ajusta el ancho y alto en las propiedades de la fuente
- Usa las mismas proporciones que el video original
- Redimensiona manualmente arrastrando las esquinas

#### El video no se actualiza
- Click derecho en la fuente → "Actualizar"
- O simplemente cambia de escena y vuelve

#### Problemas de rendimiento
- Los videos muy grandes pueden afectar el rendimiento
- Recomendado: videos optimizados de menos de 10MB
- Formato recomendado: MP4 con codec H.264

### Recomendaciones de Formato

#### Videos
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x1080 o menor
- **Duración**: 5-30 segundos (en bucle)
- **Tamaño**: Menos de 10MB idealmente
- **FPS**: 30fps es suficiente
- **Fondo**: Transparente (si es posible) o negro

#### Imágenes
- **Formato**: PNG (con transparencia) o JPG
- **Resolución**: 1920x1080 o menor
- **Tamaño**: Menos de 2MB
- **Fondo**: Transparente si quieres que se integre mejor

### Flujo de Trabajo Recomendado

1. **Diseñador** crea la creatividad en After Effects / Premiere / Photoshop
2. **Exporta** el video optimizado (MP4, H.264, ~5-10MB)
3. **Admin** sube la creatividad al panel
4. **Admin** asigna los creadores correspondientes
5. **Admin** envía el enlace OBS a cada creador
6. **Creadores** añaden la fuente a OBS
7. **Cuando hay cambios**: Admin solo reemplaza el video, no cambia enlaces

### Contacto y Soporte

Si tienes problemas técnicos, contacta con el administrador del sistema.
