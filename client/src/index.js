import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import * as actions from './actions';

const appRoot = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot
);

window.addEventListener('load', async () => {
  store.dispatch(actions.loadWallet());
  setInterval(() => {
    store.dispatch(actions.updateBalance());
  }, 1000);
});

serviceWorker.unregister();
