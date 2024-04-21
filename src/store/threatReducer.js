import { ADD_THREAT, EDIT_THREAT, DELETE_THREAT } from './threatActions';

const initialState = {
  threats: [],
};

const threatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_THREAT:
      console.log(`Adding threat: ${action.payload.name}`);
      return { ...state, threats: [...state.threats, action.payload] };
    case EDIT_THREAT:
      console.log(`Editing threat with ID ${action.payload.id}: ${action.payload.name}`);
      return {
        ...state,
        threats: state.threats.map((threat) =>
          threat.id === action.payload.id ? { ...threat, ...action.payload } : threat),
      };
    case DELETE_THREAT:
      console.log(`Deleting threat with ID ${action.payload}`);
      return {
        ...state,
        threats: state.threats.filter((threat) => threat.id !== action.payload),
      };
    default:
      console.log('Default case reached in threatReducer with action type:', action.type);
      return state;
  }
};

export default threatReducer;