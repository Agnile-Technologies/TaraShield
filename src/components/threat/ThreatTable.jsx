import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThreat, editThreat } from '../../store/threatActions';

const ThreatTable = () => {
  const dispatch = useDispatch();
  const threats = useSelector((state) => state.threats.threats);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', description: '', associatedAssets: '' });
  const [addFormData, setAddFormData] = useState({ name: '', description: '', associatedAssets: '' });
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    if (editId) {
      const threat = threats.find(t => t.id === editId);
      setEditFormData({ name: threat.name, description: threat.description, associatedAssets: threat.associatedAssets });
    }
  }, [editId, threats]);

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleAddInputChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (id) => {
    dispatch(editThreat(id, editFormData));
    setEditId(null);
  };

  const handleAddNewThreat = () => {
    dispatch(addThreat({ ...addFormData, id: Date.now() }));
    setAddFormData({ name: '', description: '', associatedAssets: '' });
    setAddingNew(false);
  };

  return (
    <div>
      <button onClick={() => setAddingNew(true)}>Add New Threat</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Associated Assets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <tr key={threat.id}>
              <td>{editId === threat.id ? <input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} /> : threat.name}</td>
              <td>{editId === threat.id ? <input type="text" name="description" value={editFormData.description} onChange={handleEditInputChange} /> : threat.description}</td>
              <td>{editId === threat.id ? <input type="text" name="associatedAssets" value={editFormData.associatedAssets} onChange={handleEditInputChange} /> : threat.associatedAssets}</td>
              <td>
                {editId === threat.id ? (
                  <button onClick={() => handleSaveEdit(threat.id)}>Save</button>
                ) : (
                  <button onClick={() => setEditId(threat.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
          {addingNew && (
            <tr>
              <td><input type="text" name="name" value={addFormData.name} onChange={handleAddInputChange} placeholder="Name" /></td>
              <td><input type="text" name="description" value={addFormData.description} onChange={handleAddInputChange} placeholder="Description" /></td>
              <td><input type="text" name="associatedAssets" value={addFormData.associatedAssets} onChange={handleAddInputChange} placeholder="Associated Assets" /></td>
              <td><button onClick={handleAddNewThreat}>Add</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatTable;