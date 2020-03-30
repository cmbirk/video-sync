import React from 'react'
import App from 'next/app'
import io from 'socket.io-client'
import '../styles.css'

class VideoSync extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }

  componentDidMount() {
    this.socket = io('localhost:3001')

    this.socket.on('now', (data) => {
      console.log(data)
    })
  }
}

export default VideoSync
