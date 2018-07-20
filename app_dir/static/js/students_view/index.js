import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
/**
 * UTILs
 */
import client from './utils/apollo';
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store} >
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
