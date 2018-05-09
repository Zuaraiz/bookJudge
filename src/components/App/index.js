import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import booksApi from './books.js';
import configureStore from '../../redux/store/configureStore';
import { Provider } from 'react-redux'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles.scss';

const store = configureStore();


/*const bdata= 'hobbit';
let datassss = booksApi.getAllBooks(bdata);
console.log(datassss);*/


function App({ children }) {
  return (
      <Provider store={store}>
      <MuiThemeProvider>
    <div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/tools">
            Tools
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/search">
            Search
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/book">
            Book
          </Link>
        </li>
      </ul>
      <div className={styles.content}>
        {children}
      </div>
    </div>
      </MuiThemeProvider>
      </Provider>
    
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
