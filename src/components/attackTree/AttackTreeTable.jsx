import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAttackTree, editAttackTree, deleteAttackTree } from '../../store/attackTreeActions';
import './AttackTreePage.css';

const AttackTreeTable = () => {
  const [newTree, setNewTree] = useState({ name: '', steps: '', feasibility: '' });
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const attackTrees = useSelector((state) => state.attackTrees.attackTrees);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTree({ ...newTree, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!newTree.name || !newTree.steps || !newTree.feasibility) {
      console.error("All fields are required.");
      return;
    }
    if (editId) {
      dispatch(editAttackTree(editId, newTree));
      console.log(`Attack tree with ID ${editId} updated.`);
    } else {
      dispatch(addAttackTree({ ...newTree, id: Date.now() }));
      console.log("New attack tree added.");
    }
    setNewTree({ name: '', steps: '', feasibility: '' });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const tree = attackTrees.find(tree => tree.id === id);
    setNewTree({ name: tree.name, steps: tree.steps, feasibility: tree.feasibility });
    setEditId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteAttackTree(id));
    console.log(`Attack tree with ID ${id} deleted.`);
  };

  return (
    <div>
      <button onClick={() => setEditId(null)}>Add New Attack Tree</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Steps</th>
            <th>Feasibility</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attackTrees.map((tree) => (
            <tr key={tree.id}>
              <td>{tree.name}</td>
              <td>{tree.steps}</td>
              <td>{tree.feasibility}</td>
              <td>
                <button onClick={() => handleEdit(tree.id)}>Edit</button>
                <button onClick={() => handleDelete(tree.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" value={newTree.name} name="name" onChange={handleChange} placeholder="Name" /></td>
            <td><input type="text" value={newTree.steps} name="steps" onChange={handleChange} placeholder="Steps" /></td>
            <td><input type="text" value={newTree.feasibility} name="feasibility" onChange={handleChange} placeholder="Feasibility" /></td>
            <td><button onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttackTreeTable;