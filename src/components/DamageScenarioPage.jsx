import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDamageScenario, editDamageScenario, deleteDamageScenario } from '../store/damageScenarioActions';

export default function DamageScenarioPage() {
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const damageScenarios = useSelector((state) => state.damageScenarios.damageScenarios);

  const handleAdd = () => {
    if (!inputValue.trim()) {
      console.error("Input value for damage scenario cannot be empty.");
      return;
    }
    if (editId) {
      dispatch(editDamageScenario(editId, { id: editId, name: inputValue }));
      setEditId(null);
    } else {
      const newScenario = { id: Date.now(), name: inputValue };
      dispatch(addDamageScenario(newScenario));
    }
    setInputValue('');
  };

  const handleEdit = (id) => {
    const scenario = damageScenarios.find(scenario => scenario.id === id);
    if (scenario) {
      setInputValue(scenario.name);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDamageScenario(id));
  };

  return (
    <div>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAdd}>{editId ? 'Update' : 'Add'} Damage Scenario</button>
      <ul>
        {damageScenarios.map((scenario) => (
          <li key={scenario.id}>
            {scenario.name}
            <button onClick={() => handleEdit(scenario.id)}>Edit</button>
            <button onClick={() => handleDelete(scenario.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}