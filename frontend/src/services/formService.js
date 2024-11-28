import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get all forms
export const getForms = async () => {
  const response = await axios.get(`${API_URL}/forms`);
  return response.data;
};

// Create a new form
export const createForm = async (form) => {
  const response = await axios.post(`${API_URL}/form`, form);
  return response.data;
};

// Get a specific form by ID
export const getFormById = async (id) => {
  const response = await fetch(`http://localhost:5000/form/${id}`);
  const data = await response.json();
  return data;
};

// Update a specific form by ID
export const updateForm = async (id, form) => {
  const response = await fetch(`/form/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) throw new Error('Failed to update form');
  return response.json();
};

export const deleteForm = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/form/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};

