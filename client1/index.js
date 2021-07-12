/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react'
import { Provider } from 'react-redux'
import rootReducer from './src/store/reducers/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const middleware = [thunk]

const initialState = {}
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
 