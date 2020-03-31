import React from 'react'
import App from 'next/app'
import io from 'socket.io-client'
import '../styles.css'
import UserContext from '../contexts/UserContext'

class VideoSync extends App {
  state = {
    user: null,
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <UserContext.Provider value={{
        user: this.state.user,
      }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    )
  }

  componentDidMount() {
    this.socket = io('localhost:3001')

    this.socket.on('now', (data) => {
      console.log(data)
    })
  }
}

export default VideoSync
