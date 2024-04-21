import { ADD_SECURITY_GOAL, EDIT_SECURITY_GOAL, DELETE_SECURITY_GOAL, LINK_SECURITY_GOAL_TO_RISK } from './securityGoalActions';

const initialState = {
  securityGoals: [],
};

const securityGoalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SECURITY_GOAL:
      console.log(`Adding security goal: ${action.payload.name}`);
      return { ...state, securityGoals: [...state.securityGoals, action.payload] };
    case EDIT_SECURITY_GOAL:
      console.log(`Editing security goal with ID ${action.payload.id}: ${action.payload.name}`);
      return {
        ...state,
        securityGoals: state.securityGoals.map((goal) =>
          goal.id === action.payload.id ? { ...goal, ...action.payload } : goal),
      };
    case DELETE_SECURITY_GOAL:
      console.log(`Deleting security goal with ID ${action.payload}`);
      return {
        ...state,
        securityGoals: state.securityGoals.filter((goal) => goal.id !== action.payload),
      };
    case LINK_SECURITY_GOAL_TO_RISK:
      console.log(`Linking security goal with ID ${action.payload.securityGoalId} to risks:`, action.payload.risks);
      return {
        ...state,
        securityGoals: state.securityGoals.map((goal) => {
          if (goal.id === action.payload.securityGoalId) {
            return { ...goal, associatedRisks: action.payload.risks };
          }
          return goal;
        }),
      };
    default:
      console.log('Default case reached in securityGoalReducer with action type:', action.type);
      return state;
  }
};

export default securityGoalReducer;