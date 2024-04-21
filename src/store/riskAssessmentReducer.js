import { ADD_RISK, EDIT_RISK, DELETE_RISK } from './riskAssessmentActions';

const initialState = {
  risks: [],
};

const riskAssessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RISK:
      console.log(`Adding risk: ${action.payload.name}`);
      return { ...state, risks: [...state.risks, action.payload] };
    case EDIT_RISK:
      console.log(`Editing risk: ${action.payload.id}`);
      return {
        ...state,
        risks: state.risks.map((risk) => risk.id === action.payload.id ? { ...risk, ...action.payload } : risk),
      };
    case DELETE_RISK:
      console.log(`Deleting risk: ${action.payload}`);
      return {
        ...state,
        risks: state.risks.filter((risk) => risk.id !== action.payload),
      };
    default:
      return state;
  }
};

export default riskAssessmentReducer;