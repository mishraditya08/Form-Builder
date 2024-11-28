import React, { useEffect, useState } from 'react';
import { getForms } from '../services/formService';
import { Link } from 'react-router-dom';

const FormsList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <div>
      <h2>All Forms</h2>
      <ol>
        {forms.map((form) => (
          <li key={form._id}>
            <Link to={`/form/${form._id}`}>
              {form.title}  {/* This is the clickable text */}
            </Link>
            </li>
        ))}
      </ol>
      <Link to="/form/create">
        <button>Create Form</button>
      </Link>
    </div>
  );
};

export default FormsList;
