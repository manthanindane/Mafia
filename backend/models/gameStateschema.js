const mongoose = require('mongoose');

// Define GameState Schema
const gameStateSchema = new mongoose.Schema({
  phase: {
    type: String,
    enum: ['night', 'day'],
    required: true
  },
  // Add other game state-specific fields as needed
}, { timestamps: true });

// Create GameState model
const GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;
