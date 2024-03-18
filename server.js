// Importar módulos necesarios
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Inicializar el servidor Express
const app = express();

// Crear el servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = socketIO(server);

// Configurar directorio estático
app.use(express.static('public'));

// Escuchar el evento 'connection'
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Escuchar el evento 'text-update'
  socket.on('text-update', (data) => {
    // Transmitir actualizaciones de texto a todos los clientes
    io.emit('text-update', data);
  });

  // Escuchar el evento 'disconnect'
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Definir el puerto de escucha
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
