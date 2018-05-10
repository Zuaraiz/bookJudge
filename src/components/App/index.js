import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import booksApi from './books.js';
import configureStore from '../../redux/store/configureStore';
import { Provider } from 'react-redux'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';

const store = configureStore();

function App({ children }) {
  return (
      <Provider store={store}>
      <MuiThemeProvider>
    <div>
      <ul className={styles.nav}></ul>
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
