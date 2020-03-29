import debug from 'debug'
import socketIO from 'socket.io'

const log = debug('videoSync:expressApp:socket')

module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (client) => {
    client.on('disconnect', () => {
      log(`Client ${client} disconnected.`)
    })
  })

  return io
}
