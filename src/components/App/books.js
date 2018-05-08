import axios from 'axios';
import * as xmlParse from 'xml2js';

class bookApi {
  static getAllBooks(data) {
    let source = axios.CancelToken.source();
    source.cancel('Canceled previous Request');
    source = axios.CancelToken.source();
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=MIDoomTSw6xPfQONYXtDWw&q=
				${data.query}&search[field]=title&page=${data.page}`,
        { cancelToken: source.token }
      )
      .then(response => {
        const parseString = xmlParse.parseString;

        let books = response.data;
        parseString(response.data, (err, result) => {
          books = result.GoodreadsResponse.search;
        });
        books[0].page = data.page;
        return books;
      })
      .catch(error => error);
  }
}
/*
class bookApi{
function searchBooks_(query) {
  
  var baseUrl = "https://www.goodreads.com/book/show/",
      apiUrl = "https://www.goodreads.com/search/index.xml",
      apiKey = "ctrlq.org",
      searchResults = [],
      payload = {
        q: query,
        key: 3NtKu3N5TONuz0uVdAQig
      },
      params = {
        method: "GET",
        payload: payload,
        muteHttpExceptions: true
      };
  
  var response = UrlFetchApp.fetch(apiUrl, params);
  
  // API Connection Successful
  if (response.getResponseCode() === 200) {
    
    // Parse XML Response
    var xml = XmlService.parse(response.getContentText());
    var results = xml.getRootElement().getChildren('search')[0];
    
    // Save the result in JSON format
    results.getChild('results').getChildren().forEach(function(result) {
      result.getChildren('best_book').forEach(function(book) {
        searchResults.push({
          title: book.getChild('title').getText(),
          author: book.getChild('author').getChild('name').getText(),
          thumbnail: book.getChild('image_url').getText(),
          rating: result.getChild("average_rating").getText(),
          url: baseUrl + result.getChild("id").getText()
        });
      });
    });
    
  }

  return searchResults;
  
}
}*/
export default bookApi;