import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function bookReducer(state = {}, action) {
  const APIresponse = action.books
  switch(action.type) {
    case types.LOAD_BOOKS:
      const TotalResults = APIresponse[0]["total-results"][0];
      let SearchResult = {}
      console.log(TotalResults)
      if(TotalResults > 0){
        const AllBooksArray = APIresponse[0].results[0].work;
        //console.log('all b ar', AllBooksArray)
        const AllBooks = [];
        AllBooksArray.forEach(element => {
          const bestBook = element.best_book[0];
          AllBooks.push(bestBook.id[0]._)
          console.log(bestBook) 
          //console.log('SearchResult' , SearchResult)
        });
        SearchResult = {
          isLoading : false,
          BookList : AllBooks,
          TotalResults : TotalResults,
          Query : APIresponse[0].query,}
        //console.log("Reducer Books sr: ",SearchResult)
        //console.log("All books: ",AllBooks)
        return SearchResult
      }
      
     
    default: 
      return state;
  }
}