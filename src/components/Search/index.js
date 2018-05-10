import React, {Component , PropTypes} from 'react';
import booksApi from '../App/books.js';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions/bookActions'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import List, { ListItem } from 'material-ui/List';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';

class Search extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : '',
      query : this.props.params.query
    }
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      //this.onBookClick = this.onBookClick.bind(this);
      
  }
  componentWillMount(){
    this.props.actions.loadBooks({query: this.state.query, page: '1'})
  }
componentWillReceiveProps(nextProps) {
  
    if (nextProps.books !== this.props.books) {
      this.props.actions.loadBooks({query: this.state.query, page: '1'})
        let dataBooks = [];
        let totalResults = 0;    
        const {books} = nextProps;  
        if(books.length >0){
            if(books[0]["total-results"][0]>0){
                const query = books[0].query[0];
                totalResults = books[0]["total-results"][0];
                dataBooks = books[0].results[0].work.map(book => ({
                name: book.best_book[0].title[0],
                code: book.best_book[0].id[0]._,
                image: book.best_book[0].image_url,
                author: book.best_book[0].author[0].name,
                query,}))
                
                this.setState({dataSource: dataBooks})
            }
        }
    }
}
onBookClick(id)
{
  this.props.history.push(`/book/${id}`);

}
  render(){
    const dataConfig = {text : "name", value: "code", option: "query", photo : "image", author: "author"}
    console.log('search Props State: ', this.props)
    console.log('search k data result', this.state.dataSource)
    let data = [];
    data = this.state.dataSource;
    console.log('data', data);
    if(data.length > 0){
      return(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <section>
            <center><p>Search Results for: <b>{this.state.query}</b></p></center>
            <List>
              {data.map((data, index) =>
              <ListItem
                onClick={this.onBookClick.bind(this, data.code)}
                key={index}
                primaryText={data.name}
                secondaryText={
                  <p>Written By:
                    <span>
                      {data.author}
                    </span>
                  </p>
                }
                secondaryTextLines={2}
              />
            )}


            </List>

          </section>
          </MuiThemeProvider>
      );
      

    }
    else {
      return(<center><p>wait while the search is being conducted</p></center>);
    }
    
  }


}
Search.propTypes = {
  books: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log('Props State: ', state.books)
    return {
      books: state.books
    };
 
  
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
/*<ul>
          <p>The Searched Trem is : <b>{this.state.query}</b></p>
          <li>{data[0].name}</li>
          <li>{data[0].code}</li>
          <li>{data[0].image}</li>
          <li>{data[0].author}</li>
        </ul>*/