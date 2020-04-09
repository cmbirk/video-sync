/* eslint-disable no-console */
import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

class Player extends Component {
  componentDidUpdate() {
    const { currentTime } = this.props

    this.player.seekTo(currentTime)
  }

  handleError = (err) => {
    console.error('Player Error:')
    console.error(err)
  }

  handleStart = () => {
    console.log('Started.')
  }

  handleReady = () => {
    const { currentTime, isHost } = this.props

    if (isHost && this.seeking) {
      this.seeking = false
      return false
    }
    console.log('Ready.')

    const playerTime = this.player.getCurrentTime()

    if (currentTime !== playerTime) {
      this.player.seekTo(currentTime)
    }

    return true
  }

  handleProgress = (data) => {
    const { isHost } = this.props
    if (!isHost) return false

    const { handleProgress } = this.props
    console.log('Progess.')
    console.log(data)

    return handleProgress(data)
  }

  handleSeek = (seconds) => {
    const { handleSeek, isHost } = this.props
    if (!isHost) return false

    this.seeking = true

    return handleSeek(seconds)
  }

  ref = (player) => {
    const { setPlayer } = this.props

    this.player = player

    setPlayer(player)
  }

  render() {
    const {
      className,
      handlePause,
      handlePlay,
      url,
      playing = false,
    } = this.props

    return (
      <div className={`${className} flex items-center justify-center h-full`}>
        <ReactPlayer
          playing={playing}
          ref={this.ref}
          url={url}
          controls
          onError={this.handleError}
          onSeek={this.handleSeek}
          onPause={handlePause}
          onPlay={handlePlay}
          onStart={this.handleStart}
          onReady={this.handleReady}
          width='80%'
          height='80%'
        />
      </div>
    )
  }
}

Player.propTypes = {
  className: PropTypes.string,
  currentTime: PropTypes.number,
  handlePause: PropTypes.func,
  handlePlay: PropTypes.func,
  handleProgress: PropTypes.func,
  handleSeek: PropTypes.func,
  isHost: PropTypes.bool,
  playing: PropTypes.bool,
  setPlayer: PropTypes.func,
  url: PropTypes.string,
}

export default Player
