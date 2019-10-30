import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import QuestionReducer from './redux/reducers/index';
import ScoreReducer from './redux/reducers/questions';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const middleware = applyMiddleware(reduxThunk);

const quizGame = combineReducers({
    QuestionReducer,
    ScoreReducer
});

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    quizGame,
    reduxDevTools (
        middleware
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();