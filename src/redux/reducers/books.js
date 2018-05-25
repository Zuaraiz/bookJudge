import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function books(state = {}, action) {
    const apiResponse = action.books
    console.log('state',state)
    switch(action.type) {
      case types.LOAD_BOOKS:
        const totalResults = apiResponse[0]["total-results"][0];
        const nextState = state;
        if(totalResults > 0){
          const allBooksArray = apiResponse[0].results[0].work;
          allBooksArray.forEach(element => {
            const bestBook = element.best_book[0];
            nextState[`${bestBook.id[0]._}`] = {
              id: bestBook.id[0]._,
              title: bestBook.title[0], 
              author: bestBook.author[0].name[0],
              image: bestBook.image_url[0],
              averageRating: element.average_rating[0],
              ratingCount: element.ratings_count[0]._,}
          });
          return nextState
         
        }
       
    default: 
      return state;
      
  }
}