import {combineReducers} from 'redux';
import books from './SingleBookReducer';
import SearchResult from './bookReducer';


const rootReducer = combineReducers({
  // short hand property names
  books, SearchResult
})

export default rootReducer;