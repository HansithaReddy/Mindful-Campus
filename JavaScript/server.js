const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

app.use(express.static('public'));

app.get('/client', (req, res) => {
  res.sendFile(__dirname + '/public/client.html');
});

app.get('/expert', (req, res) => {
  res.sendFile(__dirname + '/public/expert.html');
});

const clients = {};
const experts = {};

const clientNamespace = io.of('/client');
const expertNamespace = io.of('/expert');

clientNamespace.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);
  clients[socket.id] = socket;

  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
    delete clients[socket.id];
  });

  socket.on('client message', (msg) => {
    const messageWithId = { ...msg, id: uuidv4(), clientId: socket.id };
    console.log('Client message: ', messageWithId);
    clientNamespace.to(socket.id).emit('client message', messageWithId);
    expertNamespace.emit('client message', messageWithId);
  });
});

expertNamespace.on('connection', (socket) => {
  console.log('An expert connected: ' + socket.id);
  experts[socket.id] = socket;

  socket.on('disconnect', () => {
    console.log('Expert disconnected: ' + socket.id);
    delete experts[socket.id];
  });

  socket.on('expert reply', (msg) => {
    const messageWithId = { ...msg, id: uuidv4() };
    console.log('Expert reply: ', messageWithId);
    if (msg.clientId && clients[msg.clientId]) {
      clients[msg.clientId].emit('expert reply', messageWithId);
      // Emit the reply back to the expert's socket
      expertNamespace.to(socket.id).emit('expert reply', messageWithId);
    } else {
      console.log('Client ID not found or client disconnected.');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
