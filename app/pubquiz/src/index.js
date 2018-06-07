import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './store/PubquizStore'
global.store = store // for easier debugging
// console.log( JSON.stringify(store.toJSON(),null,2) )


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
