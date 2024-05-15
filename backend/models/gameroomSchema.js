const mongoose = require('mongoose');

// Define GameRoom Schema
const gameRoomSchema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player' // Reference to the Player collection
  }],
  // Add other game room-specific fields as needed
}, { timestamps: true });

// Create GameRoom model
const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = GameRoom;
