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
      totalResult :  0,
      totalPages : 0,
      pageNumber : 1,
      isLoading : this.props.searchResult.isLoading

    }
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      //this.onBookClick = this.onBookClick.bind(this);
      this.handleLoadMore = this.handleLoadMore.bind(this);
      
  }
  componentWillMount(){
    this.props.actions.loadBooks({query: this.state.query, page: (this.state.pageNumber++).toString()})
  }
componentWillReceiveProps(nextProps) {
  
    if (nextProps.searchResult !== this.props.searchResult) {
      
        let dataBooks = [];
        let totalpage= 2;
        const {bookList, totalResults, query, isLoading} = nextProps.searchResult
        console.log('isLoading', isLoading)
        //this.setState({isLoading: isLoading})
        console.log('isLoadingState', this.state.isLoading)
        const books = nextProps.books 
        console.log('nextProps.books',nextProps.books)
        if(bookList.length > 0){
            if(totalResults > 0){
                totalpage = parseInt(totalResults/20);
                dataBooks = bookList.map(book => ({
                name: books[book].title,
                code: book,
                image: books[book].image,
                author: books[book].author,
                query: query,}))
                
                 this.setState({dataSource: [...this.state.dataSource,...dataBooks]})
                 this.setState({totalResult: totalResults})
                 this.setState({totalPages: totalpage});
                //this.setState({dataSource: dataBooks})
                //this.setState({pageNumber: this.state.pageNumber+1})
            }
        }
    }
}
handleLoadMore()
{
  //this.setState({isLoading : true})
  this.props.actions.loadBooks({query: this.state.query, page: (this.state.pageNumber++).toString()})
}

onBookClick(id)
{
  console.log(this.state.isLoading)
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
            {(page <= totalpages) && (this.state.isLoading = true)
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
      return(
        
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <center>
        <p>Wait while the search is being conducted</p>
        <RefreshIndicator
          size={40}
          left={0}
          top={20}
          status="loading"
          style={style.refresh}
        />
      </center>
      </MuiThemeProvider>

        );
    }
    
  }


}
Search.propTypes = {
  searchResult: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log('Props State: ', state.books)
    return {
      searchResult: state.searchResult,
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