import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware as RouterMiddleware } from 'react-router-redux'
import RedBox from 'redbox-react'
import createSagaMiddleware from 'redux-saga'
import im from 'immutable'

import './style/main.scss'
import reducer from './reducers'
import sagas from './sagas'
import defaultState from './state'

const history = createHistory()
const routerMiddleware = RouterMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(routerMiddleware, sagaMiddleware)
  )
)

sagaMiddleware.run(sagas)
const getRoot = () => document.getElementById('app')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div>
          <Component />
        </div>
      </Provider>
    </AppContainer>,
    getRoot()
  )
}

import app from './app'
render(app)

if (module.hot) {
  module.hot.accept('./app', () => {
    try {
      render(app)
    } catch (e) {
      ReactDOM.render(<RedBox error={e} />, getRoot())
    }
  })
}
