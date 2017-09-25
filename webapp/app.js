import React from 'react'
import { connect } from 'react-redux'
import { HexGrid, Layout, Hexagon } from 'react-hexgrid'

import types from './types'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: '0', height: '0' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  removeCache = {}
  remove = (key) => {
    if (!this.removeCache[key]) {
      this.removeCache[key] = (ev) => this.props.dispatch({ type: types.demote, key })
    }
    return this.removeCache[key]
  }

  addCache = {}
  add = (key) => {
    if (!this.addCache[key]) {
      this.addCache[key] = (ev) => this.props.dispatch({ type: types.promote, key })
    }
    return this.addCache[key]
  }

  render() {
    return <div className='root'>
      <HexGrid
        width={-(-this.state.width)}
        height={-(-this.state.height)}
        viewBox="-50 -50 100 100"
      >
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          spacing={1.01}
          origin={{ x: 0, y: 0 }}
        >
          { this.props.chosen.map(
            hex => <Hexagon {...hex} onClick={this.remove(hex.key)} />
          ) }
          { this.props.weak.map(
            hex => <Hexagon className='weak' onClick={this.add(hex.key)} {...hex} />
          ) }
        </Layout>
      </HexGrid>
    </div>
  }
}

export default connect(state => state)(App)
