
import store from './mystore/index.js';

window.$store = store;

import install from './pulgin/index.js';
install(window);
import React from 'react';
import ReactDOM from 'react-dom';

import BasicRouter from './router.js';

import './index.less';

import { Provider } from 'react-redux';
import socket from './pulgin/socket/socket.js';
let socketcallback = (callback) => {
  ReactDOM.render(
    <Provider store={store}>
      <BasicRouter />
    </Provider>,
    document.getElementById('root'), callback
  );
}
window.$socket = new socket(socketcallback);

