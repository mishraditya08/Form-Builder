// import React, { useState } from 'react';
// import { createForm } from '../services/formService';
// import { useNavigate } from 'react-router-dom';

// const CreateForm = () => {
//   const [title, setTitle] = useState('');
//   const [inputs, setInputs] = useState([]);
//   const [showInputTypeSelector, setShowInputTypeSelector] = useState(false); // Controls dropdown visibility
//   const [newInputType, setNewInputType] = useState(''); // Stores selected input type
//   const navigate = useNavigate();

//   const handleAddInput = () => {
//     if (inputs.length >= 20) {
//       alert('Maximum of 20 inputs allowed.');
//       return;
//     }
//     setShowInputTypeSelector(true);
//   };

//   const confirmAddInput = () => {
//     if (newInputType) {
//       setInputs([...inputs, { type: newInputType, title: '', placeholder: '' }]);
//       setNewInputType('');
//       setShowInputTypeSelector(false);
//     }
//   };

//   const cancelAddInput = () => {
//     setNewInputType('');
//     setShowInputTypeSelector(false);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedInputs = [...inputs];
//     updatedInputs[index][field] = value;
//     setInputs(updatedInputs);
//   };

//   const removeInput = (index) => {
//     const updatedInputs = inputs.filter((_, i) => i !== index);
//     setInputs(updatedInputs);
//   };

//   const handleSubmit = async () => {
//     if (!title) {
//       alert('Title is required');
//       return;
//     }
//     const form = { title, inputs };
//     try {
//       await createForm(form);
//       navigate('/');
//     } catch (error) {
//       console.error('Error creating form:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Form</h2>
//       <input
//         type="text"
//         placeholder="Form Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <div>
//         <button onClick={handleAddInput}>Add Input</button>
//       </div>
//       {showInputTypeSelector && (
//         <div>
//           <select
//             value={newInputType}
//             onChange={(e) => setNewInputType(e.target.value)}
//           >
//             <option value="">Select Input Type</option>
//             <option value="text">Text</option>
//             <option value="email">Email</option>
//             <option value="password">Password</option>
//             <option value="number">Number</option>
//             <option value="date">Date</option>
//           </select>
//           <button onClick={confirmAddInput}>Confirm</button>
//           <button onClick={cancelAddInput}>Cancel</button>
//         </div>
//       )}
//       <div>
//         {inputs.map((input, index) => (
//           <div key={index}>
//             <p>Type: {input.type}</p>
//             <input
//               type="text"
//               placeholder="Input Title"
//               value={input.title}
//               onChange={(e) =>
//                 handleInputChange(index, 'title', e.target.value)
//               }
//             />
//             <input
//               type="text"
//               placeholder="Placeholder"
//               value={input.placeholder}
//               onChange={(e) =>
//                 handleInputChange(index, 'placeholder', e.target.value)
//               }
//             />
//             <button onClick={() => removeInput(index)}>Delete</button>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSubmit}>Save Form</button>
//     </div>
//   );
// };

// export default CreateForm;

import React, { useState } from 'react';
import { createForm } from '../services/formService';
import { useNavigate } from 'react-router-dom';


const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [showInputTypeSelector, setShowInputTypeSelector] = useState(false); // Controls dropdown visibility
  const [newInputType, setNewInputType] = useState(''); // Stores selected input type
  const navigate = useNavigate();

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
      await createForm(form);
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div>
      <h2>Create Form</h2>
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

      {/* Input Fields Container (Box with Inputs) */}
      <div className="input-fields-container">
        {inputs.map((input, index) => (
          <div className="input-group" key={index}>
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
            <button onClick={() => removeInput(index)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}
        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
      >Save Form</button>
    </div>
  );
};

export default CreateForm;
