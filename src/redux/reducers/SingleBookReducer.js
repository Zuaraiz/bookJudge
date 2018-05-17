import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function SingleBookReducer(state = {}, action) {
    const APIresponse = action.books
    switch(action.type) {
      case types.LOAD_BOOKS:
        const TotalResults = APIresponse[0]["total-results"][0];
        const nextState = state;
        if(TotalResults > 0){
          const AllBooksArray = APIresponse[0].results[0].work;
          AllBooksArray.forEach(element => {
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