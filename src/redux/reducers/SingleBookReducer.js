import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function SingleBookReducer(state = initialState.book, action) {
  switch(action.type) {

     case types.LOAD_SINGLE_BOOK:
          console.log("Reducer Single Books: ",action.book)
      return action.book
    default: 
      return state;
  }
}