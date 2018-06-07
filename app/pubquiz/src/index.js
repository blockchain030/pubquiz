import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'mobx-react'
import store from './store/PubquizStore'
global.store = store // for easier debugging
// console.log( JSON.stringify(store.toJSON(),null,2) )


// provide store to all children (when they add @inject(store))
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
