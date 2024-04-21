export const ADD_SECURITY_GOAL = 'ADD_SECURITY_GOAL';
export const EDIT_SECURITY_GOAL = 'EDIT_SECURITY_GOAL';
export const DELETE_SECURITY_GOAL = 'DELETE_SECURITY_GOAL';
export const LINK_SECURITY_GOAL_TO_RISK = 'LINK_SECURITY_GOAL_TO_RISK';

export const addSecurityGoal = (securityGoalData) => {
  console.log("Adding security goal:", securityGoalData);
  return {
    type: ADD_SECURITY_GOAL,
    payload: securityGoalData,
  };
};

export const editSecurityGoal = (id, securityGoalData) => {
  console.log(`Editing security goal with ID ${id}:`, securityGoalData);
  return {
    type: EDIT_SECURITY_GOAL,
    payload: { id, ...securityGoalData },
  };
};

export const deleteSecurityGoal = (id) => {
  console.log(`Deleting security goal with ID ${id}`);
  return {
    type: DELETE_SECURITY_GOAL,
    payload: id,
  };
};

export const linkSecurityGoalToRisk = (securityGoalId, risks) => {
  console.log(`Linking security goal with ID ${securityGoalId} to risks:`, risks);
  return {
    type: LINK_SECURITY_GOAL_TO_RISK,
    payload: { securityGoalId, risks },
  };
};