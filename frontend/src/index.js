import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import App from './App';


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
