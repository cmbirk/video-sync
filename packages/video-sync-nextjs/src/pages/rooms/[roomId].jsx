import React, { Component } from 'react'
import { withRouter } from 'next/router'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import SidebarLayout from '@layout/SidebarLayout'
import { Player, VideoForm } from '@components'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
    playing: false,
    username: '',
    videoUrl: '',
  }

  static async getInitialProps(/* ctx */) {
    return {}
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { router } = this.props
      const { roomId } = router.query

      this.setState({ roomId })

      this.socket = io(process.env.apiurl)

      this.socket.emit('joined room', {
        roomId,
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

  handleUsernameSubmit = (username) => {
    const { id } = this.socket

    this.socket.emit('username set', { id, username })

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
      playing, videoUrl,
    } = this.state
    const { roomId } = router.query

    return (
      <SidebarLayout
        canReset={videoUrl && this.isHost()}
        isConnected={this.isConnected()}
        isHost={this.isHost()}
        resetVideoUrl={this.resetVideoUrl}
        roomId={roomId}
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
  router: {
    query: {
      roomId: PropTypes.string,
    },
  },
}

export default withRouter(Room)
