import im from 'immutable'
import actions from './types'

import defaultState from './state'
import hexUtil from './util/hex'
const { insert, takeOut, exists } = hexUtil

export default function(state, action) {
  let weak = state.weak || []
  let chosen = state.chosen || []
  if (action.type === actions.promote) {
    const [ q, r, s ] = action.key.split(',').map(e => parseInt(e, 10))
    const item = { q, r, s, key: action.key }
    weak = takeOut(weak, item)
    chosen = insert(chosen, item)
    for (let i of hexUtil.neighbors(item)) {
      if (!exists(chosen, i) && !exists(weak, i)) {
        weak = insert(weak, i)
      }
    }
    return { weak, chosen }
  }
  if (action.type === actions.demote) {
    const [ q, r, s ] = action.key.split(',').map(e => parseInt(e, 10))
    const item = { q, r, s, key: action.key }
    chosen = takeOut(chosen, item)
    weak = insert(weak, item)
    for (let candidate of hexUtil.neighbors(item)) {
      let neighbors = 0
      for (let n of hexUtil.neighbors(candidate)) {
        neighbors += (exists(chosen, n) && 1)
      }
      if (!neighbors) {
        weak = takeOut(weak, candidate)
      }
    }
    return { weak, chosen }
  }
  return state || defaultState
}
