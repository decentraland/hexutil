import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import SocketIO from 'socket.io'
import Webpack from 'webpack'
import WebpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import { handleRequest, extractFromReq } from './utils/requestHelpers'
import { getEnv } from './utils/env'
import webpackConfig from '../config/webpack.config'
import webpackMiddlewareConfig from '../config/webpackMiddleware'


const app = express()
const server = http.Server(app)
const io = SocketIO(http)
const webpack = Webpack(webpackConfig)

const PORT = getEnv('PORT', 3000)

io.on('connection', () => {
  console.log(`Client connected`)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(WebpackMiddleware(webpack, webpackMiddlewareConfig))
app.use(WebpackHotMiddleware(webpack))

app.use(express.static('./public'))

server.listen(PORT, function () {
  console.log('Server running on port', PORT)
})
