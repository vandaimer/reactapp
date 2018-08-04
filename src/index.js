import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'unistore';
import { Provider } from 'unistore/react';
import { initialState } from './reducer';
import './index.css';
import App from './components/App';

const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));
