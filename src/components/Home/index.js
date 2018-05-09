
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
      this.GoodReads = this.GoodReads.bind(this);
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      
  }
    
componentWillMount()
{
    this.props.actions.loadBooks(this.state.inputValue);
}
  componentWillReceiveProps(nextProps) {
   
  }
handleClick()
{
    console.log('handler called')
      this.GoodReads();
}
GoodReads(searchTerm) {
    var search = searchTerm;
    let result = [];
    booksApi.getAllBooks({query: search, page: '1'}).then((books) => {
        console.log('Result: ',books) //status 400    
        if(books[0])
            {
                if(books[0]["total-results"][0] > 0){
                    result = books[0].results[0].work
                }
            }
        this.setState({dataSource: result})
    })
    debugger;
    console.log(result);

}
handleChange(event)
{
    console.log('handler called')
    //let term = event.target.value
    this.setState({inputValue: event});
      this.GoodReads(this.state.inputValue);
}
//componentDidMount()
//    {
//        console.log('datasrc after' , this.state.dataSource);
//    }

render() {
    
	console.log('Home Props State: ', this.props)
    console.log("Results", this.state.dataSource)
    //console.log('try :  ', this.state.dataSource[0].results[0].work[0].best_book[0].title)
    const config = { };
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <section>
        <div>
        
          <AutoComplete
            dataSource    = {this.state.dataSource}
            onUpdateInput = {this.handleChange} />
          
        <button className={styles.button} label="Find Book" onClick={this.handleClick} />
        </div>
        <div>
        <Lists dp= {this.state.dataSource}/>
        </div>
        </section>
 </MuiThemeProvider>


    );
  
}

}
Home.propTypes = {
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