const mongoose = require('mongoose');

// Define Player Schema
const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role' // Reference to the Role collection
  },
  gameRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameRoom' // Reference to the GameRoom collection
  },
  status: {
    type: String,
    enum: ['alive', 'dead'],
    default: 'alive'
  },
  // Add other player-specific fields as needed
}, { timestamps: true });

// Create Player model
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
