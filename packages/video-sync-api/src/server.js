import debug from 'debug'
import http from 'http'

import config from 'config'
import express from './expressApp'
import socket from './socket'

const log = debug('videoSync:server')

const {
  port,
} = config

const app = express()
const server = http.createServer(app)

server.listen(port, () => {
  log(`Server started on port ${port}`)
})

const io = socket(server)
