import { CREATE_PROJECT } from './projectActions';

const initialState = {
  currentProject: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      console.log(`Creating project with name: ${action.payload.name} at path: ${action.payload.path}`);
      return {
        ...state,
        currentProject: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;