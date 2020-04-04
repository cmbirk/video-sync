import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import SidebarLayout from '@layout/SidebarLayout'
import { Player, VideoForm } from '@components'

import firebase from '@services/firebase'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
    playing: false,
    room: {},
    userId: '',
    users: [],
  }

  static async getInitialProps(/* ctx */) {
    return {}
  }

  async componentDidMount() {
    const { router } = this.props
    const { roomId } = router.query

    const db = firebase.firestore()

    this.roomRef = db.collection('Rooms').doc(roomId)

    const room = await this.roomRef.get()

    if (!room.exists) {
      console.error('Room does not exist')
      console.error(room)
      Router.push('/')
    }

    this.roomRef
      .onSnapshot((doc) => {
        const roomData = doc.data()

        this.setState({ room: roomData })
      })

    this.roomRef.collection('users')
      .onSnapshot((usersQuery) => {
        const userSnapshot = usersQuery.docs
        const users = userSnapshot.map((userRef) => {
          const refData = userRef.data()
          return {
            id: userRef.id,
            ...refData,
          }
        })

        if (users.length === 1) {
          console.log(users)

          this.roomRef.update({ hostId: users[0].id })
        }

        this.setState({ users })
      })

    this.socket = io(process.env.apiurl)

    let user

    let userId = localStorage.getItem('userId')

    if (userId) {
      user = await this.roomRef.collection('users').doc(userId).update({
        online: true,
      })
    } else {
      user = await this.roomRef.collection('users').add({
        username: 'unknown',
        online: true,
      })

      localStorage.setItem('userId', user.id)
      userId = user.id
    }

    this.setState({ userId })

    if (typeof window !== 'undefined') {
      this.socket.emit('joined room', {
        roomId,
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
    }
  }

  setupBeforeUnloadListener = () => {
    const { userId } = this.state

    window.addEventListener('beforeunload', (/* ev */) => {
      this.roomRef.collection('users').doc(userId).update({
        online: false,
      })
    })
  }

  isConnected = () => this.socket && this.socket.connected

  isHost = () => {
    const { userId, room: { hostId } } = this.state

    return (userId && userId === hostId)
  }

  user = () => {
    const { users, userId } = this.state

    const found = users.filter((u) => u.id === userId)

    return found[0]
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
    this.state.player.requestFullScreen()

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
    this.roomRef.update({ videoUrl })

    return videoUrl
  }

  handleSetHost = (hostId) => {
    this.roomRef.update({
      hostId,
    })
  }

  handleUpdateUsername = async (username) => {
    const { userId } = this.state

    this.roomRef.collection('users').doc(userId).update({ username })
  }

  resetVideoUrl = () => {
    if (!this.isHost()) {
      // eslint-disable-next-line no-console
      console.error('Only the host can reset the player url')
      return false
    }

    this.roomRef.update({ videoUrl: null })

    return null
  }

  setPlayer = (player) => {
    this.setState({ player })
  }

  render() {
    const { router } = this.props
    const {
      room,
      users = [],
      playing,
    } = this.state

    const { videoUrl } = room

    const { roomId } = router.query

    return (
      <SidebarLayout
        canReset={(videoUrl && this.isHost()) || false}
        handleSetHost={this.handleSetHost}
        handleUpdateUsername={this.handleUpdateUsername}
        isConnected={this.isConnected()}
        isHost={this.isHost()}
        resetVideoUrl={this.resetVideoUrl}
        room={room}
        user={this.user()}
        users={users}
      >

        <Player
          className={`${videoUrl ? '' : 'hidden'}`}
          isHost={this.isHost()}
          url={videoUrl}
          playing={playing}
          setPlayer={this.setPlayer}
          handlePause={this.handlePause}
          handlePlay={this.handlePlay}
          handleSeek={this.handleSeek}
        />

        <VideoForm
          className={`${videoUrl ? 'hidden' : ''}`}
          onSubmit={this.handleSubmit}
        />
      </SidebarLayout>
    )
  }
}

Room.propTypes = {
  router: PropTypes.object,
}

export default withRouter(Room)
