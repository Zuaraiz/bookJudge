import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

function isLoading(state = false, action) {
  const apiResponse = action.books
  switch(action.type) {
    case types.LOAD_BOOKS:
    return false
    case types.LOAD_BOOKS_LOADING:
    return true
  }
  return state
}

function bookList(state = [], action) {
  const apiResponse = action.books
  switch(action.type) {
    case types.LOAD_BOOKS:
      const allBooksArray = apiResponse[0].results[0].work;
      //console.log('all b ar', allBooksArray)
      const bookList = [];
      allBooksArray.forEach(element => {
        const bestBook = element.best_book[0];
        bookList.push(bestBook.id[0]._)
        console.log(bestBook)
      });
      return bookList

  }
  return state

}

function totalResults(state = 0, action) {
  const apiResponse = action.books
  switch(action.type) {
    case types.LOAD_BOOKS:
    const totalResults = apiResponse[0]["total-results"][0];
    return totalResults
  }
  return state
}

function query(state = '', action) {
  const apiResponse = action.books
  switch(action.type) {
    case types.LOAD_BOOKS:
    const query = apiResponse[0].query;
    return query
  }
  return state

}

export default combineReducers({
  isLoading, bookList, totalResults, query
})
