import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDamageScenario, editDamageScenario, deleteDamageScenario } from '../../store/damageScenarioActions';
import './DamageScenarioPage.css';

export default function DamageScenarioPage() {
  const [scenarioDetails, setScenarioDetails] = useState({ id: '', name: '', impactCategory: '', impact: '', reasoning: '', comment: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const damageScenarios = useSelector((state) => state.damageScenarios.damageScenarios);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenarioDetails({ ...scenarioDetails, [name]: value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const { id, name, impactCategory, impact, reasoning, comment } = scenarioDetails;
    if (!name.trim() || !impactCategory.trim() || !impact.trim()) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (editId) {
      dispatch(editDamageScenario(editId, { ...scenarioDetails, id: editId }));
      setEditId(null);
    } else {
      const newId = Math.random().toString(36).substr(2, 9); // Generating a pseudo-random ID
      dispatch(addDamageScenario({ ...scenarioDetails, id: newId }));
    }
    setScenarioDetails({ id: '', name: '', impactCategory: '', impact: '', reasoning: '', comment: '' });
  };

  const handleEdit = (id) => {
    const scenario = damageScenarios.find(scenario => scenario.id === id);
    if (scenario) {
      setScenarioDetails(scenario);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDamageScenario(id));
  };

  return (
    <div>
      <form onSubmit={handleAddOrUpdate}>
        <input name="name" value={scenarioDetails.name} onChange={handleChange} placeholder="Enter Damage Scenario Name" />
        <select name="impactCategory" value={scenarioDetails.impactCategory} onChange={handleChange}>
          <option value="">Select Impact Category</option>
          <option value="Safety">Safety</option>
          <option value="Financial">Financial</option>
          <option value="Operational">Operational</option>
          <option value="Privacy">Privacy</option>
          <option value="Legal">Legal</option>
        </select>
        <select name="impact" value={scenarioDetails.impact} onChange={handleChange}>
          <option value="">Select Impact</option>
          <option value="Severe">Severe</option>
          <option value="Major">Major</option>
          <option value="Moderate">Moderate</option>
          <option value="Negligible">Negligible</option>
        </select>
        <input name="reasoning" value={scenarioDetails.reasoning} onChange={handleChange} placeholder="Enter Reasoning" />
        <input name="comment" value={scenarioDetails.comment} onChange={handleChange} placeholder="Enter Comment" />
        <button type="submit">{editId ? 'Update' : 'Add'} Damage Scenario</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Impact Category</th>
            <th>Impact</th>
            <th>Reasoning</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {damageScenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.impactCategory}</td>
              <td>{scenario.impact}</td>
              <td>{scenario.reasoning}</td>
              <td>{scenario.comment}</td>
              <td>
                <button onClick={() => handleEdit(scenario.id)}>Edit</button>
                <button onClick={() => handleDelete(scenario.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}