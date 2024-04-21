export const ADD_THREAT = 'ADD_THREAT';
export const EDIT_THREAT = 'EDIT_THREAT';
export const DELETE_THREAT = 'DELETE_THREAT';

export const addThreat = (threatData) => {
  console.log("Adding threat:", threatData);
  return {
    type: ADD_THREAT,
    payload: threatData,
  };
};

export const editThreat = (id, threatData) => {
  console.log(`Editing threat with ID ${id}:`, threatData);
  return {
    type: EDIT_THREAT,
    payload: { id, ...threatData },
  };
};

export const deleteThreat = (id) => {
  console.log(`Deleting threat with ID ${id}`);
  return {
    type: DELETE_THREAT,
    payload: id,
  };
};