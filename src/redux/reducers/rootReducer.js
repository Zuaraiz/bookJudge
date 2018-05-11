import {combineReducers} from 'redux';
import book from './SingleBookReducer';
import books from './bookReducer';


const rootReducer = combineReducers({
  // short hand property names
  books, book
})

export default rootReducer;