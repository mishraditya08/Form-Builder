const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Form = require("./models/Form")
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/form_builder')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.send('Form Builder Backend is Running');
});

// Get all forms (only titles)
app.get('/forms', async (req, res) => {
    try {
      const forms = await Form.find({}, 'title');
      res.json(forms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch forms' });
    }
  });
  
  
  // Create a new form
  app.post('/form', async (req, res) => {
    const { title, inputs } = req.body;
    try {
      const newForm = new Form({ title, inputs });
      await newForm.save();
      res.status(201).json(newForm);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create form' });
    }
  });
  
  // Update an existing form
  app.put('/form/:id', async (req, res) => {
    const { title, inputs } = req.body;
    try {
      const updatedForm = await Form.findByIdAndUpdate(
        req.params.id,
        { title, inputs },
        { new: true }
      );
      res.json(updatedForm);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update form' });
    }
  });

  // Get a specific form by ID
  app.get('/form/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const form = await Form.findById(id);
      if (!form) {
        return res.status(404).send('Form not found');
      }
      res.json(form);
    } catch (err) {
      res.status(500).send('Error retrieving form');
    }
  });
  
  // Update a specific form by ID
  app.put('/form/:id', async (req, res) => {
    const { id } = req.params;
    const { title, inputs } = req.body;
  
    try {
      const form = await Form.findByIdAndUpdate(
        id,
        { title, inputs },
        { new: true }
      );
      if (!form) {
        return res.status(404).send('Form not found');
      }
      res.json(form);
    } catch (err) {
      res.status(500).send('Error updating form');
    }
  });

  // Delete form
app.delete('/form/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const form = await Form.findByIdAndDelete(id);
      if (!form) {
        return res.status(404).send('Form not found');
      }
      res.status(200).send('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form:', error);
      res.status(500).send('Failed to delete form');
    }
  });
  
  

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
