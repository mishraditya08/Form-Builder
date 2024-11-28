const mongoose = require('mongoose');

// Form Schema
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inputs: [
    {
      type: { type: String, required: true }, // e.g., "text", "email"
      title: { type: String, required: true }, // e.g., "Name", "Email"
      placeholder: String, // e.g., "Enter your name"
    },
  ],
});

module.exports = mongoose.model('Form', formSchema);
