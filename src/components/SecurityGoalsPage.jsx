import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSecurityGoal, editSecurityGoal, deleteSecurityGoal, linkSecurityGoalToRisk } from '../../store/securityGoalActions';
import Modal from '../common/Modal'; // Assuming a Modal component exists for selection
import './SecurityGoalsPage.css'; // Corrected import for specific CSS file for SecurityGoalsPage

const SecurityGoalsPage = () => {
  const [securityGoal, setSecurityGoal] = useState({ name: '', description: '', associatedRisks: [] });
  const [editId, setEditId] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState(null);
  const dispatch = useDispatch();
  const securityGoals = useSelector((state) => state.securityGoals.securityGoals);
  const risks = useSelector((state) => state.riskAssessments.risks);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecurityGoal({ ...securityGoal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(editSecurityGoal(editId, securityGoal));
    } else {
      dispatch(addSecurityGoal({ ...securityGoal, id: Date.now() }));
    }
    setSecurityGoal({ name: '', description: '', associatedRisks: [] });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const goalToEdit = securityGoals.find((g) => g.id === id);
    setSecurityGoal({ name: goalToEdit.name, description: goalToEdit.description, associatedRisks: goalToEdit.associatedRisks });
    setEditId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteSecurityGoal(id));
  };

  const handleLink = (id) => {
    setCurrentGoalId(id);
    setShowLinkModal(true);
  };

  const handleLinkRisksToGoal = (selectedRisks) => {
    dispatch(linkSecurityGoalToRisk(currentGoalId, selectedRisks));
    setShowLinkModal(false);
  };

  return (
    <div>
      <h2>Security Goals Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={securityGoal.name} onChange={handleChange} placeholder="Security Goal Name" className="form-input" />
        <textarea name="description" value={securityGoal.description} onChange={handleChange} placeholder="Description" className="form-input"></textarea>
        <button type="submit" className="button">{editId ? 'Update Security Goal' : 'Add Security Goal'}</button>
      </form>
      <div className="security-goal-list">
        {securityGoals.map((g) => (
          <div key={g.id} className="security-goal-item">
            <h3>{g.name}</h3>
            <p>{g.description}</p>
            <button onClick={() => handleEdit(g.id)} className="button-edit">Edit</button>
            <button onClick={() => handleDelete(g.id)} className="button-delete">Delete</button>
            <button onClick={() => handleLink(g.id)} className="button">Link to Risks</button>
          </div>
        ))}
      </div>
      {showLinkModal && (
        <Modal
          title="Link Risks to Security Goal"
          onClose={() => setShowLinkModal(false)}
          onSave={handleLinkRisksToGoal}
          risks={risks}
        />
      )}
    </div>
  );
};

export default SecurityGoalsPage;