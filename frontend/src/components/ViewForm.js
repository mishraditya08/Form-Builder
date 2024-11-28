import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById } from '../services/formService';
import './viewForm.css'; // Import the new CSS file for styling

const ViewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(id);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/form/${id}/edit`); // Navigate to the EditForm page
  };

  const handleInputChange = (index, value) => {
    const updatedResponses = { ...responses };
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const validateInput = (input, value) => {
    if (input.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    if (input.type === 'number' && isNaN(value)) {
      return 'Please enter a valid number';
    }
    if (input.type === 'date' && new Date(value).toString() === 'Invalid Date') {
      return 'Please enter a valid date';
    }
    return '';
  };

  return (
    <div className="view-form-container">
      {formData && (
        <div className="form-content">
          <h1>{formData.title}</h1>
          <div className="form">
            {formData.inputs.map((input, index) => (
              <div key={index} className="form-input">
                <label>{input.title}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  value={responses[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={false} // Make it editable
                />
                <span className="error-message">{validateInput(input, responses[index])}</span>
              </div>
            ))}
          </div>

          <button onClick={handleEditClick} className="edit-button">
            Edit Form
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewForm;
