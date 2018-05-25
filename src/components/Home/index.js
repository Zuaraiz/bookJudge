
import React, {Component , PropTypes} from 'react';
import booksApi from '../App/books.js';
import Lists from '../Lists'
import styles from './styles.scss';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions/bookActions'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
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
      margin : '1em',
    },
  };
  var divStyle = {
    width: '100%'
  };
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : '',
      query : '',
      isLoading : this.props.searchResult.isLoading
    }
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleNewRequest = this.handleNewRequest.bind(this);
      
  }
    

  
handleClick()
{
    console.log('handler called')
    const { inputValue } = this.state;
    const { history } = this.props;

    if (inputValue.length > 0) {
      // history.push('/search/' + value);
      history.push(`/search/${inputValue}`);
    }

    event.preventDefault();
}
handleNewRequest(chosenRequest)
{
    console.log('new request called')
    if (chosenRequest.code === 'search') {
        this.props.history.push(`/search/${chosenRequest.query}`);
      } else {
        this.props.history.push(`/book/${chosenRequest.code}`);
    }
}

handleChange(event)
{
    console.log('handler called')
    //let term = event.target.value
    //this.setState({isLoading: true})
    this.setState({inputValue: event});
    this.props.actions.loadBooks({query: event, page: '1'})
}
componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult !== this.props.searchResult) {
        let dataBooks = [];
        const {isLoading, bookList, totalResults, query} = nextProps.searchResult
        this.setState({isLoading})
        const books = nextProps.books
        console.log(query)
        console.log(books)
        console.log(totalResults)
        console.log('bookList', bookList)
        if(bookList.length > 0){
            if(totalResults>0){
                dataBooks = bookList.filter((i, index) => index < 5).map(book => ({
                name: books[book].title,
                code: book,
                query: query,
            }))
                if(totalResults > 5)
                    {
                        dataBooks.push({
                            name: (totalResults - 5) + " Other Results",
                            code: "search",
                            query: query,
                        })
                    }
                this.setState({dataSource: dataBooks})
                console.log(this.state.dataSource)
            }
        }
    }
}

render() {
    
	console.log('Home Props State: ', this.props)
    
                                                      
    const dataConfig = {text : "name", value: "code", option: "query"}
    console.log("home k Results", this.state.dataSource)
    console.log ('input val' ,this.state.inputValue)
    console.log ('lading val' ,this.state.isLoading)
    //console.log('try :  ', this.state.dataSource[0].results[0].work[0].best_book[0].title)
    const config = { };
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <section>
        <div>
            <div >
            <AutoComplete
                hintText="Search Book"
                filter={AutoComplete.noFilter}
                dataSource    = {this.state.dataSource}
                dataSourceConfig={dataConfig}
                onUpdateInput = {this.handleChange}
                floatingLabelText="Search Book"
                openOnFocus={true}
                onNewRequest={this.handleNewRequest} />
                
                {(this.state.inputValue!='') & (this.state.isLoading != false)? 
                            <RefreshIndicator
                            size={40}
                            left={0}
                            top={20}
                            status="loading"
                            style={style.refresh}
                            />
                    : <p />}
            </div>  
            <div>
            <button className={styles.button} label="Find Book" onClick={this.handleClick} >Search</button>
            </div>
        </div>
        <div>   
        </div>
        
        </section>
 </MuiThemeProvider>


    );
  
}

}
Home.propTypes = {
  searchResult: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log('searchResult Props State home: ', state.searchResult)
    console.log('books Props State home: ', state.books)
    return {
        searchResult: state.searchResult,
        books : state.books
    };
 
  
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
  



/*<Lists props = {this.state.dataSource}/>
  
  
   query is {this.state.dataSource[0].query}
  
   {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}
   
   <Lists dp= {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}/>
   working <Lists dp= {this.state.dataSource[0].page}/>
   
   
   
   <section>
        <input onChange ={this.handleChange} />
        <button className={styles.button} label="Find Book" onClick={this.handleClick} />
        <Lists dp= {this.state.dataSource}/>
        <div>   
        </div>
      </section>
   
   
  */


//render() {
//    console.log("Results", this.state.dataSource)
//    //console.log('try :  ', this.state.dataSource[0].results[0].work[0].best_book[0].title)
//    const config = { };
//    return (
//      <section>
//        <AutoComplete
//            hintText="Search Book"
//            filter={AutoComplete.noFilter}
//            dataSource={books}
//            dataSourceConfig={config}
//            onUpdateInput={this.handleClick}
//            openOnFocus={true}
//            floatingLabelText="Search Book"
//            fullWidth
//          />
//        <input onChange ={this.handleClick} />
//        <button className={styles.button} label="Find Book" onClick={this.handleClick} />
//        <Lists dp= {this.state.dataSource}/>
//        <div>   
//        </div>
//      </section>
//    );
//  
//}