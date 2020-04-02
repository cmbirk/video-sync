import React from 'react'
import App from 'next/app'
import Head from 'next/head'
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
        <Head>
          <title>Stuck Inside</title>
          <description>Stuck Inside? Play videos with friends!</description>
          <link rel="icon" href="/replay.svg" />
        </Head>
        <Component {...pageProps} />
      </UserContext.Provider>
    )
  }
}

export default VideoSync
