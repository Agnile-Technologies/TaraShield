import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDamageScenario, editDamageScenario, deleteDamageScenario } from '../../store/damageScenarioActions';
import './DamageScenarioPage.css';

const DamageScenarioTable = () => {
  const [editId, setEditId] = useState(null);
  const [newScenario, setNewScenario] = useState({ name: '', impactCategory: '', impact: '', reasoning: '' });
  const dispatch = useDispatch();
  const damageScenarios = useSelector((state) => state.damageScenarios.damageScenarios);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScenario({ ...newScenario, [name]: value });
  };

  const handleAddScenario = () => {
    if (!newScenario.name || !newScenario.impactCategory || !newScenario.impact || !newScenario.reasoning) {
      alert("All fields are required.");
      return;
    }
    dispatch(addDamageScenario({ ...newScenario, id: Date.now() }));
    setNewScenario({ name: '', impactCategory: '', impact: '', reasoning: '' }); // Reset form after submission
  };

  const handleEditScenario = (id) => {
    const scenario = damageScenarios.find(scenario => scenario.id === id);
    setEditId(id);
    setNewScenario({ name: scenario.name, impactCategory: scenario.impactCategory, impact: scenario.impact, reasoning: scenario.reasoning });
  };

  const handleUpdateScenario = () => {
    if (!newScenario.name || !newScenario.impactCategory || !newScenario.impact || !newScenario.reasoning) {
      alert("All fields are required.");
      return;
    }
    dispatch(editDamageScenario(editId, newScenario));
    setEditId(null);
    setNewScenario({ name: '', impactCategory: '', impact: '', reasoning: '' }); // Reset form after update
  };

  const handleDeleteScenario = (id) => {
    dispatch(deleteDamageScenario(id));
  };

  return (
    <div>
      <button onClick={() => setEditId(null)}>Add New Scenario</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Impact Category</th>
            <th>Impact</th>
            <th>Reasoning</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {damageScenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.name}</td>
              <td>{scenario.impactCategory}</td>
              <td>{scenario.impact}</td>
              <td>{scenario.reasoning}</td>
              <td>
                <button onClick={() => handleEditScenario(scenario.id)}>Edit</button>
                <button onClick={() => handleDeleteScenario(scenario.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {editId === null && (
            <tr>
              <td><input type="text" value={newScenario.name} name="name" onChange={handleInputChange} placeholder="Name" /></td>
              <td><input type="text" value={newScenario.impactCategory} name="impactCategory" onChange={handleInputChange} placeholder="Impact Category" /></td>
              <td><input type="text" value={newScenario.impact} name="impact" onChange={handleInputChange} placeholder="Impact" /></td>
              <td><input type="text" value={newScenario.reasoning} name="reasoning" onChange={handleInputChange} placeholder="Reasoning" /></td>
              <td>
                <button onClick={handleAddScenario}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DamageScenarioTable;