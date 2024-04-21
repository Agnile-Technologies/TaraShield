import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAttackTree, editAttackTree, deleteAttackTree } from '../../store/attackTreeActions';
import './AttackTreePage.css';

const AttackTreePage = () => {
  const [attackTree, setAttackTree] = useState({ name: '', steps: '', feasibility: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const attackTrees = useSelector((state) => state.attackTrees.attackTrees);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttackTree({ ...attackTree, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepsArray = attackTree.steps.split(',').map(step => step.trim());
    if (editId) {
      dispatch(editAttackTree(editId, { ...attackTree, steps: stepsArray }));
      console.log('Attack tree updated:', attackTree);
    } else {
      dispatch(addAttackTree({ ...attackTree, steps: stepsArray, id: Date.now() }));
      console.log('Attack tree added:', attackTree);
    }
    setAttackTree({ name: '', steps: '', feasibility: '' });
    setEditId(null);
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteAttackTree(id));
    console.log('Attack tree deleted:', id);
  };

  return (
    <div className="attack-tree-page">
      <h2>Attack Tree Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={attackTree.name} onChange={handleChange} placeholder="Attack Tree Name" className="form-input" />
        <textarea name="steps" value={attackTree.steps} onChange={handleChange} placeholder="Define attack steps, separated by commas" className="form-input"></textarea>
        <input type="text" name="feasibility" value={attackTree.feasibility} onChange={handleChange} placeholder="Attack Feasibility" className="form-input" />
        <button type="submit" className="button">{editId ? 'Update Attack Tree' : 'Add Attack Tree'}</button>
      </form>
      <div className="attack-tree-list">
        {attackTrees.map((tree) => (
          <div key={tree.id} className="attack-tree-item">
            <h3>{tree.name}</h3>
            <p>Steps: {tree.steps.join(', ')}</p>
            <p>Feasibility: {tree.feasibility}</p>
            <button onClick={() => handleEdit(tree.id)} className="button-edit">Edit</button>
            <button onClick={() => handleDelete(tree.id)} className="button-delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackTreePage;