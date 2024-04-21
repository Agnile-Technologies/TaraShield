export const ADD_ATTACK_TREE = 'ADD_ATTACK_TREE';
export const EDIT_ATTACK_TREE = 'EDIT_ATTACK_TREE';
export const DELETE_ATTACK_TREE = 'DELETE_ATTACK_TREE';

export const addAttackTree = (attackTreeData) => {
  console.log("Adding attack tree:", attackTreeData);
  return {
    type: ADD_ATTACK_TREE,
    payload: attackTreeData,
  };
};

export const editAttackTree = (id, attackTreeData) => {
  console.log(`Editing attack tree with ID ${id}:`, attackTreeData);
  return {
    type: EDIT_ATTACK_TREE,
    payload: { id, ...attackTreeData },
  };
};

export const deleteAttackTree = (id) => {
  console.log(`Deleting attack tree with ID ${id}`);
  return {
    type: DELETE_ATTACK_TREE,
    payload: id,
  };
};