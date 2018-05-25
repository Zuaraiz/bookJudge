import * as types from './actionTypes';
import bookApi from '../../api/books';

export function loadBooksSuccess(books) {
  return {type: types.LOAD_BOOKS, books};
}

export function loadBooksIsLoading() {
  return {type: types.LOAD_BOOKS_LOADING};
}

export function loadBooks(query) {
   return function(dispatch) {
    dispatch(loadBooksIsLoading());
    return bookApi.getAllBooks(query).then(books => {
      dispatch(loadBooksSuccess(books));
    }).catch(error => {
      throw(error);
    });
  };
}