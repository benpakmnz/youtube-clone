import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import drawerHandlerReducer from './store/reducers/drawerHandlerReducer';
import fetchMoviesReducer from './store/reducers/fetchMoviesReducer';
import fetchSelectedMovieDataReducer from './store/reducers/fetchSelectedMovieDataReducer'

const rootReducer = combineReducers({
    drawerModeReducer: drawerHandlerReducer,
    fetchMoviesReducer: fetchMoviesReducer,
    fetchSelectedMovieDataReducer: fetchSelectedMovieDataReducer

})

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
