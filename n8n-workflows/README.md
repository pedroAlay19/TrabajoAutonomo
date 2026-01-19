# 🔄 Sistema de Orquestación de Eventos con n8n

Este módulo implementa el **Event Bus** del sistema de reparaciones utilizando n8n para centralizar y orquestar todos los eventos externos y notificaciones.

## 📋 Principio Fundamental

> **"Todo evento externo pasa por n8n"**

n8n actúa como el cerebro de las notificaciones, coordinando mensajes de WhatsApp, emails, y comunicación entre servicios.

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│  REST Service   │ ──── HTTP Webhook ───▶ ┌──────────────┐
│  (NestJS)       │                         │              │
└─────────────────┘                         │     n8n      │
                                            │  Event Bus   │
┌─────────────────┐                         │              │
│   Frontend      │ ──── Estado Cambios ──▶ └──────┬───────┘
│   (React)       │                                │
└─────────────────┘                                │
                                                   │
                         ┌─────────────────────────┼─────────────────────┐
                         │                         │                     │
                         ▼                         ▼                     ▼
                  ┌─────────────┐         ┌─────────────┐      ┌─────────────┐
                  │  WhatsApp   │         │    Email    │      │   Redis     │
                  │  (Twilio)   │         │   (SMTP)    │      │   Cache     │
                  └─────────────┘         └─────────────┘      └─────────────┘
```

---

## 🚀 Inicio Rápido

### 1️⃣ Configuración Inicial

```bash
# Navegar a la carpeta de n8n
cd n8n-workflows

# Copiar variables de entorno
cp .env.n8n.example .env.n8n

# Editar con tus credenciales
nano .env.n8n
```

### 2️⃣ Levantar n8n

```bash
# Iniciar servicios
docker-compose -f docker-compose.n8n.yml up -d

# Ver logs
docker-compose -f docker-compose.n8n.yml logs -f n8n

# Verificar estado
docker-compose -f docker-compose.n8n.yml ps
```

### 3️⃣ Acceder a n8n

- **URL**: http://localhost:5678
- **Usuario**: `admin`
- **Contraseña**: `admin123`

---

## 📱 Workflows Implementados

### 1. **Repair Order Created** (Orden de Reparación Creada)
- **Trigger**: Webhook POST `/webhook/repair-order-created`
- **Acciones**:
  - ✅ Notificación WhatsApp al técnico evaluador
  - ✅ Email de confirmación al cliente
  - ✅ Registro en Redis para tracking

### 2. **Repair Order Status Changed** (Cambio de Estado)
- **Trigger**: Webhook POST `/webhook/repair-order-status`
- **Acciones**:
  - ✅ WhatsApp contextual según estado
  - ✅ Email con detalles de progreso
  - ✅ Actualización de métricas

### 3. **Technician Task Assigned** (Tarea Asignada)
- **Trigger**: Webhook POST `/webhook/task-assigned`
- **Acciones**:
  - ✅ WhatsApp al técnico con detalles de servicio
  - ✅ Email con información completa de la tarea
  - ✅ Recordatorio automático después de 2 horas si la tarea sigue pendiente
  - ✅ Soporte para prioridades (alta, media, baja)

### 4. **Daily Summary Report** (Reporte Diario)
- **Trigger**: Cron (todos los días a las 8:00 AM - Zona horaria Ecuador)
- **Acciones**:
  - ✅ Consultar estadísticas del sistema (órdenes, ingresos, estados)
  - ✅ WhatsApp al administrador con resumen visual
  - ✅ Email con reporte detallado en HTML
  - ✅ Alertas automáticas si hay muchas órdenes activas

### 5. **System Health Check** (Verificación de Salud)
- **Trigger**: Cron (cada 30 minutos)
- **Acciones**:
  - ✅ Verificar disponibilidad de REST API (timeout 5s)
  - ✅ Verificar conexión a Redis con comando PING
  - ✅ Análisis automático del estado general del sistema
  - ✅ WhatsApp de alerta crítica si REST API falla
  - ✅ Email detallado con diagnóstico de fallos
  - ✅ WhatsApp de advertencia para problemas menores
  - ✅ Sistema silencioso cuando todo funciona correctamente

---

## 🔗 Integración con Backend

El backend NestJS dispara eventos HTTP a n8n:

```typescript
// Ejemplo de disparo de evento
await this.n8nService.triggerEvent('repair-order-created', {
  orderId: order.id,
  equipmentType: order.equipment.equipmentType,
  clientEmail: order.equipment.user.email,
  technicianPhone: order.evaluatedBy.phone,
  problemDescription: order.problemDescription
});
```

---

## 📞 Plantillas de WhatsApp

### Nueva Orden
```
🔧 *NUEVA ORDEN DE REPARACIÓN*

📋 Orden: #{orderId}
🛠️ Equipo: {equipmentType}
📝 Problema: {problemDescription}

👉 Evalúa la orden en: {orderLink}
```

### Orden Lista
```
🎉 *¡TU EQUIPO ESTÁ LISTO!*

✅ Orden: #{orderId}
💰 Costo Final: ${finalCost}

📍 Retira tu equipo en nuestro taller
```

### Resumen Diario
```
📊 *RESUMEN DIARIO - {date}*

🔄 Órdenes Activas: {activeOrders}
✅ Completadas Hoy: {completedToday}
💰 Ingresos del Día: ${todayRevenue}

🚀 ¡Sigamos trabajando!
```

---

## 🛠️ Comandos Útiles

```bash
# Detener n8n
docker-compose -f docker-compose.n8n.yml down

# Reiniciar n8n
docker-compose -f docker-compose.n8n.yml restart n8n

# Ver logs en tiempo real
docker-compose -f docker-compose.n8n.yml logs -f

# Limpiar todo (⚠️ elimina datos)
docker-compose -f docker-compose.n8n.yml down -v

# Exportar workflows
docker exec n8n n8n export:workflow --all --output=/home/node/.n8n/workflows

# Importar workflows
docker exec n8n n8n import:workflow --input=/home/node/.n8n/workflows/workflow.json
```

---

## 🔐 Seguridad

- Las credenciales están en `.env.n8n` (NO COMMITEAR)
- n8n usa autenticación básica por defecto
- Los webhooks pueden protegerse con tokens en headers
- Redis no tiene contraseña (solo uso interno)

---

## 📊 Monitoreo

### Verificar que n8n funciona
```bash
curl http://localhost:5678/healthz
```

### Verificar Redis
```bash
docker exec -it n8n-redis-cache redis-cli ping
# Debe responder: PONG
```

---

## 🐛 Troubleshooting

### n8n no inicia
```bash
# Ver logs detallados
docker-compose -f docker-compose.n8n.yml logs n8n

# Verificar permisos
chmod -R 755 workflows/
```

### WhatsApp no envía mensajes
- Verificar credenciales de Twilio en `.env.n8n`
- Confirmar que el número está verificado en Twilio
- Revisar logs del workflow en n8n UI

### Emails no llegan
- Verificar SMTP settings
- Revisar que la contraseña de aplicación de Gmail sea correcta
- Verificar spam/correo no deseado

---

## 📚 Recursos

- [Documentación n8n](https://docs.n8n.io/)
- [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp)
- [Gmail SMTP Setup](https://support.google.com/mail/answer/7126229)

---

## 👥 Contacto

Para soporte o preguntas sobre este módulo, contacta al equipo de desarrollo.

---

**Última actualización**: Enero 2026