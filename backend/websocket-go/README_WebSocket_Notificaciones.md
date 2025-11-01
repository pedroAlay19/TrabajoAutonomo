# WebSocket de Notificaciones 

Este módulo implementa un **servidor WebSocket** desarrollado en **Go**, integrado con la **API REST** construida en **NestJS**.  
Su función principal es permitir la comunicación **en tiempo real** entre los diferentes módulos del sistema, notificando eventos importantes sin necesidad de recargar la interfaz.

---

## Funcionalidades Principales

El WebSocket notifica automáticamente las siguientes acciones provenientes de la API REST:

- Creación de una nueva orden de reparación (**POST /repair-orders**)
- Creación de una nueva reseña de orden de reparación (**POST /repair-order-reviews**)
- Creación de un nuevo servicio de mantenimiento (**POST /maintenance-services**)
- Creación de una nueva pieza de repuesto (**POST /spare-parts**)
- Actualización del estado de una orden de reparación (cambio de estado: `OPEN → IN_PROGRESS → RESOLVED → CLOSED`)
- Actualización del stock de una pieza (cuando el stock aumenta o disminuye en `SparePartsService`)

---

## 📨 Qué notifica el WebSocket

Cada vez que una de las acciones anteriores ocurre, el sistema envía una **notificación HTTP** al servidor WebSocket (implementado en Go).  
Este, a su vez, **transmite el evento a todos los clientes conectados**.

El WebSocket notifica información sobre:
- El tipo de entidad afectada (orden, reseña, servicio, pieza)

---

## ⚙️ Instalación y Configuración

1️⃣ **Clonar el repositorio del backend** (que contiene los servicios NestJS y el servidor WebSocket Go).

2️⃣ **Instalar dependencias de NestJS:**
```bash
npm install
```

3️⃣ **Instalar dependencias de Go (en la carpeta websocket-go):**
```bash
go mod init websocket-go
go get github.com/gorilla/websocket
```

4️⃣ **Iniciar el servidor WebSocket (Go):**
```bash
go run websocket.go
```

5️⃣ **Iniciar el servidor REST (NestJS):**
```bash
npm run start:dev
```

---

## 🚀 Ejecución

Una vez ambos servidores estén ejecutándose, el WebSocket quedará escuchando las notificaciones enviadas por la API REST.  
Cada acción relevante en los módulos mencionados será **transmitida en tiempo real** a los clientes conectados.

---
