import { call, takeEvery, select, put, take } from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'
import actions from './types'

function* allSagas() {
  yield takeEvery(actions.promote, updateLocation)
  yield takeEvery(actions.demote, updateLocation)
}

function* updateLocation(action) {
  const state = yield select(state => state.chosen)
  const keys = state.map(s => s.key).sort().join(';')
  window.history.pushState(null, null, '#' + keys)
}

export default allSagas
