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
    const { books, params } = props;
    console.log('bp',props)
    this.state = {
      bookid: params.id,
      book: books[params.id],
    };
  }
  componentWillReceiveProps(nextProps) {
    
      if (nextProps.books !== this.props.books) {
          const { params, books } = this.props;
          const { bookid } = params.id;
          const book = books[params];
          this.setState({ bookid, book });
        }
  }
    render(){
      const {book} = this.state
      if (book)
      {

        return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Card  className={styles.logo}>
              <CardMedia className={styles.logo}>
                <img className={styles.logo} src={book.image} alt="" />
              </CardMedia>
              <CardTitle title={book.title} subtitle={book.author} />
              <CardText>
                <p>
                  Average Rating:{book.averageRating}
                </p>

                <p>
                  Rating Count: {book.ratingCount}
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
        books: state.books
      };
   
    
  }
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Books);
