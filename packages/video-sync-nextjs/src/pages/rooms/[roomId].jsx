import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import SidebarLayout from '@layout/SidebarLayout'
import { Player, VideoForm } from '@components'

import firebase from '@services/firebase'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
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
  }

  setupBeforeUnloadListener = () => {
    const { userId } = this.state

    window.addEventListener('beforeunload', (/* ev */) => {
      this.roomRef.collection('users').doc(userId).update({
        online: false,
      })
    })
  }

  isHost = () => {
    const { userId, room: { hostId } } = this.state

    return (userId && userId === hostId)
  }

  user = () => {
    const { users, userId } = this.state

    const found = users.filter((u) => u.id === userId)

    return found[0]
  }

  handleSeek = (seconds) => {
    if (!this.isHost()) return false

    this.roomRef.update({
      currentTime: seconds,
    })

    return seconds
  }

  handlePause = () => {
    if (!this.isHost()) return false

    const { player } = this.state

    const currentTime = player.getCurrentTime()

    this.roomRef.update({
      currentTime,
      playing: false,
    })

    return currentTime
  }

  handlePlay = () => {
    if (!this.isHost()) return false

    const { player } = this.state

    const currentTime = player.getCurrentTime()

    this.roomRef.update({
      currentTime,
      playing: true,
    })

    return currentTime
  }

  handleProgress = ({
    playedSeconds,
    // played,
    // loadedSeconds,
    // loaded,
  }) => {
    if (!this.isHost()) return false

    this.roomRef.update({
      asyncTime: playedSeconds,
    })

    return playedSeconds
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
    const {
      room,
      users = [],
    } = this.state

    const { currentTime, playing, videoUrl } = room

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
          currentTime={currentTime}
          isHost={this.isHost()}
          url={videoUrl}
          playing={playing}
          setPlayer={this.setPlayer}
          handlePause={this.handlePause}
          handlePlay={this.handlePlay}
          handleProgress={this.handleProgress}
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
