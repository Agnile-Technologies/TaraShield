import { createStore, combineReducers } from 'redux';
import projectReducer from './projectReducer';
import damageScenarioReducer from './damageScenarioReducer'; // Import the new reducer

const rootReducer = combineReducers({
  project: projectReducer,
  damageScenarios: damageScenarioReducer, // Add the new reducer to the combined reducers
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('Store updated:', store.getState());
});

export default store;