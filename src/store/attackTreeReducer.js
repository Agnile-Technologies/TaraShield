import { ADD_ATTACK_TREE, EDIT_ATTACK_TREE, DELETE_ATTACK_TREE } from './attackTreeActions';

const initialState = {
  attackTrees: [],
};

const attackTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ATTACK_TREE:
      console.log(`Adding attack tree: ${action.payload.name}`);
      return { ...state, attackTrees: [...state.attackTrees, action.payload] };
    case EDIT_ATTACK_TREE:
      console.log(`Editing attack tree with ID ${action.payload.id}: ${action.payload.name}`);
      return {
        ...state,
        attackTrees: state.attackTrees.map((tree) =>
          tree.id === action.payload.id ? { ...tree, ...action.payload } : tree),
      };
    case DELETE_ATTACK_TREE:
      console.log(`Deleting attack tree with ID ${action.payload}`);
      return {
        ...state,
        attackTrees: state.attackTrees.filter((tree) => tree.id !== action.payload),
      };
    default:
      console.log('Default case reached in attackTreeReducer with action type:', action.type);
      return state;
  }
};

export default attackTreeReducer;