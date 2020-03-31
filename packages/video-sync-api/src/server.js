import debug from 'debug'
import http from 'http'
import express from 'express'
import request from 'request-promise'
import path from 'path'
import socketIO from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import config from './config'

const log = debug('videoSync:server')

const users = []
const connections = []
const rooms = []

const userrooms = {}

let givenRoom = ''

const {
  port,
} = config

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next()
})

const server = http.createServer(app)

app.get('/rooms', (req, res) => {
  const newRoom = uuidv4()

  console.log(newRoom)

  res.json({ newRoom })
})

// app.get('/rooms/:room/join', (req, res) => {
//   givenRoom = req.params.room

//   res.send({ })
// })

const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.emit('now', { message: 'Hello!' })

  socket.emit('set id', {
    id: givenRoom,
  })
})

server.listen(port, () => {
  log(`Server started on port ${port}`)
})
