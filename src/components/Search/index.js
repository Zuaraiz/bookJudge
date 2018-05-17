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
import Waypoint from 'react-waypoint';
import RefreshIndicator from 'material-ui/RefreshIndicator';
const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};
class Search extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : '',
      query : this.props.params.query,
      totalResult :  123,
      totalPages : 0,
      pageNumber : 1,
      isLoading : false

    }
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      //this.onBookClick = this.onBookClick.bind(this);
      this.handleLoadMore = this.handleLoadMore.bind(this);
      
  }
  componentWillMount(){
    this.props.actions.loadBooks({query: this.state.query, page: (this.state.pageNumber++).toString()})
  }
componentWillReceiveProps(nextProps) {
  
    if (nextProps.SearchResult !== this.props.SearchResult) {
      
        let dataBooks = [];
        let totalResults = 0;  
        let totalp= 2;
        const {BookList, TotalResults, Query, isLoading} = nextProps.SearchResult
        console.log('isLoading', isLoading)
        const books = nextProps.books 
        if(BookList.length > 0){
            if(TotalResults > 0){
              
                const query = Query;
                totalResults = TotalResults
                totalp = parseInt(totalResults/20);
                dataBooks = BookList.map(book => ({
                name: books[book].title,
                code: book,
                image: books[book].image,
                author: books[book].author,
                query,}))
                
                 this.setState({dataSource: [...this.state.dataSource,...dataBooks]})
                 this.setState({totalResult: totalResults})
                 this.setState({totalPages: totalp});
                //this.setState({dataSource: dataBooks})
                //this.setState({pageNumber: this.state.pageNumber+1})
            }
        }
    }
}
handleLoadMore()
{
  this.setState({isLoading : true})
  this.props.actions.loadBooks({query: this.state.query, page: (this.state.pageNumber++).toString()})
}

onBookClick(id)
{
  this.props.history.push(`/book/${id}`);

}

  render(){
    const dataConfig = {text : "name", value: "code", option: "query", photo : "image", author: "author"}
                                          console.log('search Props State: ', this.props)
                                          console.log('search k data result', this.state.dataSource)
                                          console.log('total results render',this.state.totalResult)
                                          console.log('total pages render',this.state.totalPages)

    
    let data = [];
    let page = this.state.pageNumber;
    let totalpages = this.state.totalPages;
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
            {page <= totalpages
                ? <div className="infinite-scroll-example__waypoint">
                    <Waypoint onEnter={this.handleLoadMore} />
                    <div style={style.container}>
                      <center>
                        <RefreshIndicator
                          size={40}
                          left={0}
                          top={20}
                          status="loading"
                          style={style.refresh}
                        />
                      </center>
                    </div>
                  </div>
                : <p />}

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
  SearchResult: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log('Props State: ', state.books)
    return {
      SearchResult: state.SearchResult,
      books : state.books
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