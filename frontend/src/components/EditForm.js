import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById, updateForm, deleteForm } from '../services/formService';

const EditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [showInputTypeSelector, setShowInputTypeSelector] = useState(false);
  const [newInputType, setNewInputType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formData = await getFormById(id);
        setTitle(formData.title);
        setInputs(formData.inputs);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [id]);

  const handleAddInput = () => {
    if (inputs.length >= 20) {
      alert('Maximum of 20 inputs allowed.');
      return;
    }
    setShowInputTypeSelector(true);
  };

  const confirmAddInput = () => {
    if (newInputType) {
      setInputs([...inputs, { type: newInputType, title: '', placeholder: '' }]);
      setNewInputType('');
      setShowInputTypeSelector(false);
    }
  };

  const cancelAddInput = () => {
    setNewInputType('');
    setShowInputTypeSelector(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const removeInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    const form = { title, inputs };
    try {
      await updateForm(id, form);
      navigate('/'); // Navigate back to the list of forms
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

    // New function to handle form deletion
    const handleDeleteForm = async () => {
        try {
          await deleteForm(id);
          navigate('/'); // Redirect to forms list after deletion
        } catch (error) {
          console.error('Error deleting form:', error);
          alert('Failed to delete the form.');
        }
      };

  return (
    <div>
      <h2>Edit Form</h2>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <button onClick={handleAddInput}>Add Input</button>
      </div>
      {showInputTypeSelector && (
        <div>
          <select
            value={newInputType}
            onChange={(e) => setNewInputType(e.target.value)}
          >
            <option value="">Select Input Type</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
          <button onClick={confirmAddInput}
            style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
          >Confirm</button>
          <button onClick={cancelAddInput}
            style={{ backgroundColor: '#FF4136', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
          >Cancel</button>
        </div>
      )}
      <div>
        {inputs.map((input, index) => (
          <div key={index}>
            <p>Type: {input.type}</p>
            <input
              type="text"
              placeholder="Input Title"
              value={input.title}
              onChange={(e) =>
                handleInputChange(index, 'title', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Placeholder"
              value={input.placeholder}
              onChange={(e) =>
                handleInputChange(index, 'placeholder', e.target.value)
              }
            />
            <button 
                onClick={() => removeInput(index)} 
                style={{ backgroundColor: '#FF4136', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                Delete
            </button>

          </div>
        ))}
      </div>
      <button onClick={handleSubmit}
      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
      >Save Changes</button>

      {/* Delete Form Button */}
      <button
        onClick={handleDeleteForm}
        style={{
          backgroundColor: '#FF4136',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete Form
      </button>
    </div>
  );
};

export default EditForm;
