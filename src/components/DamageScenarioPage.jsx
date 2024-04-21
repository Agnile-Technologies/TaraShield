import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDamageScenario, editDamageScenario, deleteDamageScenario } from '../store/damageScenarioActions';
import './DamageScenarioPage.css'; // Ensure CSS file is imported for styling

export default function DamageScenarioPage() {
  const [scenarioDetails, setScenarioDetails] = useState({ name: '', impactCategory: '', impact: '', reasoning: '', comment: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const damageScenarios = useSelector((state) => state.damageScenarios.damageScenarios);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenarioDetails({ ...scenarioDetails, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!scenarioDetails.name.trim() || !scenarioDetails.impactCategory.trim() || !scenarioDetails.impact.trim() || !scenarioDetails.reasoning.trim()) {
      console.error("All fields are required.");
      return;
    }
    if (editId) {
      dispatch(editDamageScenario(editId, scenarioDetails));
      console.log(`Damage scenario with ID ${editId} updated.`);
    } else {
      const newId = Date.now(); // Use Date.now() for a unique ID
      dispatch(addDamageScenario({ ...scenarioDetails, id: newId }));
      console.log("New damage scenario added.");
    }
    setScenarioDetails({ name: '', impactCategory: '', impact: '', reasoning: '', comment: '' });
    setEditId(null);
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
    console.log(`Damage scenario with ID ${id} deleted.`);
  };

  return (
    <div>
      <h2>Damage Scenario Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" value={scenarioDetails.name} onChange={handleChange} placeholder="Scenario Name" />
        <input type="text" name="impactCategory" value={scenarioDetails.impactCategory} onChange={handleChange} placeholder="Impact Category" />
        <input type="text" name="impact" value={scenarioDetails.impact} onChange={handleChange} placeholder="Impact" />
        <input type="text" name="reasoning" value={scenarioDetails.reasoning} onChange={handleChange} placeholder="Reasoning" />
        <input type="text" name="comment" value={scenarioDetails.comment} onChange={handleChange} placeholder="Comment" />
        <button onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'} Damage Scenario</button>
      </form>
      <ul>
        {damageScenarios.map((scenario) => (
          <li key={scenario.id}>
            {scenario.name} - {scenario.impactCategory} - {scenario.impact} - {scenario.reasoning} - {scenario.comment}
            <button onClick={() => handleEdit(scenario.id)}>Edit</button>
            <button onClick={() => handleDelete(scenario.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}