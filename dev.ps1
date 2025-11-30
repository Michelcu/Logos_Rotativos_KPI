# Script de ayuda para desarrollo
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "KPI Gaming - Visuales Rotativas" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Verificar si existe .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Red
    Write-Host "   Copiando desde .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "   ✅ Archivo .env creado" -ForegroundColor Green
    Write-Host ""
    Write-Host "   📝 IMPORTANTE: Edita el archivo .env con tus configuraciones" -ForegroundColor Yellow
    Write-Host "   Especialmente la variable DATABASE_URL" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "🚀 Opciones disponibles:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Instalar dependencias" -ForegroundColor White
Write-Host "2. Ejecutar migraciones (crear tablas)" -ForegroundColor White
Write-Host "3. Iniciar servidor de desarrollo" -ForegroundColor White
Write-Host "4. Iniciar servidor de producción" -ForegroundColor White
Write-Host "5. Ver estructura del proyecto" -ForegroundColor White
Write-Host "6. Salir" -ForegroundColor White
Write-Host ""

$opcion = Read-Host "Selecciona una opción (1-6)"

switch ($opcion) {
    "1" {
        Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
        npm install
    }
    "2" {
        Write-Host "🗄️  Ejecutando migraciones..." -ForegroundColor Yellow
        Write-Host "   Asegúrate de que PostgreSQL esté corriendo" -ForegroundColor Cyan
        npm run migrate
    }
    "3" {
        Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Yellow
        Write-Host "   Panel admin: http://localhost:3000/dashboard" -ForegroundColor Cyan
        Write-Host "   Presiona Ctrl+C para detener" -ForegroundColor Gray
        npm run dev
    }
    "4" {
        Write-Host "🚀 Iniciando servidor de producción..." -ForegroundColor Yellow
        npm start
    }
    "5" {
        Write-Host "📁 Estructura del proyecto:" -ForegroundColor Yellow
        Write-Host ""
        tree /F /A
    }
    "6" {
        Write-Host "👋 ¡Hasta luego!" -ForegroundColor Green
        exit
    }
    default {
        Write-Host "❌ Opción no válida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
