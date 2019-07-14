// Import 2 functions 
import {createStore, applyMiddleware, compose} from 'redux'; 
// thunk? breaking it up. 
// Sometimes when you store big data, you may want to break it up.
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // importing index.js file

const initialState = {};
const middleware = [thunk];
// createStore(reducer, [preloadedState], [enhancer])
// preloadedStaet? initial state
// Since reducer can be multiple, it will be an array
// enhancer is a way to modify as the data is getting stored in the store.
const store = createStore( 
  rootReducer, 
  initialState,
  compose(applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;