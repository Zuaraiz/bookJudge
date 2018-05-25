import {combineReducers} from 'redux';
import books from './books';
import searchResult from './searchResult';


const rootReducer = combineReducers({
  // short hand property names
  books, searchResult
})

export default rootReducer;