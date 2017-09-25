import hexUtil from './util/hex'

const { insert, exists } = hexUtil

const chosen = (window.location.hash || '#0,0,0').split('#')[1].split(';')
  .map(data => {
    const [ q, r, s ] = data.split(',').map(e => parseInt(e, 10))
    return hexUtil.withKey({ q, r, s })
  })

let weak = []
for (let c of chosen) {
  for (let neighbor of hexUtil.neighbors(c)) {
    if (!exists(chosen, neighbor) && !exists(weak, neighbor)) {
      weak = insert(weak, neighbor)
    }
  }
}

export default { chosen, weak }
