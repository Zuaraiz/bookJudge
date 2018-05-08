import React, {Component} from 'react';
import booksApi from '../App/books.js';
import Lists from '../Lists'
import styles from './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [''],
      inputValue : ''
    }
      this.GoodReads = this.GoodReads.bind(this);
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      this.handleClick = this.handleClick.bind(this);
      
      this.GoodReads();
  }
    
//componentWillMount()
//{
//    
//}
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      const { query, items, totalResults } = nextProps.searchResults;
      const dataSource = nextProps.books;
      this.setState({ query });
      if (items.length > 0) {
        const bookData = items.filter((i, index) => index < 5).map(book => ({
          name: books[book].title,
          code: book,
          author: books[book].author,
          image: books[book].image,
        }));
        if (items.length > 5) {
          bookData.push({
            name: `${parseInt(totalResults, 10) - 5} Other Results`,
            code: 'search',
            author: query,
            image: '',
          });
        }
        this.setState({ dataSource: bookData });
      }
    }
  }
handleClick()
{
    console.log('handler called')
}

GoodReads() {
    var search = "The Hobbit";
    let result = [];
    booksApi.getAllBooks({query: search, page: '1'}).then((books) => {
        console.log('Result: ',books) //status 400

        result = books;
        this.setState({dataSource: result})
    })
    debugger;
    console.log(result);

}
//componentDidMount()
//    {
//        console.log('datasrc after' , this.state.dataSource);
//    }

render() {
    let x = this.state.dataSource[0].results;
    console.log('x' , x);
    console.log('datasrc' , this.state.dataSource[0].results);
    //console.log('try :  ', this.state.dataSource[0].results[0].work[0].best_book[0].title)
    const config = { };
    return (
      <section>
        <input />
        <button className={styles.button} label="Find Book" onClick={this.handleClick} />
        <Lists dp= {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}/>
        <div>   
        </div>
      </section>
    );
  
}
}
export default Home;
  /*<Lists props = {this.state.dataSource}/>
  
  
   query is {this.state.dataSource[0].query}
  
   {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}
   
   <Lists dp= {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}/>
   working <Lists dp= {this.state.dataSource[0].page}/>
  */