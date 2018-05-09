import {createStore, applyMiddleware} from 'redux';  
import rootReducer from '../reducers/rootReducer';  
import thunk from 'redux-thunk';

export default function configureStore() {  
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}
//
//import { createStore } from 'redux';
//import rootReducer from '../reducers/index';
//
//export default function configureStore(initialState) {
//  const store = createStore(rootReducer, initialState);
//
//  if (module.hot) {
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('../reducers', () => {
//      const nextRootReducer = require('../reducers/index');
//      store.replaceReducer(nextRootReducer);
//    });
//  }
//
//  return store;
//}