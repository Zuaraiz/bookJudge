import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import booksApi from './books.js'

import styles from './styles.scss';

/*const bdata= 'hobbit';
let datassss = booksApi.getAllBooks(bdata);
console.log(datassss);*/


function App({ children }) {
  return (
    <div>
      <i className={styles.logo} />
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
      </ul>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
