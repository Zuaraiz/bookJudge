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
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import styles from './styles.scss';

class Books extends Component {

    constructor(props) {
      super(props);
      this.state = {
        dataSource : [],
        inputValue : '',
        query : this.props.params.id
      }
        //this.mapStateToProps = this.mapStateToProps.bind(this);
        //this.onBookClick = this.onBookClick.bind(this);
        
    }
    componentWillMount(){
      this.props.actions.loadSingleBook(this.state.query)
    }
  componentWillReceiveProps(nextProps) {
    
      if (nextProps.book !== this.props.book) {
          let dataBooks = [];
          let totalResults = 0;    
          const {book} = nextProps;  
          
            const bookData = book.title ? {    
                  name: book.title[0],
                  image: book.image_url,
                  author: book.authors[0].author[0].name,
                  averageRating : book.average_rating[0],
                  rating_count :book.ratings_count[0]
            } : {}
                  this.setState({dataSource: bookData})
                  console.log('bookdata', bookData);
              }
  }
    render(){
      const data = this.state.dataSource;
      console.log('data', data);
      if (data.name)
      {

        return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Card  className={styles.logo}>
              <CardMedia className={styles.logo}>
                <img className={styles.logo} src={data.image} alt="" />
              </CardMedia>
              <CardTitle title={data.name} subtitle={data.author} />
              <CardText>
                <p>
                  Average Rating:{data.averageRating}
                </p>

                <p>
                  Rating Count: {data.rating_count}
                </p>
              </CardText>
            </Card>
          </MuiThemeProvider >
        );
        
  
      }
      else {
        return(<center><p>Loading</p></center>);
      }
      
    }
  
  
  }
  
  function mapStateToProps(state, ownProps) {
    console.log('Props State: ', state.books)
      return {
        book: state.book
      };
   
    
  }
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Books);
