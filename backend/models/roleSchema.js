const mongoose = require('mongoose');

// Define Role Schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  // Add other role-specific fields as needed
}, { timestamps: true });

// Create Role model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
