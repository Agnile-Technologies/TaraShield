import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThreat, editThreat, deleteThreat } from '../../store/threatActions'; // Corrected import to threat-specific actions
import './ThreatPage.css';

const ThreatPage = () => {
  const [threat, setThreat] = useState({ name: '', description: '', associatedAssets: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  // Corrected to use the correct state structure based on rootReducer configuration
  const threats = useSelector((state) => state.threats.threats); // Corrected to access the threats array within the threats state slice

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThreat({ ...threat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(editThreat(editId, threat)); // Corrected to use threat-specific action
      console.log('Threat updated:', threat);
    } else {
      dispatch(addThreat({ ...threat, id: Date.now() })); // Corrected to use threat-specific action
      console.log('Threat added:', threat);
    }
    setThreat({ name: '', description: '', associatedAssets: '' });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const threatToEdit = threats.find((t) => t.id === id);
    setThreat({ name: threatToEdit.name, description: threatToEdit.description, associatedAssets: threatToEdit.associatedAssets });
    setEditId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteThreat(id)); // Corrected to use threat-specific action
    console.log('Threat deleted:', id);
  };

  return (
    <div className="threat-page">
      <h2>Threat Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={threat.name} onChange={handleChange} placeholder="Threat Name" />
        <textarea name="description" value={threat.description} onChange={handleChange} placeholder="Description"></textarea>
        <input type="text" name="associatedAssets" value={threat.associatedAssets} onChange={handleChange} placeholder="Associated Assets" />
        <button type="submit">{editId ? 'Update Threat' : 'Add Threat'}</button>
      </form>
      <div className="threat-list">
        {threats.map((t) => (
          <div key={t.id} className="threat-item">
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <p>Associated Assets: {t.associatedAssets}</p>
            <button onClick={() => handleEdit(t.id)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatPage;