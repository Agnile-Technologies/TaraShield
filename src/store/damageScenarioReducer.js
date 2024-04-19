import { ADD_DAMAGE_SCENARIO, EDIT_DAMAGE_SCENARIO, DELETE_DAMAGE_SCENARIO } from './damageScenarioActions';

const initialState = {
  damageScenarios: [],
};

const damageScenarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DAMAGE_SCENARIO:
      console.log(`Adding damage scenario: ${action.payload.name}`);
      return {
        ...state,
        damageScenarios: [...state.damageScenarios, action.payload],
      };
    case EDIT_DAMAGE_SCENARIO:
      console.log(`Editing damage scenario: ${action.payload.id}`);
      return {
        ...state,
        damageScenarios: state.damageScenarios.map((scenario) =>
          scenario.id === action.payload.id ? { ...scenario, ...action.payload } : scenario),
      };
    case DELETE_DAMAGE_SCENARIO:
      console.log(`Deleting damage scenario: ${action.payload}`);
      return {
        ...state,
        damageScenarios: state.damageScenarios.filter((scenario) => scenario.id !== action.payload),
      };
    default:
      console.log('Default case reached in damageScenarioReducer');
      return state;
  }
};

export default damageScenarioReducer;