import React, { Component } from 'react'
import { withRouter } from 'next/router'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import SidebarLayout from '@layout/SidebarLayout'
import { Player, VideoForm } from '@components'

// import firebase from '@services/firebase'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
    playing: false,
    room: {},
    username: '',
    users: {},
    videoUrl: '',
  }

  static async getInitialProps(/* ctx */) {
    return {}
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { router } = this.props
      const { roomId } = router.query

      // const db = firebase.firestore()

      // this.roomRef = db.collection('Rooms').doc(roomId)

      // this.roomRef
        // .onSnapshot((doc) => {
          // console.log('doc')
          // console.log(doc)
        // })

      this.setState({ roomId })

      this.socket = io(process.env.apiurl)

      this.socket.emit('joined room', {
        roomId,
      })

      this.socket.on('new room user', ({ id, username }) => {
        // this.roomRef.update({
        //   users: firebase.firestore.FieldValue.arrayUnion({ id, username }),
        // })
        const { users } = this.state

        users[id] = username

        this.setState({
          users,
        })
      })

      this.socket.on('set host', ({ hostId }) => {
        this.setState({ hostId })
      })

      this.socket.on('set video url', (data) => {
        const { videoUrl } = data

        this.setState({ videoUrl })
      })

      this.socket.on('set seek', (data) => {
        const { seconds } = data

        this.state.player.seekTo(seconds)
      })

      this.socket.on('set pause', (data) => {
        const { currentTime } = data

        this.state.player.seekTo(currentTime)
        this.state.player.getInternalPlayer().pause()
      })

      this.socket.on('set play', (data) => {
        const { currentTime } = data

        this.state.player.seekTo(currentTime)
        this.state.player.getInternalPlayer().play()
      })

      this.socket.on('set username', ({ id, username }) => {
        console.log('Username set')
        console.log(id, username)

        const { users } = this.state
        users[id] = username

        this.setState({ users })
      })
    }
  }

  isConnected = () => this.socket && this.socket.connected

  isHost = () => {
    const { hostId } = this.state

    if (!this.socket) return false
    if (!hostId) return false

    return this.socket.id === hostId.replace('$', '')
  }

  handleSeek = ({ seconds }) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.socket.emit('seek set', {
      seconds,
      roomId,
    })

    return seconds
  }

  handlePause = ({ currentTime }) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.socket.emit('pause set', {
      currentTime,
      roomId,
    })

    return currentTime
  }

  handlePlay = ({ currentTime }) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.socket.emit('play set', {
      currentTime,
      roomId,
    })

    return currentTime
  }

  handleSubmit = (videoUrl) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.setState({ videoUrl })

    this.socket.emit('video url set', { videoUrl, roomId })

    return videoUrl
  }

  handleUpdateUsername = async (username) => {
    const users = await this.roomRef.collection('users').where('id', '==', this.socket.id).get()
    console.log(this.socket.id)
    console.log(users)

    users[0].update({ username })

    const { roomId } = this.state
    const { id } = this.socket

    console.log(username, id)

    this.socket.emit('username set', { roomId, id, username })

    this.setState({ username })
  }

  resetVideoUrl = () => {
    if (!this.isHost()) {
      // eslint-disable-next-line no-console
      console.error('Only the host can reset the player url')
      return false
    }

    const { roomId } = this.state

    this.socket.emit('video url set', { videoUrl: '', roomId })

    return null
  }

  setPlayer = (player) => {
    this.setState({ player })
  }

  render() {
    const { router } = this.props
    const {
      playing,
      videoUrl,
      users,
    } = this.state
    const { roomId } = router.query

    return (
      <SidebarLayout
        canReset={(videoUrl && this.isHost()) || false}
        handleUpdateUsername={this.handleUpdateUsername}
        isConnected={this.isConnected()}
        isHost={this.isHost()}
        resetVideoUrl={this.resetVideoUrl}
        roomId={roomId}
        users={users}
      >
        { videoUrl ? (
            <Player
              isHost={this.isHost()}
              url={videoUrl}
              playing={playing}
              setPlayer={this.setPlayer}
              handlePause={this.handlePause}
              handlePlay={this.handlePlay}
              handleSeek={this.handleSeek}
            />
        ) : (
            <VideoForm onSubmit={this.handleSubmit}/>
        )

        }
      </SidebarLayout>
    )
  }
}

Room.propTypes = {
  router: PropTypes.object,
}

export default withRouter(Room)
