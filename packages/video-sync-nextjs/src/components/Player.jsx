import React from 'react'
import ReactPlayer from 'react-player'

const Player = (props) => {
  const { url } = props

  const handleError = (err) => {
    console.error('Player Error:')
    console.error(err)
  }

  const handleSeek = (seconds) => {
    console.log(`Seeked to ${seconds} seconds.`)
  }

  const handlePause = () => {
    console.log('Paused.')
  }

  const handlePlay = () => {
    console.log('Played.')
  }

  const handleStart = () => {
    console.log('Started.')
  }

  const handleReady = () => {
    console.log('Ready.')
  }

  const handleProgress = (data) => {
    console.log('Progess.')
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <ReactPlayer
        url={url}
        controls
        onError={handleError}
        onSeek={handleSeek}
        onPause={handlePause}
        onPlay={handlePlay}
        onStart={handleStart}
        onReady={handleReady}
        onProgress={handleProgress}
      />
    </div>
  )
}

export default Player
