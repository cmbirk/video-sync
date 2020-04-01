import React, { Component, useState } from 'react'
import { withRouter } from 'next/router'
import io from 'socket.io-client'

import Layout from '@layout/Layout'
import { Player, VideoForm, UsernameForm } from '@components'

class Room extends Component {
  state = {
    hostId: null,
    player: null,
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

      this.socket = io('localhost:3001')

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
    const { hostId, username, videoUrl } = this.state
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
                setPlayer={this.setPlayer}
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
