import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSecurityGoal, editSecurityGoal, deleteSecurityGoal } from '../../store/securityGoalActions';
import './SecurityGoalsPage.css';

const SecurityGoalsTable = () => {
  const dispatch = useDispatch();
  const securityGoals = useSelector((state) => state.securityGoals.securityGoals);
  const [newGoal, setNewGoal] = useState({ name: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddNewGoal = () => {
    if (!newGoal.name || !newGoal.description) {
      console.error("All fields are required.");
      return;
    }
    dispatch(addSecurityGoal({ ...newGoal, id: Date.now() }));
    setNewGoal({ name: '', description: '' });
    setIsAdding(false);
    console.log("Security goal added successfully.");
  };

  const handleDeleteGoal = (id) => {
    dispatch(deleteSecurityGoal(id));
    console.log(`Security goal with ID ${id} deleted.`);
  };

  return (
    <div>
      <button onClick={() => setIsAdding(!isAdding)}>Add New Security Goal</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {securityGoals.map((goal) => (
            <tr key={goal.id}>
              <td>{goal.name}</td>
              <td>{goal.description}</td>
              <td>
                <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td><input type="text" name="name" value={newGoal.name} onChange={handleInputChange} placeholder="Name" /></td>
              <td><input type="text" name="description" value={newGoal.description} onChange={handleInputChange} placeholder="Description" /></td>
              <td><button onClick={handleAddNewGoal}>Save</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityGoalsTable;