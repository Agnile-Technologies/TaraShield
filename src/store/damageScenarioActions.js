export const ADD_DAMAGE_SCENARIO = 'ADD_DAMAGE_SCENARIO';
export const EDIT_DAMAGE_SCENARIO = 'EDIT_DAMAGE_SCENARIO';
export const DELETE_DAMAGE_SCENARIO = 'DELETE_DAMAGE_SCENARIO';

export const addDamageScenario = (damageScenarioData) => ({
  type: ADD_DAMAGE_SCENARIO,
  payload: damageScenarioData,
});

export const editDamageScenario = (id, damageScenarioData) => ({
  type: EDIT_DAMAGE_SCENARIO,
  payload: { id, ...damageScenarioData },
});

export const deleteDamageScenario = (id) => ({
  type: DELETE_DAMAGE_SCENARIO,
  payload: id,
});