import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class Player extends Component {
  handleError = (err) => {
    console.error('Player Error:')
    console.error(err)
  }

  handleSeek = (seconds) => {
    const { handleSeek } = this.props

    console.log(`Seeked to ${seconds} seconds.`)

    handleSeek({ seconds })
  }

  handlePause = () => {
    console.log('Paused.')
  }

  handlePlay = () => {
    console.log('Played.')
  }

  handleStart = () => {
    console.log('Started.')
  }

  handleReady = () => {
    console.log('Ready.')
  }

  handleProgress = (data) => {
    console.log('Progess.')
    console.log(data)
  }

  ref = (player) => {
    const { setPlayer } = this.props

    this.player = player

    setPlayer(player)
  }

  render() {
    const { isHost = false, url, seconds, seekTo } = this.props

    return (
      <div className="flex items-center justify-center h-screen">
        <ReactPlayer
          ref={this.ref}
          url={url}
          controls={isHost}
          onError={this.handleError}
          onSeek={this.handleSeek}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onStart={this.handleStart}
          onReady={this.handleReady}
          onProgress={this.handleProgress}
          seekTo={seekTo}
        />
      </div>
    )
  }
}

export default Player
