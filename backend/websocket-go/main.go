package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// --- Configuración del WebSocket ---
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Lista de clientes conectados
var clients = make(map[*websocket.Conn]bool)
var mutex = sync.Mutex{}

// --- Maneja las conexiones WS desde el frontend ---
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error al conectar WebSocket:", err)
		return
	}
	defer conn.Close()

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()
	fmt.Println("Nuevo cliente conectado al WebSocket")

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()
			fmt.Println("Cliente desconectado")
			break
		}
	}
}

// --- Envía un mensaje a todos los clientes conectados ---
func Broadcast(message string) {
	mutex.Lock()
	defer mutex.Unlock()

	for conn := range clients {
		err := conn.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			fmt.Println("Error al enviar mensaje:", err)
			conn.Close()
			delete(clients, conn)
		}
	}
	fmt.Println("Notificación enviada:", message)
}

// --- Endpoint que recibe notificaciones desde NestJS por HTTP ---
func handleNotify(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error leyendo cuerpo", http.StatusBadRequest)
		return
	}

	// Validar que el cuerpo tenga los campos esperados
	var msg map[string]interface{}
	if err := json.Unmarshal(body, &msg); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	// Convertir a string y enviar por WS
	jsonMsg, _ := json.Marshal(msg)
	Broadcast(string(jsonMsg))

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Notificación recibida y enviada por WebSocket"))
}

// --- Inicia las rutas y el servidor ---
func main() {
	http.HandleFunc("/ws", handleWebSocket)
	http.HandleFunc("/notify", handleNotify)

	fmt.Println("🚀 Servidor WebSocket escuchando en http://localhost:8081")
	fmt.Println("   Rutas disponibles:")
	fmt.Println("   - /ws      (conexión WebSocket desde el frontend)")
	fmt.Println("   - /notify  (recibe POST HTTP desde NestJS)")
	http.ListenAndServe(":8081", nil)
}
