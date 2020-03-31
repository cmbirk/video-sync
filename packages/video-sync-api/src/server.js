import debug from 'debug'
import http from 'http'
import express from 'express'
// import path from 'path'
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

app.get('/', (req, res) => {
  res.json({ message: 'Hello!' })
})

app.get('/rooms', (req, res) => {
  const newRoom = uuidv4()

  res.json({ newRoom })
})

const io = socketIO(server)

io.on('connection', (socket) => {
  socket.on('joined room', (data) => {
    const { roomId } = data

    const room = io.sockets.adapter.rooms[roomId]

    if (room.length === 0) {
      rooms.push({ id: roomId, host: socket.id })
      console.log(`Setting ${socket.id} host of room ${roomId}`)
    }

    socket.join(roomId)

    console.log(`${room.length + 1} clients in room ${roomId}`)

    rooms.push({ id: roomId })
  })

  socket.on('video url set', (data) => {
    const { roomId, videoUrl } = data

    console.log(`Video url ${videoUrl} set for room ${roomId}`)

    io.to(roomId).emit('set video url', { videoUrl })
  })

  socket.on('seek set', (data) => {
    const { seconds, roomId } = data

    console.log(`setting seek to ${seconds}`)

    socket.broadcast.to(roomId).emit('set seek', { seconds })
  })
})

server.listen(port, () => {
  log(`Server started on port ${port}`)
})
