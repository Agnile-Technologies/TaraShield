import { createStore, combineReducers } from 'redux';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  project: projectReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('Store updated:', store.getState());
});

export default store;