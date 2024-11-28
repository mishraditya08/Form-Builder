import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormsList from './components/FormsList';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';
import './index.css'

const App = () => {
  return (
    <Router>
      <div>
      <h1 style={{ textAlign: 'center', color: '#00796b', marginBottom: '20px' }}>Form Builder</h1>

        <Routes>
          <Route path="/" element={<FormsList />} />
          <Route path="/form/create" element={<CreateForm />} />
          <Route path="/form/:id/edit" element={<EditForm />} />
          <Route path="/form/:id" element={<ViewForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
