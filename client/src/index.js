import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';

// Action Creator - used to modify the state contained in redux store

const store = createStore(reducers, {}, applyMiddleware(thunk));

// provider will inform all child components of state changes
ReactDOM.render(
<Provider store={store}> <App/> </Provider>
, document.querySelector('#root')
);