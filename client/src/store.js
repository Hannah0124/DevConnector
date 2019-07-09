// Import 2 functions
import {createStore, applyMiddleware} from 'redux'; 
// thunk? breaking it up. 
// Sometimes when you store big data, you may want to break it up.
import thunk from 'redux-thunk';

const middleware = [thunk];
// createStore(reducer, [preloadedState], [enhancer])
// preloadedStaet? initial state
// Since reducer can be multiple, it will be an array
// enhancer is a way to modify as the data is getting stored in the store.
const store = createStore(() => 
  [], 
  {},
   applyMiddleware(...middleware));

export default store;