const neighbors = [
  [ 0, 1, -1 ],
  [ 0, -1, 1 ],
  [ 1, 0, -1 ],
  [ -1, 0, 1 ],
  [ -1, 1, 0 ],
  [ 1, -1, 0 ],
]

const takeOut = (collection, item) => {
  return collection.filter(i => i.key !== item.key)
}
const insert = (collection, item) => {
  return collection.concat([item])
}
const exists = (collection, item) => {
  return collection.some(i => i.key === item.key)
}

const withKey = ({ q, r, s }) => ({ q, r, s, key: `${q},${r},${s}` })

export default {
  withKey,
  takeOut,
  insert,
  exists,
  neighbors: ({ q, r, s }) => neighbors.map(delta => withKey({
    q: -(-q) + delta[0], r: -(-r) + delta[1], s: -(-s) + delta[2]
  }))
}
