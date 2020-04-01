import React, { Component, useState } from 'react'
import { withRouter } from 'next/router'
import io from 'socket.io-client'

import Layout from '@layout/Layout'
import { Player, VideoForm, UsernameForm } from '@components'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
    playing: false,
    username:'',
    videoUrl: '',
  }

  static async getInitialProps (ctx) {
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

        console.log('Pausing.')

        this.state.player.seekTo(currentTime)
        this.state.player.getInternalPlayer().pause()
      })

      this.socket.on('set play', (data) => {
        const { currentTime } = data

        console.log('Playing.')

        this.state.player.seekTo(currentTime)
        this.state.player.getInternalPlayer().play()
      })
    }
  }

  isHost = () => {
    const { hostId } = this.state

    if (!this.socket) return false
    if (!hostId) return false

    return this.socket.id === hostId.replace('$', '')
  }

  handleSeek = ({ seconds}) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.socket.emit('seek set', {
      seconds,
      roomId,
    })
  }

  handlePause = ({ currentTime }) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    console.log('pause set.')

    this.socket.emit('pause set', {
      currentTime,
      roomId,
    })
  }

  handlePlay = ({ currentTime }) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    console.log('play set.')

    this.socket.emit('play set', {
      currentTime,
      roomId,
    })
  }

  handleSubmit = (videoUrl) => {
    if (!this.isHost()) return false

    const { roomId } = this.state

    this.setState({ videoUrl })

    this.socket.emit('video url set', { videoUrl, roomId })
  }

  handleUsernameSubmit = (username) => {
    const { id } = this.socket

    this.socket.emit('username set', { id, username })

    this.setState({ username })
  }

  resetVideoUrl = () => {
    if (!this.isHost()) {
      console.info('Only the host can reset the player url')
      return false
    }

    const { roomId } = this.state

    this.socket.emit('video url set', { videoUrl: '', roomId })
  }

  setPlayer = (player) => {
    this.setState({ player })
  }

  render() {
    const { router } = this.props
    const { hostId, playing, username, videoUrl } = this.state
    const { roomId } = router.query

    return (
      <Layout>
        <div>
          <div className="pl-8 pt-16 absolute">
            Host: {this.isHost() ? '✅' : '🚫'}
            { ( videoUrl && this.isHost() ) ?
              (
                <div>
                  <a
                    className="cursor-pointer text-blue-600"
                    onClick={() => this.resetVideoUrl()}
                  >Reset Video Url</a>
                </div>
              ) : null
            }
          </div>
          <div>
          {/*
            <UsernameForm
              onSubmit={this.handleUsernameSubmit}
            />
          */}
          </div>

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
        </div>
      </Layout>
    )
  }
}

export default withRouter(Room)
