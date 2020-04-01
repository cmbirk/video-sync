import debug from 'debug'
import http from 'http'
import express from 'express'
// import path from 'path'
import socketIO from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import config from './config'

const log = debug('videoSync:server')

const rooms = []

const userRooms = {}

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

io.origins('*:*')

io.on('connection', (socket) => {
  userRooms[socket.id] = []

  socket.on('joined room', (data) => {
    const { roomId } = data

    let room = io.sockets.adapter.rooms[roomId]

    // If this is a new room
    if (!room || room.length === 0) {
      rooms.push({ id: roomId, host: socket.id })
      console.log(`Setting ${socket.id} host of room ${roomId}`)
      socket.emit('set host', { hostId: socket.id })
    }

    socket.join(roomId)
    userRooms[socket.id].push(roomId)

    room = io.sockets.adapter.rooms[roomId]

    console.log(`${room.length} clients in room ${roomId}`)
  })

  socket.on('disconnect', () => {
    // Check user host status for rooms
    // Transition hosts in rooms
    // Remove user from rooms
    // Remove any empty rooms
    // Check rooms still have users
    console.log(`Disconnecting ${socket.id} from ${userRooms[socket.id].length} rooms`)
    console.log(userRooms[socket.id])

    delete userRooms[socket.id]
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

  socket.on('play set', (data) => {
    const { currentTime, roomId } = data

    console.log(`Playing with ${currentTime} time`)

    socket.broadcast.to(roomId).emit('set play', { currentTime })
  })

  socket.on('pause set', (data) => {
    const { currentTime, roomId } = data

    console.log(`Pausing with ${currentTime} time`)

    socket.broadcast.to(roomId).emit('set pause', { currentTime })
  })
})

server.listen(port, () => {
  log(`Server started on port ${port}`)
})
