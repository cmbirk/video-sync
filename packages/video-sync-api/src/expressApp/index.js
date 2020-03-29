import express from 'express'
import path from 'path'

const users = []
const connections = []
const rooms = []

const userrooms = {}

let givenRoom = ''

module.exports = () => {
  const app = express()

  app.use(express.static(path.resolve(__dirname, '../../static')))

  app.get('/:room', (req, res) => {
    givenRoom = req.params.room
    res.sendFile(path.resolve(__dirname, '../../static/index.html'))
  })

  return app
}
