const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const GameRoom = require('./models/gameRoomSchema');
const GameState = require('./models/gameStateSchema');
const Player = require('./models/playerSchema');
const Role = require('./models/roleSchema');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mafia-game';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createRoom', async (roomId, userName) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { users: [] };
      const gameRoom = new GameRoom();
      await gameRoom.save();
      const player = new Player({ username: userName, gameRoom: gameRoom._id });
      await player.save();
      rooms[roomId].users.push(userName);
      socket.join(roomId);
      socket.roomId = roomId;
      socket.userName = userName;
      io.to(roomId).emit('updateRoom', rooms[roomId].users);
      console.log(`Room ${roomId} created by ${userName}`);
    }
  });

  socket.on('joinRoom', async (roomId, userName) => {
    if (rooms[roomId] && rooms[roomId].users.length < 4) {
      const gameRoom = await GameRoom.findOne({ _id: roomId });
      const player = new Player({ username: userName, gameRoom: gameRoom._id });
      await player.save();
      rooms[roomId].users.push(userName);
      socket.join(roomId);
      socket.roomId = roomId;
      socket.userName = userName;
      io.to(roomId).emit('updateRoom', rooms[roomId].users);
      console.log(`${userName} joined room ${roomId}`);
    }
  });

  socket.on('disconnect', async () => {
    const roomId = socket.roomId;
    const userName = socket.userName;
    if (roomId && rooms[roomId]) {
      rooms[roomId].users = rooms[roomId].users.filter(user => user !== userName);
      await Player.deleteOne({ username: userName, gameRoom: roomId });
      io.to(roomId).emit('updateRoom', rooms[roomId].users);
      console.log(`${userName} left room ${roomId}`);
    }
  });
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
