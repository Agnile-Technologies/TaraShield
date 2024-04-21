export const ADD_RISK = 'ADD_RISK';
export const EDIT_RISK = 'EDIT_RISK';
export const DELETE_RISK = 'DELETE_RISK';

export const addRisk = (riskData) => ({
  type: ADD_RISK,
  payload: riskData,
});

export const editRisk = (id, riskData) => ({
  type: EDIT_RISK,
  payload: { id, ...riskData },
});

export const deleteRisk = (id) => ({
  type: DELETE_RISK,
  payload: id,
});