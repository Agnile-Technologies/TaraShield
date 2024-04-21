import { createStore, combineReducers } from 'redux';
import projectReducer from './projectReducer';
import damageScenarioReducer from './damageScenarioReducer';
import riskAssessmentReducer from './riskAssessmentReducer'; // Import the risk assessment reducer
import threatReducer from './threatReducer'; // Import the threat reducer
import securityGoalReducer from './securityGoalReducer.js'; // Import the security goal reducer
import attackTreeReducer from './attackTreeReducer'; // Import the attack tree reducer

const rootReducer = combineReducers({
  project: projectReducer,
  damageScenarios: damageScenarioReducer,
  riskAssessments: riskAssessmentReducer, // Add the risk assessment reducer to the combined reducers
  threats: threatReducer, // Add the threat reducer to the combined reducers
  securityGoals: securityGoalReducer, // Add the security goal reducer to the combined reducers
  attackTrees: attackTreeReducer, // Add the attack tree reducer to the combined reducers
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('Store updated:', store.getState());
});

export default store;