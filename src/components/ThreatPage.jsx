import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThreat, editThreat, deleteThreat } from '../../store/threatActions';
import './ThreatPage.css';

const ThreatPage = () => {
  const [threat, setThreat] = useState({ name: '', description: '', associatedAssets: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const threats = useSelector((state) => state.threats.threats);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThreat({ ...threat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!threat.name.trim() || !threat.description.trim() || !threat.associatedAssets.trim()) {
      alert("Name, description, and associated assets are required.");
      return;
    }
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
      <h1>Threat Management</h1>
      <form onSubmit={handleSubmit} className="threat-form">
        <input type="text" name="name" value={threat.name} onChange={handleChange} placeholder="Threat Name" className="form-input" />
        <textarea name="description" value={threat.description} onChange={handleChange} placeholder="Description" className="form-input"></textarea>
        <input type="text" name="associatedAssets" value={threat.associatedAssets} onChange={handleChange} placeholder="Associated Assets" className="form-input" />
        <button type="submit" className="button-submit">{editId ? 'Update Threat' : 'Add Threat'}</button>
      </form>
      <div className="threat-list">
        {threats.map((t) => (
          <div key={t.id} className="threat-item">
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <p>Associated Assets: {t.associatedAssets}</p>
            <button onClick={() => handleEdit(t.id)} className="button-edit">Edit</button>
            <button onClick={() => handleDelete(t.id)} className="button-delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatPage;