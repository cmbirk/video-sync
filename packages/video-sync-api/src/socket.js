import debug from 'debug'
import socketIO from 'socket.io'

const log = debug('videoSync:expressApp:socket')

const connections = []

module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.emit('now', { message: 'Hello!' })
  })


  return io
}
